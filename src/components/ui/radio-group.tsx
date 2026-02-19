"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { CircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "text-primary bg-input border-input-border aria-checked:border-primary aspect-square size-4 shrink-0 rounded-full border transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:ring-ring focus-visible:border-ring focus-visible:ring-2",
        "aria-invalid:ring-danger/70! aria-invalid:border-danger/70!",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex h-full items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };
