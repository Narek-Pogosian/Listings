"use server";

import z from "zod";
import { userActionClient } from "./action-client";
import { userInfo, userSkills } from "../db/schema";
import { updateTag } from "next/cache";
import { and, eq } from "drizzle-orm";

export const addUserSkillAction = userActionClient
  .inputSchema(z.object({ skillIds: z.array(z.number()) }))
  .action(async ({ parsedInput, ctx }) => {
    const rows = parsedInput.skillIds.map((id) => ({
      userId: ctx.userId,
      skillId: id,
    }));

    await ctx.db.insert(userSkills).values(rows);

    updateTag(`skills-${ctx.userId}`);
  });

export const deleteUserSkillAction = userActionClient
  .inputSchema(z.object({ skillId: z.number() }))
  .action(async ({ parsedInput, ctx }) => {
    await ctx.db
      .delete(userSkills)
      .where(
        and(
          eq(userSkills.userId, ctx.userId),
          eq(userSkills.skillId, parsedInput.skillId),
        ),
      );

    updateTag(`skills-${ctx.userId}`);
  });

export const updateUserBioAction = userActionClient
  .inputSchema(z.object({ bio: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    await ctx.db
      .update(userInfo)
      .set({
        bio: parsedInput.bio,
      })
      .where(eq(userInfo.userId, ctx.userId));
  });
