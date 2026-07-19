import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';

import { parseProductsCsv, PRODUCT_HEADERS } from '../scripts/product-csv.mjs';

const publicDir = path.resolve('public');

function csvRow(overrides = {}) {
  const values = {
    id: 'sample-service',
    sku: 'YHLY-SAMPLE-01',
    category: 'Consultation',
    name: 'Sample Service',
    price_ngn: '1234.56',
    unit: 'one session',
    image_path: '/services/interiors.jpg',
    image_alt: 'A finished room',
    description: 'A clear description.',
    variant_note: '',
    active: 'TRUE',
    sort_order: '10',
    ...overrides,
  };
  return `${PRODUCT_HEADERS.join(',')}\n${PRODUCT_HEADERS.map((header) => values[header]).join(',')}\n`;
}

test('converts decimal NGN exactly and emits active rows', async () => {
  const result = await parseProductsCsv(csvRow(), { publicDir });
  assert.equal(result.products.length, 1);
  assert.equal(result.products[0].priceKobo, 123456);
});

test('validates inactive rows but omits them from the snapshot', async () => {
  const result = await parseProductsCsv(csvRow({ active: 'FALSE' }), { publicDir });
  assert.deepEqual(result.products, []);
  await assert.rejects(
    parseProductsCsv(csvRow({ active: 'FALSE', image_path: '/missing.jpg' }), { publicDir }),
    /does not exist/,
  );
});

test('rejects unsafe money, paths and exact-header changes', async () => {
  await assert.rejects(
    parseProductsCsv(csvRow({ price_ngn: '1.001' }), { publicDir }),
    /price_ngn/,
  );
  await assert.rejects(
    parseProductsCsv(csvRow({ image_path: '/../outside.jpg' }), { publicDir }),
    /unsafe path segment/,
  );
  await assert.rejects(
    parseProductsCsv(csvRow().replace('price_ngn', 'price'), { publicDir }),
    /Headers: must exactly match/,
  );
});

test('rejects duplicate IDs, SKUs and sort order', async () => {
  const first = csvRow().trimEnd();
  const duplicate = PRODUCT_HEADERS.map((header) => {
    const replacements = { id: 'another-service', name: 'Another Service' };
    const source = first.split('\n')[1].split(',');
    return replacements[header] ?? source[PRODUCT_HEADERS.indexOf(header)];
  }).join(',');
  await assert.rejects(parseProductsCsv(`${first}\n${duplicate}\n`, { publicDir }), /sku.*unique/i);
});
