import { rateLimit } from "express-rate-limit";
import { isTest } from "@/config/env";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skip: () => isTest,
  message: { success: false, error: { code: "RATE_LIMITED", message: "Too many requests" } },
});
