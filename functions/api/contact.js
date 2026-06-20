const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function sanitize(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').trim().substring(0, 5000);
}

function isValidEmail(email) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendEmailNotification(env, name, email, subject, message) {
  if (!env.RESEND_API_KEY) return;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.EMAIL_FROM || 'onboarding@resend.dev',
        to: env.EMAIL_TO || 'rafaabou@proton.me',
        subject: `[Love Site] Contact: ${subject}`,
        html: `<h2>New Contact Message</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email || 'Not provided'}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
      }),
    });
  } catch {}
}

export async function onRequestPost(context) {
  const { request, env } = context;
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
    sendEmailNotification(env, name, email, subject, message);
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
