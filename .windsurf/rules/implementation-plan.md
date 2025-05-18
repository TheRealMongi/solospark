---
trigger: always_on
---

This implementation plan provides a structured, realistic roadmap for building SoloSpark, a social media management platform for solopreneurs. It is designed to be linear, feature-scoped, and role-aware, ensuring steady progress while allowing flexibility. The plan is divided into steps (rather than weeks for flexibility) with clear goals and deliverables, assuming a solo or small team effort. Expect a 10–20% time buffer for integration delays, unexpected bugs, or real-life chaos.

---

## Step 1: Foundation

**Goal**: Set up the development environment, CI/CD, and deploy basic scaffolding.

* **Tasks**:

  * Set up repository structure (frontend/backend split or monorepo).
  * Install ESLint, Prettier, Husky, and commit hooks.
  * Configure [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), and React.
  * Create [Vercel project](https://vercel.com/dashboard), [Supabase project](https://app.supabase.com/), and [Upstash project](https://upstash.com/).
  * Integrate [Clerk](https://dashboard.clerk.dev/) and test login/logout flow.
  * Set up [GitHub Actions](https://github.com/features/actions) for formatting, linting, and testing on push.
  * Add placeholder `README.md`, `CONTRIBUTING.md`, and `.env.example`.

* **Deliverable**: Development environment is ready, Vercel deploys work, CI is functional, and login/logout flows are operational.

---

## Step 2: Core Infrastructure

**Goal**: Build and deploy the basic skeleton of the product without features.

* **Tasks**:

  * Set up API routing using [Fastify](https://fastify.dev/) or Next.js API routes.
  * Implement [tRPC](https://trpc.io/) for backend and frontend communication.
  * Connect [Prisma ORM](https://www.prisma.io/) to Supabase.
  * Set up [BullMQ](https://bullmq.io/) job queue with Redis integration.
  * Create a dummy "echo post" job that logs after a 10-second delay.
  * Build authentication middleware and protect routes.
  * Add a logging system using [Pino](https://getpino.io/).

* **Deliverable**: End-to-end protected API route and background job queues are functional.

---

## Step 3: MVP Feature - Scheduling

**Goal**: Enable users to create posts, tweak them per platform, and schedule them.

* **Tasks**:

  * Build the "Create Post" form using [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/).
  * Implement AI caption suggestions via an [OpenAI](https://platform.openai.com/) wrapper.
  * Develop the "Post Once, Tweak Everywhere" UI with platform toggles.
  * Create a drag-and-drop calendar UI using [FullCalendar](https://fullcalendar.io/) or similar.
  * Schedule jobs to execute post publishing (initially with mock API calls).
  * Store post metadata with scheduling information in the database.

* **Deliverable**: Core "Create + Schedule Post" flow works for logged-in users.

---

## Step 4: MVP Feature - Analytics

**Goal**: Provide simple performance tracking for posts.

* **Tasks**:

  * Build an analytics dashboard with mocked data (clicks, views, likes).
  * Add "Quick Wins" insights logic (e.g., top post, best posting time).
  * Integrate AI-driven suggestions (e.g., "Your X posts get 2x more likes").

* **Deliverable**: Dashboard with basic, actionable feedback on post performance.

---

## Step 5: Post-Processing + Engagement

**Goal**: Add queue retry logic, error handling, and message response stubs.

* **Tasks**:

  * Implement retries and backoff rules for BullMQ jobs.
  * Add error feedback in the UI (e.g., "Post failed to publish").
  * Include status indicators in the calendar (scheduled, failed, published).
  * Create stubs for engagement features (e.g., comments/messages view, mocked).

* **Deliverable**: Users receive meaningful feedback on the post lifecycle.

---

## Step 6: API & Platform Integration

**Goal**: Connect to real Instagram, LinkedIn, and X accounts via APIs (or mocks if gated).

* **Tasks**:

  * Integrate platform APIs (even if only in dev mode or with post echoes).
  * Securely store and retrieve access tokens (e.g., using Supabase encrypted columns).
  * Build test-post-to-platform job handlers.

* **Deliverable**: Posts are published to at least one real platform in limited dev mode.

---

## Step 7: Monetization & Billing

**Goal**: Implement the Solo Pro billing tier using Stripe.

* **Tasks**:

  * Integrate [Stripe](https://stripe.com/) for a flat \$12/month subscription.
  * Limit the free plan to 3 channels and 20 posts.
  * Add an "Upgrade" CTA and modal.
  * Set up Stripe webhooks for plan changes.

* **Deliverable**: Users can pay to unlock full features.

---

## Step 8: Security + Hardening

**Goal**: Lock down all APIs, logs, and data.

* **Tasks**:

  * Enforce user ownership on all queries.
  * Add rate limiting middleware.
  * Sanitize AI inputs.
  * Harden Clerk middleware for all routes.
  * Audit secrets and environment configurations.

* **Deliverable**: MVP passes a basic security checklist.

---

## Step 9: Final Polish

**Goal**: Finalize onboarding, tracking, and cleanup for launch readiness.

* **Tasks**:

  * Finalize the onboarding flow.
  * Integrate bug tracking with [Sentry](https://sentry.io/) and user tracking with [PostHog](https://posthog.com/).
  * Clean up any technical debt or UI inconsistencies.
  * Run test users through the full flow: onboarding → create → schedule → analyze → pay → cancel.

* **Deliverable**: Polished product with onboarding and tracking ready for launch.

---

## Step 10: Launch Readiness

**Goal**: Prepare and test the launch candidate.

* **Tasks**:

  * Polish the landing page and copy.
  * Add email support using [Resend](https://resend.com/).
  * Implement feature flags if needed.
  * Conduct a smoke test: create → schedule → publish → analyze → pay.
  * Deploy to a staging environment for final validation.
  * Prepare launch communications (e.g., blog post, email announcement).
