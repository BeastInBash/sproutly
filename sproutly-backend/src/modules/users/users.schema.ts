import { z } from "zod";

export const updateMeSchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    image: z.url().max(2048).nullable().optional(),
  })
  .strict();

export type UpdateMeInput = z.infer<typeof updateMeSchema>;
