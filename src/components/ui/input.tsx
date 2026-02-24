import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-input-placeholder bg-input border-input-border flex w-full min-w-0 rounded border px-3 py-1.5 text-sm transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:ring-ring focus-visible:ring-2",
        "aria-invalid:ring-danger/70 aria-invalid:border-danger/70 aria-invalid:focus-visible:ring-2",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
