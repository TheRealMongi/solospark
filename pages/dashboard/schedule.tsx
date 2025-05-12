import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AICaptionSuggester from '@/components/features/AICaptionSuggester';
import { useUser } from '@clerk/nextjs';

export default function SchedulePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    platform: 'twitter',
    scheduledFor: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: formData.content,
          platform: formData.platform,
          scheduledTime: new Date(formData.scheduledFor).toISOString(),
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Post scheduled successfully!');
        setFormData({
          content: '',
          platform: 'twitter',
          scheduledFor: '',
        });
      } else {
        alert(`Error: ${data.error || 'Failed to schedule post'}`);
      }
    } catch (error) {
      console.error('Error scheduling post:', error);
      alert('Failed to schedule post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout title="Schedule Posts">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Schedule a New Post</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Post Content
            </label>
            <div className="mt-1">
              <textarea
                id="content"
                name="content"
                rows={4}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="What's on your mind?"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {280 - formData.content.length} characters remaining
            </p>
          </div>
          
          <AICaptionSuggester 
            platform={formData.platform} 
            onSelectCaption={(caption) => setFormData(prev => ({ ...prev, content: caption }))} 
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
                Platform
              </label>
              <select
                id="platform"
                name="platform"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={formData.platform}
                onChange={handleChange}
                required
              >
                <option value="twitter">X (Twitter)</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>

            <div>
              <label htmlFor="scheduledFor" className="block text-sm font-medium text-gray-700">
                Schedule For
              </label>
              <input
                type="datetime-local"
                name="scheduledFor"
                id="scheduledFor"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.scheduledFor}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              onClick={() => {
                setFormData({
                  content: '',
                  platform: 'twitter',
                  scheduledFor: '',
                });
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Post'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
