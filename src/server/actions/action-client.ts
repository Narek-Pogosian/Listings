import { createSafeActionClient } from "next-safe-action";
import { getServerAuthSession } from "../auth";
import type { RoleEnumType } from "../db/schema";
import { db } from "../db";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

/**
 * Error Handling Strategy:
 * ------------------------
 * - Throw `ActionError` for expected / business errors
 *   → The error message will be safely returned to the client.
 *
 * - Throw regular `Error` for unexpected / system errors
 *   → The error is logged on the server and a generic message
 *     ("Unexpected error occurred.") is returned to the client.
 */
export const actionClient = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof ActionError) {
      return error.message;
    }

    return "Unexpected error occurred.";
  },
  defaultValidationErrorsShape: "flattened",
}).use(async ({ next }) => {
  return next({
    ctx: { db },
  });
});

const createRoleProtectedClient = (allowedRole: RoleEnumType) =>
  actionClient.use(async ({ next, ctx }) => {
    const session = await getServerAuthSession();

    if (!session?.user) {
      throw new ActionError("You must be signed in to perform this action.");
    }

    if (session.user.role !== allowedRole) {
      throw new ActionError("Unauthorized");
    }

    return next({
      ctx: {
        ...ctx,
        userId: session.user.id,
      },
    });
  });

export const userActionClient = createRoleProtectedClient("USER");
export const employerActionClient = createRoleProtectedClient("EMPLOYER");
export const adminActionClient = createRoleProtectedClient("ADMIN");
