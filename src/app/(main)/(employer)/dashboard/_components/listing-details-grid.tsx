import { formatDate, formatSalary } from "@/lib/utils";
import type { GetListingType } from "@/server/queries/listings";

interface Props {
  listing: GetListingType;
}

export default function ListingDetailsGrid({ listing }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div>
        <p className="text-muted-foreground text-xs tracking-wide uppercase">
          Location
        </p>
        <p className="text-sm font-medium">{listing.city}</p>
      </div>

      <div>
        <p className="text-muted-foreground text-xs tracking-wide uppercase">
          Remote
        </p>
        <p className="text-sm font-medium">{listing.remote}</p>
      </div>

      <div>
        <p className="text-muted-foreground text-xs tracking-wide uppercase">
          Experience
        </p>
        <p className="text-sm font-medium">
          {listing.experienceLevel ?? "Not specified"}
        </p>
      </div>

      <div>
        <p className="text-muted-foreground text-xs tracking-wide uppercase">
          Salary
        </p>
        <p className="text-sm font-medium">
          {formatSalary(listing.salaryMin, listing.salaryMax, listing.currency)}
        </p>
      </div>

      <div>
        <p className="text-muted-foreground text-xs tracking-wide uppercase">
          Expires
        </p>
        <p className="text-sm font-medium">{formatDate(listing.expiresAt)}</p>
      </div>

      <div>
        <p className="text-muted-foreground text-xs tracking-wide uppercase">
          Last updated
        </p>
        <p className="text-sm font-medium">{formatDate(listing.updatedAt)}</p>
      </div>
    </div>
  );
}
