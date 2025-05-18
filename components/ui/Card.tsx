import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card component based on the Design System Brief
 * - 8px border radius
 * - Soft shadow
 * - Off-white background
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, shadow = 'sm', ...props }, ref) => {
    const shadowClasses = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    };

    return (
      <motion.div
        ref={ref}
        className={cn('bg-background rounded-md p-4', shadowClasses[shadow], className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
