import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Button } from '../ui/Button';
import { ArrowUp, ArrowDown, Clock, Award, RefreshCw } from 'lucide-react';

/**
 * Analytics Dashboard component based on the Design System Brief
 * - Uses Card components with consistent styling
 * - Implements the "Quick Wins" concept
 * - Shows metrics with visual indicators
 */
const AnalyticsDashboard: React.FC = () => {
  // Mock data for the analytics dashboard
  const mockData = {
    topPost: {
      content: 'Just launched our new product! Check it out at solospark.com #launch #product',
      platform: 'instagram',
      engagement: 245,
      percentIncrease: 78,
    },
    bestTime: {
      day: 'Tuesday',
      time: '7:30 PM',
      engagementIncrease: 32,
    },
    metrics: {
      likes: { count: 1245, change: 12 },
      comments: { count: 87, change: 24 },
      shares: { count: 56, change: -8 },
      reach: { count: 3420, change: 15 },
    },
    insights: [
      'Your X posts get 2x more likes than Instagram',
      'Adding questions increases comments by 45%',
      'Posts with images perform 30% better than text-only',
    ],
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-heading font-bold text-neutral mb-6">Analytics Dashboard</h1>

        {/* Quick Wins Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card shadow="md" className="p-6 border-l-4 border-l-primary">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-heading font-medium mb-1">Your Top Performing Post</h3>
                <Badge variant="primary" size="sm" className="mb-2">
                  Instagram
                </Badge>
              </div>
              <div className="flex items-center text-green-600">
                <ArrowUp size={16} className="mr-1" />
                <span className="text-sm font-medium">
                  {mockData.topPost.percentIncrease}% above average
                </span>
              </div>
            </div>
            <p className="text-neutral mb-4">"{mockData.topPost.content}"</p>
            <div className="flex justify-between">
              <span className="text-sm text-neutral/70">
                {mockData.topPost.engagement} engagements
              </span>
              <Button variant="secondary" size="sm">
                <RefreshCw size={14} className="mr-2" />
                Recycle Post
              </Button>
            </div>
          </Card>

          <Card shadow="md" className="p-6 border-l-4 border-l-secondary">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-heading font-medium mb-1">Best Time to Post</h3>
                <Badge variant="secondary" size="sm" className="mb-2">
                  AI Recommendation
                </Badge>
              </div>
              <div className="flex items-center text-neutral">
                <Clock size={16} className="mr-1" />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-heading font-bold text-secondary mr-2">
                {mockData.bestTime.day}, {mockData.bestTime.time}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-neutral/70">
                +{mockData.bestTime.engagementIncrease}% engagement at this time
              </span>
              <Button variant="secondary" size="sm">
                Schedule Now
              </Button>
            </div>
          </Card>
        </div>

        {/* Metrics Overview */}
        <h2 className="text-xl font-heading font-medium mb-4">Metrics Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(mockData.metrics).map(([key, data]) => (
            <Card key={key} shadow="sm" className="p-4">
              <h4 className="text-sm font-body uppercase text-neutral/70 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h4>
              <div className="flex items-baseline">
                <span className="text-2xl font-heading font-bold text-neutral mr-2">
                  {data.count.toLocaleString()}
                </span>
                <div
                  className={`flex items-center text-sm ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {data.change >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  <span className="ml-1">{Math.abs(data.change)}%</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* AI Insights */}
        <h2 className="text-xl font-heading font-medium mb-4">AI Insights</h2>
        <Card shadow="md" className="p-6">
          <div className="flex items-center mb-4">
            <Badge isAI variant="accent" className="mr-2" />
            <h3 className="text-lg font-heading font-medium">What's Working For You</h3>
          </div>
          <ul className="space-y-3">
            {mockData.insights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <Award size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-neutral">{insight}</span>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
