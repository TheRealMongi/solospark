import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { createLogger } from '../lib/logger';

const logger = createLogger('AuthMiddleware');

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

/**
 * Middleware to protect API routes with Clerk authentication
 */
export function withAuth(handler: NextApiHandler): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { userId } = getAuth(req);
      
      if (!userId) {
        logger.warn('Unauthorized access attempt');
        return res.status(401).json({ 
          error: { 
            code: 'UNAUTHORIZED', 
            message: 'You must be signed in to access this resource' 
          } 
        });
      }
      
      // Add userId to the request object for downstream handlers
      (req as any).userId = userId;
      
      // Call the original handler
      return await handler(req, res);
    } catch (error: any) {
      logger.error({ error: error?.message }, 'Authentication error');
      return res.status(500).json({ 
        error: { 
          code: 'AUTH_ERROR', 
          message: 'Authentication error' 
        } 
      });
    }
  };
}

/**
 * Middleware to validate request method
 */
export function withMethods(handler: NextApiHandler, allowedMethods: string[]): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!allowedMethods.includes(req.method || '')) {
      logger.warn({ method: req.method }, 'Method not allowed');
      return res.status(405).json({ 
        error: { 
          code: 'METHOD_NOT_ALLOWED', 
          message: `Method ${req.method} not allowed` 
        } 
      });
    }
    
    return await handler(req, res);
  };
}

/**
 * Combine multiple middleware functions
 */
export function withMiddleware(...middlewares: ((handler: NextApiHandler) => NextApiHandler)[]) {
  return (handler: NextApiHandler): NextApiHandler => {
    return middlewares.reduceRight((acc, middleware) => middleware(acc), handler);
  };
}
