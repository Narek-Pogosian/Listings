"use server";

import z from "zod";
import { updateTag } from "next/cache";
import { adminActionClient } from "./action-client";
import { skills } from "../db/schema";

export const createSkillAction = adminActionClient
  .inputSchema(z.object({ name: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    await ctx.db.insert(skills).values({
      name: parsedInput.name,
    });

    updateTag("skills");
  });
