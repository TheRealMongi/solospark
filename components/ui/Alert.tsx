import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  icon?: React.ReactNode;
}

/**
 * Alert component based on the Design System Brief
 * - Variants for different alert types
 * - Animated entrance
 * - Accessible roles
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, icon, children, ...props }, ref) => {
    const variantClasses = {
      success: 'bg-green-100 text-green-800 border-green-200',
      error: 'bg-red-100 text-red-800 border-red-200',
      warning: 'bg-amber-100 text-amber-800 border-amber-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200',
    };

    const variantIcons = {
      success: '🎉',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
    };

    return (
      <motion.div
        ref={ref}
        className={cn('rounded-md border p-4 font-body', variantClasses[variant], className)}
        role="alert"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        <div className="flex items-start">
          {icon || <span className="mr-2 flex-shrink-0">{variantIcons[variant]}</span>}
          <div>
            {title && <h5 className="font-heading font-medium mb-1">{title}</h5>}
            <div className="text-sm">{children}</div>
          </div>
        </div>
      </motion.div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
