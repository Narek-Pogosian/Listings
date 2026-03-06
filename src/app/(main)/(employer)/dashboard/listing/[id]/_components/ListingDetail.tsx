import { formatTimeAgo } from "@/lib/utils";
import { ListingActions } from "./ListingActions";
import { type GetListingType } from "@/server/queries/listings";
import { REMOTE_CONFIG } from "@/config/constants";

interface Props {
  listing: GetListingType;
}

export function ListingDetail({ listing }: Props) {
  const timeAgo = listing.updatedAt ? formatTimeAgo(listing.updatedAt) : null;

  return (
    <div className="space-y-8">
      <section className="bg-card rounded border p-6 shadow/5 dark:shadow-md/45">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{listing.title}</h1>
            <p className="text-muted-foreground text-sm">
              {listing.city} | {REMOTE_CONFIG[listing.remote]}
            </p>
          </div>
          <span className="text-muted-foreground text-xs">
            {listing.status}
          </span>
        </div>

        <div className="mt-4 space-y-4">
          {listing.description && <p>{listing.description}</p>}
          <p>
            <strong>Experience level:</strong> {listing.experienceLevel}
          </p>
          {(listing.salaryMin || listing.salaryMax) && (
            <p>
              <strong>Salary:</strong> {listing.salaryMin ?? ""}
              {listing.salaryMin && listing.salaryMax ? " - " : ""}
              {listing.salaryMax ?? ""} {listing.currency}
            </p>
          )}
          {listing.expiresAt && (
            <p>
              <strong>Expires:</strong>{" "}
              {new Date(listing.expiresAt).toLocaleDateString()}
            </p>
          )}
          {timeAgo && (
            <p className="text-muted-foreground text-xs">Updated {timeAgo}</p>
          )}
        </div>

        <div className="mt-6">
          <ListingActions listing={listing} />
        </div>
      </section>
    </div>
  );
}
