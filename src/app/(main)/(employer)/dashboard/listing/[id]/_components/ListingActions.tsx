"use client";

import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import type { GetListingType } from "@/server/queries/listings";
import {
  updateListingStatusAction,
  deleteListingAction,
} from "@/server/actions/listing";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

interface Props {
  listing: GetListingType;
}

export function ListingActions({ listing }: Props) {
  const router = useRouter();
  const { executeAsync: updateStatus, isPending: isUpdating } = useAction(
    updateListingStatusAction,
    {
      onSuccess: () => {
        router.refresh();
      },
    },
  );

  const { executeAsync: removeListing, isPending: isDeleting } = useAction(
    deleteListingAction,
    {
      onSuccess: () => {
        // after deletion we'll probably be redirected from parent, refresh anyway
        router.refresh();
      },
    },
  );

  const handlePublish = useCallback(() => {
    if (isUpdating) return;
    updateStatus({ listingId: listing.id, status: "PUBLISHED" });
  }, [isUpdating, listing.id, updateStatus]);

  const handleCancel = useCallback(() => {
    if (isUpdating) return;
    updateStatus({ listingId: listing.id, status: "CLOSED" });
  }, [isUpdating, listing.id, updateStatus]);

  const handleDelete = useCallback(() => {
    if (isDeleting) return;
    if (confirm("Are you sure you want to delete this listing?")) {
      removeListing({ listingId: listing.id });
    }
  }, [isDeleting, listing.id, removeListing]);

  return (
    <div className="flex flex-wrap gap-3">
      {listing.status === "DRAFT" && (
        <Button disabled={isUpdating} onClick={handlePublish}>
          Publish
        </Button>
      )}
      {listing.status === "PUBLISHED" && (
        <Button disabled={isUpdating} variant="danger" onClick={handleCancel}>
          Cancel
        </Button>
      )}
      <Button disabled={isDeleting} variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}
