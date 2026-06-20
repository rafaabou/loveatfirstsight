const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

async function checkRateLimit(request, env) {
  if (!env.STORIES_KV) return true;
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const key = `ratelimit:${ip}`;
  try {
    const count = parseInt(await env.STORIES_KV.get(key)) || 0;
    if (count >= 10) return false;
    await env.STORIES_KV.put(key, (count + 1).toString(), { expirationTtl: 60 });
    return true;
  } catch { return true; }
}

function sanitize(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').trim().substring(0, 5000);
}

function isValidEmail(email) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidId(id) {
  return /^[a-zA-Z0-9_-]+$/.test(id);
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

async function getAllStories(env, status = null) {
  const stories = [];
  let cursor = null;
  try {
    do {
      const listOpts = { limit: 1000 };
      if (cursor) listOpts.cursor = cursor;
      const result = await env.STORIES_KV.list(listOpts);
      cursor = result.cursor;
      const keys = result.keys.filter(k => {
        if (k.name.startsWith('token:')) return false;
        if (k.name.startsWith('ratelimit:')) return false;
        if (status === 'approved') return k.name.startsWith('approved:');
        if (status === 'pending') return k.name.startsWith('pending:');
        return !k.name.startsWith('approved:');
      });
      for (const key of keys) {
        try {
          const val = JSON.parse(await env.STORIES_KV.get(key.name));
          stories.push({ id: key.name, ...val });
        } catch {}
      }
    } while (cursor);
  } catch {}
  return stories;
}

function sendNotificationEmail(env, story) {
  const method = env.EMAIL_METHOD || 'console';
  if (method === 'console') {
    console.log('=== New Story Submitted ===', JSON.stringify(story, null, 2));
    console.warn('WARNING: EMAIL_METHOD is set to "console". PII is logged to stdout.');
    return;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;

    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === '/api/contact' && method === 'POST') {
      return handleContact(request);
    }

    if (url.pathname === '/api/stories' && method === 'POST') {
      return handleSubmitStory(request, env);
    }

    if (url.pathname === '/api/stories' && method === 'GET') {
      return handleGetStories(env);
    }

    if (url.pathname.startsWith('/api/admin/stories')) {
      return handleAdmin(request, url, method, env);
    }

    return fetch(request);
  }
};

