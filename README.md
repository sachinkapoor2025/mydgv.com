# mydgv.com

Corporate website for Divit Global Ventures — Astro 5 + Tailwind CSS 4.

**Hosting:** 100% AWS (Amplify Hosting + DynamoDB + SES). Domain on Route 53. See [HOSTING-AWS.md](HOSTING-AWS.md).

## Develop

```bash
nvm use 22   # or Node ≥ 22.12
npm ci
npm run dev
npm run build
```

## CI

GitHub Actions (`.github/workflows/ci.yml`) builds on pushes and PRs to `dev` and `main`.

## Branches

- `dev` — active development
- `main` — production-ready

## Legacy

Old static S3 site snapshot: [`legacy-site/`](legacy-site/).
