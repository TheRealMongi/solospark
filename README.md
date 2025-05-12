# SoloSpark

SoloSpark is a streamlined social media management platform designed specifically for solopreneurs. It empowers freelancers, influencers, and side-hustlers to schedule posts, track performance, and save time with practical AI tools—without the complexity of enterprise solutions.

## Features

- **Post Scheduling**: Schedule posts for Instagram, X, and LinkedIn
- **Visual Calendar**: Drag-and-drop interface for managing your content calendar
- **Basic Analytics**: Track performance metrics for your social media posts
- **AI-Powered Captions**: Get AI-generated caption suggestions for your posts

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes
- **Jobs**: BullMQ + Upstash Redis
- **Database**: Supabase + Prisma
- **Auth**: Clerk
- **CI/CD**: GitHub Actions + Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v8 or later)
- PostgreSQL database (or Supabase account)
- Redis instance (or Upstash account)
- Clerk account for authentication

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/solospark.git
   cd solospark
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Set up environment variables

   ```
   cp .env.example .env
   ```

   Then edit `.env` with your own values.

4. Run database migrations

   ```
   npx prisma migrate dev
   ```

5. Start the development server

   ```
   npm run dev
   ```

6. In a separate terminal, start the worker for background jobs
   ```
   node scripts/start-worker.js
   ```

## Development

### Code Quality

This project uses ESLint, Prettier, and Husky to maintain code quality:

- **ESLint**: Lints JavaScript/TypeScript code
- **Prettier**: Formats code
- **Husky**: Runs linting and formatting before commits

### Project Structure

- `/pages`: Next.js pages and API routes
- `/components`: Reusable React components
- `/hooks`: Custom React hooks
- `/lib`: Utility functions and business logic
- `/styles`: Global styles
- `/public`: Static assets
- `/prisma`: Database schema and migrations

## License

MIT
