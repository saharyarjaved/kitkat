import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-red-600 text-red-100 shadow-xs hover:bg-red-700/90",
        destructive:
          "bg-red-800 text-white shadow-xs hover:bg-red-900/90 focus-visible:ring-red-700/20 dark:focus-visible:ring-red-600/40 dark:bg-red-800/60",
        outline:
          "border bg-red-900/20 shadow-xs hover:bg-red-600 hover:text-red-50 dark:bg-red-800/30 dark:border-red-700 dark:hover:bg-red-600",
        secondary:
          "bg-red-500 text-red-50 shadow-xs hover:bg-red-600/80",
        ghost:
          "hover:bg-red-600 hover:text-red-50 dark:hover:bg-red-600/50",
        link:
          "text-red-400 underline-offset-4 hover:underline",

        primary:
          "backdrop-blur-lg bg-gradient-to-r from-red-600 to-red-800 text-white border-transparent hover:shadow-2xl hover:shadow-red-500/25 hover:transform hover:scale-105",
        glass:
          "backdrop-blur-lg bg-red-900/20 text-red-100 border-red-700/30 hover:bg-red-800/30 hover:transform hover:scale-105",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 px-6 text-base rounded-xl",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
