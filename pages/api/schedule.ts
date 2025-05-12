import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { Queue } from 'bullmq';

// Initialize BullMQ queue
const postQueue = new Queue('postQueue', {
  connection: {
    host: process.env.UPSTASH_REDIS_HOST || 'localhost',
    port: parseInt(process.env.UPSTASH_REDIS_PORT || '6379'),
    password: process.env.UPSTASH_REDIS_PASSWORD,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Authenticate the request
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, platform, scheduledTime } = req.body;

    // Validate required fields
    if (!message || !platform || !scheduledTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Add job to the queue
    const job = await postQueue.add('socialPost', {
      userId,
      message,
      platform,
      scheduledTime,
    }, {
      delay: new Date(scheduledTime).getTime() - Date.now(),
      removeOnComplete: true,
      removeOnFail: false,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Post scheduled successfully',
      jobId: job.id,
    });
  } catch (error) {
    console.error('Error scheduling post:', error);
    return res.status(500).json({ error: 'Failed to schedule post' });
  }
}
