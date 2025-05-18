import OpenAI from 'openai';
import { Redis } from '@upstash/redis';
import { createLogger } from './logger';
import { z } from 'zod';

const logger = createLogger('AIClient');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Redis for rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Input sanitization schema
const sanitizeSchema = z.object({
  content: z.string().trim().min(1).max(1000),
  platform: z.enum(['instagram', 'x', 'linkedin']),
  tone: z.enum(['professional', 'casual', 'friendly']).optional(),
});

/**
 * AI client for generating captions and suggestions
 */
export const aiClient = {
  /**
   * Generate caption suggestions for a post
   */
  async generateCaptions(data: {
    userId: string;
    content: string;
    platform: string;
    tone?: string;
  }): Promise<string[]> {
    logger.info({ userId: data.userId, platform: data.platform }, 'Generating captions');
    
    try {
      // Sanitize input
      const sanitized = sanitizeSchema.parse({
        content: data.content,
        platform: data.platform,
        tone: data.tone || 'friendly',
      });
      
      // Check rate limit (10 requests per minute per user)
      const rateLimitKey = `ratelimit:ai:${data.userId}`;
      const currentRequests = await redis.get<number>(rateLimitKey) || 0;
      
      if (currentRequests >= 10) {
        logger.warn({ userId: data.userId }, 'Rate limit exceeded for AI caption generation');
        throw new Error('Rate limit exceeded. Please try again in a minute.');
      }
      
      // Increment rate limit counter with 60-second expiry
      await redis.set(rateLimitKey, currentRequests + 1, { ex: 60 });
      
      // Construct prompt based on platform
      let prompt = `Generate 3 engaging captions for a ${sanitized.platform} post about: "${sanitized.content}". `;
      
      if (sanitized.platform === 'instagram') {
        prompt += 'Include relevant hashtags. Keep it conversational and engaging.';
      } else if (sanitized.platform === 'x') {
        prompt += 'Keep it under 280 characters. Make it concise and shareable.';
      } else if (sanitized.platform === 'linkedin') {
        prompt += 'Make it professional and insightful. Focus on value and expertise.';
      }
      
      if (sanitized.tone) {
        prompt += ` Use a ${sanitized.tone} tone.`;
      }
      
      // Call OpenAI API
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a social media expert who creates engaging captions for different platforms.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });
      
      // Parse response
      const content = response.choices[0]?.message?.content || '';
      
      // Extract captions (assuming they're numbered or separated by line breaks)
      const captions = content
        .split(/\n+/)
        .filter(line => line.trim().length > 0)
        .map(line => line.replace(/^\d+[\.\)]\s*/, '').trim())
        .filter(caption => caption.length > 0)
        .slice(0, 3);
      
      logger.info({ 
        userId: data.userId, 
        captionsCount: captions.length 
      }, 'Generated captions successfully');
      
      return captions;
    } catch (error: any) {
      logger.error({ 
        error: error.message, 
        userId: data.userId 
      }, 'Error generating captions');
      
      // If it's a rate limit error, rethrow it
      if (error.message.includes('Rate limit')) {
        throw error;
      }
      
      // For other errors, return fallback captions
      return [
        'Check out our latest update!',
        'Excited to share this with you all.',
        'What do you think about this?'
      ];
    }
  },
  
  /**
   * Suggest optimal posting times (stubbed for MVP)
   */
  async suggestPostingTime(data: {
    userId: string;
    platform: string;
  }): Promise<{ time: string; confidence: number }> {
    logger.info({ userId: data.userId, platform: data.platform }, 'Suggesting posting time');
    
    // For MVP, return fixed suggestions based on platform
    const suggestions = {
      instagram: '18:30',  // 6:30 PM
      x: '12:15',          // 12:15 PM
      linkedin: '09:00',   // 9:00 AM
    };
    
    const platform = data.platform as keyof typeof suggestions;
    const suggestedTime = suggestions[platform] || '12:00';
    
    return {
      time: suggestedTime,
      confidence: 0.85,
    };
  },
};
