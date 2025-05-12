import Head from 'next/head';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>SoloSpark - Social Media Management for Solopreneurs</title>
        <meta name="description" content="Schedule posts, track performance, and save time with practical AI tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">SoloSpark</h1>
          </div>
          <div>
            <SignedIn>
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                  Dashboard
                </Link>
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Social Media Management for Solopreneurs
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Schedule posts, track performance, and save time with practical AI tools
          </p>
          <div className="mt-8">
            <SignedIn>
              <Link href="/dashboard" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Go to Dashboard
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </main>
    </div>
  );
}
