# SikaChain Web

Marketing and go-to-market site for **SikaChain** — the blockchain settlement network for mobile money, merchant payments, remittances, and low-cost digital transfers.

This is the **infrastructure** site. The consumer mobile money product is [**Sika App**](../Sika%20app/) (separate repo).

**Repository:** [github.com/rroland10/SikaChain](https://github.com/rroland10/SikaChain)

## Positioning

| Layer | Role |
| --- | --- |
| **SikaChain** | Financial infrastructure — settlement network |
| **Sika App** | User product — mobile money |
| **21 genesis producers** | Institutional trust layer |

**Launch market:** Ghana first, then expansion across Africa.

## Run locally

```bash
npm install
cp .env.example .env   # set ADMIN_TOKEN at minimum
npm run dev
```

Open [http://localhost:3004](http://localhost:3004).

Sync chain constants from Spring: `npm run sync:chain` (reads `../AntelopeOS/spring/sikachaindev/chain.json`).

## Features

- **Luxury glassmorphic UI** with Framer Motion animations
- **AI concierge** (✦ button) — local knowledge base; optional OpenAI via `OPENAI_API_KEY`
- **Producer applications** — live form at `/apply`; local `data/` in dev, **Vercel Blob** in production
- **Admin dashboard** — `/admin` (requires `ADMIN_TOKEN` in `.env`)
- **Candidate showcase** — `/candidates` public transparency page
- **Email notifications** — Resend: admin alert + applicant confirmation on apply; status emails on review
- **Network status** — live SikaChainDev RPC widget on home page

## API routes

| Route | Purpose |
| --- | --- |
| `POST /api/chat` | AI concierge (local RAG or OpenAI) |
| `POST /api/apply` | Genesis producer applications |
| `GET /api/candidates` | Public showcase list (seed + promoted) |
| `PATCH /api/admin/applications` | Update application review status |
| `POST /api/admin/promote` | Promote application to public showcase |
| `GET /api/admin/applications/export` | CSV export (Bearer token) |
| `GET /api/chain` | Chain info, paginated blocks, block/tx lookup |
| `GET /api/health` | Service health, storage backend, chain status |
| `GET /api/producers/performance` | Testnet producer metrics |

## Environment

See `.env.example`:

| Variable | Purpose |
| --- | --- |
| `ADMIN_TOKEN` | Protects `/admin` application review |
| `RESEND_API_KEY` + `NOTIFY_EMAIL` | Email on new applications |
| `OPENAI_API_KEY` | Optional LLM for concierge |
| `SIKACHAIN_RPC_URL` | Dev chain RPC (default `http://127.0.0.1:8888`) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob for production application/showcase storage |
| `NEXT_PUBLIC_SITE_URL` | Sitemap / Open Graph in production |

## Pages

| Route | Content |
| --- | --- |
| `/` | Home — hero, network status, genesis chart, timeline |
| `/genesis` | Genesis Producer Program |
| `/candidates` | Public candidate showcase (seed + promoted) |
| `/testnet` | Live testnet producer performance dashboard |
| `/producers` | Requirements and testnet qualification |
| `/governance` | Governance model |
| `/roadmap` | 12-month GTM timeline |
| `/ghana` | Ghana-first launch strategy |
| `/sika-app` | Sika App product overview |
| `/apply` | Live producer application form |
| `/admin` | Review, promote, export CSV |
| `/explorer` | Block explorer with pagination and tx lookup |
| `/explorer/block/[num]` | Block detail with action list |
| `/press` | Press kit — brand assets and boilerplate |
| `/status` | Platform health — storage, email, chain RPC |
| `/developers` | Dev quickstart — RPC, chain ID, WharfKit, cleos |

## Deploy (Vercel)

**Recommended:** [Import from GitHub](https://vercel.com/new) → `rroland10/SikaChain` → configure env vars → Deploy.

```bash
vercel login          # one-time
npm run deploy        # production CLI deploy
npm run deploy:preview
```

GitHub Actions runs `lint` + `build` on push to `main`.

Set in the Vercel dashboard: `ADMIN_TOKEN`, `NEXT_PUBLIC_SITE_URL`, `BLOB_READ_WRITE_TOKEN` (create a Blob store in Storage), and a public `SIKACHAIN_RPC_URL` (not localhost). Optional: `RESEND_API_KEY`, `OPENAI_API_KEY`.

Check deployment: `GET /api/health` returns `{ storage: "blob", ... }`.

### Custom domain

In Vercel → Project → **Settings → Domains**, add e.g. `sikachain.com` and `www.sikachain.com`.

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Then set `NEXT_PUBLIC_SITE_URL=https://sikachain.com` and redeploy.


## Related projects

- `../AntelopeOS/spring` — Spring node software + `sikachaindev/` local chain
- `../Sika app` — Next.js + Capacitor mobile money app
- `../SikaChain logo` — Brand identity assets
