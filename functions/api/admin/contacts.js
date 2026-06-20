const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  if (!token || !env.ADMIN_TOKEN || !constantTimeEqual(token, env.ADMIN_TOKEN)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
  if (!env.STORIES_KV) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
  const messages = [];
  let cursor = null;
  try {
    do {
      const listOpts = { limit: 1000 };
      if (cursor) listOpts.cursor = cursor;
      const result = await env.STORIES_KV.list(listOpts);
      cursor = result.cursor;
      for (const key of result.keys) {
        if (key.name.startsWith('contact:')) {
          try {
            messages.push({ id: key.name, ...JSON.parse(await env.STORIES_KV.get(key.name)) });
          } catch {}
        }
      }
    } while (cursor);
  } catch {}
  messages.sort((a, b) => new Date(b.date) - new Date(a.date));
  return new Response(JSON.stringify(messages), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
