import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter, createTRPCContext } from '../../../lib/trpc';
import { createLogger } from '../../../lib/logger';

const logger = createLogger('tRPC-API');

// Export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError({ error, type, path, input, ctx, req }) {
    logger.error({
      error: {
        message: error.message,
        code: error.code,
      },
      type,
      path,
      userId: ctx?.userId,
    }, `tRPC error occurred on ${path ?? '<no-path>'}`);
  },
});
