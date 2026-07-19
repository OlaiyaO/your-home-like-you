/**
 * Sheet-bound Apps Script for the YHLY catalogue Forms workflow.
 * Run setupCatalogueForms() once from the catalogue spreadsheet.
 */

const PRODUCT_HEADERS = [
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

const SHEETS = {
  products: 'Products',
  baseline: 'Catalogue Baseline',
  setup: 'Setup',
  log: 'Import Log',
};

const SETTINGS = {
  addFormId: 'Add/update form ID',
  addFormUrl: 'Add/update form URL',
  addEditUrl: 'Add/update form edit URL',
  addResponses: 'Add/update response tab',
  archiveFormId: 'Archive form ID',
  archiveFormUrl: 'Archive form URL',
  archiveEditUrl: 'Archive form edit URL',
  archiveResponses: 'Archive response tab',
};

const LOG_HEADERS = ['timestamp', 'source', 'row', 'product_id', 'action', 'error'];
const ADD_REQUIRED_FIELDS = PRODUCT_HEADERS.filter((header) => header !== 'variant_note');

function setupCatalogueForms() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);

  try {
    const products = getOrCreateProductsSheet_(spreadsheet);
    createBaselineOnce_(spreadsheet, products);
    const existingSettings = readSettings_(spreadsheet);

    const add = getOrCreateForm_(
      spreadsheet,
      existingSettings,
      SETTINGS.addFormId,
      SETTINGS.addResponses,
      'YHLY catalogue: add or update service',
      buildAddUpdateForm_,
    );
    const archive = getOrCreateForm_(
      spreadsheet,
      existingSettings,
      SETTINGS.archiveFormId,
      SETTINGS.archiveResponses,
      'YHLY catalogue: archive service',
      buildArchiveForm_,
    );

    writeSettings_(spreadsheet, [
      [SETTINGS.addFormId, add.form.getId()],
      [SETTINGS.addFormUrl, add.form.getPublishedUrl()],
      [SETTINGS.addEditUrl, add.form.getEditUrl()],
      [SETTINGS.addResponses, add.responseSheetName],
      [SETTINGS.archiveFormId, archive.form.getId()],
      [SETTINGS.archiveFormUrl, archive.form.getPublishedUrl()],
      [SETTINGS.archiveEditUrl, archive.form.getEditUrl()],
      [SETTINGS.archiveResponses, archive.responseSheetName],
      ['Last setup', new Date()],
    ]);
    installSubmitTrigger_(spreadsheet);
    rebuildPublishedProducts_();
  } finally {
    lock.releaseLock();
  }
}

function onFormSubmit() {
  rebuildPublishedProducts();
}

function rebuildPublishedProducts() {
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    rebuildPublishedProducts_();
  } finally {
    lock.releaseLock();
  }
}

function rebuildPublishedProducts_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const settings = readSettings_(spreadsheet);
  const errors = [];
  const records = new Map();

  const baseline = spreadsheet.getSheetByName(SHEETS.baseline);
  if (!baseline) throw new Error('Catalogue Baseline is missing. Run setupCatalogueForms().');
  readProductRows_(baseline).forEach((entry) => {
    try {
      const record = normalizeRecord_(entry.record);
      validateRecord_(record, records, null);
      records.set(record.id, record);
    } catch (error) {
      errors.push(logError_(entry, 'Baseline', error));
    }
  });
  if (records.size > 500) {
    errors.push(['', 'Baseline', '', '', '', 'must not exceed 500 rows.']);
  }
  if (errors.length) {
    writeImportLog_(spreadsheet, errors);
    throw new Error('Catalogue Baseline is invalid. Review Import Log before rebuilding.');
  }

  const events = [];
  collectEvents_(spreadsheet, settings[SETTINGS.addResponses], 'Add/update', false, events, errors);
  collectEvents_(spreadsheet, settings[SETTINGS.archiveResponses], 'Archive', true, events, errors);
  events.sort(compareEvents_);

  events.forEach((event) => {
    try {
      applyEvent_(event, records);
    } catch (error) {
      errors.push(logError_(event, event.action, error));
    }
  });

  writeProducts_(spreadsheet, Array.from(records.values()));
  writeImportLog_(spreadsheet, errors);
}

function getOrCreateProductsSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(SHEETS.products);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEETS.products);
    sheet.getRange(1, 1, 1, PRODUCT_HEADERS.length).setValues([PRODUCT_HEADERS]);
  }
  assertHeaders_(sheet, PRODUCT_HEADERS);
  return sheet;
}

