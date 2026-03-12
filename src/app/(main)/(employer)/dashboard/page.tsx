import { getServerAuthSession } from "@/server/auth";
import { getEmployerListings } from "@/server/queries/listings";
import { buttonVariants } from "@/components/ui/button";
import { ListingCard, ListingCardSkeleton } from "./_components/listing-card";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

export default async function EmployerDashboardPage() {
  const session = await getServerAuthSession();
  if (!session || session.user.role !== "EMPLOYER") {
    throw redirect("/");
  }

  return (
    <>
      <Link href="/dashboard/new-listing" className={buttonVariants()}>
        Create new job listing
      </Link>

      <Suspense fallback={<ListingsSkeletonShell />}>
        <Listings employerId={session.user.id} />
      </Suspense>
    </>
  );
}

async function Listings({ employerId }: { employerId: string }) {
  const listings = await getEmployerListings(employerId);

  if (listings.length === 0) {
    return (
      <p className="text-muted-foreground pt-10 text-center">
        No listings yet. Create your first job listing to get started!
      </p>
    );
  }

  return (
    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <li key={listing.id}>
          <ListingCard listing={listing} />
        </li>
      ))}
    </ul>
  );
}

function ListingsSkeletonShell() {
  const arr = new Array(12).fill(0);

  return (
    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {arr.map((_, i) => (
        <li key={i}>
          <ListingCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
