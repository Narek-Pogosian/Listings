"use client";

import { type GetListingType } from "@/server/queries/listings";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@/components/ui/button";
import {
  updateListingStatusAction,
  deleteListingAction,
} from "@/server/actions/listing";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  listingId: GetListingType["id"];
  listingStatus: GetListingType["status"];
}

export function ListingActions({ listingId, listingStatus }: Props) {
  const isDraft = listingStatus === "DRAFT";
  const isPublished = listingStatus === "PUBLISHED";

  return (
    <div className="flex flex-wrap gap-2">
      {isDraft && <PublishDialog listingId={listingId} />}
      {isPublished && <CloseDialog listingId={listingId} />}
      <DeleteDialog listingId={listingId} />
    </div>
  );
}

function PublishDialog({ listingId }: { listingId: string }) {
  const router = useRouter();
  const { executeAsync: updateStatus, isPending: isUpdating } = useAction(
    updateListingStatusAction,
    {
      onSuccess: () => {
        router.refresh();
      },
    },
  );

  const handlePublish = () => {
    if (isUpdating) return;
    updateStatus({ listingId, status: "PUBLISHED" });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="secondary">Publish</Button>}
      ></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish Listing</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to publish this listing? Once published, it
            will be visible to potential candidates and you can start receiving
            applications.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePublish} disabled={isUpdating}>
            {isUpdating ? "Publishing..." : "Publish"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function CloseDialog({ listingId }: { listingId: string }) {
  const router = useRouter();
  const { executeAsync: updateStatus, isPending: isUpdating } = useAction(
    updateListingStatusAction,
    {
      onSuccess: () => {
        router.refresh();
      },
    },
  );

  const handleClose = () => {
    if (isUpdating) return;
    updateStatus({ listingId, status: "CLOSED" });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="secondary">Close listing</Button>}
      ></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Close Listing</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to close this listing? Closing the listing
            will stop accepting new applications, but existing applications will
            remain accessible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClose} disabled={isUpdating}>
            {isUpdating ? "Closing..." : "Close"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DeleteDialog({ listingId }: { listingId: string }) {
  const router = useRouter();
  const { executeAsync: removeListing, isPending: isDeleting } = useAction(
    deleteListingAction,
    {
      onSuccess: () => {
        router.replace("/dashboard");
      },
    },
  );

  const handleDelete = () => {
    if (isDeleting) return;
    removeListing({ listingId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="danger">Delete </Button>}
      ></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Listing</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this listing? This action cannot be
            undone and will permanently remove the listing and all associated
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
