import { Router } from "express";
import { usersRouter } from "@/modules/users/users.routes";

export const apiV1 = Router();

apiV1.use("/users", usersRouter);
