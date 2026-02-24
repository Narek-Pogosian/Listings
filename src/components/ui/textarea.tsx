import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-input-placeholder border-input-border bg-input flex field-sizing-content min-h-16 w-full min-w-0 rounded border px-3 py-1.5 text-sm transition-[color] outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:ring-ring focus-visible:ring-2",
        "aria-invalid:ring-danger/70 aria-invalid:border-danger/70 aria-invalid:focus-visible:ring-2",
        className,
      )}
      {...props}
    />
  );
}
