"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex rounded items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer text-sm font-semibold disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring focus-visible:ring-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background text-primary-foreground hover:bg-primary-hover",
        secondary:
          "bg-muted border border-black/3 dark:border-white/5 hover:bg-muted-hover",
        ghost: "hover:bg-muted-hover",
        danger:
          "bg-danger text-danger-foreground hover:bg-danger/80 focus-visible:ring-danger/20 dark:focus-visible:ring-danger/40",
      },
      size: {
        default: "px-4 py-1.5 has-[>svg]:px-3",
        sm: "px-3 py-1 gap-1.5 has-[>svg]:px-2.5",
        lg: "px-5 py-1.75 has-[>svg]:px-4 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
