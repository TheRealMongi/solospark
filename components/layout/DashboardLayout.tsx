import React, { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Menu, X, Home, Calendar, BarChart2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

/**
 * Dashboard Layout component based on the Design System Brief
 * - Responsive sidebar (collapsible on mobile)
 * - Top bar with avatar/settings
 * - Proper typography and spacing
 */
export default function DashboardLayout({ children, title = 'Dashboard' }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Head>
        <title>{title} | SoloSpark</title>
        <meta name="description" content="SoloSpark Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-background border-b border-neutral/10 shadow-sm fixed top-0 left-0 right-0 z-30">
        <div className="max-w-layout mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 p-2 rounded-md text-neutral hover:bg-neutral/10 md:hidden"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/" className="text-xl font-heading font-bold text-primary">
              SoloSpark
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {navItems.map(item => (
              <Link 
                key={item.name}
                href={item.href} 
                className="text-neutral hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={cn(
          'fixed left-0 top-16 bottom-0 w-64 bg-background border-r border-neutral/10 p-4 z-20 transform transition-transform',
          'md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        initial={false}
      >
        <div className="pt-2 pb-4 border-b border-neutral/10 mb-4">
          <p className="text-sm text-neutral/70">Welcome back, chaos gremlin!</p>
          <p className="font-medium text-primary">Your last post crushed it.</p>
        </div>
        
        <nav className="space-y-1">
          {navItems.map(item => {
            const isActive = title.toLowerCase().includes(item.name.toLowerCase());
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
      <main className="pt-16 min-h-screen md:pl-64 transition-all duration-300">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="bg-background border-t border-neutral/10 py-6 md:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-neutral/70 text-sm">
            &copy; {new Date().getFullYear()} SoloSpark. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
