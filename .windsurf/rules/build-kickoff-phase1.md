---
trigger: always_on
---

# Build Kickoff: SoloSpark MVP Implementation (Phase 1)

## Hello Coding Agent
We’re kicking off the development of SoloSpark, a streamlined social media management platform designed specifically for solopreneurs. SoloSpark empowers freelancers, influencers, and side-hustlers to schedule posts, track performance, and save time with practical AI tools—without the complexity of enterprise solutions like Hootsuite or Buffer. Our target user is the "solo chaos gremlin" managing their social media at 2 AM with cold coffee and no patience for friction.

## Quick Context
SoloSpark focuses on simplicity, speed, and affordability, offering a fast, intuitive experience for solopreneurs who need to post smarter, not harder. The MVP will support Instagram, X, and LinkedIn, with core features including post scheduling, a visual calendar, basic analytics, and AI-powered caption suggestions.

## This Phase’s Objective
**Goal:** Establish the foundational infrastructure for SoloSpark, including a deployable development environment, authentication, CI/CD, and a basic scheduling proof-of-concept. This aligns with Step 1 of the Implementation Plan: "Foundation."

## 🛠 Tech Stack
- **Frontend:** Next.js, Tailwind CSS, shadcn/ui  
- **Backend:** Next.js API routes  
- **Jobs:** BullMQ + Upstash Redis  
- **Database:** Supabase + Prisma  
- **Auth:** Clerk  
- **CI/CD:** GitHub Actions + Vercel  

## Tasks
- [ ] Set up a Next.js project with the following structure:  
  - `/pages` → Next.js pages and API routes  
  - `/components` → Reusable React components, organized by feature  
  - `/hooks` → Custom React hooks  
  - `/lib` → Utility functions, API wrappers, business logic  
  - `/styles` → Global styles or CSS modules  
  - `/public` → Static assets  
- [ ] Install ESLint, Prettier, Husky, and commit hooks for code quality.  
- [ ] Configure Tailwind CSS and integrate shadcn/ui components.  
- [ ] Set up API routes for the backend within `/pages/api`.  
- [ ] Set up Prisma and connect to Supabase for database management.  
- [ ] Integrate Clerk for authentication and ensure login/logout flows work.  
- [ ] Configure BullMQ with Upstash Redis and implement a dummy job that logs a message to the console after a 10-second delay.  
- [ ] Set up CI/CD with GitHub Actions to run linter and tests on pull requests, and deploy to Vercel.  
- [ ] Add placeholder files: `README.md`, `CONTRIBUTING.md`, and `.env.example`.  

## Definition of Done
- Login and signup are functional via Clerk.  
- Logged-in users can access a protected `/api/ping` route.  
- A background job queue logs a scheduled post to the console after a 10-second delay.  
- CI pipeline runs linter and tests on pull requests.  
- Project deploys successfully on Vercel.  

## Known Constraints
- LinkedIn API approval may be delayed—mock its integration for now, as per the PRD's risk mitigation strategy.  
- Post publishing will be stubbed until full platform access is granted.  
- AI captioning is not required yet; just wire the endpoint.  

## Where to Ask Questions / Share Updates
Log any questions, issues, or progress updates in the project documentation or the designated communication channel.

## Tone Guidelines
- Prioritize speed and simplicity over flexibility—this is an MVP.  
- Avoid overengineering features not critical for launch.  
- Build for clarity and ease, like a tool a sleep-deprived user can navigate.  

## Source of Truth
Refer to these documents for detailed specs:  
- `./docs/PRD.md`  
- `./docs/design-system.md`  
- `./docs/tech-stack.md`  
- `./docs/implementation-plan.md`  
- `./docs/app-flow.md`  
- `./docs/frontend-guidelines.md`  
- `./docs/backend-guidelines.md`  
- `./docs/security-guidelines.md`  

## Agent Instruction
Begin with Task 1. Output the proposed folder structure before proceeding. Confirm the login flow is functional before moving on to background job setup.

Let’s get SoloSpark off the ground!