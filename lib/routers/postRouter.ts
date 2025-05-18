import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { postService } from '../../services/postService';
import { aiClient } from '../aiClient';
import { createLogger } from '../logger';
import { prisma } from '../prisma';
import { 
  createPostSchema, 
  updatePostScheduleSchema, 
  deletePostSchema,
  captionGenerationSchema,
  timeSuggestionSchema
} from '../../schemas/postSchema';

const logger = createLogger('PostRouter');

export const postRouter = router({
  // Create a new post
  createPost: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      logger.info({ userId: ctx.userId }, 'Creating post');
      
      try {
        // Process each selected platform
        const results = [];
        
        for (const platform of input.platforms) {
          // Get platform-specific content if available
          let content = input.content;
          if (input.platformSpecific && input.platformSpecific[platform]) {
            content = input.platformSpecific[platform]?.content || input.content;
          }
          
          // Create post in database
          const post = await postService.createPost({
            userId: ctx.userId,
            content,
            platform,
            scheduledFor: input.scheduledFor,
          });
          
          // Schedule the post for publishing
          await postService.schedulePostForPublishing({
            userId: ctx.userId,
            postId: post.id,
            message: content,
            platform,
            scheduledTime: input.scheduledFor,
          });
          
          results.push(post);
        }
        
        return { success: true, posts: results };
      } catch (error: any) {
        logger.error({ 
          error: error.message, 
          userId: ctx.userId 
        }, 'Error creating post');
        
        throw error;
      }
    }),
  
  // Get posts for the current user
  getPosts: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(10),
      offset: z.number().min(0).default(0),
      status: z.string().optional(),
      platform: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      logger.info({ userId: ctx.userId }, 'Getting posts');
      
      try {
        const posts = await postService.getUserPosts(ctx.userId, {
          limit: input.limit,
          offset: input.offset,
          status: input.status,
          platform: input.platform,
        });
        
        return posts;
      } catch (error: any) {
        logger.error({ 
          error: error.message, 
          userId: ctx.userId 
        }, 'Error getting posts');
        
        throw error;
      }
    }),
  
  // Update post schedule
  updatePostSchedule: protectedProcedure
    .input(updatePostScheduleSchema)
    .mutation(async ({ ctx, input }) => {
      logger.info({ 
        userId: ctx.userId, 
        postId: input.postId 
      }, 'Updating post schedule');
      
      try {
        // Get the post to verify ownership
        const post = await postService.getPostById(input.postId, ctx.userId);
        
        if (!post) {
          throw new Error('Post not found or does not belong to user');
        }
        
        // Update the post in the database
        const updatedPost = await prisma.post.update({
          where: {
            id: input.postId,
            userId: ctx.userId,
          },
          data: {
            scheduledFor: new Date(input.scheduledFor),
            updatedAt: new Date(),
          },
        });
        
        // Reschedule the post
        await postService.schedulePostForPublishing({
          userId: ctx.userId,
          postId: input.postId,
          message: post.content,
          platform: post.platform,
          scheduledTime: input.scheduledFor,
        });
        
        return updatedPost;
      } catch (error: any) {
        logger.error({ 
          error: error.message, 
          userId: ctx.userId, 
          postId: input.postId 
        }, 'Error updating post schedule');
        
        throw error;
      }
    }),
  
  // Delete a post
  deletePost: protectedProcedure
    .input(deletePostSchema)
    .mutation(async ({ ctx, input }) => {
      logger.info({ 
        userId: ctx.userId, 
        postId: input.postId 
      }, 'Deleting post');
      
      try {
        // Get the post to verify ownership
        const post = await postService.getPostById(input.postId, ctx.userId);
        
        if (!post) {
          throw new Error('Post not found or does not belong to user');
        }
        
        // Delete the post from the database
        await prisma.post.delete({
          where: {
            id: input.postId,
            userId: ctx.userId,
          },
        });
        
        return { success: true };
      } catch (error: any) {
        logger.error({ 
          error: error.message, 
          userId: ctx.userId, 
          postId: input.postId 
        }, 'Error deleting post');
        
        throw error;
      }
    }),
  
  // Generate caption suggestions
  generateCaptions: protectedProcedure
    .input(captionGenerationSchema)
    .mutation(async ({ ctx, input }) => {
      logger.info({ 
        userId: ctx.userId, 
        platform: input.platform 
      }, 'Generating captions');
      
      try {
        const captions = await aiClient.generateCaptions({
          userId: ctx.userId,
          content: input.content,
          platform: input.platform,
          tone: input.tone,
        });
        
        return { captions };
      } catch (error: any) {
        logger.error({ 
          error: error.message, 
          userId: ctx.userId 
        }, 'Error generating captions');
        
        throw error;
      }
    }),
  
  // Suggest optimal posting time
  suggestPostingTime: protectedProcedure
    .input(timeSuggestionSchema)
    .mutation(async ({ ctx, input }) => {
      logger.info({ 
        userId: ctx.userId, 
        platform: input.platform 
      }, 'Suggesting posting time');
      
      try {
        const suggestion = await aiClient.suggestPostingTime({
          userId: ctx.userId,
          platform: input.platform,
        });
        
        return suggestion;
      } catch (error: any) {
        logger.error({ 
          error: error.message, 
          userId: ctx.userId 
        }, 'Error suggesting posting time');
        
        throw error;
      }
    }),
});
