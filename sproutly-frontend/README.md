# Sproutly (app)

Expo SDK 57 · React Native 0.86 · TypeScript · Expo Router · Better Auth · TanStack Query · Bun

## Quick start

```bash
bun install
# start the API first: cd ../sproutly-backend && bun run docker:db && bun run dev
bun run start        # then press a (Android), i (iOS) or w (web), or scan the QR code with Expo Go
```

In development the app finds the backend at `http://<your-dev-machine-ip>:4000` automatically, so
simulators and physical devices on the same Wi-Fi both work. To point it at another backend, copy `.env.example` to `.env` and set
`EXPO_PUBLIC_API_URL`. **Release builds require `EXPO_PUBLIC_API_URL` to be set.**

## Scripts

| Script | Purpose |
| --- | --- |
| `start` / `android` / `ios` / `web` | Dev server |
| `typecheck` / `lint` / `check` | `tsc`, ESLint (`eslint-config-expo`), both |
| `doctor` | `expo-doctor` dependency/config checks |

Add packages with `bunx expo install <pkg>` so versions match the SDK.

## Layout

```
src/
├── app/                  # Expo Router routes ONLY
│   ├── _layout.tsx       #   fonts, providers, auth guards (Stack.Protected)
│   ├── (auth)/           #   sign-in, sign-up (signed-out only)
│   └── (app)/            #   signed-in stack: (tabs), settings, pot/[id] sheet
│       └── (tabs)/       #   Today, My garden, Plant doctor, Grow guide (custom tab bar)
├── screens/              # screen bodies rendered by routes
├── components/           # design-system UI: text, icon, button, chip, plant-photo, terrace-map…
├── data/                 # sample garden + guide data (replace with API queries)
├── hooks/                # use-me (React Query)
├── lib/                  # env, auth-client, api (fetch wrapper), query-client
└── constants/theme.ts    # Sproutly tokens: palette, type, spacing, radius
```

## Design

`Sproutly-screen-design.md` is the only design source. Every color, font, radius and spacing value
comes from `src/constants/theme.ts`. See `AGENTS.md` for the rules.

## Auth & API

- `lib/auth-client.ts`: Better Auth client with the Expo plugin. It stores the session in `expo-secure-store`
  and uses the `sproutly://` scheme (configured in `app.json`).
- `lib/api.ts`: `api<T>(path, opts)` calls `/api/v1/*` on the backend, sends the session cookie on
  native, unwraps `{ success, data }`, and throws `ApiError` (`status`, `body.code`, `body.message`).
- The root layout keeps the splash screen visible until the session is known, then shows either `(auth)` or `(app)`.

## Builds

Native modules used here (`expo-secure-store`, `expo-network`) are in Expo Go, so no dev build is needed yet.
For store builds use EAS: `bunx eas-cli build`.
