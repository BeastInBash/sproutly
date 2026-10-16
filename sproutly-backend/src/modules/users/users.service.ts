import { NotFoundError } from "@/utils/errors";
import type { UsersRepository } from "./users.repository";
import type { UpdateMeInput } from "./users.schema";

export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

  async getById(id: string) {
    const user = await this.repo.findById(id);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  updateProfile(id: string, input: UpdateMeInput) {
    return this.repo.update(id, input);
  }
}
