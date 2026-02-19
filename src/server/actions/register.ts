"use server";

import { registerSchema } from "@/lib/schemas/auth-schemas";
import { createAction } from ".";
import { users } from "../db/schema";
import bcrypt from "bcrypt";

export const registerAction = createAction(async ({ input, ctx }) => {
  const { data: parsedInput, success } = registerSchema.safeParse(input);
  // @ts-expect-error just making sure admin can't ever be and option
  if (!success || parsedInput.role === "admin") {
    return { success: false, error: "Invalid input" };
  }

  const hashedPassword = bcrypt.hashSync(parsedInput.password, 10);

  const user = await ctx.db
    .insert(users)
    .values({
      hashedPassword,
      email: parsedInput.email,
      name:
        parsedInput.role === "user" ? parsedInput.name : parsedInput.company,
    })
    .returning();

  if (!user) {
    return { success: false, error: "Unexpted error" };
  }

  return {
    success: true,
    data: { email: parsedInput.email, password: parsedInput.password },
  };
});
