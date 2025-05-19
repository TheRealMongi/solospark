import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  id?: string;
  title: string;
  description?: string;
  variant?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

// Global toast state
type ToastState = ToastProps & { id: string };
let toasts: ToastState[] = [];
let listeners: ((toasts: ToastState[]) => void)[] = [];

// Toast management functions
const addToast = (toast: ToastProps) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast = { ...toast, id };
  toasts = [...toasts, newToast];
  listeners.forEach(listener => listener(toasts));
  
  // Auto-dismiss after duration
  if (toast.duration !== 0) {
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  }
  
  return id;
};

const removeToast = (id: string) => {
  toasts = toasts.filter(t => t.id !== id);
  listeners.forEach(listener => listener(toasts));
};

// Simplified toast function for external use
export const toast = (props: ToastProps) => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    return addToast(props);
  }
  return '';
};

/**
 * Toast component based on the Design System Brief
 * - Various status variants with appropriate colors
 * - Animated entrance/exit
 * - Auto-dismissal with configurable duration
 */
export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  variant = 'info',
  duration = 5000,
  onClose,
  id,
}) => {
  const variantClasses = {
    success: 'bg-green-50 border-green-500 text-green-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    warning: 'bg-amber-50 border-amber-500 text-amber-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800',
  };

  const IconComponent = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }[variant];

  const handleClose = () => {
    if (id) {
      removeToast(id);
    }
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (duration !== 0) {
      const timer = setTimeout(handleClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'rounded-md border-l-4 p-4 shadow-md w-full max-w-sm',
        variantClasses[variant]
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <IconComponent className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-medium text-sm">{title}</h3>
          {description && (
            <p className="font-body text-xs mt-1 opacity-90">{description}</p>
          )}
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-2 text-neutral/70 hover:text-neutral"
          aria-label="Close toast"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

/**
 * ToastContainer component to render all active toasts
 * - Fixed position at the top-right of the screen
 * - Stacks toasts vertically
 */
export const ToastContainer: React.FC = () => {
  const [localToasts, setLocalToasts] = useState<ToastState[]>([]);

  useEffect(() => {
    const handleToastsChange = (newToasts: ToastState[]) => {
      setLocalToasts([...newToasts]);
    };

    listeners.push(handleToastsChange);
    return () => {
      listeners = listeners.filter(listener => listener !== handleToastsChange);
    };
  }, []);

  // Only render in browser
  if (typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      <AnimatePresence>
        {localToasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default { Toast, ToastContainer, toast };
