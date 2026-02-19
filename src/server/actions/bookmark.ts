"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function toggleBookmark(userId: string, jobId: string) {
  const user = await auth();

  if (!user) throw new Error("Unauthorized");

  const existing = await db.bookmark.findUnique({
    where: { userId_jobId: { userId, jobId } },
  });

  if (existing) {
    await db.bookmark.delete({
      where: { userId_jobId: { userId, jobId } },
    });
    return { bookmarked: false };
  }

  await db.bookmark.create({
    data: { userId, jobId },
  });

  revalidatePath("/jobs");
  revalidatePath("/dashboard");

  return { bookmarked: true };
}
