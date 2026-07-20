import { Mark } from '@/components/Logo';
import { site } from '@/data/site';

function StaticLockup({ inverted = false, compact = false }) {
  return (
    <div className="inline-flex items-center gap-3">
      <Mark className={compact ? 'size-8' : 'size-11'} inverted={inverted} />
      <span className="leading-none">
        <span
          className={`block font-display tracking-[-0.035em] ${compact ? 'text-lg' : 'text-2xl'} ${inverted ? 'text-white' : 'text-ink'}`}
        >
          Your Home
        </span>
        <span className="block text-[9px] font-bold uppercase tracking-[0.28em] text-red">
          Like You
        </span>
      </span>
    </div>
  );
}

export function BusinessCards() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="aspect-[1.8/1] overflow-hidden bg-ink p-[7%] text-white shadow-[0_24px_70px_rgba(24,21,18,0.18)]">
        <div className="flex h-full flex-col justify-between">
          <StaticLockup inverted />
          <div>
            <p className="font-display text-[clamp(1.8rem,4vw,3.4rem)] leading-[0.92] tracking-[-0.04em]">
              Property,
              <br />
              <em className="text-red-light">made personal.</em>
            </p>
          </div>
          <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/45">
            Front · company face
          </p>
        </div>
      </div>

      <div className="aspect-[1.8/1] overflow-hidden border border-black/10 bg-ivory p-[7%] shadow-[0_24px_70px_rgba(24,21,18,0.12)]">
        <div className="grid h-full grid-cols-[1fr_auto] gap-5">
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-display text-[clamp(1.5rem,3vw,2.7rem)] leading-none">
                {site.contactName}
              </p>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-red">
                [EDITABLE ROLE]
              </p>
            </div>
            <div className="space-y-1 text-[clamp(0.55rem,1vw,0.75rem)] leading-relaxed text-ink/58">
              <p>{site.email}</p>
              <p>{site.phone}</p>
              <p>{site.location || '[BUSINESS ADDRESS]'}</p>
            </div>
            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-ink/32">
              Back · details template
            </p>
          </div>
          <div className="flex flex-col items-end justify-between border-l border-black/12 pl-5">
            <Mark className="size-10" />
            <span className="h-12 w-1 bg-red" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function StampPreview() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
      <div className="relative mx-auto grid aspect-square w-full max-w-[360px] place-items-center rounded-full bg-[#bd9a75] p-[10%] shadow-[0_35px_80px_rgba(24,21,18,0.28),inset_0_0_0_10px_rgba(96,56,31,0.18)]">
        <div className="grid size-full place-items-center rounded-full bg-red shadow-[inset_0_0_0_4px_rgba(255,255,255,0.2),0_8px_20px_rgba(24,21,18,0.3)]">
          <div className="grid size-[78%] place-items-center rounded-full border-2 border-dashed border-white/75 text-center text-white">
            <div>
              <Mark className="mx-auto size-16" inverted />
              <p className="mt-2 text-[9px] font-extrabold uppercase tracking-[0.2em]">
                Your Home Like You
              </p>
              <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.24em] text-white/70">
                Abuja · Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="eyebrow text-red">Company stamp</p>
        <h3 className="mt-4 max-w-xl font-display text-5xl leading-[0.95] tracking-[-0.04em] md:text-6xl">
          A mark of accountability.
        </h3>
        <p className="mt-6 max-w-xl leading-relaxed text-ink/58">
          A restrained 38 mm, one-colour stamp for approved proposals, handovers and internal
          records. Legal entity and registration details must be confirmed before a statutory
          company stamp is produced.
        </p>
      </div>
    </div>
  );
}

export function LetterheadPreview() {
  return (
    <div className="relative mx-auto aspect-[210/297] w-full max-w-[560px] overflow-hidden bg-white p-[8%] shadow-[0_30px_90px_rgba(24,21,18,0.16)]">
      <div className="absolute inset-y-0 left-0 w-[6px] bg-red" />
      <div className="flex items-start justify-between gap-5 border-b border-black/12 pb-[7%]">
        <StaticLockup compact />
        <div className="text-right text-[7px] leading-relaxed text-ink/45 sm:text-[9px]">
          <p>{site.addressLines[0] || '[BUSINESS ADDRESS]'}</p>
          <p>{site.email}</p>
          <p>{site.phone}</p>
        </div>
      </div>
      <div className="mt-[14%]">
        <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-red sm:text-[9px]">
          Date · Recipient · Subject
        </p>
        <p className="mt-[7%] max-w-[80%] font-display text-[clamp(1.5rem,5vw,3rem)] leading-none tracking-[-0.04em]">
          Clear in writing.
          <br />
          <em className="text-red">Personal in delivery.</em>
        </p>
        <div className="mt-[9%] space-y-3">
          <span className="block h-1.5 w-full bg-stone/35" />
          <span className="block h-1.5 w-[92%] bg-stone/35" />
          <span className="block h-1.5 w-[96%] bg-stone/35" />
          <span className="block h-1.5 w-[72%] bg-stone/35" />
        </div>
      </div>
      <div className="absolute bottom-[7%] left-[8%] right-[8%] flex items-end justify-between border-t border-black/12 pt-[4%] text-[6px] font-bold uppercase tracking-[0.18em] text-ink/35 sm:text-[8px]">
        <p>Property, made personal.</p>
        <p>Page 01</p>
      </div>
    </div>
  );
}

export function ApplicationGrid() {
  return (
    <div className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
      <div className="grid aspect-square place-items-center bg-red p-8 text-white">
        <Mark className="size-24" inverted />
        <p className="self-end text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
          Social avatar
        </p>
      </div>
      <div className="flex aspect-square flex-col justify-between bg-ink p-8 text-white">
        <StaticLockup inverted compact />
        <p className="font-display text-4xl leading-none">
          Your space.
          <br />
          <em className="text-red-light">Handled.</em>
        </p>
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">Site board</p>
      </div>
      <div className="relative aspect-square overflow-hidden bg-[#c9bcae] p-8">
        <div className="absolute -right-10 top-10 h-44 w-44 rounded-full border-[18px] border-red/18" />
        <div className="relative flex h-full flex-col justify-between border border-ink/12 bg-ivory p-6 shadow-xl">
          <Mark className="size-10" />
          <p className="font-display text-3xl leading-none">Project file</p>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/40">
            Document folder
          </p>
        </div>
      </div>
      <div className="flex aspect-square flex-col items-center justify-center bg-paper p-8">
        <div className="relative h-48 w-40 rounded-t-[50%] bg-ink shadow-xl">
          <div className="absolute left-1/2 top-16 -translate-x-1/2 rounded border border-white/18 p-3">
            <Mark className="size-12" inverted />
          </div>
        </div>
        <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-ink/40">
          Workwear application
        </p>
      </div>
    </div>
  );
}
