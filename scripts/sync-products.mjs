import { constants } from 'node:fs';
import { access, readFile, rename, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { MAX_CSV_BYTES, parseProductsCsv } from './product-csv.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const localCsvPath = path.join(projectRoot, 'catalog/products.csv');
const snapshotPath = path.join(projectRoot, 'src/data/products.snapshot.json');
const checkOnly = process.argv.slice(2).includes('--check');

if (process.argv.slice(2).some((argument) => argument !== '--check')) {
  throw new Error('Usage: node scripts/sync-products.mjs [--check]');
}

async function readRemoteCsv(source) {
  let url;
  try {
    url = new URL(source);
  } catch {
    throw new Error('PRODUCTS_CSV_URL must be a valid HTTPS URL.');
  }
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error('PRODUCTS_CSV_URL must be an HTTPS URL without credentials.');
  }

  const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Product CSV download failed with HTTP ${response.status}.`);
  if (new URL(response.url).protocol !== 'https:')
    throw new Error('Product CSV redirected outside HTTPS.');
  const declaredLength = Number(response.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_CSV_BYTES) {
    throw new Error('Product CSV must not exceed 1 MB.');
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('Product CSV response had no body.');
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_CSV_BYTES) {
      await reader.cancel();
      throw new Error('Product CSV must not exceed 1 MB.');
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks, size).toString('utf8');
}

async function loadCsv() {
  if (process.env.PRODUCTS_CSV_URL) return readRemoteCsv(process.env.PRODUCTS_CSV_URL);
  const csvStat = await stat(localCsvPath);
  if (csvStat.size > MAX_CSV_BYTES) throw new Error('Product CSV must not exceed 1 MB.');
  return readFile(localCsvPath, 'utf8');
}

const snapshot = await parseProductsCsv(await loadCsv(), {
  publicDir: path.join(projectRoot, 'public'),
});
const output = `${JSON.stringify(snapshot, null, 2)}\n`;

if (checkOnly) {
  await access(snapshotPath, constants.R_OK).catch(() => {
    throw new Error('Product snapshot is missing. Run npm run products:sync.');
  });
  const current = await readFile(snapshotPath, 'utf8');
  if (current !== output) throw new Error('Product snapshot is stale. Run npm run products:sync.');
  console.log(`Product snapshot is current (${snapshot.products.length} active products).`);
} else {
  const temporaryPath = `${snapshotPath}.${process.pid}.tmp`;
  try {
    await writeFile(temporaryPath, output, { encoding: 'utf8', flag: 'wx' });
    await rename(temporaryPath, snapshotPath);
  } finally {
    await unlink(temporaryPath).catch(() => {});
  }
  console.log(`Product snapshot updated (${snapshot.products.length} active products).`);
}
