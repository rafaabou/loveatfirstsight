// Love at First Sight — Moderation Worker
// SECURITY: No secrets hardcoded. All via env/Secrets.

// ─── Config (safe defaults — overridden by env) ─────────────
const CFG = {
  EMAIL_FROM: 'stories@yoursite.com',
  EMAIL_TO: 'rafaabou@proton.me',
  EMAIL_METHOD: 'console',
  SITE_URL: 'https://love-at-first-sight.pages.dev',
  MAX_STORY_LENGTH: 5000,
  MAX_NAME_LENGTH: 100,
  MAX_TITLE_LENGTH: 200,
  RATE_LIMIT_WINDOW: 60,
  RATE_LIMIT_MAX: 10,
};

// ─── Main Router ─────────────────────────────────────────────
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
    };

    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      const KV = env.STORIES_KV;
      const ADMIN_TOKEN = env.ADMIN_TOKEN;
      if (!ADMIN_TOKEN) {
        console.error('ADMIN_TOKEN not set');
        return jsonResponse(corsHeaders, { error: 'Internal server error' }, 500);
      }

      // ── Rate limiting (KV-based) ──
      if (!await checkRateLimit(KV, clientIP)) {
        return jsonResponse(corsHeaders, { error: 'Too many requests. Try again later.' }, 429);
      }

      // ── GET /api/stories — fetch approved stories ──
      if (url.pathname === '/api/stories' && method === 'GET') {
        const stories = await getAllStories(KV);
        const approved = stories
          .filter(s => s.status === 'approved')
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map(sanitizeStoryPublic);
        return jsonResponse(corsHeaders, approved);
      }

      // ── POST /api/stories — submit new story ──
      if (url.pathname === '/api/stories' && method === 'POST') {
        let body;
        try { body = await request.json(); }
        catch { return jsonResponse(corsHeaders, { error: 'Invalid JSON body' }, 400); }

        const validation = validateStoryInput(body);
        if (!validation.valid) {
          return jsonResponse(corsHeaders, { error: validation.error }, 400);
        }

        const story = {
          id: crypto.randomUUID(),
          name: stripHtml(validation.safe.name),
          email: validation.safe.email,
          title: stripHtml(validation.safe.title),
          lang: ['en', 'fr', 'ar'].includes(validation.safe.lang) ? validation.safe.lang : 'en',
          content: stripHtml(validation.safe.content),
          date: new Date().toISOString(),
          status: 'pending',
        };

        await saveStory(KV, story);
        await sendNotification(story, env);

        return jsonResponse(corsHeaders, { success: true, id: story.id });
      }

      // ── GET /api/admin/stories — fetch all stories ──
      if (url.pathname === '/api/admin/stories' && method === 'GET') {
        if (!authorize(request, ADMIN_TOKEN)) {
          return jsonResponse(corsHeaders, { error: 'Unauthorized' }, 401);
        }
        const stories = await getAllStories(KV);
        stories.sort((a, b) => new Date(b.date) - new Date(a.date));
        return jsonResponse(corsHeaders, stories);
      }

      // ── PUT /api/admin/stories/:id/approve — approve a story ──
      const approveMatch = url.pathname.match(/^\/api\/admin\/stories\/([a-f0-9-]+)\/approve$/);
      if (approveMatch && method === 'PUT') {
        if (!authorize(request, ADMIN_TOKEN)) {
          return jsonResponse(corsHeaders, { error: 'Unauthorized' }, 401);
        }
        const story = await getStory(KV, approveMatch[1]);
        if (!story) return jsonResponse(corsHeaders, { error: 'Story not found' }, 404);
        story.status = 'approved';
        await saveStory(KV, story);
        return jsonResponse(corsHeaders, { success: true, id: story.id });
      }

      // ── PUT /api/admin/stories/:id/reject ──
      const rejectMatch = url.pathname.match(/^\/api\/admin\/stories\/([a-f0-9-]+)\/reject$/);
      if (rejectMatch && method === 'PUT') {
        if (!authorize(request, ADMIN_TOKEN)) {
          return jsonResponse(corsHeaders, { error: 'Unauthorized' }, 401);
        }
        const story = await getStory(KV, rejectMatch[1]);
        if (!story) return jsonResponse(corsHeaders, { error: 'Story not found' }, 404);
        story.status = 'rejected';
        await saveStory(KV, story);
        return jsonResponse(corsHeaders, { success: true, id: story.id });
      }

      // ── POST /api/admin/stories/:id/onetimetoken — generate one-time tokens ──
      const oTokenMatch = url.pathname.match(/^\/api\/admin\/stories\/([a-f0-9-]+)\/onetimetoken$/);
      if (oTokenMatch && method === 'POST') {
        if (!authorize(request, ADMIN_TOKEN)) {
          return jsonResponse(corsHeaders, { error: 'Unauthorized' }, 401);
        }
        const storyId = oTokenMatch[1];
        const story = await getStory(KV, storyId);
        if (!story) return jsonResponse(corsHeaders, { error: 'Story not found' }, 404);
        const siteUrl = env.SITE_URL || CFG.SITE_URL;
        const approveOt = crypto.randomUUID();
        const rejectOt = crypto.randomUUID();
        await KV.put(`token:approve:${approveOt}`, storyId, { expirationTtl: 604800 });
        await KV.put(`token:reject:${rejectOt}`, storyId, { expirationTtl: 604800 });
        const approveUrl = `${siteUrl}/api/approve/${storyId}?ot=${encodeURIComponent(approveOt)}`;
        const rejectUrl = `${siteUrl}/api/reject/${storyId}?ot=${encodeURIComponent(rejectOt)}`;
        return jsonResponse(corsHeaders, { approveUrl, rejectUrl });
      }

      // ── GET /api/approve/:id?ot= — email click-to-approve (one-time token) ──
      const emailApproveMatch = url.pathname.match(/^\/api\/approve\/([a-f0-9-]+)$/);
      if (emailApproveMatch && method === 'GET') {
        const ot = url.searchParams.get('ot') || '';
        if (!ot) {
          return new Response('Missing token', { status: 403 });
        }
        const storedStoryId = await KV.get(`token:approve:${ot}`);
        if (!storedStoryId || storedStoryId !== emailApproveMatch[1]) {
          return new Response('Invalid or expired token', { status: 403 });
        }
        // Delete the one-time token immediately
        await KV.delete(`token:approve:${ot}`);
        const story = await getStory(KV, emailApproveMatch[1]);
        if (!story) return new Response('Story not found', { status: 404 });
        story.status = 'approved';
        await saveStory(KV, story);
        const siteUrl = env.SITE_URL || CFG.SITE_URL;
        return new Response(approvalPageHtml(story.title, siteUrl),
          { headers: { 'Content-Type': 'text/html' } });
      }

      // ── GET /api/reject/:id?ot= — email click-to-reject (one-time token) ──
      const emailRejectMatch = url.pathname.match(/^\/api\/reject\/([a-f0-9-]+)$/);
      if (emailRejectMatch && method === 'GET') {
        const ot = url.searchParams.get('ot') || '';
        if (!ot) {
          return new Response('Missing token', { status: 403 });
        }
        const storedStoryId = await KV.get(`token:reject:${ot}`);
        if (!storedStoryId || storedStoryId !== emailRejectMatch[1]) {
          return new Response('Invalid or expired token', { status: 403 });
        }
        // Delete the one-time token immediately
        await KV.delete(`token:reject:${ot}`);
        const story = await getStory(KV, emailRejectMatch[1]);
        if (!story) return new Response('Story not found', { status: 404 });
        story.status = 'rejected';
        await saveStory(KV, story);
        return new Response(rejectionPageHtml(story.title),
          { headers: { 'Content-Type': 'text/html' } });
      }

      // ── POST /api/contact — send contact message ──
      if (url.pathname === '/api/contact' && method === 'POST') {
        let body;
        try { body = await request.json(); }
        catch { return jsonResponse(corsHeaders, { error: 'Invalid JSON body' }, 400); }

        const validation = validateContactInput(body);
        if (!validation.valid) {
          return jsonResponse(corsHeaders, { error: validation.error }, 400);
        }

        await sendContactEmail(validation.safe, env);

        return jsonResponse(corsHeaders, { success: true });
      }

      return jsonResponse(corsHeaders, { error: 'Not found' }, 404);

    } catch (err) {
      console.error('Worker error:', err.message);
      return jsonResponse({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
      }, { error: 'Internal server error' }, 500);
    }
  },
};

