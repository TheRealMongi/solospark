import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

/**
 * Modal component based on the Design System Brief
 * - Subtle backdrop blur
 * - 300ms fade-in transition
 * - Accessible dialog implementation
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  showCloseButton = true,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                as={motion.div}
                className={cn(
                  'w-full max-w-md transform overflow-hidden rounded-md bg-background p-6 text-left align-middle shadow-xl transition-all',
                  className
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  {title && (
                    <Dialog.Title as="h3" className="text-lg font-heading font-medium text-neutral">
                      {title}
                    </Dialog.Title>
                  )}

                  {showCloseButton && (
                    <button
                      type="button"
                      className="text-neutral hover:text-primary rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
                      onClick={onClose}
                      aria-label="Close modal"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                <div className="mt-2">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
