"use server";

import { registerSchema } from "@/lib/schemas/auth-schemas";
import { actionClient, ActionError } from "./action-client";
import { userInfo, users } from "../db/schema";
import bcrypt from "bcrypt";

export const registerAction = actionClient
  .inputSchema(registerSchema)
  .action(async ({ parsedInput, ctx }) => {
    // @ts-expect-error make sure admin can't be and option
    if (parsedInput.role === "ADMIN") {
      throw new ActionError("You will never be an Admin");
    }

    const hashedPassword = bcrypt.hashSync(parsedInput.password, 10);

    try {
      const result = await ctx.db.transaction(async (tx) => {
        const [user] = await tx
          .insert(users)
          .values({
            hashedPassword,
            role: parsedInput.role,
            email: parsedInput.email,
            name:
              parsedInput.role === "USER"
                ? parsedInput.name
                : parsedInput.company,
          })
          .returning();

        if (!user) {
          throw new ActionError("Something went wrong, please try again.");
        }

        if (user.role === "USER") {
          await tx.insert(userInfo).values({ userId: user.id });
        }

        return user;
      });

      if (!result) {
        throw new ActionError("Something went wrong, please try again.");
      }

      return { email: parsedInput.email, password: parsedInput.password };
    } catch (err: any) {
      const pgError = err.cause ?? err;
      if (pgError && typeof pgError === "object" && pgError.code === "23505") {
        throw new ActionError("A user with that email already exists.");
      }

      throw err;
    }
  });
