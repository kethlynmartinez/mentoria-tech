import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva("rounded-card border p-6 transition-all duration-200", {
  variants: {
    variant: {
      default: "border-card-border bg-card text-card-foreground shadow-card hover:-translate-y-0.5 hover:shadow-card-hover",
      highlight: "border-card-border bg-highlight text-ink shadow-card hover:-translate-y-0.5 hover:shadow-card-hover",
      gradient: "border-card-dark bg-hero-gradient text-primary-foreground shadow-card hover:-translate-y-0.5 hover:shadow-card-hover",
      dark: "border-card-dark bg-dark-surface text-primary-foreground shadow-inner-glow",
      glass: "border-card-dark bg-glass text-primary-foreground backdrop-blur-xl",
    },
    spacing: { default: "p-6", large: "p-8", none: "p-0" },
  },
  defaultVariants: { variant: "default", spacing: "default" },
});

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, spacing, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, spacing }), className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
