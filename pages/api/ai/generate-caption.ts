import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';

// Mock AI-generated captions for demonstration
const mockCaptions = {
  twitter: [
    "Just launched our new feature! Check it out and let me know what you think. #ProductLaunch #Innovation",
    "Excited to share our latest update - it's been a labor of love! #NewRelease #ProductDevelopment",
    "Behind the scenes look at what we've been working on. The journey of building something from scratch! #BehindTheScenes #Entrepreneurship"
  ],
  instagram: [
    "✨ New day, new possibilities! Sharing our latest creation with the world today. Double tap if you're as excited as we are!",
    "The moment we've all been waiting for has arrived! 🎉 Our team has been working tirelessly to bring this to life.",
    "Creating magic happens one step at a time ✨ So proud to finally share what we've been working on!"
  ],
  linkedin: [
    "Thrilled to announce our latest innovation that addresses [specific industry problem]. This solution represents months of research and development by our dedicated team.",
    "Proud to share that we've just launched a new feature designed to improve workflow efficiency by 30%. Looking forward to your feedback!",
    "Innovation is at the heart of what we do. Today, we're excited to introduce our newest offering that will transform how professionals approach [specific task]."
  ]
};

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
    const { platform, prompt } = req.body;

    // Validate required fields
    if (!platform) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // In a real implementation, this would call OpenAI or another AI service
    // For now, we'll return mock captions based on the platform
    const captions = mockCaptions[platform as keyof typeof mockCaptions] || mockCaptions.twitter;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return res.status(200).json({ 
      success: true, 
      captions
    });
  } catch (error) {
    console.error('Error generating captions:', error);
    return res.status(500).json({ error: 'Failed to generate captions' });
  }
}
