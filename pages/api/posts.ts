import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth, withMethods, withMiddleware } from '../../middlewares/auth';
import { createLogger } from '../../lib/logger';
import { postService } from '../../services/postService';
import { z } from 'zod';

const logger = createLogger('PostsAPI');

// Validation schema for creating a post
const createPostSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  platform: z.enum(['instagram', 'x', 'linkedin'], {
    errorMap: () => ({ message: 'Platform must be instagram, x, or linkedin' }),
  }),
  scheduledFor: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: 'scheduledFor must be a valid date string' }
  ),
});

// Validation schema for getting posts
const getPostsSchema = z.object({
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
  offset: z.string().optional().transform(val => val ? parseInt(val) : 0),
  status: z.string().optional(),
  platform: z.string().optional(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = (req as any).userId;
  
  // GET /api/posts - Get all posts for the user
  if (req.method === 'GET') {
    try {
      // Validate and parse query parameters
      const validationResult = getPostsSchema.safeParse(req.query);
      
      if (!validationResult.success) {
        logger.warn({ 
          userId, 
          errors: validationResult.error.format() 
        }, 'Invalid query parameters');
        
        return res.status(400).json({ 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: 'Invalid query parameters',
            details: validationResult.error.format()
          } 
        });
      }
      
      const { limit, offset, status, platform } = validationResult.data;
      
      // Get posts using the service
      const posts = await postService.getUserPosts(userId, {
        limit,
        offset,
        status,
        platform,
      });
      
      return res.status(200).json(posts);
    } catch (error: any) {
      logger.error({ error: error.message, userId }, 'Error retrieving posts');
      return res.status(500).json({ 
        error: { 
          code: 'DATABASE_ERROR', 
          message: 'Failed to retrieve posts' 
        } 
      });
    }
  }
  
  // POST /api/posts - Create a new post
  if (req.method === 'POST') {
    try {
      // Validate request body
      const validationResult = createPostSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        logger.warn({ 
          userId, 
          errors: validationResult.error.format() 
        }, 'Invalid post data');
        
        return res.status(400).json({ 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: 'Invalid post data',
            details: validationResult.error.format()
          } 
        });
      }
      
      const { content, platform, scheduledFor } = validationResult.data;
      
      // Create post using the service
      const post = await postService.createPost({
        userId,
        content,
        platform,
        scheduledFor,
      });
      
      return res.status(201).json(post);
    } catch (error: any) {
      logger.error({ 
        error: error.message, 
        userId 
      }, 'Error creating post');
      
      return res.status(500).json({ 
        error: { 
          code: 'DATABASE_ERROR', 
          message: 'Failed to create post' 
        } 
      });
    }
  }
}

// Apply middleware to protect the route and validate methods
export default withMiddleware(
  withAuth,
  (handler) => withMethods(handler, ['GET', 'POST'])
)(handler);
