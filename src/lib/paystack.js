import 'server-only';

import { validateCartItems } from '@/data/shopProducts';
import {
  DRAFT_POLICY_VERSION,
  isAllowedPaystackAuthorizationUrl,
  isYhlyPaymentReference,
} from '@/lib/paymentSecurity';

const paystackBaseUrl = 'https://api.paystack.co';

export function validateCustomer(input) {
  const customer = {
    name: typeof input?.name === 'string' ? input.name.trim() : '',
    email: typeof input?.email === 'string' ? input.email.trim().toLowerCase() : '',
    phone: typeof input?.phone === 'string' ? input.phone.trim() : '',
    address: typeof input?.address === 'string' ? input.address.trim() : '',
    city: typeof input?.city === 'string' ? input.city.trim() : '',
    state: typeof input?.state === 'string' ? input.state.trim() : '',
  };

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email);
  const validPhone = /^\+?[0-9 ()-]{7,20}$/.test(customer.phone);
  const validLength = (value, min, max) => value.length >= min && value.length <= max;

  if (
    !validLength(customer.name, 2, 100) ||
    !validEmail ||
    customer.email.length > 254 ||
    !validPhone ||
    !validLength(customer.address, 5, 200) ||
    !validLength(customer.city, 2, 80) ||
    !validLength(customer.state, 2, 80)
  ) {
    throw new Error('Please provide valid customer and property details.');
  }

  return customer;
}

async function paystackRequest(path, options = {}) {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    throw new Error('PAYSTACK_NOT_CONFIGURED');
  }

  const response = await fetch(`${paystackBaseUrl}${path}`, {
    ...options,
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    signal: AbortSignal.timeout(10000),
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.status) {
    throw new Error(payload?.message || 'Paystack could not process this request.');
  }

  return payload.data;
}

export async function initializePaystack({ customer, cart, reference, callbackUrl }) {
  if (!isYhlyPaymentReference(reference)) throw new Error('INVALID_REFERENCE');
  const order = validateCartItems(cart);
  const data = await paystackRequest('/transaction/initialize', {
    method: 'POST',
    body: JSON.stringify({
      email: customer.email,
      amount: order.amountKobo,
      currency: 'NGN',
      reference,
      callback_url: callbackUrl,
      metadata: {
        customer,
        order_items: order.items.map(({ product, quantity }) => ({ id: product.id, quantity })),
        policy_version: DRAFT_POLICY_VERSION,
      },
    }),
  });

  if (!isAllowedPaystackAuthorizationUrl(data.authorization_url) || data.reference !== reference) {
    throw new Error('Paystack returned an invalid checkout URL.');
  }

  return {
    authorizationUrl: new URL(data.authorization_url).toString(),
    reference: data.reference,
  };
}

export async function verifyPaystack(reference) {
  if (!isYhlyPaymentReference(reference)) {
    throw new Error('INVALID_REFERENCE');
  }

  const data = await paystackRequest(`/transaction/verify/${encodeURIComponent(reference)}`);
  const metadataItems = data.metadata?.order_items;
  const order = validateCartItems(metadataItems);
  const verified =
    data.reference === reference &&
    data.status === 'success' &&
    data.currency === 'NGN' &&
    data.amount === order.amountKobo &&
    data.metadata?.policy_version === DRAFT_POLICY_VERSION;

  return { verified, data, order };
}
