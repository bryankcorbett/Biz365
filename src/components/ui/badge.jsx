import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 hover:scale-105 hover:shadow-lg",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 hover:shadow-lg",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80 hover:scale-105 hover:shadow-lg",
        outline: "text-foreground hover:bg-gray-50 hover:scale-105 hover:shadow-md",
        premium:
          "border border-gray-200 bg-gradient-to-r from-white to-gray-50 text-gray-800 shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-3.25px_#0000000d,0px_13.65px_13.65px_-2.71px_#00000014,0px_6.87px_6.87px_-2.17px_#00000017,0px_3.62px_3.62px_-1.62px_#00000017,0px_1.81px_1.81px_-1.08px_#00000017,0px_0.71px_0.71px_-0.54px_#0000001a] hover:from-white hover:to-gray-100 hover:scale-105 hover:shadow-[inset_0px_3px_1px_#ffffff,0px_40px_40px_-8px_#00000010,0px_20px_20px_-6px_#00000015] hover:border-gray-300 transition-all duration-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
