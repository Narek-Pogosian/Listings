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
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Toast, type DialogRootActions } from "@base-ui/react";
import { useRef } from "react";

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
  const toastManager = Toast.useToastManager();
  const dialogRef = useRef<DialogRootActions>(null);

  const { executeAsync: updateStatus, isPending: isUpdating } = useAction(
    updateListingStatusAction,
  );

  const handlePublish = async () => {
    if (isUpdating) return;
    try {
      await updateStatus({ listingId, status: "PUBLISHED" });
      toastManager.add({ title: "Listing has been published" });
      router.refresh();
      dialogRef.current?.close();
    } catch {
      toastManager.add({ title: "Failed to publish listing" });
    }
  };

  return (
    <AlertDialog actionsRef={dialogRef}>
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
          <Button onClick={handlePublish} disabled={isUpdating}>
            {isUpdating ? "Publishing..." : "Publish"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function CloseDialog({ listingId }: { listingId: string }) {
  const router = useRouter();
  const toastManager = Toast.useToastManager();
  const dialogRef = useRef<DialogRootActions>(null);

  const { executeAsync: updateStatus, isPending: isUpdating } = useAction(
    updateListingStatusAction,
  );

  const handleClose = async () => {
    if (isUpdating) return;
    try {
      await updateStatus({ listingId, status: "CLOSED" });
      toastManager.add({ title: "Listing has been closed" });
      router.refresh();
      dialogRef.current?.close();
    } catch {
      toastManager.add({ title: "Failed to close listing" });
    }
  };

  return (
    <AlertDialog actionsRef={dialogRef}>
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
          <Button onClick={handleClose} disabled={isUpdating}>
            {isUpdating ? "Closing..." : "Close"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DeleteDialog({ listingId }: { listingId: string }) {
  const router = useRouter();
  const toastManager = Toast.useToastManager();
  const dialogRef = useRef<DialogRootActions>(null);

  const { executeAsync: removeListing, isPending: isDeleting } =
    useAction(deleteListingAction);

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      await removeListing({ listingId });
      toastManager.add({ title: "Listing has been deleted" });
      router.replace("/dashboard");
      dialogRef.current?.close();
    } catch {
      toastManager.add({ title: "Failed to delete listing" });
    }
  };

  return (
    <AlertDialog actionsRef={dialogRef}>
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
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
