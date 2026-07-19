import Link from 'next/link';
import { ArrowUpRight, Check, CircleDotDashed } from 'lucide-react';

import { InnerHero } from '@/components/InnerHero';
import { PageShell } from '@/components/PageShell';
import { serviceGroups } from '@/data/site';

export const metadata = { title: 'Services' };

export default function ServicesPage() {
  return (
    <PageShell>
      <InnerHero
        eyebrow="Services"
        title="From bare ground to a finished property."
        body="Bring us one immediate need or a property with several moving parts. We define the scope around the outcome and coordinate what it takes to get there."
        marker="Service architecture / 01–05"
      />

      <section className="border-b border-black/10 bg-paper">
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-5">
          {serviceGroups.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="group border-b border-black/10 px-5 py-7 sm:border-r sm:px-7"
            >
              <span className="font-display text-2xl text-red">{group.number}</span>
              <p className="mt-3 text-sm font-bold leading-tight text-ink/65 group-hover:text-red">
                {group.title}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
        <div className="border-t border-black/15">
          {serviceGroups.map((group) => {
            const Icon = group.icon;
            return (
              <article
                id={group.id}
                key={group.id}
                className="grid scroll-mt-28 gap-10 border-b border-black/15 py-14 lg:grid-cols-[0.55fr_1.45fr] lg:py-20"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <span className="grid size-14 place-items-center border border-red text-red">
                      <Icon className="size-6" />
                    </span>
                    <span className="font-display text-4xl text-red">{group.number}</span>
                  </div>
                  <p className="eyebrow mt-8 text-ink/40">{group.eyebrow}</p>
                </div>

                <div>
                  <h2 className="max-w-4xl font-display text-[clamp(3rem,6vw,6rem)] leading-[0.92] tracking-[-0.05em]">
                    {group.title}
                  </h2>
                  <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/60">
                    {group.description}
                  </p>

                  <div className="mt-10 grid border-l border-t border-black/10 sm:grid-cols-2">
                    {group.services.map((service) => (
                      <p
                        key={service}
                        className="flex min-h-20 items-center gap-3 border-b border-r border-black/10 px-5 py-4 text-sm font-semibold text-ink/72"
                      >
                        <Check className="size-4 shrink-0 text-red" /> {service}
                      </p>
                    ))}
                    <div className="flex min-h-20 items-center gap-3 border-b border-r border-black/10 px-5 py-4 text-xs font-bold uppercase tracking-[0.1em] text-ink/38">
                      <CircleDotDashed className="size-4 text-red" /> Scope confirmed per property
                    </div>
                  </div>

                  <Link
                    href={`/contact?service=${group.id}#quote`}
                    className="button-primary mt-9 self-start"
                  >
                    Discuss this scope <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-ink px-5 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-9 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-red-light">More than one workstream?</p>
            <h2 className="mt-5 max-w-4xl font-display text-4xl leading-tight tracking-[-0.035em] md:text-6xl">
              That is exactly where coordination matters.
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
