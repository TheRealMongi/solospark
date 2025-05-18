# SoloSpark Phase 3: MVP Scheduling Features

This phase implements the core scheduling workflow—"Post Once, Tweak Everywhere"—which is the central feature of SoloSpark. This includes a rich post editor with platform-specific tweaks, AI-powered caption suggestions, and a visual drag-and-drop calendar.

## Features Implemented

1. **Post Editor Component**
   - Rich text editor with character counting
   - Platform toggles (Instagram, X, LinkedIn)
   - Platform-specific customization tabs
   - Media upload placeholder
   - AI caption suggestions
   - Date and time scheduling

2. **AI Caption Suggestions**
   - Integration with OpenAI API (GPT-4o-mini)
   - Rate limiting via Upstash Redis
   - Platform-specific caption generation
   - Tone customization

3. **Visual Calendar**
   - FullCalendar integration
   - Drag-and-drop rescheduling
   - Post details modal
   - Edit/delete functionality

4. **Backend Integration**
   - tRPC procedures for post operations
   - Zod validation schemas
   - Background job scheduling via BullMQ
   - User authentication via Clerk

## Installation

1. Install the new dependencies:

```bash
npm install @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/react @fullcalendar/timegrid @hookform/resolvers @radix-ui/react-tabs @upstash/redis lucide-react openai react-datepicker
```

2. Update your `.env.local` file with the required environment variables:

```
# OpenAI API (for AI caption generation)
OPENAI_API_KEY=your_openai_api_key

# Upstash Redis REST API (for rate limiting)
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_rest_token
```

3. Start the development server:

```bash
npm run dev:all
```

## Usage

1. Navigate to `/dashboard` to access the main dashboard.
2. Use the "Create Post" tab to create and schedule posts.
3. Use the "Calendar" tab to view, edit, and reschedule posts.

## Implementation Details

### Components

- `/components/post/PostEditor.tsx`: Main post creation form
- `/components/post/PlatformToggles.tsx`: Platform selection toggles
- `/components/calendar/CalendarView.tsx`: Visual calendar for post management
- `/components/ui/tabs.tsx`: UI component for tabbed interface

### Backend

- `/lib/aiClient.ts`: OpenAI integration for caption generation
- `/lib/routers/postRouter.ts`: tRPC router for post operations
- `/schemas/postSchema.ts`: Zod validation schemas

### Pages

- `/pages/dashboard/index.tsx`: Main dashboard page with tabs for post editor and calendar

## Next Steps

- Implement analytics dashboard
- Add real platform API integrations
- Enhance AI suggestions with analytics data
- Implement user settings and preferences

## Notes

- Platform APIs are currently mocked
- "Suggest Time" feature returns fixed times for MVP
- Media upload is a placeholder UI only
