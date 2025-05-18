// This script starts the BullMQ worker for processing scheduled posts
require('dotenv').config();

// Use ts-node to register TypeScript support
require('ts-node').register();

// Import our worker module which contains the enhanced implementation
const worker = require('../lib/worker').default;
const pino = require('pino');

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
});

logger.info({
  redisHost: process.env.UPSTASH_REDIS_HOST || 'localhost',
  redisPort: process.env.UPSTASH_REDIS_PORT || '6379',
}, 'Starting SoloSpark worker...');

// The worker is already configured in ../lib/worker.ts with proper error handling,
// logging, and database integration

// Add a process termination handler to gracefully shut down the worker
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, closing worker...');
  await worker.close();
  logger.info('Worker closed');
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, closing worker...');
  await worker.close();
  logger.info('Worker closed');
  process.exit(0);
});

logger.info('Worker started and waiting for jobs...');