function createBaselineOnce_(spreadsheet, products) {
  if (spreadsheet.getSheetByName(SHEETS.baseline)) return;
  const baseline = spreadsheet.insertSheet(SHEETS.baseline);
  const values = products.getDataRange().getDisplayValues();
  baseline.getRange(1, 1, values.length, PRODUCT_HEADERS.length).setValues(values);
  baseline.hideSheet();
}

function getOrCreateForm_(spreadsheet, settings, idKey, responseKey, title, builder) {
  let form = null;
  if (settings[idKey]) {
    try {
      form = FormApp.openById(settings[idKey]);
    } catch (error) {
      form = null;
    }
  }
  if (form) {
    const responseSheet = spreadsheet.getSheetByName(settings[responseKey]);
    if (!responseSheet) throw new Error(`Stored response tab is missing: ${settings[responseKey]}`);
    return { form: form, responseSheetName: responseSheet.getName() };
  }

  const existingSheetIds = new Set(spreadsheet.getSheets().map((sheet) => sheet.getSheetId()));
  form = FormApp.create(title);
  form.setAcceptingResponses(false);
  builder(form);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  SpreadsheetApp.flush();
  const responseSheet = spreadsheet
    .getSheets()
    .find((sheet) => !existingSheetIds.has(sheet.getSheetId()));
  if (!responseSheet) throw new Error(`Could not identify the response tab created for ${title}.`);
  return { form: form, responseSheetName: responseSheet.getName() };
}

function buildAddUpdateForm_(form) {
  secureStaffForm_(form);
  form
    .setDescription(
      'STAFF ONLY. Submit catalogue content only. Do not enter customer, order, enquiry, address, contact or payment data. Responses are append-only and do not publish instantly. Use Add for a new immutable id; use Update with an existing id and complete only fields that should change.',
    )
    .setConfirmationMessage(
      'Recorded for catalogue review. This has not published to the storefront. Review Products, validate the CSV snapshot and deploy it.',
    )
    .setAllowResponseEdits(false);
  form
    .addMultipleChoiceItem()
    .setTitle('Action')
    .setChoiceValues(['Add', 'Update'])
    .setRequired(true);
  PRODUCT_HEADERS.forEach((header) => {
    const item = form
      .addTextItem()
      .setTitle(header)
      .setRequired(header === 'id');
    if (header === 'id') item.setHelpText('Immutable lowercase hyphenated product ID.');
    if (header === 'unit') item.setHelpText('YHLY selling unit, for example: one session.');
    if (header === 'active') item.setHelpText('Enter exactly TRUE or FALSE.');
    if (header === 'variant_note') item.setHelpText('Optional. Leave blank to omit on Add.');
  });
}

function buildArchiveForm_(form) {
  secureStaffForm_(form);
  form
    .setDescription(
      'STAFF ONLY. Archive an existing catalogue service by immutable product id. Do not enter customer, order, enquiry, address, contact or payment data. This preserves the service as inactive and does not publish instantly.',
    )
    .setConfirmationMessage(
      'Archive request recorded. Review Products, validate the CSV snapshot and deploy it.',
    )
    .setAllowResponseEdits(false);
  form
    .addTextItem()
    .setTitle('id')
    .setHelpText('Existing immutable lowercase hyphenated product ID.')
    .setRequired(true);
}

function secureStaffForm_(form) {
  form.setCollectEmail(false).setPublishingSummary(false).setShowLinkToRespondAgain(true);
  try {
    form.setRequireLogin(true);
  } catch (error) {
    // Consumer Google accounts may not expose Workspace login controls; the Form stays closed.
  }
}

function installSubmitTrigger_(spreadsheet) {
  ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === 'onFormSubmit')
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));
  ScriptApp.newTrigger('onFormSubmit').forSpreadsheet(spreadsheet).onFormSubmit().create();
}

function readSettings_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName(SHEETS.setup);
  if (!sheet || sheet.getLastRow() < 2) return {};
  return Object.fromEntries(
    sheet
      .getRange(2, 1, sheet.getLastRow() - 1, 2)
      .getDisplayValues()
      .filter((row) => row[0]),
  );
}

