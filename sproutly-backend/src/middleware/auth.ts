import { fromNodeHeaders } from "better-auth/node";
import type { Request, RequestHandler } from "express";
import { auth } from "@/lib/auth";
import { UnauthorizedError } from "@/utils/errors";

/** Attaches the session (if any) to req.user / req.session. Never rejects. */
export const loadSession: RequestHandler = async (req, _res, next) => {
  const result = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
  if (result) {
    req.user = result.user;
    req.session = result.session;
  }
  next();
};

/** Rejects the request with 401 unless a valid session exists. */
export const requireAuth: RequestHandler = async (req, res, next) => {
  if (!req.user) await loadSession(req, res, () => {});
  if (!req.user) throw new UnauthorizedError();
  next();
};

/** Returns the authenticated user. Use only in handlers behind `requireAuth`. */
export const currentUser = (req: Request) => {
  if (!req.user) throw new UnauthorizedError();
  return req.user;
};
