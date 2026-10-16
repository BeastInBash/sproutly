import { Router } from "express";
import { prisma } from "@/lib/prisma";

export const healthRouter = Router();

/** Liveness: the process is up. */
healthRouter.get("/live", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

/** Readiness: dependencies are reachable. */
healthRouter.get("/ready", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", checks: { database: "up" } });
  } catch {
    res.status(503).json({ status: "error", checks: { database: "down" } });
  }
});
