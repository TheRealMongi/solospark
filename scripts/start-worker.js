// This script starts the BullMQ worker for processing scheduled posts
require('dotenv').config();
const { Worker } = require('bullmq');

console.log('Starting SoloSpark worker...');
console.log(`Redis connection: ${process.env.UPSTASH_REDIS_HOST || 'localhost'}:${process.env.UPSTASH_REDIS_PORT || '6379'}`);

// Initialize BullMQ worker
const worker = new Worker('postQueue', async (job) => {
  console.log(`Processing job ${job.id}`);
  console.log('Job data:', job.data);
  
  const { userId, message, platform, scheduledTime } = job.data;
  
  // In a real implementation, this would call the appropriate social media API
  console.log(`[${new Date().toISOString()}] Publishing post for user ${userId}`);
  console.log(`Platform: ${platform}`);
  console.log(`Message: ${message}`);
  console.log(`Originally scheduled for: ${scheduledTime}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log(`Post published successfully!`);
  
  return { success: true, publishedAt: new Date().toISOString() };
}, {
  connection: {
    host: process.env.UPSTASH_REDIS_HOST || 'localhost',
    port: parseInt(process.env.UPSTASH_REDIS_PORT || '6379'),
    password: process.env.UPSTASH_REDIS_PASSWORD,
  },
});

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error: ${err.message}`);
});

console.log('Worker started and waiting for jobs...');
