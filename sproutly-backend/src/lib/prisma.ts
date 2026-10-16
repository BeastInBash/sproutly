import { PrismaPg } from "@prisma/adapter-pg";
import { env, isProd } from "@/config/env";
import { PrismaClient } from "@/generated/prisma/client";

const createClient = () =>
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: env.DATABASE_URL, max: 10 }),
    log: isProd ? ["error"] : ["warn", "error"],
  });

// Reuse a single client across hot reloads in development.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createClient();

if (!isProd) globalForPrisma.prisma = prisma;
