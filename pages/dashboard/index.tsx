import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Post } from '@prisma/client';
import PostEditor from '../../components/post/PostEditor';
import CalendarView from '../../components/calendar/CalendarView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Calendar, PenSquare } from 'lucide-react';

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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Please sign in</h2>
          <p className="text-slate-600">You need to be signed in to access the dashboard.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Welcome, {user.firstName || 'Solopreneur'}!</h1>
        <p className="text-slate-600 mt-2">
          Manage your social media posts across platforms with ease.
        </p>
      </header>
      
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="calendar" id="calendar-tab" className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="post" id="post-tab" className="flex items-center">
            <PenSquare className="w-4 h-4 mr-2" />
            Create Post
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-6">
          <CalendarView onEditPost={handleEditPost} />
        </TabsContent>
        
        <TabsContent value="post" className="space-y-6">
          <PostEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
