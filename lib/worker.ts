import { Worker } from 'bullmq';
import { prisma } from './prisma';
import { createLogger } from './logger';
import { jobService } from '../services/jobService';

const logger = createLogger('Worker');

// Redis connection configuration
const redisConnection = {
  host: process.env.UPSTASH_REDIS_HOST || 'localhost',
  port: parseInt(process.env.UPSTASH_REDIS_PORT || '6379'),
  password: process.env.UPSTASH_REDIS_PASSWORD,
};

// Initialize BullMQ worker
const worker = new Worker('postQueue', async (job) => {
  logger.info({ jobId: job.id }, `Processing job ${job.id}`);
  
  const { userId, postId, message, platform, scheduledTime } = job.data;
  
  try {
    // Create or update job log using the job service
    const jobLogId = postId ? `job:${postId}` : `job:${job.id}`;
    
    // Check if job log exists
    let jobLog = await jobService.getJobLogById(jobLogId, userId);
    
    if (jobLog) {
      // Update existing job log
      await jobService.updateJobLog(jobLogId, {
        status: 'processing',
        attempts: job.attemptsMade,
      });
    } else {
      // Create new job log
      await jobService.createJobLog({
        jobId: job.id,
        userId,
        postId,
        status: 'processing',
        attempts: job.attemptsMade,
      });
    }
    
    // In a real implementation, this would call the appropriate social media API
    logger.info({
      userId,
      postId,
      platform,
      scheduledTime
    }, `Publishing post to ${platform}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // If post ID exists, update the post status
    if (postId) {
      await prisma.post.update({
        where: { id: postId },
        data: {
          status: 'published',
          publishedAt: new Date(),
        },
      });
    }
    
    // Update job log with success result
    const publishedAt = new Date();
    await jobService.updateJobLog(jobLogId, {
      status: 'completed',
      result: { success: true, publishedAt },
    });
    
    logger.info({ jobId: job.id, postId }, 'Post published successfully');
    
    return { success: true, publishedAt: publishedAt.toISOString() };
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error';
    logger.error({ error, jobId: job.id, postId }, `Job failed: ${errorMessage}`);
    
    // Update job log with error
    const jobLogId = postId ? `job:${postId}` : `job:${job.id}`;
    await jobService.updateJobLog(jobLogId, {
      status: 'failed',
      error: errorMessage,
    });
    
    // If post ID exists, update the post status to failed
    if (postId) {
      await prisma.post.update({
        where: { id: postId },
        data: { status: 'failed' },
      });
    }
    
    throw error;
  }
}, {
  connection: redisConnection,
  concurrency: 5,
});

worker.on('completed', (job) => {
  logger.info({ jobId: job.id }, `Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, error: err.message }, `Job ${job?.id} failed with error: ${err.message}`);
});

worker.on('error', (err) => {
  logger.error({ error: err.message }, `Worker error: ${err.message}`);
});

export default worker;
