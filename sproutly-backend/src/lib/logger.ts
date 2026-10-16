import pino from "pino";
import { env, isProd } from "@/config/env";

export const logger = pino({
  level: env.LOG_LEVEL,
  base: { service: "sproutly-api" },
  redact: {
    paths: ["req.headers.authorization", "req.headers.cookie", 'res.headers["set-cookie"]'],
    censor: "[REDACTED]",
  },
  ...(isProd
    ? {}
    : {
        transport: {
          target: "pino-pretty",
          options: { colorize: true, translateTime: "SYS:HH:MM:ss" },
        },
      }),
});
