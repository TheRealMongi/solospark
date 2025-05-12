import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import Head from 'next/head';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const schedulePost = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'This is a test post scheduled via SoloSpark!',
          platform: 'twitter',
          scheduledTime: new Date(Date.now() + 10000).toISOString(), // 10 seconds from now
        }),
      });
      
      const data = await response.json();
      alert(`Post scheduled! Job ID: ${data.jobId}`);
    } catch (error) {
      console.error('Error scheduling post:', error);
      alert('Failed to schedule post');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Dashboard | SoloSpark</title>
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
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              Welcome, {user.firstName || user.username}!
            </span>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Dashboard</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage your social media posts and schedule new content
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Test the scheduling functionality by creating a dummy post.</p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={schedulePost}
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isLoading ? 'Scheduling...' : 'Schedule Test Post'}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">API Status</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Check if the API is working properly.</p>
                </div>
                <div className="mt-5">
                  <Link href="/api/ping" target="_blank" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Test API Endpoint
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
