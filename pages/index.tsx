import Head from 'next/head';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Calendar, BarChart2, Sparkles, ArrowRight, Instagram, Twitter, Linkedin } from 'lucide-react';

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

      <header className="bg-background border-b border-neutral/10 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-heading font-bold text-primary">SoloSpark</h1>
            <Badge variant="accent" size="sm" className="ml-2 hidden md:flex">Beta</Badge>
          </motion.div>
          <div>
            <SignedIn>
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href="/dashboard"
                  className="text-sm font-body font-medium text-neutral hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/schedule"
                  className="text-sm font-body font-medium text-neutral hover:text-primary transition-colors"
                >
                  Schedule
                </Link>
                <Link
                  href="/dashboard/analytics"
                  className="text-sm font-body font-medium text-neutral hover:text-primary transition-colors"
                >
                  Analytics
                </Link>
                <UserButton />
              </motion.div>
            </SignedIn>
            <SignedOut>
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button variant="primary" size="sm">
                    Sign Up Free
                  </Button>
                </SignInButton>
              </motion.div>
            </SignedOut>
          </div>
        </div>
      </header>

      <main className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
          <motion.div
            className="text-left lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span>Introducing SoloSpark</span>
              <Badge variant="primary" size="sm" className="ml-2">New</Badge>
            </motion.div>
            
            <motion.h1 
              className="text-heading-mobile-1 md:text-heading-1 font-heading font-bold text-neutral leading-tight"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-primary">Post smarter</span>, not harder
            </motion.h1>
            
            <motion.p 
              className="mt-5 text-lg md:text-xl font-body text-neutral/80 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Schedule posts, track performance, and save time with practical AI tools — made for the chaos gremlins who run their brand at midnight.
            </motion.p>
            
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <SignedIn>
                <Link href="/dashboard">
                  <Button variant="primary" size="lg" className="flex items-center">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="primary" size="lg" className="flex items-center">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </SignInButton>
                <Link href="#features">
                  <Button variant="ghost" size="lg">
                    See How It Works
                  </Button>
                </Link>
              </SignedOut>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-medium">X</div>
                <div className="w-8 h-8 rounded-full bg-[#E1306C]/20 flex items-center justify-center text-[#E1306C] text-xs font-medium">IG</div>
                <div className="w-8 h-8 rounded-full bg-[#0077B5]/20 flex items-center justify-center text-[#0077B5] text-xs font-medium">LI</div>
              </div>
              <p className="text-sm text-neutral/70">Supports Twitter, Instagram, and LinkedIn</p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-background rounded-lg border border-neutral/10 shadow-card-lg overflow-hidden">
              <div className="bg-primary/5 border-b border-neutral/10 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-2" />
                  <span className="font-medium">Content Calendar</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-neutral/70">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }).map((_, i) => {
                    const hasPost = [2, 8, 15, 21, 27].includes(i);
                    const isToday = i === 16;
                    return (
                      <div 
                        key={i} 
                        className={`h-12 rounded-md flex items-center justify-center text-sm ${isToday ? 'bg-primary/20 text-primary font-medium' : hasPost ? 'bg-secondary/10 text-secondary' : 'border border-neutral/10'}`}
                      >
                        {i + 1}
                        {hasPost && <div className="w-1.5 h-1.5 bg-secondary rounded-full absolute bottom-1"></div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card shadow="md" className="h-full p-6 border-t-4 border-t-primary hover:shadow-card-lg transition-shadow duration-300">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-heading-3 font-heading font-medium mb-2">Post Once, Tweak Everywhere</h3>
              <p className="text-neutral/80 font-body">
                Create one post and customize it for multiple platforms in seconds. Save hours every week on content creation.
              </p>
              <div className="mt-4 pt-4 border-t border-neutral/10">
                <Link href="#features" className="text-primary font-medium text-sm flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card shadow="md" className="h-full p-6 border-t-4 border-t-secondary hover:shadow-card-lg transition-shadow duration-300">
              <div className="bg-secondary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart2 className="text-secondary h-6 w-6" />
              </div>
              <h3 className="text-heading-3 font-heading font-medium mb-2">Simple Analytics</h3>
              <p className="text-neutral/80 font-body">
                See what works with clear, actionable insights on your post performance. No data science degree required.
              </p>
              <div className="mt-4 pt-4 border-t border-neutral/10">
                <Link href="#features" className="text-secondary font-medium text-sm flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card shadow="md" className="h-full p-6 border-t-4 border-t-accent hover:shadow-card-lg transition-shadow duration-300">
              <div className="bg-accent/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Sparkles className="text-accent h-6 w-6" />
              </div>
              <h3 className="text-heading-3 font-heading font-medium mb-2">AI-Powered Captions</h3>
              <p className="text-neutral/80 font-body">
                Generate engaging captions and find optimal posting times with AI. Writer's block is a thing of the past.
              </p>
              <div className="mt-4 pt-4 border-t border-neutral/10">
                <Link href="#features" className="text-accent font-medium text-sm flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
        
        {/* Testimonials/Social Proof */}
        <div className="mt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4">Trusted by solopreneurs</Badge>
            <h2 className="text-heading-2 font-heading font-bold text-neutral mb-12">Post smarter, grow faster</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card shadow="sm" className="p-6 text-left border border-neutral/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <span className="text-primary font-medium">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral">Jane Doe</h4>
                    <p className="text-sm text-neutral/70">Freelance Designer</p>
                  </div>
                </div>
                <p className="text-neutral/80 italic">"SoloSpark saved me hours every week. I can now schedule a week's worth of content in 20 minutes!"</p>
              </Card>
              
              <Card shadow="sm" className="p-6 text-left border border-neutral/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                    <span className="text-secondary font-medium">JS</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral">John Smith</h4>
                    <p className="text-sm text-neutral/70">Content Creator</p>
                  </div>
                </div>
                <p className="text-neutral/80 italic">"The AI caption suggestions are game-changing. I'm posting more consistently and seeing real growth."</p>
              </Card>
              
              <Card shadow="sm" className="p-6 text-left border border-neutral/10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                    <span className="text-accent font-medium">AJ</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral">Alex Johnson</h4>
                    <p className="text-sm text-neutral/70">Indie Developer</p>
                  </div>
                </div>
                <p className="text-neutral/80 italic">"Finally, analytics I can actually understand! SoloSpark tells me exactly what's working and what's not."</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="bg-background border-t border-neutral/10 mt-24">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-heading font-bold text-primary mb-4">SoloSpark</h3>
              <p className="text-neutral/70 text-sm font-body mb-4">Post smarter, not harder. The social media tool built for solopreneurs.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral/60 hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-neutral/60 hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-neutral/60 hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-neutral mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral/70 hover:text-primary transition-colors text-sm">Features</a></li>
                <li><a href="#" className="text-neutral/70 hover:text-primary transition-colors text-sm">Pricing</a></li>
                <li><a href="#" className="text-neutral/70 hover:text-primary transition-colors text-sm">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-neutral mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral/70 hover:text-primary transition-colors text-sm">Blog</a></li>
                <li><a href="#" className="text-neutral/70 hover:text-primary transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-neutral/70 hover:text-primary transition-colors text-sm">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-neutral mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral/70 hover:text-primary transition-colors text-sm">Privacy</a></li>
                <li><a href="#" className="text-neutral/70 hover:text-primary transition-colors text-sm">Terms</a></li>
                <li><a href="#" className="text-neutral/70 hover:text-primary transition-colors text-sm">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-neutral/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral/70 text-sm font-body mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} SoloSpark. All rights reserved.
            </p>
            <div className="flex items-center">
              <Badge variant="primary" size="sm" className="mr-2">Beta</Badge>
              <span className="text-sm text-neutral/70">v1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
