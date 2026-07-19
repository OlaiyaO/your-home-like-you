import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

import { Logo } from '@/components/Logo';
import { nav, serviceGroups, site, whatsappContactHref } from '@/data/site';

function SocialIcon({ label }) {
  if (label === 'Instagram') {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (label === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="currentColor">
        <path d="M13.6 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5H17V5a24 24 0 0 0-2.5-.2c-2.5 0-4.2 1.5-4.2 4.3V11H7.5v3h2.8v8h3.3Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="currentColor">
      <path d="M6.5 8.4H3.3V21h3.2V8.4ZM4.9 3A1.9 1.9 0 1 0 5 6.8 1.9 1.9 0 0 0 5 3ZM21 13.8c0-3.8-2-5.6-4.7-5.6a4 4 0 0 0-3.7 2h-.1V8.4h-3V21h3.2v-6.2c0-1.6.3-3.2 2.4-3.2 2 0 2.1 1.9 2.1 3.3V21H21v-7.2Z" />
    </svg>
  );
}

export function Footer() {
  const socials = [
    {
      label: 'Instagram',
      href: site.instagram,
      configured: site.instagramConfigured,
    },
    { label: 'Facebook', href: site.facebook, configured: site.facebookConfigured },
    { label: 'LinkedIn', href: site.linkedin, configured: site.linkedinConfigured },
  ];

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-14 border-b border-white/15 pb-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1fr_1.15fr]">
          <div>
            <Logo inverted />
            <p className="mt-7 max-w-md text-lg leading-relaxed text-white/60">
              {site.description}
            </p>
            <a
              href={whatsappContactHref}
              target={site.whatsappConfigured ? '_blank' : undefined}
              rel={site.whatsappConfigured ? 'noreferrer' : undefined}
              className="mt-8 inline-flex min-h-12 items-center gap-3 border border-[#25D366]/45 bg-[#25D366]/10 px-5 text-sm font-bold text-white hover:border-[#25D366] hover:bg-[#25D366] hover:text-ink"
            >
              <MessageCircle className="size-5 text-[#25D366]" />
              {site.whatsappConfigured ? 'Chat on WhatsApp' : 'Start here for WhatsApp'}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div>
            <p className="eyebrow text-red-light">Explore</p>
            <div className="mt-5 flex flex-col gap-3">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="text-white/65 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow text-red-light">What we do</p>
            <div className="mt-5 flex flex-col gap-3">
              {serviceGroups.map((group) => (
                <Link
                  key={group.id}
                  href={`/services#${group.id}`}
                  className="text-white/65 hover:text-white"
                >
                  {group.title}
                </Link>
              ))}
            </div>
          </div>
          <address className="not-italic">
            <p className="eyebrow text-red-light">Contact</p>
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-white/65">
              <p>{site.contactName}</p>
              <a className="block hover:text-white" href={`tel:${site.phone.replaceAll(' ', '')}`}>
                {site.phone}
              </a>
              {site.primaryEmailConfigured && (
                <a
                  className="block break-all hover:text-white"
                  href={`mailto:${site.primaryEmail}`}
                >
                  {site.primaryEmail}
                </a>
              )}
              <div className="pt-2">
                {site.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </address>
        </div>
        <div className="flex flex-col gap-5 pt-8 text-xs uppercase tracking-[0.16em] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Your Home Like You. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/service-cancellation">Cancellation</Link>
            <Link href="/brand-kit">Brand kit</Link>
            <div className="flex items-center gap-2" aria-label="Social channels">
              {socials.map(({ label, href, configured }) => (
                <a
                  key={label}
                  href={href}
                  target={configured ? '_blank' : undefined}
                  rel={configured ? 'noreferrer' : undefined}
                  aria-label={configured ? label : `${label} profile coming soon; return home`}
                  title={configured ? label : `${label} profile coming soon`}
                  className="grid size-9 place-items-center border border-white/18 text-white/65 hover:border-red-light hover:text-white"
                >
                  <SocialIcon label={label} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
