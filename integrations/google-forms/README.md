# Google Forms catalogue integration

`CatalogueForm.gs` is a sheet-bound Google Apps Script that makes staff Forms the append-only source of catalogue changes while retaining the canonical `Products` worksheet and published CSV workflow.

## Install

1. Create or open the catalogue Google Sheet. If it already has catalogue data, name that worksheet `Products` and keep the exact headers from `catalog/products.csv`.
2. Open **Extensions > Apps Script**, replace the editor contents with `CatalogueForm.gs`, and save.
3. Run `setupCatalogueForms` from the Apps Script editor and approve the requested Forms, Sheets and trigger permissions.
4. Return to the spreadsheet and open the `Setup` tab. It contains responder and owner URLs for both Forms and the linked response-tab names.
5. New Forms are closed by setup. In each Form's **Settings**, restrict responders to the approved staff group or Workspace organisation. Do not enable response editing. Give staff responder access only; reserve spreadsheet, script and Form editor access for catalogue owners.
6. After confirming access restrictions, enable **Accepting responses**. Test one submission, confirm `Products` rebuilds, and check `Import Log` before publishing.

Setup captures the existing `Products` rows once in the hidden `Catalogue Baseline` tab. Later runs reuse that baseline and the stored Forms, so rerunning setup does not turn direct worksheet edits into catalogue history. Do not rename response tabs, Forms questions, or integration-managed tabs.

## Behaviour

- The Add/update Form has `Action` plus questions named for all 12 exact CSV columns. `unit` is the YHLY selling unit.
- Add requires every strict-parser field except optional `variant_note`. Update requires an existing immutable `id` and merges nonblank answers into the prior record.
- The Archive Form accepts an existing immutable `id` and changes its canonical `active` value to `FALSE`.
- `onFormSubmit` takes a document lock and rebuilds from the baseline and both append-only response tabs in timestamp order. A catalogue owner can run `rebuildPublishedProducts` manually after fixing configuration.
- `Products` is replaced deterministically with the exact CSV headers, sorted by `sort_order` and `id`. Archived rows remain for history but the existing strict importer omits them from the active snapshot.
- Invalid submissions are ignored and listed in `Import Log`. This validation is an early staff-facing check; `npm run products:check` remains authoritative and also verifies local image files.

The script contains no storefront secret and calls no storefront or payment API. Forms and response tabs are catalogue-only: never enter customer, order, enquiry, address, contact, fulfilment or payment data. A Form submission is not an instant storefront publication.

## Recovery

Response tabs are the change history and must remain append-only. If a staff submission is wrong, submit a later Update or Archive rather than editing or deleting a response. Catalogue owners can use Google Drive version history to recover an accidentally changed sheet, then run `rebuildPublishedProducts`.

See `docs/PRODUCT_OPERATIONS.md` for review, CSV publication, snapshot sync, deployment and rollback.
