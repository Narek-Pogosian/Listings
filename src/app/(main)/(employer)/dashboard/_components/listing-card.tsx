"use client";

import { REMOTE_CONFIG, STATUS_CONFIG } from "@/config/constants";
import { cn, formatTimeAgo } from "@/lib/utils";
import { type GetEmployerListingsType } from "@/server/queries/listings";
import Link from "next/link";

interface ListingCardProps {
  listing: GetEmployerListingsType[number];
}

export function ListingCard({ listing }: ListingCardProps) {
  const { updatedAt, expiresAt, status, title, remote, city } = listing;

  const isExpiringSoon =
    expiresAt &&
    new Date(expiresAt).getTime() - new Date().getTime() <
      7 * 24 * 60 * 60 * 1000;

  const daysUntilExpiry = expiresAt
    ? Math.ceil(
        (new Date(expiresAt).getTime() - new Date().getTime()) /
          (24 * 60 * 60 * 1000),
      )
    : null;

  const statusData = STATUS_CONFIG[status];
  const timeAgo = updatedAt ? formatTimeAgo(updatedAt) : null;

  return (
    <div className="bg-card flex flex-col space-y-3 rounded border p-5 shadow/5 dark:shadow-md/45">
      {/* Header with title and status */}
      <div className="flex items-start justify-between gap-3">
        <Link href={`/dashboard/listing/${listing.id}`}>
          <h3 className="line-clamp-2 flex-1 font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </Link>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap",
            statusData.className,
          )}
        >
          {statusData.label}
        </span>
      </div>

      {/* Location and Remote type */}
      <div className="text-muted-foreground flex flex-wrap gap-2 text-sm">
        <span>{city}</span>
        <span>|</span>
        <span>{REMOTE_CONFIG[remote]}</span>
      </div>

      <div className="flex items-center justify-between">
        {timeAgo && (
          <span className="text-muted-foreground text-xs">
            Updated {timeAgo}
          </span>
        )}
        {isExpiringSoon && daysUntilExpiry !== null && (
          <p className="mr-2 inline text-xs text-orange-700 dark:text-orange-300">
            Expires in {daysUntilExpiry}{" "}
            {daysUntilExpiry === 1 ? "day" : "days"}
          </p>
        )}
      </div>
    </div>
  );
}
