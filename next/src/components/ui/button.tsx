import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors transition-shadow duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        /** Primary button */
        default:
          "relative overflow-hidden shadow-sm hover:shadow-md active:shadow-sm bg-[image:var(--gradient-primary-action)] bg-no-repeat text-[color:var(--gold-champagne)] hover:brightness-110 active:brightness-95 before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-[color:var(--btn-sheen)] before:to-transparent before:-skew-x-12 before:translate-x-[-200%] before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[200%] hover:before:via-[color:var(--btn-sheen-hover)] disabled:bg-[color:var(--btn-primary-disabled-bg)] disabled:[background-image:none] disabled:text-[color:var(--btn-primary-disabled-fg)] disabled:opacity-100",

        /** Theme button (#0664a2) */
        theme:
          "relative overflow-hidden shadow-sm hover:shadow-md active:shadow-sm bg-[image:var(--gradient-primary-action)] bg-no-repeat text-[color:var(--gold-champagne)] hover:brightness-110 active:brightness-95 before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-[color:var(--btn-sheen)] before:to-transparent before:-skew-x-12 before:translate-x-[-200%] before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[200%] hover:before:via-[color:var(--btn-sheen-hover)] disabled:bg-[color:var(--btn-theme-disabled-bg)] disabled:[background-image:none] disabled:text-[color:var(--btn-theme-disabled-fg)] disabled:opacity-100",

        destructive:
          "shadow-sm hover:shadow-md active:shadow-sm bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",

        /** Secondary button */
        secondary:
          "shadow-sm hover:shadow-md active:shadow-sm bg-[color:var(--btn-secondary-bg)] text-[color:var(--btn-secondary-fg)] hover:bg-[color:var(--btn-secondary-hover)] active:bg-[color:var(--btn-secondary-active)]",

        /** Accent / CTA button */
        accent:
          "shadow-sm hover:shadow-md active:shadow-sm bg-[color:var(--btn-accent-bg)] text-[color:var(--btn-accent-fg)] hover:bg-[color:var(--btn-accent-hover)] active:bg-[color:var(--btn-accent-active)]",
        cta:
          "shadow-sm hover:shadow-md active:shadow-sm bg-[color:var(--btn-accent-bg)] text-[color:var(--btn-accent-fg)] hover:bg-[color:var(--btn-accent-hover)] active:bg-[color:var(--btn-accent-active)]",

        /** Ghost button */
        ghost:
          "shadow-none bg-transparent border border-[color:var(--btn-ghost-border)] text-[color:var(--btn-ghost-fg)] hover:bg-[color:var(--btn-ghost-hover-bg)] active:bg-[color:var(--btn-ghost-active-bg)] active:text-[color:var(--btn-ghost-active-fg)]",

        link: "shadow-none text-[color:var(--btn-ghost-fg)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-lg",
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
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
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
