import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUser } from '@clerk/nextjs';

// Mock data for analytics
const mockAnalytics = {
  totalPosts: 12,
  scheduledPosts: 5,
  publishedPosts: 7,
  engagementRate: 2.4,
  platforms: {
    twitter: { posts: 5, engagement: 3.2 },
    instagram: { posts: 4, engagement: 4.1 },
    linkedin: { posts: 3, engagement: 1.8 },
  },
  recentPosts: [
    { id: 1, platform: 'twitter', content: 'Check out our latest product update!', publishedAt: '2025-05-10T14:30:00Z', likes: 24, shares: 8 },
    { id: 2, platform: 'instagram', content: 'Behind the scenes at our office', publishedAt: '2025-05-08T10:15:00Z', likes: 56, shares: 3 },
    { id: 3, platform: 'linkedin', content: 'We\'re hiring! Join our team.', publishedAt: '2025-05-05T09:00:00Z', likes: 18, shares: 12 },
  ],
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
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout title="Analytics">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading analytics...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Posts</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{analytics.totalPosts}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Scheduled Posts</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{analytics.scheduledPosts}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Published Posts</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{analytics.publishedPosts}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Avg. Engagement Rate</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{analytics.engagementRate}%</dd>
              </div>
            </div>
          </div>

          {/* Platform Performance */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Platform Performance</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Engagement metrics by platform</p>
            </div>
            <div className="border-t border-gray-200">
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Platform</dt>
                <dt className="text-sm font-medium text-gray-500">Posts</dt>
                <dt className="text-sm font-medium text-gray-500">Engagement Rate</dt>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dd className="text-sm text-gray-900 sm:mt-0">X (Twitter)</dd>
                <dd className="text-sm text-gray-900 sm:mt-0">{analytics.platforms.twitter.posts}</dd>
                <dd className="text-sm text-gray-900 sm:mt-0">{analytics.platforms.twitter.engagement}%</dd>
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dd className="text-sm text-gray-900 sm:mt-0">Instagram</dd>
                <dd className="text-sm text-gray-900 sm:mt-0">{analytics.platforms.instagram.posts}</dd>
                <dd className="text-sm text-gray-900 sm:mt-0">{analytics.platforms.instagram.engagement}%</dd>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dd className="text-sm text-gray-900 sm:mt-0">LinkedIn</dd>
                <dd className="text-sm text-gray-900 sm:mt-0">{analytics.platforms.linkedin.posts}</dd>
                <dd className="text-sm text-gray-900 sm:mt-0">{analytics.platforms.linkedin.engagement}%</dd>
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Posts</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Performance of your latest posts</p>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {analytics.recentPosts.map(post => (
                  <li key={post.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Published
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="text-sm text-gray-500">
                          {post.content}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <span className="mr-3">{post.likes} likes</span>
                        <span>{post.shares} shares</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
