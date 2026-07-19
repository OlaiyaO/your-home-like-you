import Link from 'next/link';
import { Download, Eye, Printer } from 'lucide-react';

import { Mark } from '@/components/Logo';
import { PageShell } from '@/components/PageShell';
import { brandAssets } from '@/data/site';
import { brandTemplates } from '@/data/brandTemplates';

export const metadata = {
  title: 'Operational Brand Kit',
  description:
    'View, download and print reusable Your Home Like You identity and daily-business templates.',
};

export default function BrandKitPage() {
  const colors = [
    ['Signature red', brandAssets.primary],
    ['Deep red', brandAssets.primaryDark],
    ['Architectural ink', brandAssets.ink],
    ['Warm ivory', brandAssets.ivory],
    ['Paper', brandAssets.paper],
    ['Stone', brandAssets.stone],
  ];

  return (
    <PageShell>
      <section className="bg-ink px-5 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow text-red-light">Operational brand kit</p>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(4rem,9vw,9rem)] leading-[0.82] tracking-[-0.06em]">
            Ready for every working day.
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-red">Logo rationale</p>
            <h2 className="mt-4 font-display text-5xl">An open door, held by a home.</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/60">
              {brandAssets.markMeaning} The geometry works as an avatar, site mark, document seal
              and site-board identifier.
            </p>
          </div>
          <div className="grid min-h-96 place-items-center bg-ivory">
            <Mark className="size-44" />
          </div>
        </div>
        <div className="mt-24">
          <p className="eyebrow text-red">Core palette</p>
          <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-6">
            {colors.map(([name, value]) => (
              <div
                key={name}
                className="min-h-48 p-5"
                style={{
                  background: value,
                  color: ['#F6F0E8', '#FFFDFC', '#D8CEC2'].includes(value) ? '#181512' : 'white',
                }}
              >
                <p className="text-xs font-bold uppercase tracking-wider">{name}</p>
                <p className="mt-2 text-xs opacity-65">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-24 grid gap-8 md:grid-cols-2">
          <div className="border border-black/12 p-8">
            <p className="eyebrow text-red">Display type</p>
            <p className="mt-8 font-display text-6xl leading-none">
              Property,
              <br />
              <em>made personal.</em>
            </p>
            <p className="mt-8 text-sm text-ink/50">DM Serif Display</p>
          </div>
          <div className="border border-black/12 p-8">
            <p className="eyebrow text-red">Body type</p>
            <p className="mt-8 text-2xl leading-relaxed">
              Clear enough for a proposal. Warm enough for a home.
            </p>
            <p className="mt-8 text-sm text-ink/50">Manrope</p>
          </div>
        </div>
        <div id="templates" className="mt-24 scroll-mt-24 border-t border-black/12 pt-16">
          <p className="eyebrow text-red">Daily-business templates</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 className="font-display text-5xl leading-[0.95] tracking-[-0.04em] md:text-6xl">
              View it. Use it. Send it.
            </h2>
            <p className="max-w-2xl leading-relaxed text-ink/58 lg:justify-self-end">
              Open any template for a clean print preview. Use your browser&apos;s Save as PDF
              option, or download the reusable SVG where supplied. Fields in brackets are
              intentionally editable; verify them before external use.
            </p>
          </div>
          <div className="mt-10 grid gap-px bg-black/12 border border-black/12 sm:grid-cols-2 lg:grid-cols-3">
            {brandTemplates.map((template, index) => (
              <article key={template.slug} className="flex min-h-64 flex-col bg-paper p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="eyebrow text-red">{template.category}</p>
                  <span className="font-display text-2xl text-ink/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-3xl leading-none">{template.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/55">{template.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-7">
                  <Link
                    href={`/brand-kit/templates/${template.slug}`}
                    className="button-secondary min-h-11 px-4"
                  >
                    <Eye className="size-4" /> View
                  </Link>
                  {template.download ? (
                    <a href={template.download} download className="button-primary min-h-11 px-4">
                      <Download className="size-4" /> Download SVG
                    </a>
                  ) : (
                    <Link
                      href={`/brand-kit/templates/${template.slug}?auto=1`}
                      className="button-primary min-h-11 px-4"
                    >
                      <Printer className="size-4" /> Download / Print
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 border-t border-black/12 pt-8">
            <a href="/brand/yhly-mark-red.svg" download className="button-secondary">
              <Download className="size-4" /> Red logo mark
            </a>
            <a
              href="/brand/yhly-mark-white.svg"
              download
              className="button-secondary bg-ink text-white"
            >
              <Download className="size-4" /> White logo mark
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
