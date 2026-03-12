import { getServerAuthSession } from "@/server/auth";
import { getListingById } from "@/server/queries/listings";
import { ListingActions } from "../../_components/listing-actions";
import { formatDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import ListingDetailsGrid from "../../_components/listing-details-grid";

export default async function EmployerListingPage({
  params,
}: PageProps<"/dashboard/listing/[id]">) {
  const session = await getServerAuthSession();
  if (!session || session.user.role !== "EMPLOYER") {
    throw redirect("/");
  }

  const { id } = await params;

  const listing = await getListingById(id);
  if (!listing || listing.employerId !== session.user.id) {
    throw redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="bg-card flex flex-col justify-between gap-4 rounded border p-6 shadow/5 md:flex-row md:items-center dark:shadow-md/45">
        <div>
          <h1 className="text-lg font-semibold">{listing.title}</h1>
          <span className="text-muted-foreground text-sm">
            Created {formatDate(listing.createdAt)}
          </span>
        </div>

        {/* Actions */}
        <ListingActions listingId={listing.id} listingStatus={listing.status} />
      </section>

      {/* Job Details */}
      <section className="bg-card rounded border p-6 shadow/5 dark:shadow-md/45">
        <h2 className="mb-4 font-semibold">Job Details</h2>

        <ListingDetailsGrid listing={listing} />
      </section>

      {/* Applications */}
      <section className="bg-card space-y-4 rounded border p-6 shadow/5 dark:shadow-md/45">
        <h2 className="font-semibold">Applications</h2>

        <div className="flex gap-4 md:gap-10">
          <div>
            <p className="text-muted-foreground text-sm">Total applications</p>
            <p className="text-2xl font-semibold">—</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">
              Pending applications
            </p>
            <p className="text-2xl font-semibold">—</p>
          </div>
        </div>

        <Button size="sm" variant="secondary">
          View applications
        </Button>
      </section>
    </div>
  );
}
