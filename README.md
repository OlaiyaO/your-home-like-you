This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Shop and Paystack

Copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_SITE_URL` to the public site origin, and add a Paystack **test** secret key as `PAYSTACK_SECRET_KEY`. Leave the key empty to keep checkout in its visible configuration-pending state.

The shop uses Paystack hosted checkout. Catalogue data is validated from `catalog/products.csv` (or `PRODUCTS_CSV_URL`) into `src/data/products.snapshot.json`; the initialize route recalculates every order from product IDs and quantities and never accepts a client amount. Paystack returns to `/shop/payment/callback`, where the transaction status, NGN currency, YHLY reference, items and server-calculated amount are verified before success is shown.

Run `npm run products:sync` after an approved catalogue change. Development and production builds run `npm run products:check` and stop if the source is invalid or the committed snapshot is stale. See `docs/PRODUCT_OPERATIONS.md` for the complete workflow.

Do not use a live key until the catalogue, legal policies, fulfilment process and Paystack account are production-ready.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
