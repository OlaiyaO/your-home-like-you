import Link from 'next/link';
import { ArrowUpRight, Camera, ClipboardList, KeyRound } from 'lucide-react';

import { InnerHero } from '@/components/InnerHero';
import { PageShell } from '@/components/PageShell';

export const metadata = { title: 'Our Work' };

const caseStudyStructure = [
  [Camera, 'Before', 'The starting condition and the problem the property needed to solve.'],
  [ClipboardList, 'Scope', 'The agreed work, key decisions and how delivery was coordinated.'],
  [KeyRound, 'Handover', 'The completed condition and the practical result delivered.'],
];

export default function PortfolioPage() {
  return (
    <PageShell>
      <InnerHero
        eyebrow="Project work"
        title="The work should show its thinking."
        body="Our project record will focus on real starting conditions, defined scopes and completed handovers, not anonymous inspiration imagery."
        marker="Case studies / verified work only"
      />

      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow text-red">How work will be documented</p>
            <h2 className="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.04em]">
              Evidence before decoration.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink/58">
              This page is deliberately reserved for original project photography and approved
              details. No stock room is presented as client work.
            </p>
          </div>

          <div className="grid border-l border-t border-black/12 md:grid-cols-3">
            {caseStudyStructure.map(([Icon, title, body], index) => (
              <article key={title} className="min-h-80 border-b border-r border-black/12 p-7">
                <div className="flex items-center justify-between">
                  <Icon className="size-6 text-red" />
                  <span className="font-display text-2xl text-ink/25">0{index + 1}</span>
                </div>
                <h3 className="mt-20 font-display text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/52">{body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-8 border-t border-black/12 pt-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-3xl font-display text-4xl leading-tight tracking-[-0.03em] md:text-6xl">
            Your property can begin with a clear brief.
          </p>
          <Link href="/contact#quote" className="button-primary shrink-0">
            Start a property brief <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
