---
trigger: always_on
---

This document maps the user journey through SoloSpark, focusing on decision points, feedback loops, and edge cases to deliver an intuitive, rewarding experience for solopreneurs. It highlights the app’s core workflows—“Post Once, Tweak Everywhere” and the analytics-driven insight loop—while weaving in a warm, playful brand voice that makes social media management feel like a quick win. The flow is structured as a table for clarity and includes detailed subflows for key features.

---

## App Flow Table

| **Screen**          | **Trigger**                     | **Key Actions**                                                                 | **Next Steps**                             | **Errors/States**                                                                 |
|---------------------|---------------------------------|--------------------------------------------------------------------------------|--------------------------------------------|-----------------------------------------------------------------------------------|
| **Landing Page**    | Direct URL / Google / Ad        | - Sign Up <br> - Log In <br> - Learn More                                      | - Sign Up → Sign Up Page <br> - Log In → Login Page <br> - Learn More (scrolls down) | - N/A                                                                             |
| **Sign Up Page**    | Click Sign Up                   | - Enter email, password, agree to terms                                        | → Onboarding (after sign-up)               | - Invalid email or weak password: “Oops, check your email or strengthen that password!” |
| **Login Page**      | Click Log In                    | - Enter email/password                                                         | → Dashboard (on success)                   | - Failed login: “Hmm, those credentials don’t match. Try again or reset password.” |
| **Onboarding**      | After Sign Up                   | - Connect social accounts (Instagram, X, LinkedIn) <br> - Set schedule or use AI suggestion <br> - Skip to explore | → Dashboard (after connecting one account or skipping) | - No accounts connected: Prompt “Connect at least one account to post!” <br> - Skip: Limited mode (view-only Dashboard) |
| **Dashboard**       | Login success / Return user     | - “Create Post” <br> - View Calendar <br> - View Analytics                     | - → Post Editor <br> - → Calendar <br> - → Analytics | - No posts: “Schedule your first post, chaos gremlin!” <br> - Returning user: “Welcome back! Your last post crushed it.” |
| **Post Editor**     | Click “Create Post”             | - Enter text/media <br> - Select platforms <br> - Tweak per platform <br> - Use AI suggestions <br> - Schedule | → Calendar (after scheduling)              | - Missing fields: Disable “Schedule” with “Add content and pick a platform!” <br> - API failure: “Something went wrong. Retry or tweak your post?” |
| **Calendar**        | After scheduling / Nav from Dashboard | - View posts <br> - Drag to reschedule <br> - Click to edit/delete           | - → Post Editor (edit) <br> - Back to Dashboard | - Empty state: “No posts yet? Let’s fix that—create one now!”                     |
| **Analytics**       | Click “View Analytics”          | - View metrics <br> - See “Quick Wins” <br> - Recycle top posts                | - → Post Editor (recycle) <br> - Back to Dashboard | - No data: “Post something to see insights, superstar!”                           |
| **Settings**        | Avatar click from Dashboard     | - Update profile <br> - Manage accounts <br> - View/upgrade plan               | ← Back to Dashboard                        | - Free Plan: Subtle prompt: “Unlock unlimited posts with Solo Pro!”               |

---

## Signature Workflow: “Post Once, Tweak Everywhere”
The heart of SoloSpark, this workflow lets users create one post, customize it for multiple platforms, and schedule it effortlessly.

| **Step**                | **User Action**                                                                 | **System Response**                                                                 |
|-------------------------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| **Enter Content**       | Type caption or upload image/video                                              | Live preview updates for selected platforms; show character count per platform      |
| **Select Platforms**    | Toggle Instagram, X, LinkedIn                                                   | Display platform-specific requirements (e.g., “X: 280 chars max, Instagram: 30 hashtags”) |
| **Tweak per Platform**  | Edit caption, hashtags, or media for each platform                              | Real-time validation (e.g., “Too long for X!”) and inline previews                  |
| **AI Suggestions**      | Click “Suggest Caption” or “Optimize Hashtags”                                  | AI offers 2–3 caption/hashtag options based on trends and past performance          |
| **Schedule**            | Pick date/time or click “Best Time” for AI suggestion                           | Post added to calendar; success message: “Smart move! Post scheduled. 🎉”           |

- **Edge Cases**:
  - **No Platforms Selected**: Disable “Schedule” with prompt: “Pick at least one platform to continue!”
  - **API Failure**: “Couldn’t schedule. Retry or contact support?” with retry button.
  - **Platform Rejection**: “Instagram rejected this post for [reason, e.g., sensitive content]. Tweak it with AI?” with button to reopen editor with suggestions.

---

## Insight Loop: Analytics → Action
The **Analytics** screen turns data into actionable wins, encouraging users to recycle high-performing posts with AI support.

| **Step**                | **User Action**                                                  