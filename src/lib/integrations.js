export const integrations = {
  paystack: {
    enabled: Boolean(process.env.PAYSTACK_SECRET_KEY),
    initializeEndpoint: '/api/payments/paystack/initialize',
    currency: 'NGN',
  },
  auth: {
    enabled: Boolean(process.env.AUTH_SECRET && process.env.DATABASE_URL),
    provider: 'pending-selection',
    intendedUse: ['customer order history', 'saved addresses', 'admin catalogue management'],
  },
  leadDelivery: {
    enabled: Boolean(process.env.EMAIL_API_KEY && process.env.EMAIL_FROM),
    endpoint: '/api/quote',
  },
};
