import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Button variants based on the Design System Brief
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        // Primary: Amber Gold (#F59E0B)
        primary: 'bg-primary text-white hover:bg-primary/90 hover:scale-105',
        // Secondary: Sky Blue (#0EA5E9)
        secondary: 'bg-secondary text-white hover:bg-secondary/80 hover:scale-105',
        // Accent: Indigo (#6366F1)
        accent: 'bg-accent text-white hover:bg-accent/80 hover:scale-105',
        // Ghost: Transparent with border
        ghost:
          'bg-transparent border border-neutral text-neutral hover:bg-accent/10 hover:scale-105',
        // Destructive: For delete/cancel actions
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        // Link style
        link: 'underline-offset-4 hover:underline text-primary p-0 h-auto',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
