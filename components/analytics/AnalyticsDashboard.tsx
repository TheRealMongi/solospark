import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Button } from '../ui/Button';
import { ArrowUp, ArrowDown, Clock, Award, RefreshCw, TrendingUp, Zap, Sparkles } from 'lucide-react';

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
        <h1 className="text-heading-2 font-heading font-bold text-neutral mb-2">Analytics Dashboard</h1>
        <p className="text-neutral/70 mb-6">Quick insights to help you post smarter, not harder.</p>

        {/* Quick Wins Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card shadow="md" className="p-6 border-l-4 border-l-primary hover:shadow-card-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-heading-3 font-heading font-medium mb-1">Your Top Performing Post</h3>
                  <Badge variant="primary" size="sm" className="mb-2" isAI={false}>
                    Instagram
                  </Badge>
                </div>
                <motion.div 
                  className="flex items-center text-green-600"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <ArrowUp size={16} className="mr-1" />
                  <span className="text-sm font-medium">
                    {mockData.topPost.percentIncrease}% above average
                  </span>
                </motion.div>
              </div>
              <p className="text-neutral mb-4 font-body">"{mockData.topPost.content}"</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral/70 font-body">
                  {mockData.topPost.engagement} engagements
                </span>
                <Button variant="secondary" size="sm">
                  <RefreshCw size={14} className="mr-2" />
                  Recycle Post
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card shadow="md" className="p-6 border-l-4 border-l-secondary hover:shadow-card-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-heading-3 font-heading font-medium mb-1">Best Time to Post</h3>
                  <Badge variant="secondary" size="sm" className="mb-2" isAI={true}>
                    AI Recommendation
                  </Badge>
                </div>
                <motion.div 
                  className="flex items-center text-secondary"
                  animate={{ rotate: [0, 15, 0, -15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
                >
                  <Clock size={18} />
                </motion.div>
              </div>
              <motion.div 
                className="flex items-center mb-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <span className="text-2xl font-heading font-bold text-secondary mr-2">
                  {mockData.bestTime.day}, {mockData.bestTime.time}
                </span>
              </motion.div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral/70 font-body">
                  +{mockData.bestTime.engagementIncrease}% engagement at this time
                </span>
                <Button variant="secondary" size="sm">
                  <Zap size={14} className="mr-2" />
                  Schedule Now
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Metrics Overview */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-heading-3 font-heading font-medium mb-4 flex items-center">
            <TrendingUp className="mr-2 text-primary" size={20} />
            Metrics Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(mockData.metrics).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
              >
                <Card shadow="sm" className="p-4 hover:shadow-card-md transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-neutral capitalize font-heading">{key}</h4>
                    {value.change > 0 ? (
                      <motion.div 
                        className="flex items-center text-green-600 text-xs font-medium"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                      >
                        <ArrowUp size={12} className="mr-1" />
                        {value.change}%
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="flex items-center text-red-600 text-xs font-medium"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                      >
                        <ArrowDown size={12} className="mr-1" />
                        {Math.abs(value.change)}%
                      </motion.div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-neutral font-heading">{value.count.toLocaleString()}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-heading-3 font-heading font-medium mb-4 flex items-center">
            <Sparkles className="mr-2 text-accent" size={20} />
            AI Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockData.insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
              >
                <Card 
                  shadow="sm" 
                  className="p-4 bg-accent/5 border-l-2 border-l-accent hover:shadow-card-md transition-shadow duration-300"
                >
                  <div className="flex items-start">
                    <Badge variant="accent" size="sm" isAI={true} className="mr-3 flex-shrink-0" />
                    <p className="text-sm font-body text-neutral">{insight}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
