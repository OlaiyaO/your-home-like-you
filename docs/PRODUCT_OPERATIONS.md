# Product catalogue operations

The primary nontechnical workflow is staff submission through two restricted Google Forms: **Add/update service** and **Archive service**. The Forms rebuild the canonical `Products` worksheet; catalogue owners review that worksheet and publish it as CSV. The storefront still reads only the committed `src/data/products.snapshot.json`, never Google Forms or Sheets during a customer request.

This system is for public catalogue content only. **Never put customer names, contact details, addresses, enquiries, order references, fulfilment details or payment information in a Form, response tab or catalogue worksheet.** Form submission is not instant publishing.

## One-time setup and permissions

1. Create the catalogue spreadsheet with a `Products` worksheet. Its first row and column order must exactly match `catalog/products.csv`. Existing rows are captured as the migration baseline.
2. Follow `integrations/google-forms/README.md`: bind `CatalogueForm.gs` to the spreadsheet and run `setupCatalogueForms` as a catalogue owner.
3. Approve its Forms, Sheets and installable trigger permissions. The script creates and links the two Forms, the hidden `Catalogue Baseline`, `Setup`, `Import Log`, and append-only response tabs.
4. Open both Form owner URLs from `Setup`. In Form settings, restrict responders to the approved staff group or Workspace organisation and disable response editing. Give most staff responder access only. Limit spreadsheet, Form editor and Apps Script access to catalogue owners.
5. Give staff the responder URLs from `Setup`. Do not send Form edit URLs or spreadsheet edit access to general staff.
6. Test Add, Update and Archive. Confirm `Products` is rebuilt and `Import Log` has no errors before publishing.

Do not rename integration-managed tabs or Form questions. Do not edit or delete response rows. If a submission was wrong, submit a later Update or Archive so history remains append-only. Rerunning `setupCatalogueForms` reuses the stored Forms and original baseline and refreshes the submit trigger.

## Add a service

1. Open the **Add/update service** Form and select **Add**.
2. Enter every field except optional `variant_note`. `id` must be a new lowercase hyphenated identifier and becomes immutable. Use a unique SKU, a decimal `price_ngn` with no currency sign or separators, and a unique non-negative integer `sort_order`.
3. Enter the YHLY selling scope in `unit`, such as `one session`, and set `active` to exactly `TRUE` or `FALSE`.
4. Enter a root-relative `image_path`, such as `/services/interiors.jpg`. Images are handled separately and are not uploaded through the Form.
5. Submit, then ask a catalogue owner to review the regenerated `Products` row and `Import Log`.

## Update a service

1. Open **Add/update service**, select **Update**, and enter the existing immutable `id`.
2. Complete only fields that should change. Blank answers retain prior values; the `id` cannot be renamed.
3. Submit and review `Products` and `Import Log`. To correct a submission, send a later Update rather than modifying response history.

## Archive a service

1. Open **Archive service**, enter the existing immutable `id`, and submit.
2. Review the row in `Products`. It remains in catalogue history with `active` set to `FALSE`, but the validated snapshot excludes it from the shop and server checkout allow-list.

To restore an archived service, submit an Update for the same `id` with `active` set to `TRUE`. Changing or archiving a service can invalidate an older browser cart; the customer must return to the shop and make a current selection.

## Review and publish

1. A catalogue owner checks `Import Log`. Rejected submissions do not alter their product. Resolve a rejection with a later valid submission.
2. Review all regenerated `Products` values, including inactive rows. Do not directly edit `Products`; it is deterministic output and the next submission will rebuild it.
3. In Google Sheets, use **File > Share > Publish to web**, select only the `Products` worksheet, choose **Comma-separated values (.csv)**, and publish. Treat this URL and worksheet as public catalogue data.
4. Set the resulting HTTPS URL as `PRODUCTS_CSV_URL` in the local or CI environment used for catalogue checks and builds.
5. Run `npm run products:sync`. This validates the complete CSV and writes `src/data/products.snapshot.json` atomically.
6. Review the CSV and generated snapshot, run `npm run products:check`, then run the normal format, lint, test and build checks.
7. Commit the approved snapshot and any image changes, then deploy. Production changes only after this review, sync and deployment sequence; neither Form submission nor worksheet rebuild calls the storefront.

The importer rejects the whole catalogue rather than publishing part of it. It limits the source to 1 MB and 500 data rows, checks every header and value, confirms unique IDs, SKUs and sort orders, converts decimal NGN to kobo without floating-point arithmetic, and verifies every local image.

## Images

Forms store only `image_path`. Add each referenced image separately under `public/` and commit it before syncing. Supported extensions are AVIF, JPEG/JPG, PNG, SVG and WebP. The sync command checks images against the local `public/` directory even when the CSV comes from Google Sheets. Deploy images and `src/data/products.snapshot.json` together.

## Check and rollback

`npm run products:check` validates the configured source and compares it byte-for-byte with the committed snapshot without writing files. The build runs this check and intentionally fails when `PRODUCTS_CSV_URL` content and the snapshot differ.

To roll back:

1. Restore the last approved response/baseline state with Google Drive version history or publish the prior approved `Products` revision. Preserve response history whenever possible by submitting a compensating Update or Archive.
2. Restore matching images and `src/data/products.snapshot.json` from version control.
3. Point `PRODUCTS_CSV_URL` at the restored published `Products` CSV, run `npm run products:check`, and redeploy.

Do not hand-edit the JSON snapshot.

## Developer CSV fallback

When `PRODUCTS_CSV_URL` is unset, `npm run products:sync` and `npm run products:check` use `catalog/products.csv`. Developers may use this fallback for local work or emergency recovery while keeping the same exact headers and validation rules. Staff catalogue operations should use the Forms workflow, and an approved source, snapshot and image set must always be deployed together.
