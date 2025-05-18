import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Menu, X, Home, Calendar, BarChart2, Settings, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Main layout component based on the Design System Brief
 * - Responsive sidebar (collapsible on mobile)
 * - Header with user avatar
 * - Consistent spacing and styling
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-neutral/10 z-30 px-4">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 p-2 rounded-md text-neutral hover:bg-neutral/10 md:hidden"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/dashboard" className="font-heading text-xl text-primary">
              SoloSpark
            </Link>
          </div>

          {user && (
            <div className="flex items-center">
              <button
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-neutral/10"
                aria-label="User menu"
              >
                {user.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 z-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={cn(
          'fixed left-0 top-16 bottom-0 w-64 bg-background border-r border-neutral/10 p-4 z-20 transform transition-transform',
          'md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        initial={false}
      >
        <nav className="space-y-1">
          {navItems.map(item => {
            const isActive = router.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive ? 'bg-primary/10 text-primary' : 'text-neutral hover:bg-neutral/10'
                )}
              >
                <Icon size={18} className="mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className={cn('pt-16 min-h-screen transition-all duration-300', 'md:pl-64')}>
        <div className="p-4 md:p-6 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
