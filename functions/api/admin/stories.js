const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function sanitize(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').trim().substring(0, 5000);
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

async function getAllStories(env) {
  const stories = [];
  let cursor = null;
  try {
    do {
      const listOpts = { limit: 1000 };
      if (cursor) listOpts.cursor = cursor;
      const result = await env.STORIES_KV.list(listOpts);
      cursor = result.cursor;
      for (const key of result.keys) {
        if (key.name.startsWith('token:') || key.name.startsWith('ratelimit:') || key.name.startsWith('contact:')) continue;
        try {
          stories.push({ id: key.name, ...JSON.parse(await env.STORIES_KV.get(key.name)) });
        } catch {}
      }
    } while (cursor);
  } catch {}
  return stories;
}

function checkAuth(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  if (!token || !env.ADMIN_TOKEN || !constantTimeEqual(token, env.ADMIN_TOKEN)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
  return null;
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const authErr = checkAuth(request, env);
  if (authErr) return authErr;
  if (!env.STORIES_KV) {
    return new Response(JSON.stringify({ error: 'KV not available' }), { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
  const all = await getAllStories(env);
  all.sort((a, b) => new Date(b.date) - new Date(a.date));
  const safe = all.map(s => ({
    id: s.id, title: escapeHtml(s.title), name: escapeHtml(s.name),
    email: escapeHtml(s.email || ''), content: escapeHtml(s.content),
    date: s.date, status: s.status, lang: s.lang,
  }));
  return new Response(JSON.stringify(safe), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
}

export async function onRequestPut(context) {
  const { request, env } = context;
  const authErr = checkAuth(request, env);
  if (authErr) return authErr;
  if (!env.STORIES_KV) {
    return new Response(JSON.stringify({ error: 'KV not available' }), { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
  try {
    const data = await request.json();
    const storyId = sanitize(data.id || '');
    const action = sanitize(data.action || '');
    if (!storyId || !isValidId(storyId)) {
      return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    if (action !== 'approve' && action !== 'reject') {
      return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    if (data.token) {
      const tokenKey = `token:${action}:${sanitize(data.token)}`;
      const tokenId = await env.STORIES_KV.get(tokenKey);
      if (!tokenId) {
        return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
      }
      await env.STORIES_KV.delete(tokenKey);
      const storyData = await env.STORIES_KV.get(tokenId);
      if (!storyData) {
        return new Response(JSON.stringify({ error: 'Story not found' }), { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
      }
      const story = JSON.parse(storyData);
      story.status = action === 'approve' ? 'approved' : 'rejected';
      if (action === 'approve') {
        await env.STORIES_KV.put(`approved:${tokenId}`, JSON.stringify(story));
        await env.STORIES_KV.delete(tokenId);
      } else {
        await env.STORIES_KV.delete(tokenId);
      }
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    const storyKey = storyId.startsWith('pending:') || storyId.startsWith('approved:') ? storyId : `pending:${storyId}`;
    const storyData = await env.STORIES_KV.get(storyKey);
    if (!storyData) {
      return new Response(JSON.stringify({ error: 'Story not found' }), { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    const story = JSON.parse(storyData);
    story.status = action === 'approve' ? 'approved' : 'rejected';
    if (action === 'approve') {
      await env.STORIES_KV.put(storyKey.replace('pending:', 'approved:'), JSON.stringify(story));
    }
    await env.STORIES_KV.delete(storyKey);
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
