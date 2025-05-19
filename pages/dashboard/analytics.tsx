import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { toast } from '@/components/ui/Toast';
import { BarChart2, TrendingUp, Award, Calendar, Instagram, Twitter, Linkedin, ArrowUp, Clock, Share2, Heart, MessageCircle, ChevronRight, Download } from 'lucide-react';
import Link from 'next/link';

// Mock data for analytics
const mockAnalytics = {
  totalPosts: 12,
  scheduledPosts: 5,
  publishedPosts: 7,
  engagementRate: 3.2,
  growthRate: '+8.5%',
  bestTime: 'Tuesdays at 7:30 PM',
  platforms: {
    twitter: { posts: 5, engagement: 3.2, growth: '+2.1%', color: '#1DA1F2' },
    instagram: { posts: 4, engagement: 4.1, growth: '+5.7%', color: '#E1306C' },
    linkedin: { posts: 3, engagement: 1.8, growth: '-0.5%', color: '#0077B5' },
  },
  recentPosts: [
    { 
      id: 1, 
      platform: 'twitter', 
      content: 'Check out our latest product update! We\'ve added some amazing new features you\'ll love. #ProductUpdate #Innovation', 
      publishedAt: '2025-05-10T14:30:00Z', 
      likes: 24, 
      shares: 8,
      comments: 5,
      engagement: 3.7,
      image: null
    },
    { 
      id: 2, 
      platform: 'instagram', 
      content: 'Behind the scenes at our office! Here\'s how we make the magic happen every day. #BehindTheScenes #StartupLife', 
      publishedAt: '2025-05-08T10:15:00Z', 
      likes: 56, 
      shares: 3,
      comments: 12,
      engagement: 5.2,
      image: '/img/office.jpg'
    },
    { 
      id: 3, 
      platform: 'linkedin', 
      content: 'We\'re hiring! Join our team and help us build the future of social media management. We\'re looking for passionate individuals who want to make a difference.', 
      publishedAt: '2025-05-05T09:00:00Z', 
      likes: 18, 
      shares: 12,
      comments: 7,
      engagement: 2.9,
      image: null
    },
  ],
  insights: [
    {
      id: 1,
      title: 'Best Performing Platform',
      description: 'Instagram posts receive 28% more engagement than other platforms',
      action: 'Focus on Instagram content',
      icon: 'instagram',
      color: 'primary'
    },
    {
      id: 2,
      title: 'Optimal Posting Time',
      description: 'Posts published on Tuesdays at 7:30 PM get 40% more engagement',
      action: 'Schedule for Tuesday evenings',
      icon: 'clock',
      color: 'secondary'
    },
    {
      id: 3,
      title: 'Content Strategy',
      description: 'Posts with images receive 2.3x more engagement than text-only',
      action: 'Include images in your posts',
      icon: 'image',
      color: 'accent'
    }
  ]
};

