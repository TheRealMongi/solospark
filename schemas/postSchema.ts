import { z } from 'zod';

// Platform-specific content validation
const platformContentLimits = {
  instagram: 2200, // Instagram caption limit
  x: 280,         // X (Twitter) character limit
  linkedin: 3000, // LinkedIn post limit
};

// Base post schema
export const basePostSchema = z.object({
  content: z.string()
    .min(1, 'Content is required')
    .max(3000, 'Content is too long'),
  platform: z.enum(['instagram', 'x', 'linkedin']),
  scheduledFor: z.string().refine(
    (date) => !isNaN(Date.parse(date)), 
    { message: 'Invalid date format' }
  ),
});

// Platform-specific post schema
export const platformPostSchema = z.object({
  instagram: z.object({
    content: z.string()
      .max(platformContentLimits.instagram, `Instagram captions must be less than ${platformContentLimits.instagram} characters`)
      .optional(),
    hashtags: z.string().optional(),
  }).optional(),
  x: z.object({
    content: z.string()
      .max(platformContentLimits.x, `X posts must be less than ${platformContentLimits.x} characters`)
      .optional(),
  }).optional(),
  linkedin: z.object({
    content: z.string()
      .max(platformContentLimits.linkedin, `LinkedIn posts must be less than ${platformContentLimits.linkedin} characters`)
      .optional(),
    headline: z.string().max(150, 'LinkedIn headlines must be less than 150 characters').optional(),
  }).optional(),
});

// Combined schema for post creation
export const createPostSchema = basePostSchema.extend({
  platforms: z.array(z.enum(['instagram', 'x', 'linkedin']))
    .min(1, 'Select at least one platform'),
  platformSpecific: platformPostSchema.optional(),
  mediaUrl: z.string().url().optional(),
});

// Schema for updating post schedule
export const updatePostScheduleSchema = z.object({
  postId: z.string().uuid(),
  scheduledFor: z.string().refine(
    (date) => !isNaN(Date.parse(date)), 
    { message: 'Invalid date format' }
  ),
});

// Schema for deleting a post
export const deletePostSchema = z.object({
  postId: z.string().uuid(),
});

// Schema for AI caption generation
export const captionGenerationSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  platform: z.enum(['instagram', 'x', 'linkedin']),
  tone: z.enum(['professional', 'casual', 'friendly']).optional(),
});

// Schema for AI time suggestion
export const timeSuggestionSchema = z.object({
  platform: z.enum(['instagram', 'x', 'linkedin']),
});

// Type definitions derived from schemas
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostScheduleInput = z.infer<typeof updatePostScheduleSchema>;
export type DeletePostInput = z.infer<typeof deletePostSchema>;
export type CaptionGenerationInput = z.infer<typeof captionGenerationSchema>;
export type TimeSuggestionInput = z.infer<typeof timeSuggestionSchema>;
