---
trigger: always_on
---

SoloSpark Code Guidelines
Project Context
SoloSpark is a social media management platform designed for solopreneurs, prioritizing simplicity, efficiency, and user-friendliness.Purpose: Enable solopreneurs to schedule, tweak, and analyze social media posts across platforms with AI-driven insights.Tech Stack: Built with React (Next.js), Node.js (Fastify), PostgreSQL (Supabase), Clerk (authentication), BullMQ (job scheduling), and OpenAI (AI features).
Code Style & Structure
Frontend

Use functional React components with hooks; avoid class components.
Organize code into pages/, components/, hooks/, lib/, utils/, styles/.
Apply Tailwind CSS utility classes directly in JSX for all styling; avoid custom CSS unless essential.
Manage asynchronous data with React Query; use Context API for global state.
Forms: Use React Hook Form with zod for validation (e.g., in Post Editor).
Implement subtle, fast animations with Framer Motion.

Backend

Structure code in api/, jobs/, lib/, middlewares/, routes/, schemas/, services/.
Keep API handlers thin; place business logic in services/.
Use Prisma for all database interactions; optimize queries with include/select to avoid N+1 issues.
Log with Pino in a structured format; exclude sensitive data.
Enforce ESLint and Prettier via Husky on commits for both frontend and backend.

Tech Stack & Dependencies

Frontend: React 18 (Next.js), Tailwind CSS 3.x, React Query, React Hook Form, zod, Framer Motion.
Backend: Node.js 18, Fastify, Prisma, PostgreSQL (Supabase), BullMQ, Pino, tRPC.
Shared: TypeScript 5.x (strict mode, no any), Clerk for authentication, OpenAI API, Upstash Redis for rate limiting.
Use only specified dependencies to maintain compatibility and avoid bloat.

Naming & Formatting Conventions
Frontend

Components: PascalCase (e.g., PostEditor.tsx).
Hooks: useCamelCase (e.g., usePostData.ts).
Files: Match export names (e.g., PostEditor.tsx for PostEditor component).

Backend

Services: CamelCase (e.g., postService.ts).
Jobs: Descriptive camelCase (e.g., schedulePostJob.ts).
Schemas: CamelCase (e.g., postSchema.ts).
Constants: UPPER_SNAKE_CASE (e.g., MAX_POST_LENGTH).
Use single quotes, two-space indentation, and semicolons per ESLint Airbnb config.

Testing & Quality Assurance

Frontend: Use React Testing Library and Vitest; co-locate tests (e.g., PostEditor.spec.tsx for PostEditor.tsx).
Backend: Test services and jobs with Vitest; mock external services (e.g., OpenAI, Supabase).
Aim for ≥80% coverage on critical paths (e.g., API routes, post scheduling).
Include unit tests for utilities and integration tests for API endpoints.

Documentation Standards

Include a brief comment explaining the purpose of each generated code snippet (e.g., // Fetches posts from Supabase with pagination).
Use JSDoc for exported functions in lib/ and utils/ (e.g., @param, @returns).
Update inline comments for complex logic; no separate README updates required unless specified.

Security & Compliance

Enforce userId in all Prisma queries for data ownership (e.g., where: { userId }).
Protect routes with Clerk authentication; return 401 on unauthorized access.
Encrypt sensitive data (e.g., OAuth tokens) using Supabase’s encryption features before storage.
Avoid logging sensitive data (e.g., tokens, post content) with Pino.
Sanitize all user and OpenAI inputs with zod in schemas/.
Rate limit APIs and AI calls to 60 req/min/user via Upstash Redis.
Follow OWASP Top 10 principles (e.g., no eval(), sanitize inputs).

Performance & Scalability

Ensure non-blocking I/O in backend operations (e.g., async Fastify handlers).
BullMQ jobs must complete in <500ms; include retry logic for failures.
Optimize database queries with Prisma’s include/select and pagination.
Lazy-load large frontend modules (e.g., analytics charts) with Next.js dynamic imports.
Avoid O(n²) operations on large datasets (e.g., post analytics).

Agent Controls

Prepend a brief comment to each code snippet explaining its purpose (e.g., // Handles post scheduling via BullMQ).
If context is insufficient, output [INSUFFICIENT CONTEXT] and suggest needed details (e.g., [INSUFFICIENT CONTEXT] Please provide the API route spec).
Include placeholders for API keys/credentials in external service calls (e.g., const apiKey = 'YOUR_OPENAI_KEY';).
Ensure generated code passes ESLint/Prettier and adheres to SoloSpark’s standards.

Additional Notes

Design: Use specified colors (e.g., Amber Gold #F59E0B, Sky Blue #0EA5E9), fonts (Inter for body, Poppins for headings), 8px Tailwind spacing grid, and Heroicons outline icons.
UX: Follow the App Flow Doc, provide immediate feedback (e.g., “Post scheduled! 🎉”), and handle edge cases (e.g., platform errors).
Features: Implement BullMQ for post scheduling, analytics with AI insights, drag-and-drop calendar, and Stripe for the $12/month Solo Pro plan.

