import { Post } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { createLogger } from '../lib/logger';
import { getQueue } from '../lib/queue';

const logger = createLogger('JobService');

// Define a simplified job log interface for in-memory storage
interface JobLog {
  id: string;
  jobId: string;
  userId: string;
  postId?: string | null;
  status: string;
  attempts: number;
  error?: string | null;
  result?: any;
  createdAt: Date;
  updatedAt: Date;
  post?: Post | null;
}

// In-memory storage for job logs until database migration is complete
const jobLogs: JobLog[] = [];

/**
 * Service for handling job-related operations
 * This is a mock implementation until the database migration is complete
 */
export const jobService = {
  /**
   * Get job logs for a user
   */
  async getUserJobLogs(userId: string, options?: {
    limit?: number;
    offset?: number;
    status?: string;
    postId?: string;
  }): Promise<JobLog[]> {
    const { limit = 10, offset = 0, status, postId } = options || {};
    
    logger.info({ userId, limit, offset, status, postId }, 'Getting user job logs');
    
    try {
      // Filter logs by userId and other criteria
      let filteredLogs = jobLogs.filter(log => log.userId === userId);
      
      if (status) {
        filteredLogs = filteredLogs.filter(log => log.status === status);
      }
      
      if (postId) {
        filteredLogs = filteredLogs.filter(log => log.postId === postId);
      }
      
      // Sort by createdAt descending
      filteredLogs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      // Apply pagination
      const paginatedLogs = filteredLogs.slice(offset, offset + limit);
      
      // Fetch posts for the logs if needed
      if (paginatedLogs.length > 0) {
        const postIds = paginatedLogs
          .filter(log => log.postId)
          .map(log => log.postId as string);
        
        if (postIds.length > 0) {
          const posts = await prisma.post.findMany({
            where: { id: { in: postIds } },
          });
          
          // Attach posts to logs
          paginatedLogs.forEach(log => {
            if (log.postId) {
              log.post = posts.find(post => post.id === log.postId) || null;
            }
          });
        }
      }
      
      logger.info({ userId, count: paginatedLogs.length }, 'Retrieved user job logs');
      
      return paginatedLogs;
    } catch (error: any) {
      logger.error({ 
        error: error.message, 
        userId 
      }, 'Error retrieving job logs');
      
      throw error;
    }
  },
  
  /**
   * Get a job log by ID
   */
  async getJobLogById(jobLogId: string, userId: string): Promise<JobLog | null> {
    logger.info({ userId, jobLogId }, 'Getting job log by ID');
    
    try {
      // Find the job log
      const jobLog = jobLogs.find(log => log.id === jobLogId && log.userId === userId);
      
      if (jobLog && jobLog.postId) {
        // Fetch the associated post
        const post = await prisma.post.findUnique({
          where: { id: jobLog.postId },
        });
        
        if (post) {
          jobLog.post = post;
        }
      }
      
      return jobLog || null;
    } catch (error: any) {
      logger.error({ 
        error: error.message, 
        userId, 
        jobLogId 
      }, 'Error retrieving job log');
      
      throw error;
    }
  },
  
  /**
   * Create a job log entry
   */
  async createJobLog(data: {
    jobId: string;
    userId: string;
    postId?: string;
    status: string;
    attempts?: number;
  }): Promise<JobLog> {
    logger.info({ 
      jobId: data.jobId, 
      userId: data.userId, 
      postId: data.postId, 
      status: data.status 
    }, 'Creating job log');
    
    try {
      const now = new Date();
      const jobLog: JobLog = {
        id: data.postId ? `job:${data.postId}` : `job:${data.jobId}`,
        jobId: data.jobId,
        userId: data.userId,
        postId: data.postId,
        status: data.status,
        attempts: data.attempts || 0,
        createdAt: now,
        updatedAt: now,
      };
      
      // Add to in-memory storage
      jobLogs.push(jobLog);
      
      logger.info({ 
        jobLogId: jobLog.id, 
        userId: data.userId 
      }, 'Job log created successfully');
      
      return jobLog;
    } catch (error: any) {
      logger.error({ 
        error: error.message, 
        userId: data.userId, 
        jobId: data.jobId 
      }, 'Error creating job log');
      
      throw error;
    }
  },
  
  /**
   * Update a job log entry
   */
  async updateJobLog(jobLogId: string, data: {
    status?: string;
    attempts?: number;
    error?: string;
    result?: any;
  }): Promise<JobLog> {
    logger.info({ 
      jobLogId, 
      status: data.status, 
      attempts: data.attempts 
    }, 'Updating job log');
    
    try {
      // Find the job log
      const jobLogIndex = jobLogs.findIndex(log => log.id === jobLogId);
      
      if (jobLogIndex === -1) {
        throw new Error(`Job log not found: ${jobLogId}`);
      }
      
      // Update the job log
      const jobLog = jobLogs[jobLogIndex];
      
      if (data.status) {
        jobLog.status = data.status;
      }
      
      if (data.attempts !== undefined) {
        jobLog.attempts = data.attempts;
      }
      
      if (data.error) {
        jobLog.error = data.error;
      }
      
      if (data.result) {
        jobLog.result = data.result;
      }
      
      jobLog.updatedAt = new Date();
      
      // Update in-memory storage
      jobLogs[jobLogIndex] = jobLog;
      
      logger.info({ 
        jobLogId, 
        status: jobLog.status 
      }, 'Job log updated successfully');
      
      return jobLog;
    } catch (error: any) {
      logger.error({ 
        error: error.message, 
        jobLogId 
      }, 'Error updating job log');
      
      throw error;
    }
  },
  
  /**
   * Retry a failed job
   */
  async retryJob(jobLogId: string, userId: string): Promise<JobLog | null> {
    logger.info({ userId, jobLogId }, 'Retrying job');
    
    try {
      // Find the job log
      const jobLog = jobLogs.find(
        log => log.id === jobLogId && log.userId === userId && log.status === 'failed'
      );
      
      if (!jobLog) {
        logger.warn({ userId, jobLogId }, 'Job log not found or not failed');
        return null;
      }
      
      // If there's a post ID, fetch the post
      let post: Post | null = null;
      if (jobLog.postId) {
        post = await prisma.post.findUnique({
          where: { id: jobLog.postId },
        });
      }
      
      if (!post && jobLog.postId) {
        logger.warn({ userId, jobLogId, postId: jobLog.postId }, 'Post not found');
        return null;
      }
      
      // Get the queue
      const queue = getQueue('postQueue');
      
      // Add the job back to the queue
      const job = await queue.add('socialPost', {
        userId: jobLog.userId,
        postId: jobLog.postId,
        platform: post?.platform,
        message: post?.content,
        scheduledTime: new Date(),
      });
      
      // Update the job log
      jobLog.jobId = job.id;
      jobLog.status = 'processing';
      jobLog.attempts += 1;
      jobLog.updatedAt = new Date();
      
      logger.info({ 
        userId, 
        jobLogId, 
        newJobId: job.id 
      }, 'Job retried successfully');
      
      return jobLog;
    } catch (error: any) {
      logger.error({ 
        error: error.message, 
        userId, 
        jobLogId 
      }, 'Error retrying job');
      
      throw error;
    }
  },
};
