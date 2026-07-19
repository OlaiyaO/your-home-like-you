import Link from 'next/link';
import { ArrowUpRight, ClipboardCheck, KeyRound, Ruler } from 'lucide-react';

import { InnerHero } from '@/components/InnerHero';
import { PageShell } from '@/components/PageShell';
import { SectionHeading } from '@/components/SectionHeading';
import { site } from '@/data/site';

export const metadata = { title: 'About' };

const principles = [
  {
    icon: Ruler,
    title: 'Make it clear',
    body: 'Scope, materials, timing and ownership should be understandable before work starts.',
  },
  {
    icon: KeyRound,
    title: 'Make it personal',
    body: 'Taste and function belong to the client. The work should serve the people using the property.',
  },
  {
    icon: ClipboardCheck,
    title: 'Finish responsibly',
    body: 'A considered handover includes a walkthrough, an open-item check and a space ready for use.',
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <InnerHero
        eyebrow="About the company"
        title="Personal vision. Practical delivery."
        body="Your Home Like You exists to close the gap between what a property is and what the person using it needs it to become."
        marker="Point of view / operating standard"
      />

      <section className="mx-auto grid max-w-[1440px] gap-16 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow text-red">Why the model exists</p>
          <div className="mt-8 aspect-square max-w-md border border-black/15 bg-ivory p-6">
            <div className="dossier-grid-dark relative h-full border border-black/15">
              <div className="absolute inset-[12%] border-2 border-ink" />
              <div className="absolute left-[12%] top-1/2 h-0.5 w-[76%] bg-ink" />
              <div className="absolute left-1/2 top-[12%] h-[76%] w-0.5 bg-ink" />
              <div className="absolute bottom-[18%] right-[18%] grid size-20 place-items-center bg-red text-white">
                <KeyRound className="size-7" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <SectionHeading
            eyebrow="Our point of view"
            title="The property should fit the person, not the other way around."
          />
          <div className="mt-9 max-w-3xl space-y-6 text-lg leading-relaxed text-ink/60">
            <p>
              A beautiful room that is difficult to live in is not finished. A renovation without a
              clear handover is not complete. Property decisions without practical improvement
              thinking can leave important work unresolved.
            </p>
            <p>
              We bring aesthetics, upkeep, building work and property thinking into one
              conversation, then coordinate the agreed result through a single project path.
            </p>
          </div>
          <p className="mt-10 border-l-2 border-red pl-6 font-display text-3xl italic leading-tight text-ink">
            {site.promise}
          </p>
        </div>
      </section>

      <section className="bg-ink px-5 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow text-red-light">The operating principles</p>
          <div className="mt-10 grid border-l border-t border-white/15 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, body }, index) => (
              <article
                key={title}
                className="border-b border-r border-white/15 p-8 md:min-h-96 md:p-10"
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-6 text-red-light" />
                  <span className="font-display text-3xl text-white/25">0{index + 1}</span>
                </div>
                <h2 className="mt-24 font-display text-4xl">{title}</h2>
                <p className="mt-5 leading-relaxed text-white/52">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-paper px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-red">Have a property in mind?</p>
            <h2 className="mt-5 max-w-4xl font-display text-4xl leading-tight tracking-[-0.035em] md:text-6xl">
              Start with what is not working yet.
            </h2>
          </div>
          <Link href="/contact#quote" className="button-primary shrink-0">
            Start a property brief <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
