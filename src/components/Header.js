'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';

import { Logo } from '@/components/Logo';
import { nav } from '@/data/site';

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-paper/92 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Logo />

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`text-sm font-semibold transition hover:text-red ${active ? 'text-red' : 'text-ink/70'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/contact#quote" className="header__cta button-primary">
          Start a property brief <ArrowUpRight className="size-4" />
        </Link>

        <button
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="grid size-11 place-items-center border border-black/10 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-black/8 bg-paper px-5 py-6 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-black/8 py-4 font-display text-3xl text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact#quote"
              onClick={() => setOpen(false)}
              className="button-primary mt-6 justify-center"
            >
              Start a property brief <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
