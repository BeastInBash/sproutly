import type { Request, Response } from "express";
import { currentUser } from "@/middleware/auth";
import { ok } from "@/utils/response";
import type { UsersService } from "./users.service";

export class UsersController {
  constructor(private readonly service: UsersService) {}

  getMe = async (req: Request, res: Response) => {
    ok(res, await this.service.getById(currentUser(req).id));
  };

  updateMe = async (req: Request, res: Response) => {
    ok(res, await this.service.updateProfile(currentUser(req).id, req.body));
  };
}
