import type { RequestHandler } from "express";
import type { z } from "zod";
import { ValidationError } from "@/utils/errors";

type Schemas = {
  body?: z.ZodType;
  query?: z.ZodType;
  params?: z.ZodType;
};

/**
 * Validates and coerces request input. Parsed values replace the originals
 * (query is exposed via res.locals.query since Express 5 makes req.query read-only).
 */
export const validate =
  (schemas: Schemas): RequestHandler =>
  (req, res, next) => {
    const issues: Record<string, unknown> = {};

    for (const key of ["body", "query", "params"] as const) {
      const schema = schemas[key];
      if (!schema) continue;
      const result = schema.safeParse(req[key]);
      if (!result.success) {
        issues[key] = result.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        }));
        continue;
      }
      if (key === "query") res.locals.query = result.data;
      else req[key] = result.data;
    }

    if (Object.keys(issues).length) throw new ValidationError(issues);
    next();
  };
