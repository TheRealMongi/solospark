import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { withAuth, withMethods, withMiddleware } from '../../middlewares/auth';
import { createLogger } from '../../lib/logger';
import { postService } from '../../services/postService';

const logger = createLogger('ScheduleAPI');

// Validation schema for scheduling a post
const schedulePostSchema = z.object({
  postId: z.string().uuid('Invalid post ID'),
  message: z.string().min(1, 'Message is required'),
  platform: z.enum(['instagram', 'x', 'linkedin'], {
    errorMap: () => ({ message: 'Platform must be instagram, x, or linkedin' }),
  }),
  scheduledTime: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: 'scheduledTime must be a valid date string' }
  ),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = (req as any).userId;
  
  try {
    // Validate request body
    const validationResult = schedulePostSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      logger.warn({ 
        userId, 
        errors: validationResult.error.format() 
      }, 'Invalid schedule data');
      
      return res.status(400).json({ 
        error: { 
          code: 'VALIDATION_ERROR', 
          message: 'Invalid schedule data',
          details: validationResult.error.format()
        } 
      });
    }
    
    const { postId, message, platform, scheduledTime } = validationResult.data;
    
    // Schedule post using the service
    try {
      const result = await postService.schedulePostForPublishing({
        userId,
        postId,
        message,
        platform,
        scheduledTime,
      });
      
      return res.status(200).json({ 
        success: true, 
        message: 'Post scheduled successfully',
        jobId: result.jobId,
        scheduledTime: result.scheduledTime,
      });
    } catch (error: any) {
      if (error.message === 'Post not found or does not belong to user') {
        return res.status(404).json({ 
          error: { 
            code: 'POST_NOT_FOUND', 
            message: 'Post not found or does not belong to user' 
          } 
        });
      }
      throw error; // Re-throw for the outer catch block
    }
  } catch (error: any) {
    logger.error({ 
      error: error.message, 
      userId 
    }, 'Error scheduling post');
    
    return res.status(500).json({ 
      error: { 
        code: 'SCHEDULING_ERROR', 
        message: 'Failed to schedule post' 
      } 
    });
  }
}

// Apply middleware to protect the route and validate methods
export default withMiddleware(
  withAuth,
  (handler) => withMethods(handler, ['POST'])
)(handler);
