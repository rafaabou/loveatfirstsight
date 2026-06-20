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

export async function onRequestPost(context) {
  const { request, env } = context;
  const ip = getClientIP(request);
  const rateCheck = await checkRateLimit(env, ip, 'contact-submit');
  if (!rateCheck.allowed) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.', retryAfter: rateCheck.retryAfter }), { status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
  try {
    const data = await request.json();
    const name = sanitize(data.name || 'Anonymous');
    const email = sanitize(data.email || '');
    const subject = sanitize(data.subject || 'No subject');
    const message = sanitize(data.message || '');
    if (!name || !message) {
      return new Response(JSON.stringify({ error: 'Name and message are required' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    if (email && !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    if (env.STORIES_KV) {
      const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);
      await env.STORIES_KV.put(`contact:${id}`, JSON.stringify({ name, email, subject, message, date: new Date().toISOString() }));
    }
    await sendTelegramNotification(env, `💌 <b>New Contact Message</b>\n\n<b>Name:</b> ${name}\n<b>Email:</b> ${email || 'N/A'}\n<b>Subject:</b> ${subject}\n<b>Message:</b> ${message}`);
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
