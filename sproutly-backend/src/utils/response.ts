import type { Response } from "express";

export const ok = <T>(res: Response, data: T, status = 200) =>
  res.status(status).json({ success: true, data });

export const created = <T>(res: Response, data: T) => ok(res, data, 201);

export const paginated = <T>(
  res: Response,
  data: T[],
  meta: { page: number; pageSize: number; total: number },
) =>
  res.json({
    success: true,
    data,
    meta: { ...meta, totalPages: Math.ceil(meta.total / meta.pageSize) },
  });
