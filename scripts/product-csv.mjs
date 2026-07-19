import path from 'node:path';
import { realpath, stat } from 'node:fs/promises';

import { parse } from 'csv-parse/sync';

export const PRODUCT_HEADERS = [
  'id',
  'sku',
  'category',
  'name',
  'price_ngn',
  'unit',
  'image_path',
  'image_alt',
  'description',
  'variant_note',
  'active',
  'sort_order',
];

export const MAX_CSV_BYTES = 1024 * 1024;
export const MAX_CSV_ROWS = 500;
const allowedImageExtensions = new Set(['.avif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);

function fail(row, field, message) {
  const location = row ? `Row ${row}, ${field}` : field;
  throw new Error(`${location}: ${message}`);
}

function requireLength(value, field, row, min, max) {
  if (value.length < min || value.length > max) {
    fail(row, field, `must be between ${min} and ${max} characters.`);
  }
  return value;
}

function ngnToKobo(value, row) {
  if (!/^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(value)) {
    fail(
      row,
      'price_ngn',
      'must be a positive decimal NGN amount with at most two decimal places.',
    );
  }

  const [naira, fraction = ''] = value.split('.');
  const kobo = BigInt(naira) * 100n + BigInt(fraction.padEnd(2, '0'));
  if (kobo <= 0n || kobo > BigInt(Number.MAX_SAFE_INTEGER)) {
    fail(row, 'price_ngn', 'is outside the safely supported amount range.');
  }
  return Number(kobo);
}

async function validateImage(imagePath, row, publicDir) {
  requireLength(imagePath, 'image_path', row, 2, 200);
  if (
    !imagePath.startsWith('/') ||
    imagePath.startsWith('//') ||
    imagePath.includes('\\') ||
    imagePath.includes('?') ||
    imagePath.includes('#')
  ) {
    fail(row, 'image_path', 'must be a root-relative local path.');
  }

  const segments = imagePath.slice(1).split('/');
  if (segments.some((segment) => !segment || segment === '.' || segment === '..')) {
    fail(row, 'image_path', 'contains an unsafe path segment.');
  }
  if (!allowedImageExtensions.has(path.extname(imagePath).toLowerCase())) {
    fail(row, 'image_path', 'has an unsupported image extension.');
  }

  const resolvedPublic = await realpath(path.resolve(publicDir));
  const resolvedImage = path.resolve(resolvedPublic, `.${imagePath}`);
  if (!resolvedImage.startsWith(`${resolvedPublic}${path.sep}`)) {
    fail(row, 'image_path', 'must remain inside the public directory.');
  }

  let realImage;
  try {
    realImage = await realpath(resolvedImage);
    const imageStat = await stat(realImage);
    if (!imageStat.isFile()) throw new Error('not a file');
  } catch {
    fail(row, 'image_path', `does not exist in public (${imagePath}).`);
  }
  if (!realImage.startsWith(`${resolvedPublic}${path.sep}`)) {
    fail(row, 'image_path', 'must not resolve outside the public directory.');
  }
}

export async function parseProductsCsv(csv, { publicDir }) {
  if (Buffer.byteLength(csv, 'utf8') > MAX_CSV_BYTES) {
    fail(0, 'CSV', 'must not exceed 1 MB.');
  }

  let records;
  try {
    records = parse(csv, { bom: true, columns: false, skip_empty_lines: true, trim: true });
  } catch (error) {
    throw new Error(`CSV is malformed: ${error.message}`);
  }

  if (records.length === 0) fail(0, 'CSV', 'must include a header row.');
  const [headers, ...rows] = records;
  if (
    headers.length !== PRODUCT_HEADERS.length ||
    headers.some((header, index) => header !== PRODUCT_HEADERS[index])
  ) {
    fail(0, 'Headers', `must exactly match: ${PRODUCT_HEADERS.join(',')}`);
  }
  if (rows.length > MAX_CSV_ROWS) fail(0, 'CSV', `must not exceed ${MAX_CSV_ROWS} data rows.`);

  const ids = new Set();
  const skus = new Set();
  const sortOrders = new Set();
  const products = [];

  for (const [index, values] of rows.entries()) {
    const row = index + 2;
    if (values.length !== PRODUCT_HEADERS.length) {
      fail(row, 'columns', `must contain exactly ${PRODUCT_HEADERS.length} values.`);
    }
    const record = Object.fromEntries(
      PRODUCT_HEADERS.map((header, column) => [header, values[column]]),
    );

    requireLength(record.id, 'id', row, 1, 80);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.id)) {
      fail(row, 'id', 'must be a lowercase slug.');
    }
    requireLength(record.sku, 'sku', row, 1, 50);
    if (!/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(record.sku)) {
      fail(row, 'sku', 'must contain only letters, numbers and single hyphens.');
    }
    if (ids.has(record.id)) fail(row, 'id', 'must be unique.');
    if (skus.has(record.sku.toLowerCase())) fail(row, 'sku', 'must be unique (case-insensitive).');
    ids.add(record.id);
    skus.add(record.sku.toLowerCase());

    if (!/^\d+$/.test(record.sort_order)) fail(row, 'sort_order', 'must be an integer.');
    const sortOrder = Number(record.sort_order);
    if (!Number.isSafeInteger(sortOrder) || sortOrder < 0) {
      fail(row, 'sort_order', 'must be a non-negative safe integer.');
    }
    if (sortOrders.has(sortOrder)) fail(row, 'sort_order', 'must be unique.');
    sortOrders.add(sortOrder);

    if (record.active !== 'TRUE' && record.active !== 'FALSE') {
      fail(row, 'active', 'must be exactly TRUE or FALSE.');
    }
    await validateImage(record.image_path, row, publicDir);

    const product = {
      id: record.id,
      sku: record.sku,
      category: requireLength(record.category, 'category', row, 1, 100),
      name: requireLength(record.name, 'name', row, 1, 120),
      priceKobo: ngnToKobo(record.price_ngn, row),
      unit: requireLength(record.unit, 'unit', row, 1, 80),
      image: record.image_path,
      imageAlt: requireLength(record.image_alt, 'image_alt', row, 1, 200),
      description: requireLength(record.description, 'description', row, 1, 500),
      variantNote: requireLength(record.variant_note, 'variant_note', row, 0, 200),
      sortOrder,
    };
    if (record.active === 'TRUE') products.push(product);
  }

  products.sort((left, right) => left.sortOrder - right.sortOrder);
  return { products };
}
