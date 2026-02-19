import { getServerAuthSession } from "../auth";
import { Session } from "next-auth";
import { db } from "../db";

export type ActionResult =
  | { success: true; data: unknown; error?: null }
  | { success: false; data?: null; error: string }
  | void;

type BaseContext = {
  db: typeof db;
};

export function createAction<TResult extends ActionResult>(
  handler: (args: {
    input: unknown;
    ctx: BaseContext;
  }) => TResult | Promise<TResult>,
) {
  return async (input: unknown): Promise<TResult> => {
    return handler({
      input,
      ctx: { db },
    });
  };
}

export function createProtectedAction<TResult extends ActionResult>(
  handler: (args: {
    formData: FormData;
    ctx: BaseContext & { session: Session | null };
  }) => TResult | Promise<TResult>,
) {
  return async (formData: FormData): Promise<TResult> => {
    const session = await getServerAuthSession();

    if (!session?.user) {
      return {
        success: false,
        error: "UNAUTHORIZED",
      } as TResult;
    }

    return handler({
      formData,
      ctx: { db, session },
    });
  };
}
