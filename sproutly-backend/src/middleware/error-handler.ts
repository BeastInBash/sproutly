import type { ErrorRequestHandler, RequestHandler } from "express";
import { isProd } from "@/config/env";
import { Prisma } from "@/generated/prisma/client";
import { AppError, ConflictError, NotFoundError } from "@/utils/errors";

export const notFound: RequestHandler = (req) => {
  throw new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`);
};

const fromPrisma = (err: Prisma.PrismaClientKnownRequestError): AppError | undefined => {
  switch (err.code) {
    case "P2002":
      return new ConflictError("A record with this value already exists");
    case "P2025":
      return new NotFoundError();
    default:
      return undefined;
  }
};

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  let error: AppError | undefined;

  if (err instanceof AppError) error = err;
  else if (err instanceof Prisma.PrismaClientKnownRequestError) error = fromPrisma(err);
  else if (err?.type === "entity.parse.failed")
    error = new AppError("Malformed JSON body", 400, "BAD_REQUEST");
  else if (err?.type === "entity.too.large")
    error = new AppError("Payload too large", 413, "PAYLOAD_TOO_LARGE");

  if (!error?.isOperational) {
    req.log?.error({ err }, "Unhandled error");
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: isProd ? "Internal server error" : (err?.message ?? "Unknown error"),
        requestId: req.id,
        ...(!isProd && { stack: err?.stack }),
      },
    });
    return;
  }

  res.status(error.statusCode).json({
    success: false,
    error: {
      code: error.code,
      message: error.message,
      requestId: req.id,
      ...(error.details !== undefined && { details: error.details }),
    },
  });
};
