const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function getClientIP(request) {
  return request.headers.get('CF-Connecting-IP') || 'unknown';
}

async function checkRateLimit(env, ip, endpoint) {
  if (!env.STORIES_KV) return { allowed: true };
  const key = `ratelimit:${ip}:${endpoint}`;
  const count = parseInt(await env.STORIES_KV.get(key) || '0', 10);
  if (count >= 5) {
    return { allowed: false, retryAfter: 60 };
  }
  if (count === 0) {
    await env.STORIES_KV.put(key, '1', { expirationTtl: 60 });
  } else {
    await env.STORIES_KV.put(key, String(count + 1), { expirationTtl: 60 });
  }
  return { allowed: true };
}

function sanitize(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').trim().substring(0, 5000);
}

function isValidEmail(email) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

async function getAllStories(env, status) {
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
        if (status === 'approved' && !key.name.startsWith('approved:')) continue;
        if (status === 'pending' && !key.name.startsWith('pending:')) continue;
        try {
          stories.push({ id: key.name, ...JSON.parse(await env.STORIES_KV.get(key.name)) });
        } catch {}
      }
    } while (cursor);
  } catch {}
  return stories;
}

async function sendTelegramNotification(env, text) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  try {
    await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }),
    });
  } catch {}
}

export async function onRequestGet(context) {
  const { env } = context;
  if (!env.STORIES_KV) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
  const all = await getAllStories(env, 'approved');
  all.sort((a, b) => new Date(b.date) - new Date(a.date));
  const safe = all.map(s => ({
    title: escapeHtml(s.title), name: escapeHtml(s.name), date: s.date, content: escapeHtml(s.content),
  }));
  return new Response(JSON.stringify(safe), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const ip = getClientIP(request);
  const rateCheck = await checkRateLimit(env, ip, 'story-submit');
  if (!rateCheck.allowed) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.', retryAfter: rateCheck.retryAfter }), { status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
  try {
    const data = await request.json();
    const name = sanitize(data.name || 'Anonymous');
    const email = sanitize(data.email || '');
    const title = sanitize(data.title || 'Untitled');
    const lang = sanitize(data.lang || 'en');
    const content = sanitize(data.content || '');
    if (!content) {
      return new Response(JSON.stringify({ error: 'Story content is required' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    if (email && !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    if (!env.STORIES_KV) {
      return new Response(JSON.stringify({ success: true, note: 'saved locally' }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);
    const story = { name, email, title, lang, content, date: new Date().toISOString(), status: 'pending' };
    await env.STORIES_KV.put(`pending:${id}`, JSON.stringify(story));
    const approveToken = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);
    const rejectToken = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);
    await env.STORIES_KV.put(`token:approve:${approveToken}`, id, { expirationTtl: 604800 });
    await env.STORIES_KV.put(`token:reject:${rejectToken}`, id, { expirationTtl: 604800 });
    await sendTelegramNotification(env, `📖 <b>New Story Submitted</b>\n\n<b>Name:</b> ${name}\n<b>Email:</b> ${email || 'N/A'}\n<b>Title:</b> ${title}\n\n<b>Story snippet:</b> ${content.substring(0, 300)}...\n\n<a href="${env.SITE_URL || 'https://loveatfirstsight.kdns.fr'}/admin.html">Moderate in admin panel</a>`);
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