export default function AnalyticsPage() {
  const { isLoaded, isSignedIn } = useUser();
  const [analytics, setAnalytics] = useState(mockAnalytics);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    const timer = setTimeout(() => {
      setAnalytics(mockAnalytics);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded || !isSignedIn) {
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

  return (
    <DashboardLayout title="Analytics">
      <motion.div 
        className="space-y-6 px-4 md:px-6 pb-12 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div 
              className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ) : (
          <>
            {/* Header */}
            <motion.header 
              className="mb-8 mt-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-heading-2 font-heading font-bold text-neutral">Analytics Dashboard</h1>
                  <p className="text-neutral/80 font-body mt-2">
                    See what works best, instantly insights on your post performance.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="secondary" 
                    className="flex items-center"
                    onClick={() => {
                      toast({
                        title: "Report Generated",
                        description: "Your analytics report is ready to download",
                        variant: "success"
                      });
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex items-center"
                    onClick={() => window.location.href = '/dashboard/schedule'}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Post
                  </Button>
                </div>
              </div>
            </motion.header>
            
            {/* Overview Cards */}
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
                    <h3 className="text-2xl font-heading font-medium text-neutral">{analytics.totalPosts}</h3>
                    <p className="text-neutral/70 font-body text-sm">Total Posts</p>
                  </div>
                </Card>
                
                <Card shadow="sm" className="p-4 bg-background hover:shadow-md transition-shadow border border-neutral/10">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-secondary/10 p-3 rounded-full mb-3">
                      <Calendar className="text-secondary h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-heading font-medium text-neutral">{analytics.scheduledPosts}</h3>
                    <p className="text-neutral/70 font-body text-sm">Scheduled</p>
                  </div>
                </Card>
                
                <Card shadow="sm" className="p-4 bg-background hover:shadow-md transition-shadow border border-neutral/10">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-accent/10 p-3 rounded-full mb-3">
                      <BarChart2 className="text-accent h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-heading font-medium text-neutral">{analytics.engagementRate}%</h3>
                    <p className="text-neutral/70 font-body text-sm">Engagement Rate</p>
                  </div>
                </Card>
                
                <Card shadow="sm" className="p-4 bg-background hover:shadow-md transition-shadow border border-neutral/10">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full mb-3">
                      <TrendingUp className="text-green-600 h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-heading font-medium text-green-600">{analytics.growthRate}</h3>
                    <p className="text-neutral/70 font-body text-sm">Growth Rate</p>
                  </div>
                </Card>
              </div>
            </motion.div>
            
            {/* AI Insights */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center mb-4">
                <h2 className="text-heading-3 font-heading font-medium text-neutral">AI Insights</h2>
                <Badge variant="accent" size="sm" className="ml-3" isAI>Powered by AI</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analytics.insights.map(insight => {
                  const IconComponent = {
                    'instagram': Instagram,
                    'clock': Clock,
                    'image': Calendar
                  }[insight.icon] || Award;
                  
                  const colorClasses = {
                    'primary': 'border-primary/20 bg-primary/5',
                    'secondary': 'border-secondary/20 bg-secondary/5',
                    'accent': 'border-accent/20 bg-accent/5'
                  }[insight.color] || 'border-primary/20 bg-primary/5';
                  
                  const iconColorClasses = {
                    'primary': 'text-primary bg-primary/20',
                    'secondary': 'text-secondary bg-secondary/20',
                    'accent': 'text-accent bg-accent/20'
                  }[insight.color] || 'text-primary bg-primary/20';
                  
                  return (
                    <Card 
                      key={insight.id}
                      shadow="sm" 
                      className={`p-5 border ${colorClasses} hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-full mr-4 flex-shrink-0 ${iconColorClasses}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-heading font-medium text-neutral mb-2">{insight.title}</h3>
                          <p className="text-neutral/80 font-body mb-3 text-sm">{insight.description}</p>
                          <Button 
                            variant={insight.color as 'primary' | 'secondary' | 'accent'} 
                            size="sm" 
                            className="text-sm"
                            onClick={() => {
                              toast({
                                title: "Action Applied",
                                description: `We'll help you ${insight.action.toLowerCase()}`,
                                variant: "success"
                              });
                            }}
                          >
                            {insight.action}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
            
            {/* Platform Performance */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card shadow="md" className="overflow-hidden border border-neutral/10">
                <div className="p-6">
                  <h2 className="text-heading-3 font-heading font-medium text-neutral mb-4">Platform Performance</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral/10">
                          <th className="text-left py-3 px-4 font-medium text-neutral">Platform</th>
                          <th className="text-left py-3 px-4 font-medium text-neutral">Posts</th>
                          <th className="text-left py-3 px-4 font-medium text-neutral">Engagement</th>
                          <th className="text-left py-3 px-4 font-medium text-neutral">Growth</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-neutral/10">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: analytics.platforms.twitter.color + '20' }}>
                                <Twitter className="h-4 w-4" style={{ color: analytics.platforms.twitter.color }} />
                              </div>
                              <span className="font-medium">Twitter</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{analytics.platforms.twitter.posts}</td>
                          <td className="py-3 px-4">{analytics.platforms.twitter.engagement}%</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <span className="text-green-600">{analytics.platforms.twitter.growth}</span>
                              <ArrowUp className="h-3 w-3 text-green-600 ml-1" />
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-neutral/10">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: analytics.platforms.instagram.color + '20' }}>
                                <Instagram className="h-4 w-4" style={{ color: analytics.platforms.instagram.color }} />
                              </div>
                              <span className="font-medium">Instagram</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{analytics.platforms.instagram.posts}</td>
                          <td className="py-3 px-4">{analytics.platforms.instagram.engagement}%</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <span className="text-green-600">{analytics.platforms.instagram.growth}</span>
                              <ArrowUp className="h-3 w-3 text-green-600 ml-1" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: analytics.platforms.linkedin.color + '20' }}>
                                <Linkedin className="h-4 w-4" style={{ color: analytics.platforms.linkedin.color }} />
                              </div>
                              <span className="font-medium">LinkedIn</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{analytics.platforms.linkedin.posts}</td>
                          <td className="py-3 px-4">{analytics.platforms.linkedin.engagement}%</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <span className="text-red-600">{analytics.platforms.linkedin.growth}</span>
                              <ArrowUp className="h-3 w-3 text-red-600 ml-1 rotate-180" />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            {/* Recent Posts */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card shadow="md" className="overflow-hidden border border-neutral/10">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-heading-3 font-heading font-medium text-neutral">Recent Posts</h2>
                    <Button variant="ghost" size="sm" className="text-sm">
                      View All Posts
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {analytics.recentPosts.map(post => {
                      const platformIcon = {
                        'twitter': <Twitter className="h-4 w-4" />,
                        'instagram': <Instagram className="h-4 w-4" />,
                        'linkedin': <Linkedin className="h-4 w-4" />
                      }[post.platform] || <Twitter className="h-4 w-4" />;
                      
                      const platformColor = {
                        'twitter': '#1DA1F2',
                        'instagram': '#E1306C',
                        'linkedin': '#0077B5'
                      }[post.platform] || '#1DA1F2';
                      
                      const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      });
                      
                      return (
                        <div key={post.id} className="border border-neutral/10 rounded-md p-4 hover:shadow-sm transition-shadow">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: platformColor + '20' }}>
                                {platformIcon}
                              </div>
                              <span className="font-medium capitalize">{post.platform}</span>
                              <Badge variant="outline" size="sm" className="ml-2">
                                Published
                              </Badge>
                            </div>
                            <span className="text-neutral/60 text-sm">{formattedDate}</span>
                          </div>
                          
                          <p className="text-neutral mb-3 line-clamp-2">{post.content}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center text-neutral/70 text-sm">
                                <Heart className="h-4 w-4 mr-1" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center text-neutral/70 text-sm">
                                <Share2 className="h-4 w-4 mr-1" />
                                <span>{post.shares}</span>
                              </div>
                              <div className="flex items-center text-neutral/70 text-sm">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                <span>{post.comments}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <span className="text-sm font-medium mr-1">Engagement:</span>
                              <Badge 
                                variant={post.engagement > 4 ? 'primary' : (post.engagement > 3 ? 'secondary' : 'outline')}
                                size="sm"
                              >
                                {post.engagement}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
