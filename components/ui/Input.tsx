import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

/**
 * Input component based on the Design System Brief
 * - 8px border radius
 * - Clear validation states
 * - Accessible labels
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, type, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-body text-neutral mb-1">
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-neutral bg-background px-3 py-2 text-sm font-body text-neutral',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary',
            'placeholder:text-neutral/50',
            error && 'border-destructive focus:ring-destructive',
            className
          )}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-xs text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
