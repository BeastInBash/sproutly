import type { AuthSession } from "@/lib/auth";

declare global {
  namespace Express {
    interface Request {
      user?: AuthSession["user"];
      session?: AuthSession["session"];
    }
  }
}
