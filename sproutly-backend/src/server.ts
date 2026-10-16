import { createApp } from "@/app";
import { env } from "@/config/env";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

const app = createApp();

const server = app.listen(env.PORT, () => {
  logger.info(`🚀 API listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
});

server.keepAliveTimeout = 65_000;
server.headersTimeout = 66_000;

let shuttingDown = false;

const shutdown = async (signal: string, exitCode = 0) => {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info({ signal }, "Shutting down gracefully");

  const force = setTimeout(() => {
    logger.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10_000);
  force.unref();

  server.close(async (err) => {
    if (err) logger.error({ err }, "Error closing HTTP server");
    await prisma.$disconnect().catch((e) => logger.error({ err: e }, "Error disconnecting Prisma"));
    clearTimeout(force);
    process.exit(err ? 1 : exitCode);
  });
};

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("unhandledRejection", (reason) => {
  logger.fatal({ err: reason }, "Unhandled promise rejection");
  void shutdown("unhandledRejection", 1);
});
process.on("uncaughtException", (err) => {
  logger.fatal({ err }, "Uncaught exception");
  void shutdown("uncaughtException", 1);
});
