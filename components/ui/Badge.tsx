import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isAI?: boolean;
}

/**
 * Badge component based on the Design System Brief
 * - Various color variants
 * - Special AI badge option
 * - Subtle animation
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', isAI = false, children, ...props }, ref) => {
    const variantClasses = {
      primary: 'bg-primary text-white',
      secondary: 'bg-secondary text-white',
      accent: 'bg-accent text-white',
      outline: 'bg-transparent border border-neutral text-neutral',
    };

    const sizeClasses = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-2.5 py-0.5',
      lg: 'text-sm px-3 py-1',
    };

    // Special AI badge with sparkle emoji
    const content = isAI ? (
      <span className="flex items-center">
        <span className="mr-1">✨</span>
        <span>AI-generated</span>
      </span>
    ) : (
      children
    );

    return (
      <motion.span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {content}
      </motion.span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