function writeSettings_(spreadsheet, rows) {
  let sheet = spreadsheet.getSheetByName(SHEETS.setup);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEETS.setup);
  sheet.clearContents();
  sheet.getRange(1, 1, 1, 2).setValues([['Setting', 'Value']]);
  sheet.getRange(2, 1, rows.length, 2).setValues(rows);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 2);
}

function readProductRows_(sheet) {
  assertHeaders_(sheet, PRODUCT_HEADERS);
  if (sheet.getLastRow() < 2) return [];
  return sheet
    .getRange(2, 1, sheet.getLastRow() - 1, PRODUCT_HEADERS.length)
    .getDisplayValues()
    .filter((row) => row.some((value) => value !== ''))
    .map((row, index) => ({
      timestamp: '',
      source: sheet.getName(),
      row: index + 2,
      productId: row[0],
      action: 'Baseline',
      record: Object.fromEntries(PRODUCT_HEADERS.map((header, column) => [header, row[column]])),
    }));
}

function collectEvents_(spreadsheet, sheetName, source, archive, events, errors) {
  if (!sheetName) {
    errors.push([
      '',
      source,
      '',
      '',
      '',
      'Response tab is not configured. Run setupCatalogueForms().',
    ]);
    return;
  }
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    errors.push(['', source, '', '', '', `Response tab is missing: ${sheetName}`]);
    return;
  }
  if (sheet.getLastRow() < 2) return;

  const values = sheet.getDataRange().getValues();
  const headers = values[0].map(String);
  const requiredHeaders = archive ? ['id'] : ['Action'].concat(PRODUCT_HEADERS);
  const missing = requiredHeaders.filter((header) => headers.indexOf(header) === -1);
  if (missing.length) {
    errors.push(['', source, '', '', '', `Response tab is missing columns: ${missing.join(', ')}`]);
    return;
  }

  values.slice(1).forEach((row, index) => {
    const object = Object.fromEntries(headers.map((header, column) => [header, row[column]]));
    const event = {
      timestamp: row[0],
      source: source,
      row: index + 2,
      productId: String(object.id || '').trim(),
      action: archive ? 'Archive' : String(object.Action || '').trim(),
      record: Object.fromEntries(
        PRODUCT_HEADERS.map((header) => [header, String(object[header] || '').trim()]),
      ),
    };
    if (!(event.timestamp instanceof Date) || isNaN(event.timestamp.getTime())) {
      errors.push(logError_(event, event.action, new Error('Timestamp is invalid.')));
    } else {
      events.push(event);
    }
  });
}

function compareEvents_(left, right) {
  return (
    left.timestamp.getTime() - right.timestamp.getTime() ||
    left.productId.localeCompare(right.productId) ||
    left.source.localeCompare(right.source) ||
    left.row - right.row
  );
}

function applyEvent_(event, records) {
  const id = event.productId;
  if (!id) throw new Error('id is required.');
  if (event.action === 'Add') {
    if (records.has(id)) throw new Error('Add cannot reuse an existing immutable id.');
    if (records.size >= 500) throw new Error('Add would exceed the 500-row catalogue limit.');
    const record = normalizeRecord_(event.record);
    const missing = ADD_REQUIRED_FIELDS.filter((header) => !record[header]);
    if (missing.length) throw new Error(`Add requires: ${missing.join(', ')}.`);
    validateRecord_(record, records, null);
    records.set(id, record);
    return;
  }
  if (event.action === 'Update') {
    if (!records.has(id)) throw new Error('Update requires an existing immutable id.');
    const previous = records.get(id);
    const record = normalizeRecord_(
      Object.assign({}, previous, nonEmptyFields_(event.record), { id: id }),
    );
    validateRecord_(record, records, id);
    records.set(id, record);
    return;
  }
  if (event.action === 'Archive') {
    if (!records.has(id)) throw new Error('Archive requires an existing immutable id.');
    records.set(id, Object.assign({}, records.get(id), { active: 'FALSE' }));
    return;
  }
  throw new Error('Action must be Add, Update or Archive.');
}

function nonEmptyFields_(record) {
  return Object.fromEntries(Object.entries(record).filter((entry) => entry[1] !== ''));
}

function normalizeRecord_(record) {
  return Object.fromEntries(
    PRODUCT_HEADERS.map((header) => [header, String(record[header] || '').trim()]),
  );
}

