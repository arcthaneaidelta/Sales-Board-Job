# SalesHire Job Board

SalesHire is a Czech-language sales recruitment marketplace with public job browsing, no-account applications, employer submissions, and admin moderation.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/saleshire/src/App.tsx` — route shell and frontend entry
- `artifacts/saleshire/src/pages/` — homepage, listings, detail/application, employer, submission, and admin screens
- `artifacts/saleshire/src/components/` — shared layout, job cards, and UI primitives
- `artifacts/api-server/src/routes/` — jobs, applications, admin summary, and health endpoints
- `lib/db/src/schema/index.ts` — Companies, Jobs, and Applications tables
- `lib/api-spec/openapi.yaml` — source of truth for API contracts and generated hooks
- `artifacts/saleshire/src/index.css` — SalesHire visual theme and responsive styles

## Architecture decisions

- Public candidate and employer flows do not require accounts.
- Job submissions start as `Pending`; only `Approved` jobs are shown publicly.
- The admin screen uses the same API mutations to approve, reject, edit, and delete jobs.
- Demo records are seeded on first API startup so the product is immediately reviewable.

## Product

- Czech landing page with approved job highlights and employer CTA.
- Live search and filters for location and work type.
- Job detail pages with a no-account application form.
- Public employer job submission with a clear moderation handoff.
- Admin dashboard with status filters, summary counts, moderation controls, and applications list.

## User preferences

- Keep the product simple, maintainable, and focused on the sales hiring workflow.

## Gotchas

- Regenerate the API client after changing `lib/api-spec/openapi.yaml`.
- Use the managed `artifacts/api-server: API Server` and `artifacts/saleshire: web` workflows for local previews.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
