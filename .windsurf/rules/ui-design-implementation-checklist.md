---
trigger: always_on
---

# Step 3.5 Implementation Checklist

## 1. Design System Setup

- [ ] Configure `tailwind.config.ts`:
  - Add colors:
    - `primary`: `#F59E0B` (Amber Gold)
    - `secondary`: `#0EA5E9` (Sky Blue)
    - `accent`: `#6366F1` (Indigo)
    - `background`: `#F9FAFB` (Off-White)
    - `neutral`: `#475569` (Slate Gray)
  - Set typography:
    - `fontFamily.body`: `['Inter', 'sans-serif']`
    - `fontFamily.heading`: `['Poppins', 'sans-serif']`
  - Define spacing:
    - `spacing.1`: `8px`
    - `spacing.2`: `16px`
    - `spacing.3`: `24px`
    - `spacing.4`: `32px`

## 2. Refine Scheduling UI

- [ ] Update `PostEditor.tsx`:
  - Apply Tailwind classes:
    - Container: `bg-background`
    - CTAs: `bg-primary text-white rounded-md`
    - Text: `font-body` for inputs, `font-heading` for titles
  - Add Framer Motion:
    - 300ms fade-in for alerts
    - 1.05x scale on button hovers
  - Add “✨ AI-generated” badge with tooltip
  - Ensure responsiveness:
    - <768px: Stack vertically
    - 768–1024px: Two-column layout
    - > 1024px: Full layout
- [ ] Update `CalendarView.tsx`:
  - Apply Tailwind classes:
    - Container: `bg-background`
    - Events: `bg-accent text-white`
    - Text: `font-body` for dates, `font-heading` for month/year
  - Add Framer Motion:
    - Smooth drag-and-drop transitions
  - Ensure responsiveness:
    - <768px: Single-column
    - > =768px: Grid layout

## 3. Build Core UI Components

- [ ] Create components in `components/common/`:
  - `Button.tsx`:
    - Variants:
      - `primary`: `bg-primary text-white`
      - `secondary`: `bg-secondary text-neutral`
      - `ghost`: `bg-transparent border border-neutral`
    - Hover: `hover:scale-105` (200ms transition)
  - `Card.tsx`:
    - Style: `bg-background shadow-sm rounded-md`
  - `Modal.tsx`:
    - Style: `backdrop-blur-sm`, 300ms fade-in
  - `Input.tsx`:
    - Style: `border border-neutral rounded-md`
    - Add validation feedback (e.g., red border on error)
  - `Alert.tsx`:
    - Variants:
      - Success: `bg-green-100 text-green-800`
      - Error: `bg-red-100 text-red-800`

## 4. Landing Page

- [ ] Build responsive landing page:
  - Use Tailwind's grid with 12 columns and 16px gutters (`gap-4`)
  - Hero section:
    - Headline: `font-heading text-4xl text-primary` (“Post smarter, not harder”)
    - Subheading: `font-body text-lg text-neutral` (“Made for chaos gremlins…”)
    - CTAs: `bg-primary text-white rounded-md` for “Sign Up” and “Log In”
  - Include placeholder sections for sign-up, login, and onboarding
  - Mobile-first: Stack on mobile, full-width with 16px padding

## 5. Dashboard Shell

- [ ] Create dashboard layout:
  - Sidebar:
    - Collapsible, hidden on mobile (<768px), toggleable
    - Style: `bg-background shadow-sm`, links with `text-neutral`
  - Header:
    - Include user avatar and settings dropdown
    - Style: `bg-background border-b border-neutral`
  - Main content area:
    - Integrate `PostEditor` and `CalendarView`
    - Use responsive grid: `grid-cols-1 md:grid-cols-2`
  - Add welcome message: `font-body text-lg text-neutral` (“Welcome back, chaos gremlin! Your last post crushed it.”)

## 6. Micro-Interactions

- [ ] Implement animations with Framer Motion:
  - Buttons: 1.05x scale on hover, 200ms transition
  - Modals: 300ms fade-in with `backdrop-blur-sm`
  - Calendar: Smooth drag-and-drop transitions
  - Ensure animations respect `prefers-reduced-motion`

## 7. Accessibility Audit

- [ ] Conduct accessibility audit:
  - Run axe or Lighthouse for WCAG AA compliance
  - Verify color contrast (e.g., Amber Gold on Off-White)
  - Add ARIA labels (e.g., `aria-label="Toggle sidebar"`)
  - Test keyboard navigation and screen reader compatibility

## 8. Analytics Mock Preview

- [ ] Create static `AnalyticsDashboard.tsx`:
  - Use `Card` with `bg-background shadow-sm`
  - Text: `text-neutral`, badges: `bg-accent text-white`
  - Include placeholder metrics and insights

## 9. Brand Voice Integration

- [ ] Integrate microcopy:
  - Alerts: “Smart move! Post scheduled. 🎉”
  - Input placeholders: “Let’s make this post sing.”
  - Empty state messages: “Nothing yet? Time to spark some chaos!”
  - Use `font-body` for all text

## 10. Security & Performance Considerations

- [ ] Security:
  - Ensure no sensitive data is exposed in UI or logs
  - Use Clerk’s `getAuth()` for protected routes
- [ ] Performance:
  - Memoize components with `React.memo`
  - Lazy load heavy components or images if necessary

## Final Checks

- [ ] Verify `tailwind.config.ts` matches the Design System Brief
- [ ] Confirm all components use Tailwind tokens (no hardcoded styles)
- [ ] Ensure UI is responsive, accessible, and brand-consistent
- [ ] Check animations enhance UX without impacting performance
- [ ] Confirm no security risks in UI layer
