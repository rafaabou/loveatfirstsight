// Love at First Sight — Moderation Worker
// Deploy on Cloudflare Workers + KV

// ─── Configuration ───────────────────────────────────────────
const CFG = {
  ADMIN_TOKEN: 'love2026secret',       // CHANGE THIS after deploy
  EMAIL_FROM: 'stories@yoursite.com',  // Your verified domain email
  EMAIL_TO: 'rafaabou@proton.me',
  // Email method: 'sendgrid' | 'resend' | 'mailgun' | 'console'
  EMAIL_METHOD: 'console',
  // API keys for email providers (set as secrets in Cloudflare dashboard)
  SENDGRID_API_KEY: '',
  RESEND_API_KEY: '',
  MAILGUN_API_KEY: '',
  MAILGUN_DOMAIN: '',
  SITE_URL: 'https://love-at-first-sight.pages.dev',
};

// ─── Main Router ─────────────────────────────────────────────
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      const KV = env.STORIES_KV;
      const ADMIN_TOKEN = env.ADMIN_TOKEN || CFG.ADMIN_TOKEN;

      // ── GET /api/stories — fetch approved stories ──
      if (url.pathname === '/api/stories' && method === 'GET') {
        const stories = await getAllStories(KV);
        const approved = stories.filter(s => s.status === 'approved')
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        return jsonResponse(corsHeaders, approved);
      }

      // ── POST /api/stories — submit new story ──
      if (url.pathname === '/api/stories' && method === 'POST') {
        const body = await request.json();
        if (!body.content || !body.content.trim()) {
          return jsonResponse(corsHeaders, { error: 'Story content is required' }, 400);
        }

        const story = {
          id: Date.now().toString(),
          name: body.name || 'Anonymous',
          email: body.email || '',
          title: body.title || 'Untitled',
          lang: body.lang || 'en',
          content: body.content.trim(),
          date: new Date().toISOString(),
          status: 'pending',
        };

        await saveStory(KV, story);
        await sendNotification(story, env);

        return jsonResponse(corsHeaders, { success: true, story });
      }

      // ── GET /api/admin/stories — fetch all stories (admin only) ──
      if (url.pathname === '/api/admin/stories' && method === 'GET') {
        const token = request.headers.get('Authorization') || '';
        if (token !== `Bearer ${ADMIN_TOKEN}`) {
          return jsonResponse(corsHeaders, { error: 'Unauthorized' }, 401);
        }
        const stories = await getAllStories(KV);
        // Sort by date, newest first
        stories.sort((a, b) => new Date(b.date) - new Date(a.date));
        return jsonResponse(corsHeaders, stories);
      }

      // ── PUT /api/admin/stories/:id/approve — approve a story ──
      const approveMatch = url.pathname.match(/^\/api\/admin\/stories\/(.+)\/approve$/);
      if (approveMatch && method === 'PUT') {
        const token = request.headers.get('Authorization') || '';
        if (token !== `Bearer ${ADMIN_TOKEN}`) {
          return jsonResponse(corsHeaders, { error: 'Unauthorized' }, 401);
        }
        const story = await getStory(KV, approveMatch[1]);
        if (!story) return jsonResponse(corsHeaders, { error: 'Story not found' }, 404);
        story.status = 'approved';
        await saveStory(KV, story);
        return jsonResponse(corsHeaders, { success: true, story });
      }

      // ── PUT /api/admin/stories/:id/reject — reject a story ──
      const rejectMatch = url.pathname.match(/^\/api\/admin\/stories\/(.+)\/reject$/);
      if (rejectMatch && method === 'PUT') {
        const token = request.headers.get('Authorization') || '';
        if (token !== `Bearer ${ADMIN_TOKEN}`) {
          return jsonResponse(corsHeaders, { error: 'Unauthorized' }, 401);
        }
        const story = await getStory(KV, rejectMatch[1]);
        if (!story) return jsonResponse(corsHeaders, { error: 'Story not found' }, 404);
        story.status = 'rejected';
        await saveStory(KV, story);
        return jsonResponse(corsHeaders, { success: true, story });
      }

      // ── GET /api/approve/:id?token= — email click-to-approve link ──
      const emailApproveMatch = url.pathname.match(/^\/api\/approve\/(.+)$/);
      if (emailApproveMatch && method === 'GET') {
        const token = url.searchParams.get('token');
        if (token !== ADMIN_TOKEN) {
          return new Response('Invalid or missing token', { status: 403 });
        }
        const story = await getStory(KV, emailApproveMatch[1]);
        if (!story) return new Response('Story not found', { status: 404 });
        story.status = 'approved';
        await saveStory(KV, story);
        return new Response(`
          <html><body style="font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;background:#fff5f5;">
            <div style="text-align:center;padding:40px;background:white;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
              <h1 style="color:#c0392b;">&#10003; Approved!</h1>
              <p>"${story.title}" is now live on the site.</p>
              <a href="${CFG.SITE_URL}" style="display:inline-block;margin-top:20px;padding:12px 30px;background:#c0392b;color:white;text-decoration:none;border-radius:8px;">View Site</a>
            </div>
          </body></html>
        `, { headers: { 'Content-Type': 'text/html' } });
      }

      // ── GET /api/reject/:id?token= — email click-to-reject link ──
      const emailRejectMatch = url.pathname.match(/^\/api\/reject\/(.+)$/);
      if (emailRejectMatch && method === 'GET') {
        const token = url.searchParams.get('token');
        if (token !== ADMIN_TOKEN) {
          return new Response('Invalid or missing token', { status: 403 });
        }
        const story = await getStory(KV, emailRejectMatch[1]);
        if (!story) return new Response('Story not found', { status: 404 });
        story.status = 'rejected';
        await saveStory(KV, story);
        return new Response(`
          <html><body style="font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;background:#f5f5f5;">
            <div style="text-align:center;padding:40px;background:white;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
              <h1 style="color:#666;">Rejected</h1>
              <p>"${story.title}" has been rejected.</p>
            </div>
          </body></html>
        `, { headers: { 'Content-Type': 'text/html' } });
      }

      return jsonResponse(corsHeaders, { error: 'Not found' }, 404);

    } catch (err) {
      return jsonResponse({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }, { error: err.message }, 500);
    }
  },
};

