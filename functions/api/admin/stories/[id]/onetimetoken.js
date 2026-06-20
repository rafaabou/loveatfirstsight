const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function sanitize(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').trim().substring(0, 5000);
}

function isValidId(id) {
  return /^[a-zA-Z0-9_-]+$/.test(id);
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

export async function onRequestPost(context) {
  const { request, env, params } = context;
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  if (!token || !env.ADMIN_TOKEN || !constantTimeEqual(token, env.ADMIN_TOKEN)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
  if (!env.STORIES_KV) {
    return new Response(JSON.stringify({ error: 'KV not available' }), { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
  const storyId = sanitize(params.id || '');
  if (!storyId || !isValidId(storyId)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
  const ids = storyId.startsWith('pending:') || storyId.startsWith('approved:') ? [storyId] : [`pending:${storyId}`, `approved:${storyId}`];
  let found = null;
  for (const id of ids) {
    const data = await env.STORIES_KV.get(id);
    if (data) { found = { id, data }; break; }
  }
  if (!found) {
    return new Response(JSON.stringify({ error: 'Story not found' }), { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
  const approveToken = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);
  const rejectToken = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);
  await env.STORIES_KV.put(`token:approve:${approveToken}`, found.id, { expirationTtl: 604800 });
  await env.STORIES_KV.put(`token:reject:${rejectToken}`, found.id, { expirationTtl: 604800 });
  return new Response(JSON.stringify({ approveToken, rejectToken }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
