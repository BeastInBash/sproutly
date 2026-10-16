# Sproutly

A gardening app for terraces, balconies and windowsills: daily care jobs, a sun map of your space, and a plant doctor.

| Folder | What it is |
| --- | --- |
| [`sproutly-frontend/`](sproutly-frontend) | Expo (React Native) app, TypeScript, Expo Router |
| [`sproutly-backend/`](sproutly-backend) | Express 5 API on Bun, Better Auth, Prisma, Postgres |

Each app has its own `package.json` and lockfile. See its README to run it.

## Setup

```sh
bun install                         # root: git hooks
cd sproutly-backend && bun install  # API
cd ../sproutly-frontend && bun install
```

## Commits

Git hooks (husky) run on every commit:

- **pre-commit**: typecheck and lint for each app with staged changes.
- **commit-msg**: [Conventional Commits](https://www.conventionalcommits.org), e.g. `feat: add harvest log`, `fix(backend): handle missing session`.
