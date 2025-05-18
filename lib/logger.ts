import pino from 'pino';

// Create a logger instance with pretty printing for development
const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: process.env.NODE_ENV !== 'production' 
    ? { target: 'pino-pretty' } 
    : undefined,
  redact: ['password', 'token', 'authorization', 'content'], // Prevent logging sensitive data
});

// Helper function to create tagged loggers for different modules
export const createLogger = (module: string) => {
  return logger.child({ module });
};

export default logger;
