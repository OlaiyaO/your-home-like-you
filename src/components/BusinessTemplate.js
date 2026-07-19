import Image from 'next/image';

import { Logo } from '@/components/Logo';
import { site } from '@/data/site';

const editable = (text) => <span className="template-placeholder">{text}</span>;

function ContactBlock({ align = 'left' }) {
  return (
    <div
      className={`text-[9px] leading-relaxed text-ink/60 sm:text-xs ${align === 'right' ? 'text-right' : ''}`}
    >
      <p>{site.contactName}</p>
      <p>{site.phone}</p>
      {site.primaryEmailConfigured && <p>{site.primaryEmail}</p>}
      {site.addressLines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

function DocumentHeader({ title, numberLabel = 'Document no.' }) {
  return (
    <>
      <div className="flex items-start justify-between gap-5 border-b border-black/12 pb-7">
        <Logo />
        <div className="text-right">
          <h1 className="font-display text-3xl text-red sm:text-5xl">{title}</h1>
          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-ink/45">
            {numberLabel} {editable('[EDITABLE REFERENCE]')}
          </p>
        </div>
      </div>
      <div className="mt-7 grid grid-cols-2 gap-6 text-xs">
        <div>
          <p className="template-label">From</p>
          <ContactBlock />
        </div>
        <div className="text-right leading-relaxed text-ink/55">
          <p className="template-label">Date / recipient</p>
          <p>{editable('[DATE]')}</p>
          <p>{editable('[CLIENT OR SUPPLIER NAME]')}</p>
          <p>{editable('[ADDRESS / PROJECT]')}</p>
        </div>
      </div>
    </>
  );
}

function LineItems({ mode = 'commercial' }) {
  const columns =
    mode === 'delivery'
      ? ['Description', 'Quantity', 'Condition', 'Received']
      : ['Description', 'Quantity', 'Rate', 'Amount'];

  return (
    <table className="mt-8 w-full table-fixed text-left text-[10px] sm:text-xs">
      <thead>
        <tr className="border-b-2 border-ink">
          {columns.map((column, index) => (
            <th key={column} className={`py-3 ${index === columns.length - 1 ? 'text-right' : ''}`}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4].map((row) => (
          <tr key={row} className="h-12 border-b border-black/10 text-ink/40">
            <td>{row === 1 ? editable('[ITEM / SERVICE]') : ''}</td>
            <td>{row === 1 ? editable('[QTY]') : ''}</td>
            <td>{row === 1 ? editable(mode === 'delivery' ? '[CONDITION]' : '[RATE]') : ''}</td>
            <td className="text-right">
              {row === 1 ? editable(mode === 'delivery' ? '[INITIALS]' : '[AMOUNT]') : ''}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function LegalNotice() {
  return (
    <div className="mt-8 border border-dashed border-red/35 bg-red/[0.035] p-4 text-[9px] leading-relaxed text-ink/55 sm:text-[11px]">
      <strong className="text-red">EDIT BEFORE ISSUE:</strong> Legal entity name, registration, tax,
      bank and payment details are intentionally not supplied. Add only verified business
      information where required.
    </div>
  );
}

function DocumentFooter() {
  return (
    <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between border-t border-black/12 pt-4 text-[8px] uppercase tracking-[0.14em] text-ink/40 sm:left-12 sm:right-12">
      <p>Your Home Like You · {site.phone}</p>
      <p>Property, made personal.</p>
    </div>
  );
}

function CommercialDocument({ title, slug }) {
  const isReceipt = slug === 'receipt';

  return (
    <section className="template-sheet template-sheet--a4">
      <DocumentHeader title={title} numberLabel={isReceipt ? 'Receipt no.' : `${title} no.`} />
      <LineItems />
      <div className="ml-auto mt-7 w-1/2 space-y-3 text-xs">
        {!isReceipt && (
          <p className="flex justify-between">
            <span>Subtotal</span>
            {editable('[AMOUNT]')}
          </p>
        )}
        {!isReceipt && (
          <p className="flex justify-between">
            <span>Tax, if applicable</span>
            {editable('[EDIT]')}
          </p>
        )}
        <p className="flex justify-between border-t border-black/20 pt-3 text-base font-bold">
          <span>{isReceipt ? 'Amount received' : 'Total'}</span>
          {editable('[AMOUNT]')}
        </p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-5 text-xs leading-relaxed">
        <div>
          <p className="template-label">
            {isReceipt ? 'Payment method / reference' : 'Scope / terms'}
          </p>
          {editable('[EDITABLE DETAILS]')}
        </div>
        <div>
          <p className="template-label">Authorised by</p>
          {editable('[NAME / SIGNATURE / DATE]')}
        </div>
      </div>
      <LegalNotice />
      <DocumentFooter />
    </section>
  );
}

function OperationsDocument({ title, slug }) {
  const handover = slug === 'project-handover';

  return (
    <section className="template-sheet template-sheet--a4">
      <DocumentHeader title={title} />
      {handover ? (
        <div className="mt-8">
          <p className="template-label">Project summary</p>
          <div className="mt-3 h-20 border border-black/12 p-3 text-xs text-ink/40">
            [SCOPE COMPLETED / EXCLUSIONS / NOTES]
          </div>
          <p className="template-label mt-7">Handover checklist</p>
          {[
            'Work inspected',
            'Keys / access transferred',
            'Documents supplied',
            'Outstanding items recorded',
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 border-b border-black/10 py-3 text-xs"
            >
              <span className="size-4 border border-ink/40" />
              {item}
            </div>
          ))}
        </div>
      ) : (
        <LineItems mode={slug === 'delivery-note' ? 'delivery' : 'commercial'} />
      )}
      <div className="mt-9 grid grid-cols-2 gap-8 text-xs">
        <div>
          <p className="template-label">Issued / delivered by</p>
          <div className="mt-10 border-t border-black/25 pt-2">Name, signature and date</div>
        </div>
        <div>
          <p className="template-label">Accepted / received by</p>
          <div className="mt-10 border-t border-black/25 pt-2">Name, signature and date</div>
        </div>
      </div>
      {slug === 'purchase-order' && <LegalNotice />}
      <DocumentFooter />
    </section>
  );
}

function Letterhead() {
  return (
    <section className="template-sheet template-sheet--a4">
      <div className="flex items-start justify-between gap-5 border-b border-black/12 pb-7">
        <Logo />
        <ContactBlock align="right" />
      </div>
      <div className="mt-16 text-sm leading-loose text-ink/60">
        <p>{editable('[DATE]')}</p>
        <p className="mt-6">{editable('[RECIPIENT NAME AND ADDRESS]')}</p>
        <h1 className="mt-10 font-display text-3xl text-ink">{editable('[SUBJECT]')}</h1>
        <p className="mt-6">{editable('[LETTER BODY]')}</p>
      </div>
      <DocumentFooter />
    </section>
  );
}

function AssetTemplate({ template }) {
  return (
    <section className={`template-sheet template-sheet--asset template-sheet--${template.slug}`}>
      <Image
        src={template.download}
        alt={`${template.title} reusable template`}
        width={1200}
        height={1200}
      />
    </section>
  );
}

export function BusinessTemplate({ template }) {
  if (template.download) return <AssetTemplate template={template} />;
  if (template.slug === 'letterhead') return <Letterhead />;
  if (['invoice', 'quotation', 'receipt'].includes(template.slug)) {
    return <CommercialDocument title={template.title} slug={template.slug} />;
  }
  return <OperationsDocument title={template.title} slug={template.slug} />;
}
