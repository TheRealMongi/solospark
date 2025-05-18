import Head from 'next/head';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>SoloSpark - Social Media Management for Solopreneurs</title>
        <meta
          name="description"
          content="Post smarter, not harder. Schedule posts, track performance, and save time with practical AI tools"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-background border-b border-neutral/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-heading font-bold text-primary">SoloSpark</h1>
          </div>
          <div>
            <SignedIn>
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-sm font-body font-medium text-neutral hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex items-center space-x-4">
                <SignInButton mode="modal">
                  <Button variant="secondary" size="sm">
                    Log In
                  </Button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral">
            <span className="text-primary">Post smarter</span>, not harder
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl font-body text-neutral">
            Made for the chaos gremlins who run their brand at midnight
          </p>
          <div className="mt-8">
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="primary" size="lg">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SignInButton mode="modal">
                  <Button variant="primary" size="lg">
                    Get Started
                  </Button>
                </SignInButton>
                <Link href="#features">
                  <Button variant="ghost" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </SignedOut>
          </div>

          {/* Feature cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card shadow="md" className="p-6">
              <div className="text-primary text-4xl mb-4">📅</div>
              <h3 className="text-xl font-heading font-medium mb-2">Post Once, Tweak Everywhere</h3>
              <p className="text-neutral">
                Create one post and customize it for multiple platforms in seconds.
              </p>
            </Card>

            <Card shadow="md" className="p-6">
              <div className="text-primary text-4xl mb-4">✨</div>
              <h3 className="text-xl font-heading font-medium mb-2">AI-Powered Captions</h3>
              <p className="text-neutral">
                Get caption suggestions that match your brand voice and boost engagement.
              </p>
            </Card>

            <Card shadow="md" className="p-6">
              <div className="text-primary text-4xl mb-4">📊</div>
              <h3 className="text-xl font-heading font-medium mb-2">Simple Analytics</h3>
              <p className="text-neutral">
                See what works with clear, actionable insights on your post performance.
              </p>
            </Card>
          </div>
        </motion.div>
      </main>

      <footer className="bg-background border-t border-neutral/10">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-neutral/70 text-sm font-body">
            &copy; {new Date().getFullYear()} SoloSpark. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
