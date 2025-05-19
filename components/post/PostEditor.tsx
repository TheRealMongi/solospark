import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Clock, Sparkles, Image } from 'lucide-react';
import { motion } from 'framer-motion';
import { trpc } from '../../lib/trpc-client';
import { createPostSchema, CreatePostInput } from '../../schemas/postSchema';
import PlatformToggles from './PlatformToggles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Character limits for different platforms
const PLATFORM_LIMITS = {
  instagram: 2200,
  x: 280,
  linkedin: 3000,
};

const PostEditor: React.FC = () => {
  // Form state using React Hook Form
  const { 
    register, 
    handleSubmit, 
    control, 
    watch, 
    setValue, 
    formState: { errors, isSubmitting } 
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: '',
      platforms: [],
      scheduledFor: new Date().toISOString(),
    },
  });
  
  // Local state
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [selectedPlatformTab, setSelectedPlatformTab] = useState<string | null>(null);
  
  // Watch form values
  const content = watch('content');
  const platforms = watch('platforms');
  const scheduledFor = watch('scheduledFor');
  
  // tRPC mutations
  const createPostMutation = trpc.post.createPost.useMutation();
  const generateCaptionsMutation = trpc.post.generateCaptions.useMutation();
  const suggestTimeMutation = trpc.post.suggestPostingTime.useMutation();
  
  // Handle form submission
  const onSubmit = async (data: CreatePostInput) => {
    try {
      await createPostMutation.mutateAsync(data);
      // Reset form or show success message
      setValue('content', '');
      setValue('platforms', []);
      setValue('platformSpecific', undefined);
      setValue('mediaUrl', '');
      setAiSuggestions([]);
      
      // Show success toast or notification
      alert('Post scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling post:', error);
      alert('Failed to schedule post. Please try again.');
    }
  };
  
  // Generate AI caption suggestions
  const generateCaptions = async () => {
    if (!content || content.trim().length === 0) {
      alert('Please enter some content first');
      return;
    }
    
    if (platforms.length === 0) {
      alert('Please select at least one platform');
      return;
    }
    
    setIsLoadingSuggestions(true);
    
    try {
      const platform = platforms[0]; // Use the first selected platform
      const result = await generateCaptionsMutation.mutateAsync({
        content,
        platform,
        tone: 'friendly',
      });
      
      setAiSuggestions(result.captions);
    } catch (error) {
      console.error('Error generating captions:', error);
      alert('Failed to generate captions. Please try again.');
    } finally {
      setIsLoadingSuggestions(false);
    }
  };
  
  // Suggest optimal posting time
  const suggestPostingTime = async () => {
    if (platforms.length === 0) {
      alert('Please select at least one platform');
      return;
    }
    
    try {
      const platform = platforms[0]; // Use the first selected platform
      const result = await suggestTimeMutation.mutateAsync({
        platform,
      });
      
      // Parse the time string (HH:MM) and set it to today's date
      const [hours, minutes] = result.time.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      
      setValue('scheduledFor', date.toISOString());
    } catch (error) {
      console.error('Error suggesting time:', error);
      alert('Failed to suggest posting time. Please try again.');
    }
  };
  
  // Apply an AI suggestion to the content
  const applySuggestion = (suggestion: string) => {
    setValue('content', suggestion);
    setAiSuggestions([]);
  };
  
  // Calculate remaining characters for the current platform
  const getRemainingChars = (platform: string) => {
    const limit = PLATFORM_LIMITS[platform as keyof typeof PLATFORM_LIMITS] || 0;
    // Use a type-safe approach to get nested form values
    let platformContent = content;
    
    // Access the platform-specific content if it exists
    if (platform === 'instagram' || platform === 'x' || platform === 'linkedin') {
      const formValues = watch();
      platformContent = formValues?.platformSpecific?.[platform]?.content || content;
    }
    
    return limit - (platformContent?.length || 0);
  };
  
  return (
    <div className="bg-background rounded-md shadow-card-md p-6 max-w-4xl mx-auto">
      <h2 className="text-heading-2 font-heading font-semibold text-neutral mb-6">Create Post</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Platform selection */}
        <Controller
          name="platforms"
          control={control}
          render={({ field }) => (
            <PlatformToggles
              selectedPlatforms={field.value}
              onChange={field.onChange}
              disabled={isSubmitting}
            />
          )}
        />
        {errors.platforms && (
          <p className="text-sm text-red-500 mt-1">{errors.platforms.message}</p>
        )}
        
        {/* Main content */}
        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium text-slate-700">
            Post content
          </label>
          <div className="relative">
            <textarea
              id="content"
              rows={5}
              className={`
                w-full px-4 py-2 border rounded-md font-body text-neutral
                focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-colors
                ${errors.content ? 'border-destructive' : 'border-neutral/30'}
              `}
              placeholder="Let's make this post sing."
              {...register('content')}
              disabled={isSubmitting}
            />
            
            {/* AI suggestions button */}
            <motion.button
              type="button"
              onClick={generateCaptions}
              disabled={isLoadingSuggestions || isSubmitting || !content}
              className={`
                absolute right-3 bottom-3 p-2 rounded-md
                ${isLoadingSuggestions || !content
                  ? 'bg-neutral/20 text-neutral/40 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-dark'}
              `}
              whileHover={!isLoadingSuggestions && content ? { scale: 1.05 } : {}}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </div>
          {errors.content && (
            <p className="text-sm text-red-500">{errors.content.message}</p>
          )}
          
          {/* Character count */}
          {platforms.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-2">
              {platforms.map(platform => {
                const remaining = getRemainingChars(platform);
                const isNearLimit = remaining < 20;
                const isOverLimit = remaining < 0;
                
                return (
                  <span 
                    key={platform}
                    className={`
                      text-xs px-2 py-1 rounded-full
                      ${isOverLimit 
                        ? 'bg-red-100 text-red-700' 
                        : isNearLimit 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-slate-100 text-slate-700'}
                    `}
                  >
                    {platform}: {remaining} chars left
                  </span>
                );
              })}
            </div>
          )}
        </div>
        
        {/* AI suggestions */}
        {aiSuggestions.length > 0 && (
          <motion.div 
            className="bg-primary/5 p-4 rounded-md border border-primary/20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-sm font-medium text-primary mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-1" />
              ✨ AI Caption Suggestions
            </h3>
            <div className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <motion.div 
                  key={index}
                  className="bg-background p-3 rounded-md border border-primary/10 cursor-pointer hover:bg-primary/5 transition-colors"
                  onClick={() => applySuggestion(suggestion)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm font-body text-neutral">{suggestion}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Platform-specific customization tabs */}
        {platforms.length > 0 && (
          <div className="border border-neutral/20 rounded-md overflow-hidden">
            <div className="flex border-b border-neutral/20">
              {platforms.map(platform => (
                <motion.button
                  key={platform}
                  type="button"
                  className={`
                    flex-1 py-2 px-4 text-sm font-medium transition-colors
                    ${selectedPlatformTab === platform
                      ? 'bg-primary/5 text-primary border-b-2 border-primary'
                      : 'text-neutral hover:bg-neutral/5'}
                  `}
                  onClick={() => setSelectedPlatformTab(platform)}
                  whileHover={selectedPlatformTab !== platform ? { backgroundColor: 'rgba(71, 85, 105, 0.05)' } : {}}
                  transition={{ duration: 0.2 }}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)} Options
                </motion.button>
              ))}
            </div>
            
            {selectedPlatformTab && (
              <div className="p-4">
                {selectedPlatformTab === 'instagram' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Instagram Caption
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md"
                        placeholder="Customize your Instagram caption"
                        {...register(`platformSpecific.instagram.content`)}
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Characters: {getRemainingChars('instagram')} remaining
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Hashtags
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md"
                        placeholder="#soloproducts #smallbusiness"
                        {...register(`platformSpecific.instagram.hashtags`)}
                      />
                    </div>
                  </div>
                )}
                
                {selectedPlatformTab === 'x' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      X Post
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                      placeholder="Customize your X post"
                      {...register(`platformSpecific.x.content`)}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Characters: {getRemainingChars('x')} remaining
                    </p>
                  </div>
                )}
                
                {selectedPlatformTab === 'linkedin' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        LinkedIn Post
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md"
                        placeholder="Customize your LinkedIn post"
                        {...register(`platformSpecific.linkedin.content`)}
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Characters: {getRemainingChars('linkedin')} remaining
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Headline (optional)
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md"
                        placeholder="Add a headline to your LinkedIn post"
                        {...register(`platformSpecific.linkedin.headline`)}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Media upload (placeholder) */}
        <div className="border-2 border-dashed border-slate-300 rounded-md p-6 text-center">
          <div className="flex flex-col items-center">
            <Image className="w-10 h-10 text-slate-400 mb-2" />
            <p className="text-sm text-slate-500">
              Drag and drop an image or video, or{' '}
              <span className="text-amber-500 font-medium cursor-pointer">browse</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supported formats: JPEG, PNG, GIF, MP4
            </p>
          </div>
        </div>
        
        {/* Scheduling */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">Schedule</h3>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date
              </label>
              <Controller
                name="scheduledFor"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : new Date()}
                    onChange={(date: Date | null) => {
                      if (date) {
                        field.onChange(date.toISOString());
                      }
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                  />
                )}
              />
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                <Clock className="w-4 h-4 inline mr-1" />
                Time
              </label>
              <Controller
                name="scheduledFor"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : new Date()}
                    onChange={(date: Date | null) => {
                      if (date) {
                        field.onChange(date.toISOString());
                      }
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    dateFormat="h:mm aa"
                  />
                )}
              />
            </div>
            
            <div className="flex items-end">
              <button
                type="button"
                onClick={suggestPostingTime}
                disabled={platforms.length === 0 || isSubmitting}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium
                  ${platforms.length === 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-sky-500 text-white hover:bg-sky-600'}
                `}
              >
                <Sparkles className="w-4 h-4 inline mr-1" />
                Suggest Time
              </button>
            </div>
          </div>
        </div>
        
        {/* Submit button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || platforms.length === 0}
            className={`
              w-full py-3 px-4 rounded-md text-white font-medium
              ${isSubmitting || platforms.length === 0
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600'}
            `}
          >
            {isSubmitting ? 'Scheduling...' : 'Schedule Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
