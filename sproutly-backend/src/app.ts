import { toNodeHandler } from "better-auth/node";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "@/config/env";
import { auth } from "@/lib/auth";
import { errorHandler, notFound } from "@/middleware/error-handler";
import { httpLogger } from "@/middleware/http-logger";
import { apiLimiter } from "@/middleware/rate-limit";
import { requestId } from "@/middleware/request-id";
import { healthRouter } from "@/modules/health/health.routes";
import { apiV1 } from "@/routes";

export const createApp = () => {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", env.TRUST_PROXY);

  app.use(requestId);
  app.use(httpLogger);
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGINS,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    }),
  );
  app.use(compression());

  app.use("/health", healthRouter);

  // Better Auth must be mounted BEFORE express.json() — it reads the raw body itself.
  app.all("/api/auth/{*any}", toNodeHandler(auth));

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  app.use("/api/v1", apiLimiter, apiV1);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
