import { createSafeActionClient } from "next-safe-action";
import { getServerAuthSession } from "../auth";
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

    console.error(error);
    return "Unexpected error occurred.";
  },
  defaultValidationErrorsShape: "flattened",
}).use(async ({ next }) => {
  return next({
    ctx: {
      db,
    },
  });
});

export const protectedActionClient = actionClient.use(async ({ next, ctx }) => {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    throw new ActionError("You must be signed in to perform this action.");
  }

  return next({ ctx: { ...ctx, userId: session.user.id } });
});
