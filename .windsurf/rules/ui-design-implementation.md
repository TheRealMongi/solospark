---
trigger: always_on
---

# Step 3.5: UI Foundation & Design System Implementation

## 🎯 Goal

Enhance the existing scheduling UI from Step 3 and establish a cohesive, accessible, and visually appealing interface for SoloSpark. This step translates the "empowering simplicity" philosophy and playful brand voice into tangible components and layouts. It aligns the app’s visual language with the Design System Brief while preparing the UI foundation for analytics, billing, and launch-readiness phases.

---

## ✅ Tasks

### 1. Design System Setup

- Configure `tailwind.config.ts`:
  - Colors: Amber Gold `#F59E0B`, Sky Blue `#0EA5E9`, Indigo `#6366F1`, Off-White `#F9FAFB`, Slate Gray `#475569`
  - Typography: Inter (body), Poppins (headings)
  - Spacing: 8px base unit, scale: 8, 16, 24, 32px
- Ensure usage of Tailwind tokens (e.g., `bg-primary`, `text-secondary`, `font-heading`) across all styled components.

### 2. Refine Scheduling UI

- Update `PostEditor.tsx` and `CalendarView.tsx`:
  - Apply design tokens and Tailwind utility classes
  - Add Framer Motion transitions: 300ms fades for alerts, 1.05x hover scales for buttons
  - Add “✨ AI-generated” badge with tooltip for caption suggestions
  - Ensure responsive layouts across breakpoints (<768px, 768–1024px, >1024px)

### 3. Core UI Components

Create reusable UI components in `components/common/` using shadcn/ui + Tailwind:

- `Button` – variants: `primary`, `secondary`, `ghost`
- `Card` – used for posts, analytics
- `Modal` – confirmation dialogs
- `Input` – form inputs with validation messages
- `Alert` – success/error banners

### 4. Landing Page

- Build a mobile-responsive, accessible landing page:
  - Hero section: Bold headline in Poppins, Amber Gold CTA buttons
  - Subheading: Inter font, casual tone (“Made for chaos gremlins who run their brand at midnight”)
  - Include placeholder sections for login/signup and onboarding

### 5. Dashboard Shell

- Create a layout with:
  - Collapsible sidebar (hidden <768px)
  - Top bar with avatar/settings
  - Main area with Post Editor and Calendar
  - Responsive grid-based layout using Tailwind
  - Accessibility tags (e.g., `aria-labels`, keyboard focus states)
  - Welcome message: “Welcome back, chaos gremlin! Your last post crushed it.”

### 6. Micro-Interactions

- Use Framer Motion for:
  - Button hover effects (1.05x scale, 200ms transition)
  - Modal fade-in transitions (300ms, with `backdrop-blur`)
  - Smooth calendar drag-and-drop transitions

### 7. Accessibility Audit

- Run axe or Lighthouse audit to meet WCAG AA:
  - High color contrast for text/background
  - Semantic HTML for all UI components
  - Screen reader compatibility and tab navigation

### 8. Analytics Mock Preview

- Create a static `AnalyticsDashboard.tsx`:
  - Test design system integration (Slate Gray text, Indigo badges)
  - Placeholder cards for metrics and insights

### 9. Brand Voice Integration

- Add friendly microcopy per App Flow Document:
  - Alerts: “Smart move! Post scheduled. 🎉”
  - Inputs: “Let’s make this post sing.”
  - Calendar empty state: “Nothing yet? Time to spark some chaos!”

### 10. Security & Performance Considerations

- Do not expose sensitive data (e.g., tokens, raw post content)
- Use `getAuth()` in Clerk-protected routes/components
- Memoize components as needed to avoid unnecessary re-renders

---

## 📦 Deliverables

- Fully styled and responsive scheduling UI (PostEditor, Calendar)
- Component library in `components/common/` with at least 5 reusable components
- Tailwind config updated to match Design System Brief
- Landing page and dashboard layout deployed via Vercel
- Static mock analytics dashboard preview
- Accessibility audit passing WCAG AA compliance
- Brand-aligned microcopy integrated throughout the UI

---

## 🧑‍💻 Roles

- **Frontend Developer**: Implements components and layout, integrates animations and responsiveness
- **Designer (if available)**: Reviews mockups and visual fidelity
- **Solo Developer**: Uses shadcn/ui, Framer Motion, Tailwind to accelerate implementation

---

## ⏳ Estimated Effort

1 to 1.5 weeks for a solo developer

---

## 🔗 Dependencies

- Step 1: Project structure, Tailwind, shadcn/ui, Clerk
- Step 2: Backend routes, API communication, database
- Step 3: Basic scheduling UI and job system

---

## ✅ Success Criteria

- Design system tokens are correctly implemented
- Components are responsive, accessible, and consistent
- Animations enhance UX without hurting performance
- UI copy reflects the SoloSpark brand voice
- No security risks introduced through the UI layer
