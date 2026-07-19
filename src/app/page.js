import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react';

import { PageShell } from '@/components/PageShell';
import { QuoteForm } from '@/components/QuoteForm';
import { SectionHeading } from '@/components/SectionHeading';
import { projectProcess, serviceGroups, site, whatsappContactHref } from '@/data/site';

export default function Home() {
  return (
    <PageShell>
      <section className="home-hero relative min-h-[calc(100svh-5rem)] overflow-hidden bg-ink">
        <Image
          src="/hero-luxury-residence.jpg"
          alt="An illuminated contemporary residence with detailed stone, glass and landscaped finishes"
          fill
          priority
          sizes="100vw"
          className="home-hero__image object-cover"
        />
        <div className="home-hero__veil absolute inset-0" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1440px] items-center px-5 py-20 md:px-10 lg:py-28">
          <div className="home-hero__copy max-w-[650px]">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-8 bg-red" />
              <p className="eyebrow text-red-light">For homes and properties across Abuja</p>
            </div>
            <h1 className="max-w-3xl font-display text-[clamp(4.5rem,8vw,8.8rem)] leading-[0.78] tracking-[-0.065em] text-white">
              Your home.
              <span className="block italic text-red-light">Like you.</span>
            </h1>
            <p className="mt-10 max-w-[570px] text-lg leading-relaxed text-white/82 md:text-xl">
              Beautifully dressed, carefully maintained and thoughtfully transformed, through one
              team that sees the whole picture.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact#quote" className="button-primary">
                Tell us about your space <ArrowUpRight className="size-4" />
              </Link>
              <a
                href="#services"
                className="home-hero__secondary button-secondary bg-black/20 backdrop-blur-md"
              >
                See what we do <ArrowDown className="size-4" />
              </a>
            </div>
            <div className="mt-14 grid max-w-[760px] grid-cols-2 border-l border-t border-white/22 bg-black/25 text-[10px] font-bold uppercase tracking-[0.12em] text-white/76 backdrop-blur-md sm:grid-cols-5">
              {serviceGroups.map((group) => (
                <span key={group.id} className="border-b border-r border-white/18 px-3 py-4">
                  {group.eyebrow}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="absolute bottom-7 right-7 z-10 hidden text-[10px] font-bold uppercase tracking-[0.22em] text-white/70 md:block">
          Property, made personal.
        </p>
      </section>

      <section className="border-y border-black/10 bg-paper">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-[0.55fr_1.45fr]">
          <div className="flex items-center border-b border-black/10 px-5 py-8 md:border-b-0 md:border-r md:px-10">
            <p className="eyebrow text-red">One home, one team</p>
          </div>
          <p className="px-5 py-8 font-display text-2xl leading-tight tracking-[-0.02em] text-ink md:px-10 md:text-4xl">
            Because a beautiful home is not one job. It is every detail working beautifully
            together.
          </p>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <SectionHeading
            eyebrow="Everything your space needs"
            title="Beautiful now. Ready for what comes next."
          />
          <p className="max-w-2xl text-lg leading-relaxed text-ink/58 lg:justify-self-end md:text-xl">
            Come to us for one service or let us bring several together. Either way, the result is
            considered as a whole, not a collection of disconnected jobs.
          </p>
        </div>

        <div className="mt-16 border-t border-black/15">
          {serviceGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <Link
                key={group.id}
                href={`/services#${group.id}`}
                className="service-panel group grid border-b border-black/15 lg:grid-cols-2"
              >
                <div
                  className={`service-panel__image relative min-h-[320px] overflow-hidden bg-stone lg:min-h-[560px] ${index % 2 ? 'lg:order-2' : ''}`}
                >
                  <Image
                    src={group.image}
                    alt={group.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 md:bottom-7 md:left-7">
                    Illustrative service image
                  </p>
                </div>

                <div
                  className={`flex min-h-[480px] flex-col justify-between px-6 py-9 md:p-12 lg:min-h-[560px] lg:p-16 ${index % 2 ? 'lg:order-1' : ''}`}
                >
                  <div className="flex items-start justify-between gap-8">
                    <div>
                      <span className="font-display text-4xl text-red">{group.number}</span>
                      <p className="eyebrow mt-4 text-ink/42">{group.eyebrow}</p>
                    </div>
                    <span className="grid size-12 shrink-0 place-items-center border border-black/15 transition group-hover:border-red group-hover:bg-red group-hover:text-white">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>

                  <div className="mt-14">
                    <Icon className="mb-6 size-6 text-red" />
                    <h2 className="max-w-xl font-display text-[clamp(2.7rem,4vw,4.6rem)] leading-[0.94] tracking-[-0.045em]">
                      {group.title}
                    </h2>
                    <p className="mt-7 max-w-xl text-base leading-relaxed text-ink/62 md:text-lg">
                      {group.description}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-black/12 pt-6">
                      {group.services.slice(0, 3).map((service) => (
                        <span
                          key={service}
                          className="text-[11px] font-bold uppercase tracking-[0.09em] text-ink/48"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-5 max-w-2xl text-xs leading-relaxed text-ink/42">
          Service images are illustrative while our verified project archive is being prepared.
        </p>
      </section>

      <section className="bg-ink px-5 py-24 text-white md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow text-red-light">What accountability means</p>
            <h2 className="mt-6 max-w-lg font-display text-[clamp(3.5rem,6vw,6.3rem)] leading-[0.9] tracking-[-0.05em]">
              Fewer loose ends.
              <span className="block italic text-red-light">A clearer finish.</span>
            </h2>
          </div>
          <div className="border-t border-white/18">
            {[
              [
                '01',
                'One defined scope',
                'The agreed outcome, responsibilities and inclusions are made clear before delivery begins.',
              ],
              [
                '02',
                'One coordinated sequence',
                'Trades and services are organised around the property, rather than leaving you to connect them.',
              ],
              [
                '03',
                'One record of decisions',
                'Materials, finishes and changes stay connected to the approved direction.',
              ],
              [
                '04',
                'One proper handover',
                'Delivery closes with a walkthrough and open-item check, not an unexplained exit.',
              ],
            ].map(([number, title, body]) => (
              <div
                key={number}
                className="grid gap-5 border-b border-white/18 py-8 sm:grid-cols-[64px_0.8fr_1.2fr] sm:items-start"
              >
                <span className="font-display text-2xl text-red-light">{number}</span>
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="text-sm leading-relaxed text-white/52">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-paper px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            eyebrow="The project path"
            title="Clarity before activity."
            body="Every property is different. The way we move from request to handover should still feel considered and clear."
          />
          <div className="mt-16 grid border-l border-t border-black/12 md:grid-cols-2 lg:grid-cols-4">
            {projectProcess.map((item) => (
              <div
                key={item.step}
                className="relative min-h-80 border-b border-r border-black/12 p-7 md:p-9"
              >
                <p className="eyebrow text-red">Stage {item.step}</p>
                <h3 className="mt-16 font-display text-3xl leading-[1.05]">{item.title}</h3>
                <p className="mt-5 text-sm leading-relaxed text-ink/52">{item.detail}</p>
                <span className="absolute bottom-7 right-7 size-2 bg-red" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory px-5 py-24 md:px-10 md:py-36" id="quote">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Start with a property brief"
              title="What needs to change?"
              body="Send the current condition, the outcome you want and where the property is. Rough ideas, photos and measurements are enough to begin the conversation."
            />
            <div className="mt-10 border-t border-black/12 pt-6">
              <p className="text-sm leading-relaxed text-ink/55">
                Prefer to talk it through first?
              </p>
              <a
                href={whatsappContactHref}
                target={site.whatsappConfigured ? '_blank' : undefined}
                rel={site.whatsappConfigured ? 'noreferrer' : undefined}
                className="mt-3 inline-flex items-center gap-2 font-bold text-ink"
              >
                <MessageCircle className="size-5 text-[#169C46]" />
                {site.whatsappConfigured ? 'Chat on WhatsApp' : 'WhatsApp Business coming soon'}
              </a>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <section className="border-t border-black/10 bg-paper px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-red">{site.tagline}</p>
            <p className="mt-3 max-w-4xl font-display text-4xl leading-tight tracking-[-0.035em] md:text-6xl">
              {site.promise}
            </p>
          </div>
          <Link href="/contact#quote" className="button-primary shrink-0">
            Start a property brief <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
