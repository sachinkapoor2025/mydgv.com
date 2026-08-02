# CONTENT-TODO — verification and client inputs

Items marked `{{VERIFY}}` must be evidenced or deleted before launch. Never invent metrics.

## Legal / compliance (priority)

- [ ] **MMC (ContainersClub):** Legal review of any public wording. Site must describe MMC only as a container asset management module with an owner dashboard and reporting. Ban: investment opportunity, monthly income, guaranteed, returns (in MMC context).
- [ ] Legal review of `/security-and-compliance/` before committing to DPA / GDPR terms (Phase 2 content).
- [ ] Written client permission for **TickerPlay** (tickerplay.com) public pages — or remove from sitemap/nav.

## Missing URLs / integrations

- [ ] Cal.com booking URL for “Book a 30-minute technical call” (`src/lib/site.ts`, CTAs).
- [ ] Real social profile URLs for Organization `sameAs` schema.
- [ ] AWS Amplify app in account `985539754737` + custom domain `www.mydgv.com` (Route 53 records).
- [ ] DynamoDB tables + IAM role for Amplify SSR (Phase 5).
- [ ] Amazon SES domain/email identity for lead notifications (Phase 5).
- [ ] Bot protection choice: AWS WAF CAPTCHA or reCAPTCHA keys (replaces Cloudflare Turnstile).
- [ ] First admin owner seed env vars (email + password hash) — never commit passwords.

## Facts to verify with client

- [ ] Any quantitative results for USARakhi / HalloweenReady (orders, revenue, traffic, ROAS) — WooCommerce, Ads, Search Console.
- [ ] ContainersClub “what broke” anecdote for case study (integration or data-model failure).
- [ ] Named author bios and photos for insights (E-E-A-T) — Phase 7.
- [ ] Vector logo / brand lockup (currently reusing `public/images/logo.png`).
- [ ] Professional indemnity insurance details for security page.

## Phase 1 stubs to replace with full content

- Phase 2: methodology cluster, pricing, security-and-compliance
- Phase 3: 14 service pillar pages (currently stubs)
- Phase 4: products, case studies, team, careers, partners, legal
- Phase 6: service×country matrix, country hubs, comparisons, glossary
- Phase 7: insights engine + tools

## Legacy migration notes

- Removed false endorsement claim: “Recommended by ChatGPT, Claude & Cursor”.
- Removed unverifiable “47 reviews / 4.9” style claims — no Review schema anywhere.
- Old `/reviews.html` redirects to `/case-studies/`.
- Legacy static files preserved in `legacy-site/` (source: s3://mydgv, account 985539754737).
- Hosting decision: **100% AWS** — Amplify Hosting (not Cloudflare Pages). See `HOSTING-AWS.md`.
