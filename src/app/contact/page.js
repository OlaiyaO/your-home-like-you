import Link from 'next/link';
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';

import { InnerHero } from '@/components/InnerHero';
import { PageShell } from '@/components/PageShell';
import { QuoteForm } from '@/components/QuoteForm';
import { site, whatsappContactHref } from '@/data/site';

export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <PageShell>
      <InnerHero
        eyebrow="Start a property brief"
        title="Bring us the property as it is."
        body="Photos, measurements and a rough idea are enough to begin. We will use them to understand the need and define the next practical step."
        marker="Project intake / initial scope"
      />

      <section id="quote" className="scroll-mt-24 bg-ivory px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow text-red">A useful first brief</p>
            <h2 className="mt-5 max-w-lg font-display text-5xl leading-[0.95] tracking-[-0.04em]">
              Start with the outcome, not perfect answers.
            </h2>
            <div className="mt-10 border-t border-black/12">
              {[
                'What is not working now',
                'What you want the property to become',
                'The property location',
                'Any photos, measurements or timing constraints',
              ].map((item) => (
                <p
                  key={item}
                  className="flex items-center gap-3 border-b border-black/10 py-4 text-sm font-semibold text-ink/68"
                >
                  <Check className="size-4 text-red" /> {item}
                </p>
              ))}
            </div>
            <div id="whatsapp" className="mt-10 border-l-2 border-[#25D366] pl-5">
              <p className="text-sm leading-relaxed text-ink/55">Prefer a conversation first?</p>
              <a
                href={whatsappContactHref}
                target={site.whatsappConfigured ? '_blank' : undefined}
                rel={site.whatsappConfigured ? 'noreferrer' : undefined}
                className="mt-3 inline-flex items-center gap-2 font-bold text-ink"
              >
                <MessageCircle className="size-5 text-[#169C46]" />
                {site.whatsappConfigured
                  ? 'Chat with us on WhatsApp'
                  : 'WhatsApp Business coming soon'}
                <ArrowUpRight className="size-4" />
              </a>
              {!site.whatsappConfigured && (
                <p className="mt-2 max-w-sm text-xs leading-relaxed text-ink/42">
                  Use the project form for now. The verified business number will be connected here.
                </p>
              )}
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <section
        id="socials"
        className="border-t border-black/10 bg-paper px-5 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow text-red">Find us online</p>
              <h2 className="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.04em] md:text-6xl">
                More ways to stay close.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-ink/55 lg:justify-self-end">
              Start on WhatsApp now or follow our verified Instagram profile for updates and project
              inspiration.
            </p>
          </div>

          <div className="mt-12 grid border-l border-t border-black/12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['WhatsApp Business', whatsappContactHref, site.whatsappConfigured],
              ['Instagram', site.instagram, site.instagramConfigured],
              ['Facebook', site.facebook, site.facebookConfigured],
              ['LinkedIn', site.linkedin, site.linkedinConfigured],
            ]
              .filter(([, , configured]) => configured)
              .map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-44 flex-col justify-between border-b border-r border-black/12 p-6 hover:bg-ivory md:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="size-2 bg-[#25D366]" />
                    <ArrowUpRight className="size-4 text-ink/35 transition group-hover:text-red" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl">{label}</h3>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.1em] text-ink/38">
                      Open verified channel
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
