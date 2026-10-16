import { Router } from "express";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { updateMeSchema } from "./users.schema";
import { UsersService } from "./users.service";

const controller = new UsersController(new UsersService(new UsersRepository(prisma)));

export const usersRouter = Router();

usersRouter.use(requireAuth);
usersRouter.get("/me", controller.getMe);
usersRouter.patch("/me", validate({ body: updateMeSchema }), controller.updateMe);
