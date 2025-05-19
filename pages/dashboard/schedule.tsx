import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AICaptionSuggester from '@/components/features/AICaptionSuggester';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Calendar, Clock, Sparkles, Send, Instagram, Twitter, Linkedin, Image, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/Toast';

export default function SchedulePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    platforms: {
      twitter: true,
      instagram: false,
      linkedin: false
    },
    scheduledFor: '',
    media: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlatformToggle = (platform: 'twitter' | 'instagram' | 'linkedin') => {
    setFormData(prev => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platform]: !prev.platforms[platform]
      }
    }));
  };
  
  const getSelectedPlatforms = () => {
    return Object.entries(formData.platforms)
      .filter(([_, isSelected]) => isSelected)
      .map(([platform]) => platform);
  };

  const handleAICaptionSelect = (caption: string) => {
    setFormData(prev => ({ ...prev, content: caption }));
    setShowAIPanel(false);
    toast({
      title: "AI caption applied! ✨",
      description: "Feel free to edit it to make it your own.",
      variant: "success"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const selectedPlatforms = getSelectedPlatforms();
    
    if (selectedPlatforms.length === 0) {
      toast({
        title: "Oops! No platforms selected",
        description: "Pick at least one platform to continue!",
        variant: "error"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: formData.content,
          platforms: selectedPlatforms,
          scheduledTime: new Date(formData.scheduledFor).toISOString(),
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Smart move! Post scheduled. 🎉",
          description: `Your post will go live on ${selectedPlatforms.join(', ')} at the scheduled time.`,
          variant: "success"
        });
        setFormData({
          content: '',
          platforms: {
            twitter: true,
            instagram: false,
            linkedin: false
          },
          scheduledFor: '',
          media: null,
        });
      } else {
        toast({
          title: "Couldn't schedule post",
          description: data.error || "Something went wrong. Retry or tweak your post?",
          variant: "error"
        });
      }
    } catch (error) {
      console.error('Error scheduling post:', error);
      toast({
        title: "Scheduling failed",
        description: "Network error. Please try again.",
        variant: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
  
  // Character limits for different platforms
  const platformLimits = {
    twitter: 280,
    instagram: 2200,
    linkedin: 3000
  };
  
  // Calculate remaining characters for each platform
  const getCharacterCount = (platform: keyof typeof platformLimits) => {
    const limit = platformLimits[platform];
    const remaining = limit - formData.content.length;
    return {
      count: formData.content.length,
      remaining,
      isOverLimit: remaining < 0
    };
  };

  return (
    <DashboardLayout title="Schedule">
      <motion.div 
        className="max-w-4xl mx-auto space-y-6 px-4 md:px-6 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <h1 className="text-heading-2 font-heading font-bold text-neutral mb-2">Schedule a Post</h1>
          <p className="text-neutral/70 font-body mb-6">Create and schedule your social media content in one place.</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card shadow="md" className="p-6 md:p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Post Content */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="content" className="block text-neutral font-medium font-body">
                    Post Content
                  </label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    className="text-xs flex items-center text-accent"
                    onClick={() => setShowAIPanel(!showAIPanel)}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Get AI Suggestions
                  </Button>
                </div>
                
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-md font-body text-neutral
                  focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-colors
                  ${getSelectedPlatforms().some(p => getCharacterCount(p as keyof typeof platformLimits).isOverLimit) 
                    ? 'border-destructive' 
                    : 'border-neutral/30'}`}
                  placeholder="Let's make this post sing. What's on your mind today?"
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
                
                {/* Character count indicators */}
                <div className="flex flex-wrap gap-2 text-xs">
                  {getSelectedPlatforms().map(platform => {
                    const { count, remaining, isOverLimit } = getCharacterCount(platform as keyof typeof platformLimits);
                    return (
                      <div key={platform} className={`flex items-center ${isOverLimit ? 'text-destructive' : 'text-neutral/70'}`}>
                        {platform === 'twitter' && <Twitter className="w-3 h-3 mr-1" />}
                        {platform === 'instagram' && <Instagram className="w-3 h-3 mr-1" />}
                        {platform === 'linkedin' && <Linkedin className="w-3 h-3 mr-1" />}
                        {isOverLimit 
                          ? <span>{Math.abs(remaining)} characters over limit</span>
                          : <span>{count}/{platformLimits[platform as keyof typeof platformLimits]} characters</span>
                        }
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* AI Caption Panel */}
              {showAIPanel && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-accent/5 rounded-md p-4 border border-accent/20"
                >
                  <div className="flex items-center mb-3">
                    <Sparkles className="text-accent mr-2" size={16} />
                    <h3 className="font-medium text-accent">AI Caption Suggestions</h3>
                  </div>
                  <AICaptionSuggester 
                    onSelectCaption={handleAICaptionSelect} 
                    platform={getSelectedPlatforms()[0] || 'twitter'} 
                  />
                </motion.div>
              )}
              
              {/* Media Upload */}
              <div className="space-y-3">
                <label className="block text-neutral font-medium font-body">
                  Add Media (Optional)
                </label>
                <div className="border-2 border-dashed border-neutral/30 rounded-md p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Image className="w-8 h-8 mx-auto mb-2 text-neutral/50" />
                  <p className="text-sm text-neutral/70">Drag and drop an image here, or click to browse</p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>
              
              {/* Platform Selection */}
              <div className="space-y-3">
                <label className="block text-neutral font-medium font-body">
                  Select Platforms
                </label>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    type="button" 
                    variant={formData.platforms.twitter ? 'primary' : 'ghost'}
                    className="flex items-center"
                    onClick={() => handlePlatformToggle('twitter')}
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button 
                    type="button" 
                    variant={formData.platforms.instagram ? 'primary' : 'ghost'}
                    className="flex items-center"
                    onClick={() => handlePlatformToggle('instagram')}
                  >
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </Button>
                  <Button 
                    type="button" 
                    variant={formData.platforms.linkedin ? 'primary' : 'ghost'}
                    className="flex items-center"
                    onClick={() => handlePlatformToggle('linkedin')}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
                
                {getSelectedPlatforms().length === 0 && (
                  <div className="flex items-center text-xs text-destructive mt-2">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    <span>Pick at least one platform to continue!</span>
                  </div>
                )}
              </div>
              
              {/* Platform-specific customizations */}
              {getSelectedPlatforms().length > 0 && (
                <div className="space-y-3 bg-background rounded-md p-4 border border-neutral/10">
                  <h3 className="font-medium text-neutral">Platform Tweaks</h3>
                  <p className="text-xs text-neutral/70">Customize your post for each platform</p>
                  
                  {formData.platforms.instagram && (
                    <div className="pt-2">
                      <Badge variant="outline" className="flex items-center w-fit mb-2">
                        <Instagram className="w-3 h-3 mr-1" />
                        <span>Instagram</span>
                      </Badge>
                      <div className="text-xs text-neutral/70 flex items-center">
                        <span>Pro tip: Add up to 30 hashtags for better reach</span>
                      </div>
                    </div>
                  )}
                  
                  {formData.platforms.twitter && (
                    <div className="pt-2">
                      <Badge variant="outline" className="flex items-center w-fit mb-2">
                        <Twitter className="w-3 h-3 mr-1" />
                        <span>Twitter</span>
                      </Badge>
                      <div className="text-xs text-neutral/70 flex items-center">
                        <span>Keep it short! 280 character limit</span>
                      </div>
                    </div>
                  )}
                  
                  {formData.platforms.linkedin && (
                    <div className="pt-2">
                      <Badge variant="outline" className="flex items-center w-fit mb-2">
                        <Linkedin className="w-3 h-3 mr-1" />
                        <span>LinkedIn</span>
                      </Badge>
                      <div className="text-xs text-neutral/70 flex items-center">
                        <span>Professional tone recommended</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Schedule Selection */}
              <div className="space-y-3">
                <label htmlFor="scheduledFor" className="block text-neutral font-medium font-body flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  Schedule For
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="scheduledFor"
                    name="scheduledFor"
                    type="datetime-local"
                    className="flex-grow px-4 py-2 border rounded-md font-body text-neutral
                    focus:ring-2 focus:ring-primary focus:border-primary transition-colors
                    border-neutral/30"
                    value={formData.scheduledFor}
                    onChange={handleChange}
                    required
                  />
                  <Button 
                    type="button" 
                    variant="secondary"
                    className="flex items-center"
                    onClick={() => {
                      // Set to tomorrow at 9am
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      tomorrow.setHours(9, 0, 0, 0);
                      setFormData(prev => ({
                        ...prev,
                        scheduledFor: tomorrow.toISOString().slice(0, 16)
                      }));
                    }}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Best Time
                  </Button>
                </div>
                <p className="text-xs text-neutral/70">Posts scheduled for prime time (9-11am) get 2x more engagement</p>
              </div>
              
              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto flex items-center justify-center"
                  disabled={isSubmitting || getSelectedPlatforms().length === 0}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Scheduling...' : 'Schedule Post'}
                </Button>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1 sm:flex-initial flex items-center justify-center"
                    onClick={() => {
                      // Logic for saving as draft would go here
                      toast({
                        title: "Draft saved",
                        description: "Your post has been saved as a draft.",
                        variant: "success"
                      });
                    }}
                  >
                    Save as Draft
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex-1 sm:flex-initial"
                    onClick={() => setFormData({
                      content: '',
                      platforms: {
                        twitter: true,
                        instagram: false,
                        linkedin: false
                      },
                      scheduledFor: '',
                      media: null,
                    })}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
