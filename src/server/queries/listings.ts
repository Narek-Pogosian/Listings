import { getServerAuthSession } from "../auth";
import { redirect } from "next/navigation";
import { listings } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export async function getEmployerListings() {
  const session = await getServerAuthSession();
  if (!session || session.user.role !== "EMPLOYER") {
    throw redirect("/");
  }

  return await db
    .select()
    .from(listings)
    .where(eq(listings.employerId, session.user.id));
}

export type GetEmployerListingsType = Awaited<
  ReturnType<typeof getEmployerListings>
>;
