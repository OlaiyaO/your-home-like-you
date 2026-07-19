# Launch Checklist

## Required Business Facts

- Confirm legal entity and registration details.
- Confirm founder name, approved biography, and portrait.
- Confirm phone and WhatsApp numbers.
- Confirm contact email, service area, address, and opening hours.
- Confirm domain and social media URLs.

## Proof and Content

- Send the business `docs/CONTENT_REQUEST.md` and collect the source files in one shared folder.
- Replace every stock reference with owned or licensed photography.
- Add at least three verified projects with scope, location, dates, and before-and-after images.
- Obtain written permission for every testimonial and project image.
- Confirm service inclusions, exclusions, inspection fees, and quote validity.

## Commerce

- Approve product catalogue, SKUs, dimensions, pricing, stock rules, and photography.
- Add delivery, returns, refunds, privacy, and terms pages.
- Configure `NEXT_PUBLIC_SITE_URL` and a Paystack test `PAYSTACK_SECRET_KEY`; verify the hosted checkout callback before considering live keys.
- Add signed Paystack webhooks and persistent order storage before relying on asynchronous fulfilment events.
- Select authentication and database providers only when customer accounts are required.

## Lead Delivery

- Select email or CRM provider for `/api/quote`.
- Add spam protection and request rate limiting.
- Test contact routing and response ownership.

## Deployment

- Populate `.env.local` from `.env.example`.
- Run `npm run format:check`, `npm run lint`, and `npm run build`.
- Configure DNS, HTTPS, analytics, Search Console, sitemap, robots, and social preview image.
- Complete accessibility, device, performance, and legal review.
