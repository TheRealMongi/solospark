import React from 'react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Head from 'next/head';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DashboardLayout({ children, title = 'Dashboard' }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{title} | SoloSpark</title>
        <meta name="description" content="SoloSpark Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              SoloSpark
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600">
              Dashboard
            </Link>
            <Link href="/dashboard/schedule" className="text-gray-700 hover:text-indigo-600">
              Schedule
            </Link>
            <Link href="/dashboard/analytics" className="text-gray-700 hover:text-indigo-600">
              Analytics
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SoloSpark. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
