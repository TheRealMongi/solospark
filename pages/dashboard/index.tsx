import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Post } from '@prisma/client';
import PostEditor from '@/components/post/PostEditor';
import CalendarView from '@/components/calendar/CalendarView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, PenSquare, Sparkles, ChevronRight, BarChart2, Clock, Instagram, Twitter, Linkedin, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { toast } from '@/components/ui/Toast';
import Link from 'next/link';

const Dashboard: React.FC = () => {
  const { user, isLoaded } = useUser();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  // Handle edit post from calendar
  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    // Switch to the post editor tab
    document.getElementById('post-tab')?.click();
  };
  
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <motion.div 
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    );
  }
  
  // Mock data for dashboard stats
  const mockStats = {
    scheduledPosts: 12,
    publishedPosts: 24,
    engagementRate: '3.2%',
    bestPlatform: 'Instagram',
    bestTime: 'Tuesdays at 7:30 PM',
    recentGrowth: '+5.8%'
  };
  
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <motion.div 
          className="text-center p-8 bg-background rounded-md shadow-card-md max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-heading-2 font-heading font-semibold text-neutral mb-4">Please sign in</h2>
          <p className="text-neutral/70 mb-6 font-body">You need to be signed in to access the dashboard and start sparking chaos!</p>
          <Button variant="primary" size="lg" onClick={() => window.location.href = "/"}>
            Go to Sign In
          </Button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <DashboardLayout title="Dashboard">
      <motion.div
        className="space-y-6 px-4 md:px-6 pb-12 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.header 
          className="mb-8 mt-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-heading-2 font-heading font-bold text-neutral">
                Welcome, <span className="text-primary">{user.firstName || 'Solopreneur'}</span>!
              </h1>
              <p className="text-neutral/80 font-body mt-2">
                Manage your social media posts across platforms with ease.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="primary" 
                className="flex items-center"
                onClick={() => document.getElementById('post-tab')?.click()}
              >
                <PenSquare className="w-4 h-4 mr-2" />
                Create Post
              </Button>
              <Button 
                variant="secondary" 
                className="flex items-center"
                onClick={() => window.location.href = '/dashboard/analytics'}
              >
                <BarChart2 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
          
          <motion.div 
            className="mt-4 p-3 bg-accent/10 rounded-md border border-accent/20 flex items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Sparkles className="text-accent w-5 h-5 mr-2 flex-shrink-0" />
            <p className="text-sm text-neutral font-body">
              <span className="font-medium">Pro Tip:</span> Posts on {mockStats.bestPlatform} at {mockStats.bestTime} get 2x more engagement!
            </p>
          </motion.div>
        </motion.header>
        
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card shadow="sm" className="p-4 bg-background hover:shadow-md transition-shadow border border-neutral/10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <Calendar className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-2xl font-heading font-medium text-neutral">{mockStats.scheduledPosts}</h3>
                <p className="text-neutral/70 font-body text-sm">Scheduled Posts</p>
              </div>
            </Card>
            
            <Card shadow="sm" className="p-4 bg-background hover:shadow-md transition-shadow border border-neutral/10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-secondary/10 p-3 rounded-full mb-3">
                  <PenSquare className="text-secondary h-6 w-6" />
                </div>
                <h3 className="text-2xl font-heading font-medium text-neutral">{mockStats.publishedPosts}</h3>
                <p className="text-neutral/70 font-body text-sm">Published Posts</p>
              </div>
            </Card>
            
            <Card shadow="sm" className="p-4 bg-background hover:shadow-md transition-shadow border border-neutral/10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-accent/10 p-3 rounded-full mb-3">
                  <Sparkles className="text-accent h-6 w-6" />
                </div>
                <h3 className="text-2xl font-heading font-medium text-neutral">{mockStats.engagementRate}</h3>
                <p className="text-neutral/70 font-body text-sm">Engagement Rate</p>
              </div>
            </Card>
            
            <Card shadow="sm" className="p-4 bg-background hover:shadow-md transition-shadow border border-neutral/10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <TrendingUp className="text-green-600 h-6 w-6" />
                </div>
                <h3 className="text-2xl font-heading font-medium text-green-600">{mockStats.recentGrowth}</h3>
                <p className="text-neutral/70 font-body text-sm">Recent Growth</p>
              </div>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card shadow="sm" className="p-5 border border-primary/20 bg-primary/5 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-full mr-4 flex-shrink-0">
                  <Award className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-medium text-neutral mb-2">Best Performing Platform</h3>
                  <div className="flex items-center mb-3">
                    <Instagram className="h-5 w-5 text-neutral mr-2" />
                    <p className="text-lg font-medium text-neutral">{mockStats.bestPlatform}</p>
                  </div>
                  <p className="text-neutral/80 font-body mb-3 text-sm">Your Instagram posts receive 2.5x more engagement than other platforms. Consider focusing your content strategy here.</p>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="text-sm"
                    onClick={() => {
                      document.getElementById('post-tab')?.click();
                      toast({
                        title: "Instagram selected",
                        description: "Create your high-performing Instagram post now!",
                        variant: "success"
                      });
                    }}
                  >
                    Create Instagram Post
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card shadow="sm" className="p-5 border border-secondary/20 bg-secondary/5 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="bg-secondary/20 p-2 rounded-full mr-4 flex-shrink-0">
                  <Clock className="text-secondary h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-medium text-neutral mb-2">Optimal Posting Time</h3>
                  <p className="text-lg font-medium text-neutral mb-3">{mockStats.bestTime}</p>
                  <p className="text-neutral/80 font-body mb-3 text-sm">Posts published during this time window receive 40% more engagement. Schedule your next post for maximum impact.</p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-sm"
                    onClick={() => {
                      // Set to next Tuesday at 7:30 PM
                      const today = new Date();
                      const daysUntilTuesday = (9 - today.getDay()) % 7;
                      const nextTuesday = new Date();
                      nextTuesday.setDate(today.getDate() + daysUntilTuesday);
                      nextTuesday.setHours(19, 30, 0, 0);
                      
                      document.getElementById('post-tab')?.click();
                      toast({
                        title: "Optimal time selected",
                        description: "Your post will be scheduled for Tuesday at 7:30 PM",
                        variant: "success"
                      });
                    }}
                  >
                    Schedule for Optimal Time
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card shadow="md" className="p-6 overflow-hidden border border-neutral/10">
            <Tabs defaultValue="calendar" className="w-full">
              <div className="border-b border-neutral/10 mb-6">
                <TabsList className="mb-0 bg-transparent">
                  <TabsTrigger 
                    value="calendar" 
                    id="calendar-tab" 
                    className="flex items-center data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Calendar View
                  </TabsTrigger>
                  <TabsTrigger 
                    value="post" 
                    id="post-tab" 
                    className="flex items-center data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    <PenSquare className="w-5 h-5 mr-2" />
                    Create Post
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="calendar" className="space-y-6 pt-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-heading font-medium text-neutral">Your Content Calendar</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sm text-primary"
                    onClick={() => document.getElementById('post-tab')?.click()}
                  >
                    <PenSquare className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </div>
                <CalendarView onEditPost={handleEditPost} />
              </TabsContent>
              
              <TabsContent value="post" className="space-y-6 pt-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-heading font-medium text-neutral">Create New Post</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-sm"
                      onClick={() => {
                        toast({
                          title: "AI suggestions enabled",
                          description: "We'll help you craft the perfect post!",
                          variant: "info"
                        });
                      }}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI Assist
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-sm"
                      onClick={() => document.getElementById('calendar-tab')?.click()}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      View Calendar
                    </Button>
                  </div>
                </div>
                <PostEditor />
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
        
        <motion.div 
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/dashboard/analytics" className="block col-span-1">
            <Card 
              shadow="sm" 
              className="h-full p-5 border border-secondary/20 bg-secondary/5 hover:bg-secondary/10 transition-colors cursor-pointer"
            >
              <div className="flex flex-col h-full">
                <div className="bg-secondary/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart2 className="text-secondary h-5 w-5" />
                </div>
                <h3 className="font-heading font-medium text-neutral mb-2">Analytics Dashboard</h3>
                <p className="text-neutral/70 font-body text-sm mb-4">Discover insights and optimize your social media strategy</p>
                <div className="mt-auto flex items-center text-secondary font-medium text-sm">
                  <span>View analytics</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Card>
          </Link>
          
          <Link href="/dashboard/schedule" className="block col-span-1">
            <Card 
              shadow="sm" 
              className="h-full p-5 border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
            >
              <div className="flex flex-col h-full">
                <div className="bg-primary/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="text-primary h-5 w-5" />
                </div>
                <h3 className="font-heading font-medium text-neutral mb-2">Schedule Posts</h3>
                <p className="text-neutral/70 font-body text-sm mb-4">Plan and schedule your content across multiple platforms</p>
                <div className="mt-auto flex items-center text-primary font-medium text-sm">
                  <span>Schedule content</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Card>
          </Link>
          
          <div className="col-span-1">
            <Card 
              shadow="sm" 
              className="h-full p-5 border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer"
              onClick={() => {
                toast({
                  title: "Coming Soon!",
                  description: "Content recycling will be available in the next update.",
                  variant: "info"
                });
              }}
            >
              <div className="flex flex-col h-full">
                <div className="bg-accent/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Sparkles className="text-accent h-5 w-5" />
                </div>
                <h3 className="font-heading font-medium text-neutral mb-2">Recycle Top Content</h3>
                <p className="text-neutral/70 font-body text-sm mb-4">Automatically reuse and refresh your best-performing posts</p>
                <div className="mt-auto flex items-center text-accent font-medium text-sm">
                  <span>Coming soon</span>
                  <Badge variant="accent" size="sm" className="ml-2">Pro</Badge>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
