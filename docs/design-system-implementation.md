# SoloSpark Design System Implementation

This document outlines the implementation of the SoloSpark Design System, providing a reference for developers to maintain consistency across the application.

## Color Palette

| Role           | Color      | Hex       | Usage                                  |
| -------------- | ---------- | --------- | -------------------------------------- |
| **Primary**    | Amber Gold | `#F59E0B` | Main CTAs, highlights, branding        |
| **Secondary**  | Sky Blue   | `#0EA5E9` | Secondary buttons, links, hover states |
| **Accent**     | Indigo     | `#6366F1` | Badges, alerts, indicators             |
| **Neutral**    | Slate Gray | `#475569` | Text, borders, subtle UI elements      |
| **Background** | Off-White  | `#F9FAFB` | Page and card backgrounds              |

## Typography

### Font Families

- **Body Text**: Inter (weights: 400, 500, 700)
- **Headings**: Poppins (weights: 500, 700)

### Font Sizes

- Base size: 16px (14px on mobile)
- Heading scale:
  - H1: 3xl (2xl on mobile)
  - H2: 2xl (xl on mobile)
  - H3: xl (lg on mobile)
  - H4: lg (base on mobile)

## Spacing

Based on 8px grid system:

- `spacing.1`: 8px
- `spacing.2`: 16px
- `spacing.3`: 24px
- `spacing.4`: 32px

## Components

### Button

```jsx
<Button variant="primary" size="lg">Get Started</Button>
<Button variant="secondary" size="default">Save</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

Variants:

- `primary`: Amber Gold background with white text
- `secondary`: Sky Blue background with white text
- `ghost`: Transparent with border

Sizes:

- `sm`: Small (h-9)
- `default`: Medium (h-10)
- `lg`: Large (h-11)

### Card

```jsx
<Card shadow="sm">Content</Card>
<Card shadow="md" className="p-6">Content with padding</Card>
```

Properties:

- `shadow`: none, sm, md, lg
- Rounded corners (8px)
- Background color: Off-White

### Badge

```jsx
<Badge variant="primary">New</Badge>
<Badge variant="accent" isAI>AI-generated</Badge>
```

Variants:

- `primary`: Amber Gold
- `secondary`: Sky Blue
- `accent`: Indigo
- `outline`: Transparent with border

Special:

- `isAI`: Shows "✨ AI-generated" badge

### Input

```jsx
<Input label="Email" placeholder="Enter your email" />
<Input label="Password" type="password" error="Password is required" />
```

Features:

- Label support
- Error message support
- Focus states with ring

### Alert

```jsx
<Alert variant="success" title="Success">Your post has been scheduled!</Alert>
<Alert variant="error">Something went wrong.</Alert>
```

Variants:

- `success`: Green
- `error`: Red
- `warning`: Amber
- `info`: Blue

### Modal

```jsx
<Modal isOpen={isOpen} onClose={handleClose} title="Confirm Action">
  Modal content
</Modal>
```

Features:

- Backdrop blur
- 300ms fade-in transition
- Close button
- Title support

## Layout

### Grid System

- 12-column grid
- 16px gutters
- Responsive breakpoints:
  - Mobile: < 768px (single column)
  - Tablet: 768px - 1024px (2-3 columns)
  - Desktop: > 1024px (multiple columns)

### Responsive Design

- Mobile-first approach
- Font size reduction on mobile
- Stack columns on smaller screens
- Collapsible sidebar on mobile

## Animations

- Button hover: 1.05x scale, 200ms transition
- Modal: 300ms fade-in with backdrop blur
- Page transitions: Subtle fade-in from bottom (opacity + y-axis)
- Status indicators: Scale + fade animations

## Accessibility

- WCAG AA compliant color contrast
- Semantic HTML structure
- ARIA attributes where needed
- Focus states for keyboard navigation
- Screen reader friendly text alternatives

## Brand Voice in UI

- Success messages: "Smart move! Post scheduled. 🎉"
- Empty states: "Nothing yet? Time to spark some chaos!"
- Placeholders: "Let's make this post sing."
- Error messages: "Oops, check your email or strengthen that password!"

## Implementation Files

- `tailwind.config.js`: Color palette, typography, spacing
- `globals.css`: Base styles, typography rules
- `components/ui/`: Core UI components
- `components/layout/`: Layout components
- `components/post/`: Post editor components
- `components/analytics/`: Analytics components
- `components/calendar/`: Calendar components

## Usage Guidelines

1. Always use the design system components instead of creating custom ones
2. Maintain consistent spacing using the 8px grid
3. Follow the typography hierarchy for content structure
4. Use animations sparingly and consistently
5. Ensure all UI elements meet accessibility standards
