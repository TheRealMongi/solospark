---
trigger: always_on
---

Security underpins SoloSpark’s trust, reliability, and data protection. These guidelines span authentication, authorization, validation, rate limiting, data protection, and more.

---

### 1. Authentication

* **Clerk Tokens**: Enforce on every API route via middleware.
* **Fastify Hook**: Use an `onRequest` hook to attach `userId` from `getAuth()`.
* **Action Binding**: Tie all operations (scheduling, content) to the authenticated `userId`.

---

### 2. Authorization

* **Data Ownership**: All queries include `where userId = currentUserId`.
* **No Bypasses**: Skip admin overrides in MVP; isolate future admin tools.

---

### 3. Validation & Sanitization

* **Zod Schemas**: Validate all inputs, especially external API calls.
* **Sanitize Strings**: Strip non-ASCII and HTML before AI prompts or storage.

---

### 4. Rate Limiting

* **Upstash Redis**: Limit key endpoints (AI captions, scheduling) to 60 requests/min per user.
* **Middleware**: Reject excess with HTTP 429.

---

### 5. Data Protection

* **Encryption**: Encrypt tokens and secrets at rest.
* **Env Variables**: Store all credentials in `.env`, exclude from VCS; rotate every 90 days.
* **AI Data**: Avoid logging or storing raw prompts unless critical.

---

### 6. External Services

* **Clerk & Supabase**: Use SDKs and Row-Level Security; avoid custom token logic.
* **OpenAI**: Handle errors internally; log only metadata.

---

### 7. Logging & Monitoring

* **Structured Logging**: Pino with module tags; omit sensitive fields (tokens, full prompts).
* **Alerts**: Integrate Sentry or PostHog for errors and usage metrics.

---

### 8. Job Security

* **Metadata**: Include `userId` in job data; verify ownership on execution.
* **Retries**: Max 3 attempts with exponential backoff.

---

### 9. Dependency & CI Hygiene

* **Audits**: CI runs `pnpm audit`; fail on vulnerabilities.
* **Package Criteria**: Only high‑download, actively maintained libraries.
* **CI/CD**: Lint, test, and enforce branch protection before production deploys.

---

### 10. Access Control

* **2FA**: Enforce across GitHub, Vercel, Supabase.
* **Role Restrictions**: Limit push to `main` and secret management to core team.

---

### Optional Enhancements

* **Incident Playbook**: Define breach response steps.
* **Retention Policy**: Set data and log lifecycles.
* **Content Moderation**: Filter or block offensive AI inputs.

---

SoloSpark’s commitment to these practices ensures robust security, safeguarding solopreneurs so they can focus on growth with confidence.
