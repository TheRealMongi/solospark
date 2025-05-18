---
trigger: always_on
---

## Revised SoloSpark Design System Brief

### 1. Design Philosophy

SoloSpark empowers solopreneurs with **simple, fast, and joyful** social-media management. Acting as a trusted sidekick—approachable, reliable, and playful—it prioritizes clarity and speed so users can schedule posts or view analytics in seconds, even at 2 AM. The clean, modern aesthetic avoids corporate stiffness and overdesign, reflecting our mission to save time, boost confidence, and turn social media from chore to quick win.

---

### 2. UI/UX Priorities

* **Clarity**: Self‑explanatory layouts minimize cognitive load.
* **Speed**: Prioritize fast load times and interactions over decorative flourishes.
* **Accessibility**: High‑contrast text, keyboard navigation, and screen‑reader friendliness.
* **Feedback**: Dopamine‑driven messages (e.g., “Post scheduled!”) reinforce progress.
* **Mobile‑First**: Seamless on‑the‑go use with touch‑optimized controls.

---

### 3. Visual Tone & Color Palette

A warm, energizing palette balances action and calm:

| Role          | Color      | Hex     | Use Cases                    |
| ------------- | ---------- | ------- | ---------------------------- |
| **Primary**   | Amber Gold | #F59E0B | Main CTAs, highlights        |
| **Secondary** | Sky Blue   | #0EA5E9 | Buttons, links, hover states |
| **Accent**    | Indigo     | #6366F1 | Badges, alerts, indicators   |
| **Neutral**   | Slate Gray | #475569 | Text, borders                |
| **BG**        | Off‑White  | #F9FAFB | Page and card backgrounds    |

---

### 4. Typography

Two modern, readable typefaces:

* **Inter** (weights 400/500/700)

  * UI copy and body text: 16 px (base), 14 px mobile
* **Poppins** (weights 500/700)

  * Headings (H1–H3 scale down by 25% on mobile)

**Spacing & Contrast**: Line height 1.5× for body, 1.2× for headings; WCAG 2.1 AA compliance.

---

### 5. Key Components & Interactions

* **Cards**: 8 px radius, soft shadow (0 2 4  rgba(0,0,0,0.1)).
* **Buttons/Inputs**: 8 px radius, clear primary/secondary distinction.
* **Micro‑interactions**: 300 ms transitions; 1.05× hover scales; fade-ins for alerts.
* **Icons**: Outline style with filled active states (e.g., Heroicons).
* **Modals**: Subtle backdrop‑blur for focus without heaviness.

---

### 6. Grid & Layout System

**12‑column grid**, 16 px gutters, max width 1280 px:

* **Mobile (<768 px)**: Single column, full-width cards.
* **Tablet (768–1024 px)**: Two columns, compact calendar, collapsible sidebar.
* **Desktop (>1024 px)**: Multi‑column dashboard, persistent sidebar.

**Spacing**: Base unit 8 px (use multiples: 16, 24, 32 px). Implement via CSS variables for consistency.

---

### 7. Alignment with PRD

* **Purpose**: Reflects SoloSpark’s mission—save time and boost confidence—via clear workflows and rewarding feedback.
* **Audience**: Solopreneurs juggling tasks at any hour; bold CTAs and instant insights support quick decisions.
* **User Journeys**:

  * **Post Once, Tweak Everywhere**: Streamlined editor with platform toggles and live preview.
  * **Drag‑and‑Drop Calendar**: Quick rescheduling without context switching.
  * **Analytics Dashboard**: Snapshot insights (top posts, best times) with AI suggestions.

---

SoloSpark’s design system is a cohesive blueprint: clean, approachable, and optimized for fast, delightful results—making social media feel like a series of quick wins, not a burden.
