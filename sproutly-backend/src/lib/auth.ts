import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins";
import { env, isProd } from "@/config/env";
import { prisma } from "@/lib/prisma";

const google =
  env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
    ? { google: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET } }
    : undefined;

// Native app deep-link scheme, plus Expo Go / dev-client origins in development.
const trustedOrigins = [
  ...env.CORS_ORIGINS,
  ...env.APP_SCHEMES.map((scheme) => `${scheme}://`),
  ...(isProd ? [] : ["exp://", "exp://**"]),
];

/** Keep in sync with sproutly-frontend/src/lib/username.ts. */
export const USERNAME_RULES = { min: 3, max: 20, pattern: /^[a-zA-Z0-9_]+$/ } as const;

export const auth = betterAuth({
  appName: "Sproutly",
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  basePath: "/api/auth",
  trustedOrigins,
  plugins: [
    expo(),
    // Unique, case-insensitive usernames (stored lowercased; displayUsername keeps the original casing).
    username({
      minUsernameLength: USERNAME_RULES.min,
      maxUsernameLength: USERNAME_RULES.max,
      usernameValidator: (value) => USERNAME_RULES.pattern.test(value),
    }),
  ],
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  socialProviders: google,
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh daily
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },
  rateLimit: {
    enabled: isProd,
    window: 60,
    max: 100,
  },
  advanced: {
    useSecureCookies: isProd,
  },
});

export type AuthSession = typeof auth.$Infer.Session;
