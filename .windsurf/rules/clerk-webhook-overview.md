---
trigger: always_on
---

# Clerk Webhooks Overview

## Introduction to Webhooks

Webhooks enable real-time communication between Clerk and your application by sending POST requests to a specified URL when specific events occur in your Clerk account. This allows your app to stay updated with user and organization changes without polling the Clerk API.[](https://clerk.com/docs/integrations/webhooks)

## How Webhooks Work

Clerk webhooks notify your application of events like user creation, updates, or deletions. When an event occurs, Clerk sends a POST request containing a JSON payload with event details to your configured endpoint. This payload includes:
- `object`: The type of object (e.g., "user", "organization").
- `type`: The specific event (e.g., "user.created", "user.updated").
- `data`: Details about the event, such as user or organization data.

Your application must acknowledge receipt by responding with a 2xx status code (e.g., 200 OK). If Clerk doesn't receive a 2xx response, it retries delivery multiple times over 24 hours.[](https://clerk.com/docs/integrations/webhooks)

## Setting Up Webhooks

To configure a webhook in Clerk:
1. **Access the Clerk Dashboard**: Navigate to the Webhooks section.
2. **Add an Endpoint**: Specify a publicly accessible URL (e.g., `https://your-app.com/api/webhooks/clerk`).
3. **Select Events**: Choose which events to subscribe to (e.g., `user.created`, `organization.updated`).
4. **Obtain Signing Secret**: After creating the endpoint, Clerk provides a signing secret (e.g., `whsec_...`) to verify webhook authenticity. Store this securely in your app’s environment variables (e.g., `.env.local`).

For local development, use tools like ngrok to create a secure tunnel to your localhost, ensuring Clerk can reach your endpoint. Example: `https://moved-werewolf-especially.ngrok-free.app/api/webhooks/clerk`.[](https://willschenk.com/labnotes/2024/clerk_webhooks/)[](https://ngrok.com/docs/integrations/clerk/webhooks/)

## Verifying Webhook Signatures

To ensure webhook requests come from Clerk, verify the request signature using the signing secret. Clerk includes three headers:
- `svix-id`: Unique message ID.
- `svix-timestamp`: Timestamp of the request.
- `svix-signature`: Cryptographic signature.

Use the Svix library (e.g., `npm install svix` for Node.js) to validate the signature. Example in JavaScript:
```javascript
const { Webhook } = require('svix');
const webhook = new Webhook(process.env.WEBHOOK_SECRET);
try {
  const payload = webhook.verify(req.body, req.headers);
  // Process valid payload
} catch (err) {
  // Invalid signature
  res.status(400).send('Invalid signature');
}
```
This ensures the request is authentic and untampered.[](https://willschenk.com/labnotes/2024/clerk_webhooks/)

## Handling Webhook Events

Your endpoint should parse the JSON payload to handle specific events. For example, to process a `user.created` event and send a welcome email:
1. Check the `type` field in the payload.
2. Extract relevant data (e.g., user’s email from `data.email_addresses`).
3. Perform actions like sending an email or syncing data to your database.

Example payload for `user.created`:
```json
{
  "object": "user",
  "type": "user.created",
  "data": {
    "id": "user_123",
    "email_addresses": [{ "email_address": "user@example.com" }],
    "created_at": "2025-02-21T02:00:00Z"
  }
}
```
Ensure your endpoint is idempotent, as Clerk may retry failed deliveries.[](https://willschenk.com/labnotes/2024/clerk_webhooks/)

## Debugging Webhooks

If webhook deliveries fail (e.g., non-2xx responses), Clerk retries over 24 hours. To debug:
- Check the Clerk Dashboard for delivery logs and error details.
- Use tools like Hookdeck for monitoring and debugging webhook events.
- Ensure your endpoint is accessible and handles payloads correctly.

Common issues include incorrect URLs, firewall blocks, or signature verification failures.[](https://clerk.com/docs/webhooks/debug-your-webhooks)[](https://hookdeck.com/webhooks/platforms/page/1/clerk)

## Use Cases

Webhooks are ideal for:
- **Syncing Data**: Update your database (e.g., MongoDB, Prisma) with Clerk user or organization data.[](https://dev.to/devlawrence/sync-clerk-users-to-your-database-using-webhooks-a-step-by-step-guide-263i)[](https://gist.github.com/perkinsjr/0e4f380403083d5782049affaaafaacd)
- **Automated Emails**: Trigger emails via services like Loops for events like `user.created`.[](https://clerk.com/docs/webhooks/loops)
- **Custom Workflows**: Integrate with external systems to perform actions based on Clerk events.

## Best Practices

- **Secure Endpoints**: Use HTTPS and verify signatures to prevent unauthorized access.
- **Handle Retries**: Design endpoints to handle duplicate events gracefully.
- **Monitor Deliveries**: Regularly check the Clerk Dashboard for failed deliveries.
- **Test Locally**: Use ngrok or similar tools to test webhooks during development.[](https://ngrok.com/docs/integrations/clerk/webhooks/)

## Additional Resources

- [Clerk Webhooks Documentation](https://clerk.com/docs/webhooks/overview)
- [Syncing Data Guide](https://clerk.com/docs/webhooks/sync-data)
- [Debugging Webhooks](https://clerk.com/docs/webhooks/debug)
- [Clerk + Loops Integration](https://clerk.com/docs/integrations/loops)

For advanced setups, explore Clerk’s SDKs (e.g., `clerk-sdk-python`) or community guides on GitHub.[](https://github.com/clerk/clerk-sdk-python/blob/main/docs/sdks/webhooks/README.md)[](https://gist.github.com/perkinsjr/0e4f380403083d5782049affaaafaacd)

*Last updated: February 21, 2025*[](https://clerk.com/docs/webhooks/overview)