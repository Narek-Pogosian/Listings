import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded bg-black/7 dark:bg-white/7",
        className,
      )}
      {...props}
    />
  );
}
