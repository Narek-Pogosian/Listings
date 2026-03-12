import { userInfo } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export type GetUserInfoType = Awaited<ReturnType<typeof getUserInfo>>;
export async function getUserInfo(userId: string) {
  const [row] = await db
    .select({ bio: userInfo.bio })
    .from(userInfo)
    .where(eq(userInfo.userId, userId));
  return row || { bio: "" };
}
