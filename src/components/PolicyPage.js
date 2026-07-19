import Link from 'next/link';

import { InnerHero } from '@/components/InnerHero';
import { PageShell } from '@/components/PageShell';

export const DRAFT_POLICY_NOTICE = 'Operational draft - review before enabling live payments';

export function PolicyPage({ eyebrow, title, introduction, sections, children }) {
  return (
    <PageShell>
      <InnerHero
        eyebrow={eyebrow}
        title={title}
        body={introduction}
        marker="Customer policy / draft"
      />
      <main className="mx-auto max-w-[1120px] px-5 py-14 md:px-10 md:py-24">
        <div className="border-l-4 border-red bg-ivory px-5 py-4 text-sm font-extrabold text-ink md:px-7">
          {DRAFT_POLICY_NOTICE}
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-red">On this page</p>
            <nav
              className="mt-5 flex flex-col border-t border-black/12"
              aria-label={`${title} sections`}
            >
              {sections.map((section, index) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  className="border-b border-black/12 py-3 text-sm font-bold text-ink/60 hover:text-red"
                >
                  {String(index + 1).padStart(2, '0')} / {section.title}
                </Link>
              ))}
            </nav>
          </aside>
          <div className="min-w-0 space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 text-[0.98rem] leading-7 text-ink/65 md:text-base">
                  {section.content}
                </div>
              </section>
            ))}
            {children}
          </div>
        </div>
      </main>
    </PageShell>
  );
}
