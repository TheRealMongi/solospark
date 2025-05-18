import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion } from 'framer-motion';
import { trpc } from '../../lib/trpc-client';
import { Post } from '@prisma/client';
import { Edit, Trash2, X, Instagram, Twitter, Linkedin } from 'lucide-react';

interface CalendarViewProps {
  onEditPost?: (post: Post) => void;
}

// Platform icon mapping
const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'instagram':
      return <Instagram className="w-4 h-4 text-amber-500" />;
    case 'x':
      return <Twitter className="w-4 h-4 text-sky-500" />;
    case 'linkedin':
      return <Linkedin className="w-4 h-4 text-indigo-500" />;
    default:
      return null;
  }
};

// Status badge component with animation based on Design System Brief
const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = 'bg-neutral/10';
  let textColor = 'text-neutral';

  switch (status) {
    case 'scheduled':
      bgColor = 'bg-primary/10';
      textColor = 'text-primary';
      break;
    case 'published':
      bgColor = 'bg-green-100';
      textColor = 'text-green-700';
      break;
    case 'failed':
      bgColor = 'bg-red-100';
      textColor = 'text-red-700';
      break;
  }

  return (
    <motion.span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </motion.span>
  );
};

const CalendarView: React.FC<CalendarViewProps> = ({ onEditPost }) => {
  // State for the selected post and modal
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch posts using tRPC
  const {
    data: posts,
    isLoading,
    refetch,
  } = trpc.post.getPosts.useQuery({
    limit: 100,
  });

  // tRPC mutations
  const updatePostScheduleMutation = trpc.post.updatePostSchedule.useMutation({
    onSuccess: () => refetch(),
  });

  const deletePostMutation = trpc.post.deletePost.useMutation({
    onSuccess: () => {
      refetch();
      closeModal();
    },
  });

  // Format posts for FullCalendar
  const events =
    posts?.map(post => ({
      id: post.id,
      title: post.content.length > 30 ? post.content.substring(0, 30) + '...' : post.content,
      start: post.scheduledFor,
      end: new Date(new Date(post.scheduledFor).getTime() + 30 * 60000), // Add 30 minutes
      extendedProps: {
        post,
      },
      backgroundColor: getEventColor(post.platform, post.status),
      borderColor: getEventColor(post.platform, post.status),
    })) || [];

  // Get event color based on platform and status
  function getEventColor(platform: string, status: string): string {
    if (status === 'failed') return '#f87171'; // red-400

    switch (platform) {
      case 'instagram':
        return '#f59e0b'; // amber-500
      case 'x':
        return '#0ea5e9'; // sky-500
      case 'linkedin':
        return '#6366f1'; // indigo-500
      default:
        return '#94a3b8'; // slate-400
    }
  }

  // Handle event click
  const handleEventClick = (info: any) => {
    const post = info.event.extendedProps.post;
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Handle event drag
  const handleEventDrop = async (info: any) => {
    const post = info.event.extendedProps.post;
    const newDate = info.event.start;

    try {
      await updatePostScheduleMutation.mutateAsync({
        postId: post.id,
        scheduledFor: newDate.toISOString(),
      });

      // Show success message
      alert('Post rescheduled successfully!');
    } catch (error) {
      console.error('Error rescheduling post:', error);
      info.revert(); // Revert the drag if there's an error
      alert('Failed to reschedule post. Please try again.');
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  // Handle edit post
  const handleEditPost = () => {
    if (selectedPost && onEditPost) {
      onEditPost(selectedPost);
      closeModal();
    }
  };

  // Handle delete post
  const handleDeletePost = async () => {
    if (!selectedPost) return;

    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePostMutation.mutateAsync({
          postId: selectedPost.id,
        });

        // Success message is handled in onSuccess callback
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Content Calendar</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
        </div>
      ) : (
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={events}
            eventClick={handleEventClick}
            editable={true}
            droppable={true}
            eventDrop={handleEventDrop}
            height="auto"
          />
        </div>
      )}

      {/* Post Details Modal */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                <PlatformIcon platform={selectedPost.platform} />
                <span className="ml-2">
                  {selectedPost.platform.charAt(0).toUpperCase() + selectedPost.platform.slice(1)}{' '}
                  Post
                </span>
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <StatusBadge status={selectedPost.status} />
              <p className="text-sm text-slate-500 mt-2">
                Scheduled for: {new Date(selectedPost.scheduledFor).toLocaleString()}
              </p>
              {selectedPost.publishedAt && (
                <p className="text-sm text-slate-500 mt-1">
                  Published at: {new Date(selectedPost.publishedAt).toLocaleString()}
                </p>
              )}
            </div>

            <div className="border rounded-md p-3 mb-4 bg-slate-50">
              <p className="text-slate-700 whitespace-pre-wrap">{selectedPost.content}</p>
            </div>

            <div className="flex space-x-2 justify-end">
              <button
                onClick={handleEditPost}
                className="flex items-center px-3 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
                disabled={selectedPost.status === 'published'}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button
                onClick={handleDeletePost}
                className="flex items-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
