---
trigger: always_on
---

## 1. Overview

**Goal**: Build a lean, scalable, user-friendly scheduling tool with AI-powered captions, scheduling optimization, and insights—tailored for solopreneurs who demand speed and simplicity.

**Principles**:

- **Simple > Overengineered**: Prioritize practical solutions to hit MVP goals quickly.  
- **Speed > Flexibility**: Focus on low latency and fast iteration.  
- **Familiar > Fancy**: Use proven tools with strong ecosystems.  
- **Serverless/Managed**: Minimize ops with managed services.  
- **Replaceable Components**: Make AI and APIs swappable.

---

## 2. Frontend

| **Layer** | **Tech** | **Why** |
| --- | --- | --- |
| UI Framework | React + Next.js | Component-based; SSR/SSG for fast TTFB. |
| Styling | Tailwind CSS | Utility-first, aligns with 8px design grid. |
| UI Library | shadcn/ui + Heroicons | Polished components and icon clarity. |
| State Mgmt | React Query + Context API | Async data + simple global state. |
| Forms | React Hook Form | Lightweight, performant. |
| Animation | Framer Motion | Micro-interactions and drag-drop UX. |
| Auth UI | Clerk | Pre-built flows, Next.js compatible. |

---

## 3. Backend

| **Layer** | **Tech** | **Why** |
| --- | --- | --- |
| Server/API | Node.js (Fastify) | Lightweight, async-first. |
| Scheduling | BullMQ (Railway) | Reliable Redis-based job queue. |
| Auth | Clerk | OAuth and JWTs for social logins. |
| AI Service | OpenAI (GPT-4o-mini) | Cost-effective caption & insight gen. |
| RPC/REST | tRPC | Type-safe APIs with Clerk-tested setup. |
| Rate Limit | Upstash Redis | Per-user limits on API/AI usage. |

---

## 4. Database & Storage

| **Layer** | **Tech** | **Why** |
| --- | --- | --- |
| DB | PostgreSQL (Supabase) | Managed, real-time capable. |
| ORM | Prisma | Type-safe queries. |
| File Storage | Supabase Storage | Secure, easy media hosting. |
| Analytics | PostgreSQL | Centralized metrics via Prisma. |

---

## 5. Infrastructure / DevOps

| **Layer** | **Tech** | **Why** |
| --- | --- | --- |
| Hosting | Vercel (frontend/APIs), Railway (jobs) | Fast deploys + durable job hosting. |
| CI/CD | GitHub Actions | Automated testing + deploys. |
| Monitoring | Sentry + PostHog | Errors + user behavior. |
| Email | Resend | Alerts and onboarding flows. |
| DNS | Cloudflare | Fast DNS, free tier, DDoS protection. |

---

## 6. AI/ML Stack

| **Layer** | **Tech** | **Why** |
| --- | --- | --- |
| Text Gen | OpenAI (GPT-4o-mini) | Captions, insights, hashtags. |
| Trends | X API + GPT | Detects trending tags. |
| Sentiment | GPT + rules | Analyzes engagement tone. |

---

## 7. Stretch Goals (Post-MVP)

- **Semantic Search**: Pinecone for reusing strong posts.
- **Live Updates**: Pusher for post status alerts.
- **Rich Text**: Tiptap if formatting demands rise.
- **Custom Analytics**: ClickHouse if volume spikes.

---

## 8. Non-Negotiables

- **Mobile UX**: Optimized for <768px screens.  
- **Fast TTFB**: Edge-optimized deploys via Vercel.  
- **99.9% Uptime**: BullMQ retries + Supabase reliability.  
- **DX > Code Golf**: Use tools that save time.  
- **Serverless by Default**: Vercel, Railway, Supabase, Upstash.

---

## Alignment with SoloSpark Goals

- **Speed**: Fast to build, fast to load.  
- **Simplicity**: Familiar tools for faster onboarding.  
- **Scalability**: Infra grows with usage.  
- **AI Assist**: GPT-powered wins, cost-controlled.  
- **Solo-Friendly**: Easy to manage, tweak, and ship.

---

## Feedback Incorporated

- **Fastify on Vercel**: Moved jobs to Railway; kept frontend/API serverless.  
- **tRPC + Clerk**: Tested early to prevent auth issues; REST fallback ready.  
- **OpenAI Budget**: Upstash Redis caps per-user usage on free plan.
