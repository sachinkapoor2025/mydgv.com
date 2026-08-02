# AWS hosting (100% AWS — no Cloudflare)

Domain stays in **Route 53**. App moves from today’s S3 static bucket to **Amplify Hosting** so SSR admin/APIs work without dropping features.

## Resource map (brief → AWS)

| Capability in brief | AWS service |
|---|---|
| Site hosting + SSR (`/admin/*`, `/api/*`) | **AWS Amplify Hosting** (SSR compute) |
| CDN / HTTPS edge | Amplify’s CloudFront distribution (automatic) |
| Leads, sessions, analytics DB | **Amazon DynamoDB** (serverless) |
| Lead notification email | **Amazon SES** |
| Form bot protection | **AWS WAF CAPTCHA** or Google reCAPTCHA (Turnstile replaced) |
| Geo-adaptive CTA country | **CloudFront-Viewer-Country** header (via Amplify/CloudFront) |
| Retention cron (400-day purge) | **EventBridge Scheduler** → Lambda |
| Secrets / env | Amplify environment variables + **SSM Parameter Store** / Secrets Manager |
| DNS | **Route 53** (unchanged registrar/zone) |
| Old static site backup | Keep existing **S3** bucket as archive; stop pointing DNS at it after cutover |

Do **not** use S3-only for the new site if you want admin + APIs. S3 cannot run `/admin` or `/api/lead`.

## Why Amplify (not S3, not raw Lambda first)

- One serverless product for static pages **and** Node SSR (matches Astro `@astrojs/node` standalone output).
- Still AWS: sits on CloudFront under the hood.
- Less glue than wiring API Gateway + Lambda + S3 yourself for every route.
- DynamoDB + SES + EventBridge cover the Phase 5 data plane without Cloudflare D1/Turnstile/Workers.

## Route 53 cutover (high level)

1. Create Amplify app → connect this Git repo → build uses `amplify.yml` (Node 22).
2. Wait for a green deploy; test the `*.amplifyapp.com` URL.
3. In Amplify → **Custom domains** → add `www.mydgv.com` (and apex if you want).
4. Amplify shows DNS records. In **Route 53** hosted zone for `mydgv.com`:
   - Create the **CNAME** (and any ACM validation CNAMEs) Amplify requests for `www`.
   - For apex `mydgv.com`: either follow Amplify’s apex instructions, or keep a **301 from apex → https://www.mydgv.com** (canonical is already `www`).
5. Leave the old S3 + CloudFront distribution in place until Search Console looks healthy, then disable the old distribution.
6. Import redirects from `amplify-redirects.json` into Amplify → **Hosting → Redirects and rewrites** (Cloudflare `_redirects` is not used on Amplify).

## Phase 5 implementation notes (when we build admin)

- Replace D1 SQL with DynamoDB tables (same entities: users, sessions, leads, lead_events, pageviews, events, daily_stats).
- Session cookies unchanged in behaviour (HTTP-only, Secure, SameSite=Strict); store session rows in DynamoDB.
- `/api/collect` and `/api/lead` stay Astro server routes (`prerender = false`).
- Email via SES (verify `dgv@mydgv.com` or a domain identity).
- Cron: EventBridge rule daily → Lambda that rolls pageviews into daily_stats and deletes raw rows older than 400 days.

## Cost posture (rough)

Amplify Hosting + DynamoDB on-demand + SES is the usual mid-market serverless shape. Far simpler ops than ECS. Still 100% inside your AWS account `985539754737` if you deploy there.