// ─── Auth ────────────────────────────────────────────────────
function authorize(request, token) {
  const header = request.headers.get('Authorization') || '';
  return constantTimeEqual(header.replace('Bearer ', ''), token);
}

function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

// ─── Rate Limiting ───────────────────────────────────────────
async function checkRateLimit(KV, ip) {
  try {
    const key = `ratelimit:${ip}`;
    const now = Math.floor(Date.now() / 1000);
    const window = CFG.RATE_LIMIT_WINDOW;
    const max = CFG.RATE_LIMIT_MAX;

    const record = await KV.get(key);
    let data = record ? JSON.parse(record) : { count: 0, start: now };

    if (now - data.start > window) {
      data = { count: 1, start: now };
    } else {
      data.count++;
    }

    if (data.count > max) return false;

    await KV.put(key, JSON.stringify(data), { expirationTtl: window * 2 });
    return true;
  } catch (e) {
    console.error('Rate limit check failed:', e.message);
    return true;  // fail open
  }
}

// ─── Contact Validation ──────────────────────────────────────
function validateContactInput(body) {
  const name = String(body.name || '').trim().slice(0, 100);
  const email = String(body.email || '').trim().slice(0, 254);
  const subject = String(body.subject || 'No subject').trim().slice(0, 200);
  const message = String(body.message || '').trim();

  if (!name) return { valid: false, error: 'Name is required' };
  if (!email) return { valid: false, error: 'Email is required' };
  if (!isValidEmail(email)) return { valid: false, error: 'Invalid email format' };
  if (!message) return { valid: false, error: 'Message is required' };
  if (message.length > 5000) return { valid: false, error: 'Message too long (max 5000 characters)' };

  return {
    valid: true,
    safe: {
      name: stripHtml(name),
      email: email,
      subject: stripHtml(subject),
      message: stripHtml(message),
    },
  };
}