async function handleContact(request) {
  try {
    const data = await request.json();
    const name = sanitize(data.name || 'Anonymous');
    const email = sanitize(data.email || '');
    const subject = sanitize(data.subject || 'No subject');
    const message = sanitize(data.message || '');
    if (!name || !message) {
      return new Response(JSON.stringify({ error: 'Name and message are required' }), {
        status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    if (email && !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    console.log('=== Contact Form Submission ===', JSON.stringify({ name, email, subject, message }, null, 2));
    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

async function handleSubmitStory(request, env) {
  try {
    const rateOk = await checkRateLimit(request, env);
    if (!rateOk) {
      return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
        status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    const data = await request.json();
    const name = sanitize(data.name || 'Anonymous');
    const email = sanitize(data.email || '');
    const title = sanitize(data.title || 'Untitled');
    const lang = sanitize(data.lang || 'en');
    const content = sanitize(data.content || '');
    if (!content) {
      return new Response(JSON.stringify({ error: 'Story content is required' }), {
        status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    if (email && !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    if (!env.STORIES_KV) {
      return new Response(JSON.stringify({ success: true, note: 'saved locally' }), {
        status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);
    const story = { name, email, title, lang, content, date: new Date().toISOString(), status: 'pending' };
    await env.STORIES_KV.put(`pending:${id}`, JSON.stringify(story));
    const approveToken = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);
    const rejectToken = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);
    await env.STORIES_KV.put(`token:approve:${approveToken}`, id, { expirationTtl: 604800 });
    await env.STORIES_KV.put(`token:reject:${rejectToken}`, id, { expirationTtl: 604800 });
    try { sendNotificationEmail(env, { ...story, id, approveToken, rejectToken }); } catch {}
    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

async function handleGetStories(env) {
  if (!env.STORIES_KV) {
    return new Response(JSON.stringify([]), {
      status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
  const all = await getAllStories(env, 'approved');
  all.sort((a, b) => new Date(b.date) - new Date(a.date));
  const safe = all.map(s => ({
    title: escapeHtml(s.title),
    name: escapeHtml(s.name),
    date: s.date,
    content: escapeHtml(s.content),
  }));
  return new Response(JSON.stringify(safe), {
    status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
  });
}

async function handleAdmin(request, url, method, env) {
  if (!env.STORIES_KV) {
    return new Response(JSON.stringify({ error: 'KV not available' }), {
      status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token || !env.ADMIN_TOKEN || !constantTimeEqual(token, env.ADMIN_TOKEN)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
  if (method === 'GET') {
    const all = await getAllStories(env);
    all.sort((a, b) => new Date(b.date) - new Date(a.date));
    const safe = all.map(s => ({
      id: s.id,
      title: escapeHtml(s.title),
      name: escapeHtml(s.name),
      email: escapeHtml(s.email || ''),
      content: escapeHtml(s.content),
      date: s.date,
      status: s.status,
    }));
    return new Response(JSON.stringify(safe), {
      status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
  if (method === 'PUT') {
    const data = await request.json();
    const storyId = sanitize(data.id || '');
    const action = sanitize(data.action || '');
    if (!storyId || !isValidId(storyId)) {
      return new Response(JSON.stringify({ error: 'Invalid ID' }), {
        status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    if (action !== 'approve' && action !== 'reject') {
      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    if (data.token) {
      const tokenKey = `token:${action}:${sanitize(data.token)}`;
      const tokenId = await env.STORIES_KV.get(tokenKey);
      if (!tokenId) {
        return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
          status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
      await env.STORIES_KV.delete(tokenKey);
      const storyData = await env.STORIES_KV.get(tokenId);
      if (!storyData) {
        return new Response(JSON.stringify({ error: 'Story not found' }), {
          status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
      const story = JSON.parse(storyData);
      story.status = action === 'approve' ? 'approved' : 'rejected';
      if (action === 'approve') {
        await env.STORIES_KV.put(`approved:${tokenId}`, JSON.stringify(story));
        await env.STORIES_KV.delete(tokenId);
      } else {
        await env.STORIES_KV.delete(tokenId);
      }
      return new Response(JSON.stringify({ success: true }), {
        status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    const storyKey = storyId.startsWith('pending:') || storyId.startsWith('approved:') ? storyId : `pending:${storyId}`;
    const storyData = await env.STORIES_KV.get(storyKey);
    if (!storyData) {
      return new Response(JSON.stringify({ error: 'Story not found' }), {
        status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    const story = JSON.parse(storyData);
    story.status = action === 'approve' ? 'approved' : 'rejected';
    if (action === 'approve') {
      await env.STORIES_KV.put(storyKey.replace('pending:', 'approved:'), JSON.stringify(story));
    }
    await env.STORIES_KV.delete(storyKey);
    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
  if (method === 'POST' && url.pathname.match(/\/api\/admin\/stories\/([^\/]+)\/onetimetoken/)) {
    const storyId = sanitize(url.pathname.split('/')[4]);
    if (!storyId || !isValidId(storyId)) {
      return new Response(JSON.stringify({ error: 'Invalid ID' }), {
        status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    const ids = storyId.startsWith('pending:') || storyId.startsWith('approved:') ? [storyId] : [`pending:${storyId}`, `approved:${storyId}`];
    let found = null;
    for (const id of ids) {
      const data = await env.STORIES_KV.get(id);
      if (data) { found = { id, data }; break; }
    }
    if (!found) {
      return new Response(JSON.stringify({ error: 'Story not found' }), {
        status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    const approveToken = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);
    const rejectToken = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);
    await env.STORIES_KV.put(`token:approve:${approveToken}`, found.id, { expirationTtl: 604800 });
    await env.STORIES_KV.put(`token:reject:${rejectToken}`, found.id, { expirationTtl: 604800 });
    return new Response(JSON.stringify({ approveToken, rejectToken }), {
      status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders }
  });
}
