---
trigger: always_on
---

This document provides a clear and opinionated guide for frontend development on the SoloSpark project. It ensures consistency, maintainability, and a high-quality user experience aligned with SoloSpark's mission to empower solopreneurs with a simple, efficient, and delightful social media management tool.

These guidelines cover folder structure, component architecture, styling, state management, forms, animations, accessibility, testing, linting, design system integration, AI assistance, and performance expectations.

---

## Folder Structure and Naming Conventions

SoloSpark's frontend is organized to promote clarity and ease of navigation:

- `pages/`: Next.js pages, each for a route (e.g., `index.tsx`, `dashboard.tsx`).
- `components/`: Reusable React components, by feature:
  - `common/`: Global UI (e.g., `Button.tsx`, `Modal.tsx`).
  - `post/`: Post editor components.
  - `calendar/`: Calendar views.
  - `analytics/`: Analytics dashboard.
- `hooks/`: Custom hooks (e.g., `useClipboard.ts`).
- `lib/`: API wrappers and business logic.
- `utils/`: General helpers (e.g., `dateUtils.ts`).
- `styles/`: Global CSS (used sparingly).

Naming:
- Components: PascalCase.
- Hooks: camelCase with `use` prefix.
- Utilities/lib: camelCase.
- Folders: kebab-case.

---

## Component Architecture

- Feature-based folders: group components by domain.
- Use shared components from `common/`.
- Boolean props use `is` or `has` prefixes.
- Use strict unions for `variant`, `size`, etc.
- Avoid one-offs—design for reuse.

---

## Styling Rules

- Use Tailwind CSS utility classes.
- Use `@apply` or CSS modules only if necessary.
- Mobile-first: use Tailwind's responsive breakpoints.
- Use spacing scale consistently (e.g., `p-2` for 8px).

```jsx
<button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">
  Schedule Post
</button>
```

---

## State Management

- Use React Query for async data.
- Use Context API for global settings/preferences.

```jsx
const { data: posts } = useQuery('posts', fetchPosts);
```

---

## Forms

- Use React Hook Form + zod for validation.
- Show clear errors and loading states.

```jsx
const { register } = useForm({ resolver: zodResolver(postSchema) });
```

---

## Animations

- Use Framer Motion.
- Keep animations short (<300ms) and smooth.

```jsx
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} />
```

---

## Accessibility (a11y)

- Ensure keyboard nav.
- Use semantic HTML.
- Meet WCAG AA contrast.
- Test with screen readers.

---

## Testing

- Use React Testing Library + Vitest.
- Test core logic, async states, and input flows.

```jsx
test('renders PostEditor', () => {
  render(<PostEditor />);
  expect(screen.getByText('Create Post')).toBeInTheDocument();
});
```

---

## Linting & Formatting

- ESLint + Prettier + Tailwind plugin.
- Husky/lint-staged for CI.
- Use conventional commits.

---

## Design System Integration

- Map tokens in `tailwind.config.ts`.
- Use utility classes, not hardcoded styles.

```jsx
<div className="text-primary font-heading text-xl">Welcome to SoloSpark</div>
```

---

## AI Assistance Boundaries

- Tag AI-generated text with badges/tooltips.
- Review AI-generated code for quality/accessibility.

---

## Performance Expectations

- Aim for <100ms TTFB (Vercel).
- Lazy load heavy components.
- Memoize expensive components.

```jsx
const MemoizedComponent = React.memo(ExpensiveComponent);
```

---

## Component File Structure

```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant, isLoading, children }) => {
  return (
    <button className={VARIANTS[variant]} disabled={isLoading}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
```

---

## Conclusion

These guidelines support building a delightful, consistent, and performant frontend for solopreneurs managing social media with SoloSpark.