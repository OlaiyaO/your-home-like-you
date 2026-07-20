import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight, Check, MapPin } from 'lucide-react';

import { InnerHero } from '@/components/InnerHero';
import { PageShell } from '@/components/PageShell';
import { site } from '@/data/site';

export const metadata = { title: 'Project Concepts' };

const concepts = [
  {
    number: '01',
    discipline: 'Residential construction',
    title: 'The Courtyard House',
    location: 'Abuja concept',
    image: '/hero-luxury-residence.jpg',
    imageAlt: 'Contemporary tropical residence used as architectural concept imagery',
    brief:
      'A calm family residence that keeps shared living generous while giving work, rest and hosting their own rhythm.',
    scope: ['Site-to-handover coordination', 'Passive shade strategy', 'Interior finishing'],
    tone: 'Grounded / generous / climate-aware',
  },
  {
    number: '02',
    discipline: 'Renovation & interiors',
    title: 'Soft Geometry',
    location: 'Lagos concept',
    image: '/services/interiors.jpg',
    imageAlt: 'Warm completed living room used as an illustrative interior concept',
    brief:
      'A tired apartment reworked around better circulation, softer light and rooms that feel composed without becoming precious.',
    scope: ['Space-planning refresh', 'Window treatments', 'Joinery and styling'],
    tone: 'Warm / edited / quietly expressive',
  },
  {
    number: '03',
    discipline: 'Property preparation',
    title: 'Ready for Arrival',
    location: 'Nigeria concept',
    image: '/services/property-care.jpg',
    imageAlt: 'Property care professional used as illustrative handover concept imagery',
    brief:
      'A complete pre-arrival reset for an owner abroad: snagging, repairs, deep care and a documented final walkthrough.',
    scope: ['Remote-owner coordination', 'Repairs and deep cleaning', 'Recorded handover'],
    tone: 'Accountable / detailed / ready',
  },
];

export default function PortfolioPage() {
  return (
    <PageShell>
      <InnerHero
        eyebrow="Concept project archive"
        title="The work should show its thinking."
        body="Three editorial templates for showing scope, decisions and delivery with clarity. These are illustrative concepts, not completed client projects or endorsements."
        marker="Concepts only / ready for approved project records"
      />

      <section className="border-b border-black/10 bg-ink px-5 py-8 text-white md:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-6 sm:grid-cols-3">
          <div>
            <strong className="font-display text-4xl font-normal text-red-light">
              {site.verifiedCustomerCount}+
            </strong>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/48">
              Verified clients served
            </p>
          </div>
          <div>
            <strong className="font-display text-4xl font-normal text-red-light">
              Since {site.foundedYear}
            </strong>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/48">
              Established operating history
            </p>
          </div>
          <div className="sm:text-right">
            <strong className="font-display text-2xl font-normal">
              Real archive in preparation
            </strong>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/48">
              Project records are being selected and approved
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="mb-20 grid gap-8 border-b border-black/12 pb-10 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 className="max-w-3xl font-display text-5xl leading-[0.92] tracking-[-0.045em] md:text-7xl">
            A framework for evidence, not borrowed credibility.
          </h2>
          <p className="max-w-lg leading-relaxed text-ink/58 md:justify-self-end">
            Each format is ready to receive original photography, approved scope, verified outcomes
            and a client-approved story when those records are available.
          </p>
        </div>

        <div className="space-y-28 md:space-y-40">
          {concepts.map((concept, index) => (
            <article key={concept.number} className="group">
              <div
                className={`grid gap-0 border border-black/12 lg:grid-cols-12 ${
                  index % 2 ? 'bg-ink text-white' : 'bg-ivory'
                }`}
              >
                <div
                  className={`relative min-h-[460px] overflow-hidden lg:col-span-7 lg:min-h-[720px] ${
                    index % 2 ? 'lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={concept.image}
                    alt={concept.imageAlt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white md:bottom-9 md:left-9 md:right-9">
                    <p className="eyebrow">Illustrative concept imagery</p>
                    <span className="font-display text-6xl leading-none text-white/55">
                      {concept.number}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-7 md:p-12 lg:col-span-5 lg:p-14">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <p className={`eyebrow ${index % 2 ? 'text-red-light' : 'text-red'}`}>
                        {concept.discipline}
                      </p>
                      <ArrowDownRight className="size-5 opacity-40" />
                    </div>
                    <h3 className="mt-12 max-w-md font-display text-5xl leading-[0.9] tracking-[-0.045em] md:text-7xl">
                      {concept.title}
                    </h3>
                    <p
                      className={`mt-8 max-w-md text-base leading-relaxed ${
                        index % 2 ? 'text-white/62' : 'text-ink/60'
                      }`}
                    >
                      {concept.brief}
                    </p>
                  </div>

                  <div
                    className={`mt-20 border-t pt-7 ${index % 2 ? 'border-white/16' : 'border-black/12'}`}
                  >
                    <div className="mb-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] opacity-60">
                      <MapPin className="size-4" /> {concept.location}
                    </div>
                    <ul className="space-y-3">
                      {concept.scope.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm">
                          <Check
                            className={`size-4 ${index % 2 ? 'text-red-light' : 'text-red'}`}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.16em] opacity-45">
                      Direction: {concept.tone}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-28 grid gap-10 border-t border-black/12 pt-10 md:mt-40 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow text-red">Your property, properly documented</p>
            <p className="mt-6 max-w-4xl font-display text-4xl leading-tight tracking-[-0.03em] md:text-6xl">
              Have the first approved project record in mind? Start with a clear brief.
            </p>
          </div>
          <Link href="/contact#quote" className="button-primary shrink-0">
            Start a property brief <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
