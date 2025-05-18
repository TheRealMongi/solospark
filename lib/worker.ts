import { Worker, Job, Queue } from 'bullmq';
import { prisma } from './prisma';
import { createLogger } from './logger';
import { jobService } from '../services/jobService';
import { EventEmitter } from 'events';

// Define the job data interface to ensure type safety
interface PostJobData {
  userId: string;
  postId?: string;
  message?: string;
  platform?: string;
  scheduledTime?: string | Date;
}

const logger = createLogger('Worker');

// Redis connection configuration
const redisConnection = {
  host: process.env.UPSTASH_REDIS_HOST || 'localhost',
  port: parseInt(process.env.UPSTASH_REDIS_PORT || '6379'),
  password: process.env.UPSTASH_REDIS_PASSWORD,
  maxRetriesPerRequest: 3,
  enableOfflineQueue: false,
};

/**
 * This class provides a mock worker implementation for development
 * when Redis isn't available, preventing constant connection errors
 */
class MockWorker extends EventEmitter {
  queueName: string;
  processor: Function;
  isRunning: boolean = true;
  mockJobs: Map<string, any> = new Map();
  jobCounter: number = 0;

  constructor(queueName: string, processor: (job: any) => Promise<any>, options: any = {}) {
    super();
    this.queueName = queueName;
    this.processor = processor;

    logger.warn(
      { queueName },
      'Using mock worker (Redis not available) - limited functionality only'
    );
  }

  // Add a mock job processing method
  async processMockJob(jobData: PostJobData) {
    this.jobCounter++;
    const jobId = `mock:${this.jobCounter}`;

    const mockJob = {
      id: jobId,
      data: jobData,
      attemptsMade: 0,
    };

    this.mockJobs.set(jobId, mockJob);

    try {
      logger.info({ jobId, queueName: this.queueName }, 'Processing mock job in development mode');
      const result = await this.processor(mockJob);
      this.emit('completed', mockJob);
      return result;
    } catch (error: any) {
      logger.error({ jobId, error: error.message }, 'Mock job processing failed');
      this.emit('failed', mockJob, error);
      throw error;
    }
  }

  // Mock the on method to capture events
  on(event: string, listener: (...args: any[]) => void): this {
    super.on(event, listener);
    return this;
  }

  // Close method (no-op for mock)
  async close() {
    this.isRunning = false;
    logger.info('Mock worker closed');
    return true;
  }
}

// Process jobs from the queue
const jobProcessor = async (job: Job<PostJobData>) => {
  logger.info({ jobId: job.id }, `Processing job ${job.id}`);

  // Extract job data with type safety
  const { userId, postId, message, platform, scheduledTime } = job.data as PostJobData;

  // With the interface, TypeScript knows userId is a string, but we'll add a runtime check
  if (!userId) {
    logger.error({ jobId: job.id }, 'Missing userId in job data');
    throw new Error('userId is required for job processing');
  }

  // Create a validated userId variable that TypeScript knows is a string
  const validatedUserId: string = userId;

  try {
    // Create or update job log using the job service
    const jobLogId = postId ? `job:${postId}` : `job:${job.id}`;

    // Check if job log exists
    // Since we've already checked userId is not null/undefined, we can safely use it
    let jobLog = await jobService.getJobLogById(jobLogId, userId);

    if (jobLog) {
      // Update existing job log
      await jobService.updateJobLog(jobLogId, {
        status: 'processing',
        attempts: job.attemptsMade,
      });
    } else {
      // Create new job log
      // Create a new job log with userId that's guaranteed to be a string
      await jobService.createJobLog({
        jobId: String(job.id), // Ensure job.id is a string
        userId: validatedUserId, // Using the validated string variable
        postId, // postId is already optional in the interface
        status: 'processing',
        attempts: job.attemptsMade,
      });
    }

    // In a real implementation, this would call the appropriate social media API
    logger.info(
      {
        userId,
        postId,
        platform,
        scheduledTime,
      },
      `Publishing post to ${platform}`
    );

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
};

// Try to create a real worker, fall back to mock worker if Redis is not available
let worker: Worker<PostJobData> | MockWorker;
let realWorker: Worker<PostJobData> | null = null;

try {
  logger.info('Initializing BullMQ worker with Redis');
  // Try to create a real BullMQ worker
  realWorker = new Worker<PostJobData>('postQueue', jobProcessor, {
    connection: redisConnection,
    concurrency: 5,
  });

  // Set up event listeners
  realWorker.on('completed', job => {
    logger.info({ jobId: job.id }, `Job ${job.id} completed successfully`);
  });

  realWorker.on('failed', (job, err) => {
    logger.error(
      { jobId: job?.id, error: err.message },
      `Job ${job?.id} failed with error: ${err.message}`
    );
  });

  realWorker.on('error', err => {
    // If we get a Redis connection error in development, switch to mock mode
    if (process.env.NODE_ENV !== 'production' && err.message.includes('ECONNREFUSED')) {
      logger.warn(
        'Redis connection failed. Using mock worker instead. For full functionality, install Redis or use Upstash Redis.'
      );
      realWorker?.close();
      worker = new MockWorker('postQueue', jobProcessor);
    } else {
      logger.error({ error: err.message }, `Worker error: ${err.message}`);
    }
  });

  worker = realWorker;
  logger.info('Worker initialized successfully with Redis connection');
} catch (error: any) {
  logger.warn(
    { error: error.message },
    'Failed to initialize Redis worker. Using mock worker instead.'
  );

  // Create a mock worker for development
  if (process.env.NODE_ENV !== 'production') {
    worker = new MockWorker('postQueue', jobProcessor);
  } else {
    throw new Error('Redis connection required in production');
  }
}

// Log worker status
logger.info('Worker started and waiting for jobs...');

export default worker;
