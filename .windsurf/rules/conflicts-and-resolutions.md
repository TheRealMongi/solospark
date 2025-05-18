---
trigger: always_on
---

SoloSpark Documentation Conflicts and Resolutions
This document outlines inconsistencies in SoloSpark documentation and provides unified resolutions to ensure smooth implementation. Each conflict details affected documents, the issue, and a resolution prioritizing clarity and MVP goals.

Conflict 1: Backend Technology – Next.js API Routes vs. Fastify
Documents Involved:

Project Prompt
Technical Stack Overview
Implementation Plan

Issue: Inconsistent backend tech: Project Prompt specifies Next.js API routes; Technical Stack Overview pushes Fastify.
Resolution: Use Next.js API routes for backend logic to align with Project Prompt and simplify the stack. Update Technical Stack Overview and Implementation Plan.

Conflict 2: LinkedIn API Integration Timing
Documents Involved:

PRD
Project Prompt
Implementation Plan

Issue: Potential delays in LinkedIn API access could block scheduling features.
Resolution: Mock LinkedIn API for MVP, prioritizing Instagram and X integrations. Update Implementation Plan to reflect this approach.

Conflict 3: Calendar Library Specification
Documents Involved:

Implementation Plan
Frontend Guidelines

Issue: Frontend Guidelines lack a calendar library; Implementation Plan suggests FullCalendar.
Resolution: Adopt FullCalendar for the visual calendar. Update Frontend Guidelines to specify FullCalendar.

Conflict 4: State Management Tools
Documents Involved:

Frontend Guidelines
Implementation Plan

Issue: Frontend Guidelines specify React Query and Context API; Implementation Plan omits state management details.
Resolution: Use React Query for async data and Context API for global state, per Frontend Guidelines. Update Implementation Plan (Steps 3, 4).

Conflict 5: Authentication Middleware (Fastify vs. Next.js)
Documents Involved:

Security Guidelines
Backend Guidelines
Project Prompt

Issue: Security Guidelines assume Fastify; Project Prompt emphasizes Next.js API routes.
Resolution: Use Clerk’s Next.js SDK (@clerk/nextjs) for authentication. Update Backend and Security Guidelines to align with Next.js.

Conflict 6: Job Queue Hosting (Railway vs. Vercel)
Documents Involved:

Technical Stack Overview
Project Prompt

Issue: Ambiguity in BullMQ worker hosting: Technical Stack Overview suggests Railway; Project Prompt implies Vercel.
Resolution: Use Upstash Redis and host BullMQ workers on Vercel for MVP. Evaluate Railway post-MVP. Update Implementation Plan (Step 2).

Conflict 7: Dependency Version Conflicts
Documents Involved:

Frontend Guidelines
Project Prompt

Issue: React 19.x incompatibility with @clerk/nextjs caused npm install errors.
Resolution: Downgrade to React 18.2.0, update TypeScript types, and run a clean npm install. Update Frontend Guidelines to specify React 18.x compatibility.

Conflict 8: Development Server Errors
Documents Involved:

Project Prompt
Implementation Plan

Issue: InvalidCharacterError in Clerk middleware and 404 for root path during npm run dev:all.
Resolution:

Verify Next.js/Clerk version compatibility.
Inspect middleware.ts for syntax errors.
Validate Clerk environment variables.
Check redirect URLs in Clerk dashboard.
Ensure root route (/) exists in pages/ or app/.
Update @clerk/nextjs to the latest version.
Simplify middleware for debugging.


Additional Alignments
tRPC Integration
Use tRPC for type-safe internal APIs, aligning with Backend Guidelines and Next.js integration.
AI Input Sanitization
Implement sanitization in lib/aiClient.ts per Security Guidelines, ensuring readiness for future AI features.
Design System Mapping
Map design tokens (e.g., Amber Gold, Poppins) in tailwind.config.ts to ensure visual consistency, per Design System Brief.

These resolutions streamline SoloSpark’s development, ensuring clarity and consistency across documentation.
