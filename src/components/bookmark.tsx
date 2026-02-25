"use client";

// import { useOptimistic, useTransition } from "react";
// import { toggleBookmark } from "@/server/actions/bookmark";

// interface Props {
//   initialBookmarked: boolean;
// }

// export function BookmarkButton({ initialBookmarked }: Props) {
//   const [isPending, startTransition] = useTransition();

//   const [optimisticBookmarked, setOptimisticBookmarked] =
//     useOptimistic(initialBookmarked);

//   console.log("mark", optimisticBookmarked);

//   function handleClick() {
//     startTransition(async () => {
//       setOptimisticBookmarked(!optimisticBookmarked);
//       const { success } = await toggleBookmark("ef");
//       if (!success) {
//         setOptimisticBookmarked(initialBookmarked);
//       }
//     });
//   }

//   return (
//     <button onClick={handleClick} disabled={isPending}>
//       {optimisticBookmarked ? "★ Saved" : "☆ Save"}
//     </button>
//   );
// }
