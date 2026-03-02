"use server";

import { employerActionClient } from "./action-client";
import { createListingSchema } from "@/lib/schemas/listing-schema";
import { revalidatePath } from "next/cache";
import { listings } from "../db/schema";

export const createListingAction = employerActionClient
  .inputSchema(createListingSchema)
  .action(async ({ parsedInput, ctx }) => {
    await ctx.db.insert(listings).values({
      ...parsedInput,
      employerId: ctx.userId,
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
  });
