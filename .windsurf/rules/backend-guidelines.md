---
trigger: always_on
---

# SoloSpark Backend Guidelines (MVP)

This guide defines best practices for backend development in SoloSpark — a tool empowering solopreneurs to manage social media simply and efficiently. It covers structure, architecture, error handling, jobs, API design, validation, security, testing, and performance.

---

## 1. Project Structure

```
/api          → Route handlers (e.g., posts.ts)  
/jobs         → Background jobs (e.g., schedulePost.ts)  
/lib          → Utilities (e.g., prisma.ts, aiClient.ts)  
/middlewares  → Middleware functions (e.g., auth.ts)  
/routes       → Fastify route definitions  
/schemas      → zod validation schemas  
/services     → Business logic (e.g., postService.ts)
```

**Conventions**:
- camelCase for functions (e.g., `createPost`)
- PascalCase for types (e.g., `PostData`)
- kebab-case for files (e.g., `schedule-post.ts`)

---

## 2. Architecture Conventions

- Thin controllers: Route handlers only parse/validate and respond.
- Services contain core business logic.
- DB access flows through `/lib/prisma.ts`.
- Prefer isolated imports and DI to improve testability.

```ts
// api/posts.ts
import { createPost } from '../services/postService';

export const createPostHandler = async (req, res) => {
  const post = await createPost(req.body);
  res.status(201).json(post);
};
```

---

## 3. Error Handling

- Use centralized `middlewares/errorHandler.ts`
- Catch external service errors (OpenAI, Supabase, etc.)
- Standardize error format: `{ error: { code, message } }`

```ts
export const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({ error: { code: err.code, message: err.message } });
};
```

---

## 4. Logging

- Use Pino for structured logs.
- Label logs with service/module tags.
- Don’t log tokens or sensitive data.

```ts
logger.info({ module: 'PostService', userId }, 'Post created');
```

---

## 5. Jobs & Scheduling

- Use BullMQ with consistent naming (`queue:post:schedule`).
- Retry jobs (max 3) with backoff.
- Run workers on persistent hosts (e.g., Railway).

```ts
const postQueue = new Bull('post:schedule', { redis });
postQueue.process(async (job) => { /* job logic */ });
```

---

## 6. API Design

- REST for external APIs (`/posts`, `/analytics`)
- tRPC for frontend-backend type-safe calls
- Version public APIs (`/v1/posts`)
- Use proper status codes (`201`, `400`, etc.)

---

## 7. Validation

- Use zod for all input validation.
- Validate admin/internal endpoints too.
- Match API responses with typed output.

```ts
export const postSchema = z.object({
  content: z.string().min(1),
  platform: z.enum(['instagram', 'x', 'linkedin']),
});
```

---

## 8. Security

- Use Clerk’s `getAuth()` for token validation.
- Sanitize all AI-bound strings.
- Never log tokens, raw prompts, or sensitive content.

```ts
const auth = getAuth(req);
if (!auth.userId) return res.status(401).json({ error: 'Unauthorized' });
```

---

## 9. AI API Usage

- Centralize OpenAI calls via `/lib/aiClient.ts`.
- Track prompt context with user metadata.
- Respect user limits; rate limit AI endpoints.

```ts
export const generateCaption = async (prompt) => {
  const res = await aiClient.completions.create({ prompt });
  return res.choices[0].text;
};
```

---

## 10. Testing

- Use Vitest or Jest.
- Mock OpenAI, Supabase, and Redis in tests.
- Every service function needs:
  - A happy path test
  - An edge/failure case test

```ts
test('creates a post', async () => {
  prisma.post.create.mockResolvedValue({ id: 1 });
  const post = await createPost({ content: 'Test post' });
  expect(post).toHaveProperty('id');
});
```

---

## 11. Code Quality

- Use ESLint and Prettier with Husky + lint-staged.
- Enable TypeScript strict mode.
- No magic numbers — use constants.

```ts
export const MAX_POST_LENGTH = 280;
```

---

## 12. Performance Expectations

- No blocking logic in request handlers.
- Jobs must resolve <500ms.
- Avoid N+1 queries; use Prisma’s `include` smartly.

```ts
prisma.post.findMany({ include: { author: true } });
```

---

## 13. CI/CD Practices

- GitHub Actions must run:
  - Tests
  - Linters
  - Type checks
- Auto-deploy via Vercel after checks pass.

---

## Conclusion

This backend guide ensures SoloSpark’s core is fast, testable, and secure. It enables a small team (or solo dev) to move quickly while maintaining reliability, performance, and user trust.