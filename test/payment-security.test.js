import assert from 'node:assert/strict';
import test from 'node:test';

import {
  isAllowedPaystackAuthorizationUrl,
  isYhlyPaymentReference,
} from '../src/lib/paymentSecurity.js';

test('accepts only app-specific version 4 UUID payment references', () => {
  assert.equal(isYhlyPaymentReference('YHLY-123e4567-e89b-42d3-a456-426614174000'), true);
  assert.equal(isYhlyPaymentReference('other-123e4567-e89b-42d3-a456-426614174000'), false);
  assert.equal(isYhlyPaymentReference('YHLY-123e4567-e89b-12d3-a456-426614174000'), false);
});

test('accepts Paystack HTTPS hosts and rejects lookalikes or URL credentials', () => {
  assert.equal(isAllowedPaystackAuthorizationUrl('https://checkout.paystack.com/example'), true);
  assert.equal(isAllowedPaystackAuthorizationUrl('https://paystack.com/example'), true);
  assert.equal(isAllowedPaystackAuthorizationUrl('https://evilpaystack.com/example'), false);
  assert.equal(isAllowedPaystackAuthorizationUrl('https://paystack.com.evil.test/example'), false);
  assert.equal(isAllowedPaystackAuthorizationUrl('https://user@paystack.com/example'), false);
  assert.equal(isAllowedPaystackAuthorizationUrl('http://checkout.paystack.com/example'), false);
});
