import type { PrismaClient } from "@/generated/prisma/client";
import type { UpdateMeInput } from "./users.schema";

const publicUser = {
  id: true,
  name: true,
  email: true,
  username: true,
  displayUsername: true,
  emailVerified: true,
  image: true,
  createdAt: true,
  updatedAt: true,
} as const;

export class UsersRepository {
  constructor(private readonly db: PrismaClient) {}

  findById(id: string) {
    return this.db.user.findUnique({ where: { id }, select: publicUser });
  }

  update(id: string, data: UpdateMeInput) {
    return this.db.user.update({ where: { id }, data, select: publicUser });
  }
}
