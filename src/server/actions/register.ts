"use server";

import { registerSchema } from "@/lib/schemas/auth-schemas";
import { createAction } from ".";
import { users } from "../db/schema";
import bcrypt from "bcrypt";

export const registerAction = createAction(async ({ input, ctx }) => {
  const { data: parsedInput, success } = registerSchema.safeParse(input);
  if (!success) {
    return { success: false, error: "Invalid input" };
  }

  const hashedPassword = bcrypt.hashSync(parsedInput.password, 10);

  const user = await ctx.db
    .insert(users)
    .values({
      email: parsedInput.email,
      name: parsedInput.name,
      hashedPassword,
    })
    .returning();

  if (!user) {
    return { success: false, error: "Something went wrong" };
  }

  return {
    success: true,
    data: { email: parsedInput.email, password: parsedInput.password },
  };
});
