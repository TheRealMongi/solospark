import { Queue, QueueOptions } from 'bullmq';
import { createLogger } from './logger';

const logger = createLogger('QueueService');

// Redis connection configuration
const redisConnection = {
  host: process.env.UPSTASH_REDIS_HOST || 'localhost',
  port: parseInt(process.env.UPSTASH_REDIS_PORT || '6379'),
  password: process.env.UPSTASH_REDIS_PASSWORD,
};

// Queue options with defaults
const defaultQueueOptions: QueueOptions = {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000, // 5 seconds initial delay
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
};

// Queue instances
const queues: Record<string, Queue> = {};

/**
 * Get or create a queue instance
 */
export function getQueue(name: string, options: Partial<QueueOptions> = {}): Queue {
  if (!queues[name]) {
    logger.info({ queueName: name }, 'Creating queue instance');
    queues[name] = new Queue(name, {
      ...defaultQueueOptions,
      ...options,
    });
    
    // Set up event listeners for the queue
    queues[name].on('error', (error) => {
      logger.error({ error, queueName: name }, 'Queue error');
    });
  }
  
  return queues[name];
}

// Export the post queue specifically as it's commonly used
export const postQueue = getQueue('postQueue');

/**
 * Add a job to the post queue
 */
export async function schedulePost(data: {
  userId: string;
  postId: string;
  message: string;
  platform: string;
  scheduledTime: string | Date;
}) {
  const scheduledDate = new Date(data.scheduledTime);
  const now = new Date();
  const delay = Math.max(0, scheduledDate.getTime() - now.getTime());
  
  logger.info({
    userId: data.userId,
    postId: data.postId,
    platform: data.platform,
    scheduledTime: scheduledDate.toISOString(),
    delay,
  }, 'Scheduling post');
  
  const job = await postQueue.add('socialPost', data, {
    delay,
    jobId: `post:${data.postId}`,
  });
  
  return job;
}
