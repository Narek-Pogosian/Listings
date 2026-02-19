"use client";

import { useOptimistic, useTransition } from "react";
import { toggleBookmark } from "@/server/actions/bookmark";

export function BookmarkButton({ jobId, initialBookmarked, userId }) {
  const [isPending, startTransition] = useTransition();

  const [optimisticBookmarked, setOptimisticBookmarked] =
    useOptimistic(initialBookmarked);

  function handleClick() {
    setOptimisticBookmarked(!optimisticBookmarked);

    startTransition(async () => {
      try {
        await toggleBookmark(userId, jobId);
      } catch {
        // rollback if error
        setOptimisticBookmarked(initialBookmarked);
      }
    });
  }

  return (
    <button onClick={handleClick} disabled={isPending}>
      {optimisticBookmarked ? "★ Saved" : "☆ Save"}
    </button>
  );
}
