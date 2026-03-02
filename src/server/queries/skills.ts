import { cacheTag } from "next/cache";
import { skills } from "../db/schema";
import { db } from "../db";

export async function getAllSkills() {
  "use cache";
  cacheTag("skills");

  return await db.select().from(skills).orderBy(skills.name);
}