// ─── KV Helpers ──────────────────────────────────────────────
async function getAllStories(KV) {
  const list = await KV.list({ prefix: 'story:' });
  const stories = [];
  for (const key of list.keys) {
    const val = await KV.get(key.name);
    if (val) stories.push(JSON.parse(val));
  }
  return stories;
}

async function getStory(KV, id) {
  const val = await KV.get(`story:${id}`);
  return val ? JSON.parse(val) : null;
}

async function saveStory(KV, story) {
  await KV.put(`story:${story.id}`, JSON.stringify(story));
}

// ─── Email Notification ──────────────────────────────────────
async function sendNotification(story, env) {
  const token = env.ADMIN_TOKEN || CFG.ADMIN_TOKEN;
  const siteUrl = env.SITE_URL || CFG.SITE_URL;
  const emailTo = env.EMAIL_TO || CFG.EMAIL_TO;
  const approveUrl = `${siteUrl}/api/approve/${story.id}?token=${token}`;
  const rejectUrl = `${siteUrl}/api/reject/${story.id}?token=${token}`;
  const adminUrl = `${siteUrl}/admin.html`;

  const text = `
New love story submitted for approval:

From: ${story.name} (${story.email || 'no email'})
Title: ${story.title}
Language: ${story.lang}
Date: ${story.date}

Story:
${story.content}

─────────────────────
Approve: ${approveUrl}
Reject:  ${rejectUrl}
Admin:   ${adminUrl}
`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;padding:20px;background:#f9f9f9;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;padding:30px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
    <h2 style="color:#c0392b;">&#10084; New Love Story</h2>
    <table style="width:100%;border-collapse:collapse;margin:20px 0;">
      <tr><td style="padding:8px;color:#666;">From</td><td style="padding:8px;"><strong>${story.name}</strong></td></tr>
      <tr><td style="padding:8px;color:#666;">Title</td><td style="padding:8px;"><strong>${story.title}</strong></td></tr>
      <tr><td style="padding:8px;color:#666;">Language</td><td style="padding:8px;">${story.lang}</td></tr>
    </table>
    <div style="background:#fff5f5;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #c0392b;">
      <p style="margin:0;line-height:1.7;">${story.content.replace(/\n/g, '<br>')}</p>
    </div>
    <div style="text-align:center;margin:30px 0;">
      <a href="${approveUrl}" style="display:inline-block;padding:12px 30px;background:#27ae60;color:white;text-decoration:none;border-radius:8px;margin:0 8px;">&#10003; Approve</a>
      <a href="${rejectUrl}" style="display:inline-block;padding:12px 30px;background:#e74c3c;color:white;text-decoration:none;border-radius:8px;margin:0 8px;">&#10007; Reject</a>
      <a href="${adminUrl}" style="display:inline-block;padding:12px 30px;background:#3498db;color:white;text-decoration:none;border-radius:8px;margin:0 8px;">&#9881; Admin</a>
    </div>
  </div>
</body>
</html>`;

  const method = env.EMAIL_METHOD || CFG.EMAIL_METHOD;

  switch (method) {
    case 'sendgrid':
      await sendSendGrid(env, emailTo, text, html);
      break;
    case 'resend':
      await sendResend(env, emailTo, text, html);
      break;
    case 'mailgun':
      await sendMailgun(env, emailTo, text, html);
      break;
    case 'console':
    default:
      console.log('=== EMAIL NOTIFICATION ===');
      console.log('To:', emailTo);
      console.log('Subject: New love story: ' + story.title);
      console.log(text);
      console.log('=== END ===');
      break;
  }
}

// ─── Email Providers ─────────────────────────────────────────
async function sendSendGrid(env, to, text, html) {
  const key = env.SENDGRID_API_KEY || CFG.SENDGRID_API_KEY;
  if (!key) { console.log('SendGrid API key not configured'); return; }
  await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: env.EMAIL_FROM || CFG.EMAIL_FROM },
      subject: 'New love story: ' + (story?.title || ''),
      content: [{ type: 'text/plain', value: text }, { type: 'text/html', value: html }],
    }),
  });
}

async function sendResend(env, to, text, html) {
  const key = env.RESEND_API_KEY || CFG.RESEND_API_KEY;
  if (!key) { console.log('Resend API key not configured'); return; }
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.EMAIL_FROM || CFG.EMAIL_FROM,
      to: [to],
      subject: 'New love story: ' + (story?.title || ''),
      text,
      html,
    }),
  });
}

async function sendMailgun(env, to, text, html) {
  const key = env.MAILGUN_API_KEY || CFG.MAILGUN_API_KEY;
  const domain = env.MAILGUN_DOMAIN || CFG.MAILGUN_DOMAIN;
  if (!key || !domain) { console.log('Mailgun API key or domain not configured'); return; }
  const formData = new FormData();
  formData.append('from', env.EMAIL_FROM || CFG.EMAIL_FROM);
  formData.append('to', to);
  formData.append('subject', 'New love story: ' + (story?.title || ''));
  formData.append('text', text);
  formData.append('html', html);
  await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: 'POST',
    headers: { 'Authorization': 'Basic ' + btoa('api:' + key) },
    body: formData,
  });
}

// ─── Response Helper ─────────────────────────────────────────
function jsonResponse(cors, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}
