# Sproutly API

Express 5 · TypeScript · Bun · Better Auth · Prisma 7 · PostgreSQL

## Quick start

```bash
cp .env.example .env          # then set BETTER_AUTH_SECRET (openssl rand -base64 32)
bun install                   # also runs `prisma generate`
bun run docker:db             # Postgres 17 on :5432
bun run db:migrate            # apply migrations
bun run dev                   # http://localhost:4000
```

## Scripts

| Script | Purpose |
| --- | --- |
| `dev` | Watch mode |
| `build` / `start` | Bundle to `dist/` and run it |
| `typecheck` / `lint` / `lint:fix` | `tsc` and Biome |
| `test` | `bun test` (Supertest) |
| `db:generate` / `db:migrate` / `db:deploy` / `db:studio` | Prisma |

## Layout

```
src/
├── app.ts               # Express app factory (middleware order matters)
├── server.ts            # HTTP server + graceful shutdown
├── routes.ts            # /api/v1 router
├── config/env.ts        # Zod-validated env (fails fast on startup)
├── lib/                 # auth (Better Auth), prisma (pg adapter), logger (pino)
├── middleware/          # auth, validate, error-handler, rate-limit, request-id, http-logger
├── modules/<feature>/   # routes → controller → service → repository (+ zod schema)
├── utils/               # AppError hierarchy, response helpers
└── generated/prisma     # Prisma client (git-ignored, generated)
```

## Endpoints

- `GET /health/live`, `GET /health/ready` (DB check)
- `ALL /api/auth/*`: Better Auth (e.g. `POST /api/auth/sign-up/email`, `POST /api/auth/sign-in/email`, `GET /api/auth/get-session`)
- `GET|PATCH /api/v1/users/me`: requires a session

Responses use `{ success: true, data }` or `{ success: false, error: { code, message, requestId, details? } }`.

## Frontend integration

The Expo app lives in `../sproutly-frontend`. Better Auth runs the `expo()` plugin and trusts the
`sproutly://` scheme (`APP_SCHEMES`), plus `exp://` origins in development. `CORS_ORIGINS` covers
Expo web (`http://localhost:8081`). Native clients send the session cookie from SecureStore, so CORS doesn't apply to them.

## Auth features

- **Email and password**, with a unique **username** (Better Auth `username` plugin). Usernames are 3 to 20 letters, numbers
  or underscores, and are unique case-insensitively (stored lowercased; `displayUsername` keeps the original casing).
  The app checks availability while the user types via `POST /api/auth/is-username-available`.
- **Google**: set `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` (see `.env.example` for the redirect URI). Until then the
  endpoint returns `PROVIDER_NOT_FOUND` and the app shows "Google sign-in is not set up yet". Google sign-ups get no username.

## Adding Better Auth plugins

After enabling a plugin in `src/lib/auth.ts`, add the models it needs to `prisma/schema.prisma`
(see the plugin docs), then run `bun run db:migrate`.

## Production

`docker compose --profile full up --build` builds the image and runs `prisma migrate deploy` on boot.
Set `NODE_ENV=production`, a strong `BETTER_AUTH_SECRET`, an HTTPS `BETTER_AUTH_URL`, and an exact `CORS_ORIGINS`.
