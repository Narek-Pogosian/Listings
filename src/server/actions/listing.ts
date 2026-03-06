"use server";

import { ActionError, employerActionClient } from "./action-client";
import { listings, listingStatusEnum } from "../db/schema";
import { createListingSchema } from "@/lib/schemas/listing-schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import z from "zod";

export const createListingAction = employerActionClient
  .inputSchema(createListingSchema)
  .action(async ({ parsedInput, ctx }) => {
    await ctx.db.insert(listings).values({
      ...parsedInput,
      employerId: ctx.userId,
      status: parsedInput.saveAsDraft ? "DRAFT" : "PUBLISHED",
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
  });

const listingStatusSchema = z.object({
  listingId: z.string(),
  status: z.enum(listingStatusEnum),
});

export const updateListingStatusAction = employerActionClient
  .inputSchema(listingStatusSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { listingId, status } = parsedInput;

    const rows = await ctx.db
      .select()
      .from(listings)
      .where(eq(listings.id, listingId))
      .limit(1);

    const listing = rows[0];
    if (!listing) {
      throw new ActionError("Listing not found.");
    }
    if (listing.employerId !== ctx.userId) {
      throw new ActionError("Unauthorized");
    }

    await ctx.db
      .update(listings)
      .set({ status })
      .where(eq(listings.id, listingId));

    if (status === "PUBLISHED") {
      revalidatePath("/");
    }

    revalidatePath("/dashboard/listing/${listingId}");
  });

export const deleteListingAction = employerActionClient
  .inputSchema(z.object({ listingId: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    const { listingId } = parsedInput;

    const rows = await ctx.db
      .select()
      .from(listings)
      .where(eq(listings.id, listingId))
      .limit(1);

    const listing = rows[0];
    if (!listing) {
      throw new ActionError("Listing not found.");
    }

    if (listing.employerId !== ctx.userId) {
      throw new ActionError("Unauthorized");
    }

    await ctx.db.delete(listings).where(eq(listings.id, listingId));

    revalidatePath("/");
    revalidatePath("/dashboard");
  });
