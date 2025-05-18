import { initTRPC, TRPCError } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getAuth } from '@clerk/nextjs/server';
import { createLogger } from './logger';

const logger = createLogger('tRPC');

// Context type definition
export const createTRPCContext = ({ req, res }: CreateNextContextOptions) => {
  const { userId } = getAuth(req);
  
  return {
    req,
    res,
    userId,
  };
};

// Initialize tRPC
const t = initTRPC.context<typeof createTRPCContext>().create();

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure - requires authentication
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  logger.debug({ userId: ctx.userId }, 'Checking authentication');
  
  if (!ctx.userId) {
    logger.warn('Unauthorized access attempt');
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  
  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  });
});

// Import routers
import { postRouter } from './routers/postRouter';

// Combine all routers
export const appRouter = router({
  getUserData: protectedProcedure.query(async ({ ctx }) => {
    logger.info({ userId: ctx.userId }, 'User data requested');
    
    return {
      userId: ctx.userId,
      message: 'Hello from tRPC!',
      timestamp: new Date().toISOString(),
    };
  }),
  
  // Add the post router
  post: postRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
