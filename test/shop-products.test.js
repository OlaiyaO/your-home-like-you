import assert from 'node:assert/strict';
import test from 'node:test';

import { shopProducts, validateCartItems } from '../src/data/shopProducts.js';

test('calculates the amount from catalogue prices', () => {
  const first = shopProducts[0];
  const second = shopProducts[1];
  const order = validateCartItems([
    { id: first.id, quantity: 2 },
    { id: second.id, quantity: 1 },
  ]);

  assert.equal(order.amountKobo, first.priceKobo * 2 + second.priceKobo);
});

test('rejects unknown products and client-injected prices', () => {
  assert.throws(() => validateCartItems([{ id: 'unknown', quantity: 1, priceKobo: 1 }]), /invalid/);
});

test('rejects duplicate products and unsafe quantities', () => {
  const { id } = shopProducts[0];

  assert.throws(
    () =>
      validateCartItems([
        { id, quantity: 1 },
        { id, quantity: 1 },
      ]),
    /Duplicate/,
  );
  assert.throws(() => validateCartItems([{ id, quantity: 6 }]), /invalid/);
});
