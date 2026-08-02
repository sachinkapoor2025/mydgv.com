import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * Phase 1 stub. Phase 5 adds Zod validation, Turnstile, D1 writes,
 * rate limiting, Resend/MailChannels and analytics events.
 */
export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get('content-type') || '';
  let body: Record<string, string> = {};

  if (contentType.includes('application/json')) {
    body = await request.json();
  } else {
    const form = await request.formData();
    body = Object.fromEntries(
      [...form.entries()].map(([k, v]) => [k, String(v)]),
    );
  }

  if (body.company_website) {
    return new Response(null, { status: 204 });
  }

  const started = Number(body.form_started_at || 0);
  if (started && Date.now() - started < 2000) {
    return new Response(JSON.stringify({ ok: false, error: 'Too fast' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  if (!body.email || !body.message) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing fields' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      ok: true,
      message:
        'Received. Lead API persistence ships in Phase 5 — please also email dgv@mydgv.com or WhatsApp +91-9650457697.',
    }),
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    },
  );
};

export const GET: APIRoute = async () =>
  new Response(JSON.stringify({ ok: true, service: 'lead-stub' }), {
    headers: { 'content-type': 'application/json' },
  });
