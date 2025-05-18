import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { withAuth, withMethods, withMiddleware } from '../../middlewares/auth';
import { createLogger } from '../../lib/logger';
import { jobService } from '../../services/jobService';

const logger = createLogger('JobsAPI');

// Validation schema for getting job logs
const getJobLogsSchema = z.object({
  limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
  offset: z.string().optional().transform(val => val ? parseInt(val) : 0),
  status: z.string().optional(),
  postId: z.string().optional(),
});

// Validation schema for retrying a job
const retryJobSchema = z.object({
  jobLogId: z.string().min(1, 'Job log ID is required'),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = (req as any).userId;
  
  // GET /api/jobs - Get all job logs for the user
  if (req.method === 'GET') {
    try {
      // Validate and parse query parameters
      const validationResult = getJobLogsSchema.safeParse(req.query);
      
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
      
      const { limit, offset, status, postId } = validationResult.data;
      
      // Get job logs using the service
      const jobLogs = await jobService.getUserJobLogs(userId, {
        limit,
        offset,
        status,
        postId,
      });
      
      return res.status(200).json(jobLogs);
    } catch (error: any) {
      logger.error({ error: error.message, userId }, 'Error retrieving job logs');
      return res.status(500).json({ 
        error: { 
          code: 'DATABASE_ERROR', 
          message: 'Failed to retrieve job logs' 
        } 
      });
    }
  }
  
  // POST /api/jobs/retry - Retry a failed job
  if (req.method === 'POST' && req.query.action === 'retry') {
    try {
      // Validate request body
      const validationResult = retryJobSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        logger.warn({ 
          userId, 
          errors: validationResult.error.format() 
        }, 'Invalid retry job data');
        
        return res.status(400).json({ 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: 'Invalid retry job data',
            details: validationResult.error.format()
          } 
        });
      }
      
      const { jobLogId } = validationResult.data;
      
      // Retry the job using the service
      const jobLog = await jobService.retryJob(jobLogId, userId);
      
      if (!jobLog) {
        return res.status(404).json({ 
          error: { 
            code: 'JOB_LOG_NOT_FOUND', 
            message: 'Job log not found or not failed' 
          } 
        });
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Job retried successfully',
        jobLog,
      });
    } catch (error: any) {
      logger.error({ 
        error: error.message, 
        userId 
      }, 'Error retrying job');
      
      return res.status(500).json({ 
        error: { 
          code: 'RETRY_ERROR', 
          message: 'Failed to retry job' 
        } 
      });
    }
  }
  
  // Method not allowed
  return res.status(405).json({ 
    error: { 
      code: 'METHOD_NOT_ALLOWED', 
      message: `Method ${req.method} not allowed` 
    } 
  });
}

// Apply middleware to protect the route and validate methods
export default withMiddleware(
  withAuth,
  (handler) => withMethods(handler, ['GET', 'POST'])
)(handler);
