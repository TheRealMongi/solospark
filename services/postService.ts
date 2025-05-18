import { Post, Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { createLogger } from '../lib/logger';
import { schedulePost } from '../lib/queue';

const logger = createLogger('PostService');

/**
 * Service for handling post-related operations
 */
export const postService = {
  /**
   * Create a new post
   */
  async createPost(data: {
    userId: string;
    content: string;
    platform: string;
    scheduledFor: Date | string;
  }): Promise<Post> {
    logger.info({ userId: data.userId, platform: data.platform }, 'Creating post');
    
    const scheduledDate = new Date(data.scheduledFor);
    
    try {
      // Create post in database
      const post = await prisma.post.create({
        data: {
          userId: data.userId,
          content: data.content,
          platform: data.platform,
          scheduledFor: scheduledDate,
          status: 'scheduled',
        },
      });
      
      logger.info({ 
        userId: data.userId, 
        postId: post.id, 
        platform: data.platform 
      }, 'Post created successfully');
      
      return post;
    } catch (error: any) {
      logger.error({ 
        error: error.message, 
        userId: data.userId 
      }, 'Error creating post');
      
      throw error;
    }
  },
  
  /**
   * Get posts for a user
   */
  async getUserPosts(userId: string, options?: {
    limit?: number;
    offset?: number;
    status?: string;
    platform?: string;
  }): Promise<Post[]> {
    const { limit = 10, offset = 0, status, platform } = options || {};
    
    logger.info({ userId, limit, offset, status, platform }, 'Getting user posts');
    
    try {
      const where: Prisma.PostWhereInput = { userId };
      
      if (status) {
        where.status = status;
      }
      
      if (platform) {
        where.platform = platform;
      }
      
      const posts = await prisma.post.findMany({
        where,
        orderBy: { scheduledFor: 'desc' },
        take: limit,
        skip: offset,
      });
      
      logger.info({ userId, count: posts.length }, 'Retrieved user posts');
      
      return posts;
    } catch (error: any) {
      logger.error({ 
        error: error.message, 
        userId 
      }, 'Error retrieving posts');
      
      throw error;
    }
  },
  
  /**
   * Schedule a post for publishing
   */
  async schedulePostForPublishing(data: {
    userId: string;
    postId: string;
    message: string;
    platform: string;
    scheduledTime: Date | string;
  }) {
    logger.info({ 
      userId: data.userId, 
      postId: data.postId, 
      platform: data.platform 
    }, 'Scheduling post for publishing');
    
    try {
      // Verify the post exists and belongs to the user
      const post = await prisma.post.findFirst({
        where: {
          id: data.postId,
          userId: data.userId,
        },
      });
      
      if (!post) {
        logger.warn({ userId: data.userId, postId: data.postId }, 'Post not found or does not belong to user');
        throw new Error('Post not found or does not belong to user');
      }
      
      // Add job to the queue
      const job = await schedulePost({
        userId: data.userId,
        postId: data.postId,
        message: data.message,
        platform: data.platform,
        scheduledTime: data.scheduledTime,
      });
      
      logger.info({ 
        userId: data.userId, 
        postId: data.postId, 
        jobId: job.id, 
        platform: data.platform 
      }, 'Post scheduled successfully');
      
      return {
        success: true,
        jobId: job.id,
        scheduledTime: data.scheduledTime,
      };
    } catch (error: any) {
      logger.error({ 
        error: error.message, 
        userId: data.userId, 
        postId: data.postId 
      }, 'Error scheduling post');
      
      throw error;
    }
  },
  
  /**
   * Get a post by ID
   */
  async getPostById(postId: string, userId: string): Promise<Post | null> {
    logger.info({ userId, postId }, 'Getting post by ID');
    
    try {
      const post = await prisma.post.findFirst({
        where: {
          id: postId,
          userId,
        },
      });
      
      return post;
    } catch (error: any) {
      logger.error({ 
        error: error.message, 
        userId, 
        postId 
      }, 'Error retrieving post');
      
      throw error;
    }
  },
};
