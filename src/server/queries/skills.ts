import { cacheTag } from "next/cache";
import { skills, userSkills } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export async function getAllSkills() {
  "use cache";
  cacheTag("skills");

  return await db
    .select({ id: skills.id, name: skills.name })
    .from(skills)
    .orderBy(skills.name);
}

export async function getUserSkills(userId: string) {
  "use cache";
  cacheTag(`skills-${userId}`);

  return await db
    .select({ id: skills.id, name: skills.name })
    .from(userSkills)
    .where(eq(userSkills.userId, userId))
    .innerJoin(skills, eq(userSkills.skillId, skills.id))
    .orderBy(skills.name);
}