function validateRecord_(record, records, replacedId) {
  requireLength_(record.id, 'id', 1, 80);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.id))
    throw new Error('id must be a lowercase slug.');
  requireLength_(record.sku, 'sku', 1, 50);
  if (!/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(record.sku))
    throw new Error('sku must contain only letters, numbers and single hyphens.');
  requireLength_(record.category, 'category', 1, 100);
  requireLength_(record.name, 'name', 1, 120);
  requireLength_(record.unit, 'unit', 1, 80);
  requireLength_(record.image_alt, 'image_alt', 1, 200);
  requireLength_(record.description, 'description', 1, 500);
  requireLength_(record.variant_note, 'variant_note', 0, 200);

  if (!/^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(record.price_ngn) || Number(record.price_ngn) <= 0)
    throw new Error('price_ngn must be a positive decimal with at most two decimal places.');
  const priceParts = record.price_ngn.split('.');
  const priceKobo =
    `${priceParts[0]}${(priceParts[1] || '').padEnd(2, '0')}`.replace(/^0+/, '') || '0';
  if (
    priceKobo.length > 16 ||
    (priceKobo.length === 16 && priceKobo > String(Number.MAX_SAFE_INTEGER))
  )
    throw new Error('price_ngn is outside the safely supported amount range.');
  if (!/^\d+$/.test(record.sort_order) || !Number.isSafeInteger(Number(record.sort_order)))
    throw new Error('sort_order must be a non-negative safe integer.');
  if (record.active !== 'TRUE' && record.active !== 'FALSE')
    throw new Error('active must be exactly TRUE or FALSE.');
  requireLength_(record.image_path, 'image_path', 2, 200);
  const imageSegments = record.image_path.slice(1).split('/');
  if (
    !record.image_path.startsWith('/') ||
    record.image_path.startsWith('//') ||
    /[\\?#]/.test(record.image_path) ||
    imageSegments.some((segment) => !segment || segment === '.' || segment === '..') ||
    !/\.(?:avif|jpe?g|png|svg|webp)$/i.test(record.image_path)
  )
    throw new Error('image_path must be a safe root-relative supported image path.');

  records.forEach((existing, existingId) => {
    if (existingId === replacedId) return;
    if (existing.sku.toLowerCase() === record.sku.toLowerCase())
      throw new Error(`sku is already used by ${existingId}.`);
    if (Number(existing.sort_order) === Number(record.sort_order))
      throw new Error(`sort_order is already used by ${existingId}.`);
  });
}

function requireLength_(value, field, minimum, maximum) {
  if (value.length < minimum || value.length > maximum)
    throw new Error(`${field} must be between ${minimum} and ${maximum} characters.`);
}

function assertHeaders_(sheet, expected) {
  const actual = sheet.getRange(1, 1, 1, expected.length).getDisplayValues()[0];
  if (
    actual.some((header, index) => header !== expected[index]) ||
    sheet.getLastColumn() !== expected.length
  )
    throw new Error(`${sheet.getName()} headers must exactly match: ${expected.join(',')}`);
}

function writeProducts_(spreadsheet, records) {
  const sheet = getOrCreateProductsSheet_(spreadsheet);
  sheet.clearContents();
  sheet.getRange(1, 1, 1, PRODUCT_HEADERS.length).setValues([PRODUCT_HEADERS]);
  records.sort(
    (left, right) =>
      Number(left.sort_order) - Number(right.sort_order) || left.id.localeCompare(right.id),
  );
  if (records.length) {
    const rows = records.map((record) =>
      PRODUCT_HEADERS.map((header) => protectCell_(record[header])),
    );
    sheet.getRange(2, 1, rows.length, PRODUCT_HEADERS.length).setValues(rows);
  }
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, PRODUCT_HEADERS.length);
}

function protectCell_(value) {
  if (typeof value !== 'string') return value;
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function writeImportLog_(spreadsheet, errors) {
  let sheet = spreadsheet.getSheetByName(SHEETS.log);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEETS.log);
  sheet.clearContents();
  sheet.getRange(1, 1, 1, LOG_HEADERS.length).setValues([LOG_HEADERS]);
  if (errors.length) {
    const safeErrors = errors.map((row) => row.map((value) => protectCell_(value)));
    sheet.getRange(2, 1, safeErrors.length, LOG_HEADERS.length).setValues(safeErrors);
  }
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, LOG_HEADERS.length);
}

function logError_(entry, action, error) {
  return [
    entry.timestamp || '',
    entry.source || '',
    entry.row || '',
    entry.productId || '',
    action || '',
    error.message || String(error),
  ];
}
