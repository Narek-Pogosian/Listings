import { listings } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export async function getEmployerListings(employerId: string) {
  await new Promise((res) => setTimeout(res, 200));

  return await db
    .select()
    .from(listings)
    .where(eq(listings.employerId, employerId));
}

export type GetEmployerListingsType = Awaited<
  ReturnType<typeof getEmployerListings>
>;

export async function getListingById(id: string) {
  const rows = await db
    .select()
    .from(listings)
    .where(eq(listings.id, id))
    .limit(1);

  return rows[0] || null;
}

export type GetListingType = Awaited<ReturnType<typeof getListingById>>;