async function sendContactEmail(data, env) {
  const method = env.EMAIL_METHOD || CFG.EMAIL_METHOD;
  if (method === 'console') {
    console.warn('[WARN] Console email method used — contact messages will not be delivered via email.');
  }
  const emailTo = env.EMAIL_TO || CFG.EMAIL_TO;
  const siteUrl = env.SITE_URL || CFG.SITE_URL;

  const text = [
    'New contact message from the website:',
    '',
    `From: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    '',
    'Message:',
    data.message,
    '',
    '─────────────────────',
    `Reply to: ${data.email}`,
  ].join('\n');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;padding:20px;background:#f9f9f9;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;padding:30px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
    <h2 style="color:#c0392b;">&#10084; New Contact Message</h2>
    <table style="width:100%;border-collapse:collapse;margin:20px 0;">
      <tr><td style="padding:8px;color:#666;">Name</td><td style="padding:8px;"><strong>${escapeHtml(data.name)}</strong></td></tr>
      <tr><td style="padding:8px;color:#666;">Email</td><td style="padding:8px;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
      <tr><td style="padding:8px;color:#666;">Subject</td><td style="padding:8px;"><strong>${escapeHtml(data.subject)}</strong></td></tr>
    </table>
    <div style="background:#fff5f5;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #c0392b;">
      <p style="margin:0;line-height:1.7;">${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
    </div>
    <p style="color:#666;font-size:0.85rem;text-align:center;">Sent from ${escapeHtml(siteUrl)} &mdash; <a href="mailto:${escapeHtml(data.email)}">Reply to ${escapeHtml(data.name)}</a></p>
  </div>
</body>
</html>`;

  const method = env.EMAIL_METHOD || CFG.EMAIL_METHOD;

  switch (method) {
    case 'sendgrid':
      await sendSendGridContact(env, emailTo, text, html, data);
      break;
    case 'resend':
      await sendResendContact(env, emailTo, text, html, data);
      break;
    case 'mailgun':
      await sendMailgunContact(env, emailTo, text, html, data);
      break;
    case 'console':
    default:
      console.log('=== CONTACT FORM MESSAGE ===');
      console.log('To:', emailTo);
      console.log('Subject: Contact: ' + data.subject);
      console.log(text);
      console.log('=== END ===');
      break;
  }
}

function sendSendGridContact(env, to, text, html, data) {
  return sendSendGrid(env, to, text, html, { title: 'Contact: ' + data.subject });
}
function sendResendContact(env, to, text, html, data) {
  return sendResend(env, to, text, html, { title: 'Contact: ' + data.subject });
}
function sendMailgunContact(env, to, text, html, data) {
  return sendMailgun(env, to, text, html, { title: 'Contact: ' + data.subject });
}

// ─── Input Validation ────────────────────────────────────────
function validateStoryInput(body) {
  const name = String(body.name || 'Anonymous').trim().slice(0, CFG.MAX_NAME_LENGTH);
  const email = String(body.email || '').trim().slice(0, 254);
  const title = String(body.title || 'Untitled').trim().slice(0, CFG.MAX_TITLE_LENGTH);
  const lang = String(body.lang || 'en').trim().slice(0, 5);
  const content = String(body.content || '').trim();

  if (!content) return { valid: false, error: 'Story content is required' };
  if (content.length > CFG.MAX_STORY_LENGTH) {
    return { valid: false, error: `Story content too long (max ${CFG.MAX_STORY_LENGTH} characters)` };
  }
  if (email && !isValidEmail(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  return {
    valid: true,
    safe: { name, email, title, lang, content },
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function stripHtml(text) {
  return text.replace(/<[^>]*>/g, '').replace(/[<>]/g, '');
}

function sanitizeStoryPublic(story) {
  return {
    id: story.id,
    name: story.name,
    title: story.title,
    lang: story.lang,
    content: story.content,
    date: story.date,
  };
}

// ─── KV Helpers ──────────────────────────────────────────────
async function getAllStories(KV) {
  const stories = [];
  let cursor;
  do {
    const list = await KV.list({ prefix: 'story:', cursor, limit: 1000 });
    for (const key of list.keys) {
      const val = await KV.get(key.name);
      if (val) {
        try { stories.push(JSON.parse(val)); }
        catch (e) { console.warn('Failed to parse story:', key.name, e.message); }
      }
    }
    cursor = list.cursor;
  } while (cursor);
  return stories;
}

async function getStory(KV, id) {
  if (!/^[a-f0-9-]+$/i.test(id)) return null;
  const val = await KV.get(`story:${id}`);
  return val ? JSON.parse(val) : null;
}

async function saveStory(KV, story) {
  await KV.put(`story:${story.id}`, JSON.stringify(story));
}

// ─── Email Notification ──────────────────────────────────────
async function sendNotification(story, env) {
  const method = env.EMAIL_METHOD || CFG.EMAIL_METHOD;
  if (method === 'console') {
    console.warn('[WARN] Console email method used — messages will not be delivered via email. Set EMAIL_METHOD to "resend" or "mailgun" in production.');
  }
  const siteUrl = env.SITE_URL || CFG.SITE_URL;
  const emailTo = env.EMAIL_TO || CFG.EMAIL_TO;
  const KV = env.STORIES_KV;
  // Generate one-time tokens
  const approveOt = crypto.randomUUID();
  const rejectOt = crypto.randomUUID();
  await KV.put(`token:approve:${approveOt}`, story.id, { expirationTtl: 604800 });
  await KV.put(`token:reject:${rejectOt}`, story.id, { expirationTtl: 604800 });
  const approveUrl = `${siteUrl}/api/approve/${story.id}?ot=${encodeURIComponent(approveOt)}`;
  const rejectUrl = `${siteUrl}/api/reject/${story.id}?ot=${encodeURIComponent(rejectOt)}`;
  const adminUrl = `${siteUrl}/admin.html`;

  const text = [
    'New love story submitted for approval:',
    '',
    `From: ${story.name} (${story.email || 'no email'})`,
    `Title: ${story.title}`,
    `Language: ${story.lang}`,
    `Date: ${story.date}`,
    '',
    'Story:',
    story.content,
    '',
    '─────────────────────',
    `Approve: ${approveUrl}`,
    `Reject:  ${rejectUrl}`,
    `Admin:   ${adminUrl}`,
  ].join('\n');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;padding:20px;background:#f9f9f9;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;padding:30px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
    <h2 style="color:#c0392b;">&#10084; New Love Story</h2>
    <table style="width:100%;border-collapse:collapse;margin:20px 0;">
      <tr><td style="padding:8px;color:#666;">From</td><td style="padding:8px;"><strong>${escapeHtml(story.name)}</strong></td></tr>
      <tr><td style="padding:8px;color:#666;">Title</td><td style="padding:8px;"><strong>${escapeHtml(story.title)}</strong></td></tr>
      <tr><td style="padding:8px;color:#666;">Language</td><td style="padding:8px;">${escapeHtml(story.lang)}</td></tr>
    </table>
    <div style="background:#fff5f5;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #c0392b;">
      <p style="margin:0;line-height:1.7;">${escapeHtml(story.content).replace(/\n/g, '<br>')}</p>
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
      await sendSendGrid(env, emailTo, text, html, story);
      break;
    case 'resend':
      await sendResend(env, emailTo, text, html, story);
      break;
    case 'mailgun':
      await sendMailgun(env, emailTo, text, html, story);
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
async function sendSendGrid(env, to, text, html, story) {
  const key = env.SENDGRID_API_KEY;
  if (!key) { console.log('SendGrid API key not set — skipping email'); return; }
  try {
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
  } catch (e) { console.error('SendGrid error:', e.message); }
}

async function sendResend(env, to, text, html, story) {
  const key = env.RESEND_API_KEY;
  if (!key) { console.log('Resend API key not set — skipping email'); return; }
  try {
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
  } catch (e) { console.error('Resend error:', e.message); }
}

async function sendMailgun(env, to, text, html, story) {
  const key = env.MAILGUN_API_KEY;
  const domain = env.MAILGUN_DOMAIN;
  if (!key || !domain) { console.log('Mailgun not configured — skipping email'); return; }
  try {
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
  } catch (e) { console.error('Mailgun error:', e.message); }
}

// ─── HTML Pages ──────────────────────────────────────────────
function approvalPageHtml(title, siteUrl) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Approved - Love at First Sight</title></head>
<body style="font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#fff5f5;">
<div style="text-align:center;padding:40px;background:white;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.1);max-width:500px;">
<h1 style="color:#27ae60;">&#10003; Approved!</h1>
<p style="color:#333;font-size:1.1rem;">&ldquo;${escapeHtml(title)}&rdquo; is now live on the site.</p>
<a href="${escapeHtml(siteUrl)}" style="display:inline-block;margin-top:20px;padding:12px 30px;background:#c0392b;color:white;text-decoration:none;border-radius:8px;font-weight:600;">View Site</a>
</div></body></html>`;
}

function rejectionPageHtml(title) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Rejected - Love at First Sight</title></head>
<body style="font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#f5f5f5;">
<div style="text-align:center;padding:40px;background:white;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.1);max-width:500px;">
<h1 style="color:#666;">Rejected</h1>
<p style="color:#333;">&ldquo;${escapeHtml(title)}&rdquo; has been rejected.</p>
</div></body></html>`;
}

function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

// ─── Response Helper ─────────────────────────────────────────
function jsonResponse(cors, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}
