'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Printer } from 'lucide-react';

export function TemplatePrintToolbar({ autoPrint, download, title }) {
  useEffect(() => {
    if (!autoPrint) return;

    const timeout = window.setTimeout(() => window.print(), 500);
    return () => window.clearTimeout(timeout);
  }, [autoPrint]);

  return (
    <header className="template-screen-only sticky top-0 z-20 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-8">
        <Link
          href="/brand-kit#templates"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <ArrowLeft className="size-4" /> Back to brand kit
        </Link>
        <p className="order-3 w-full text-center text-xs font-bold uppercase tracking-[0.16em] text-white/50 md:order-none md:w-auto">
          {title} · Print preview
        </p>
        <div className="flex gap-2">
          {download && (
            <a
              href={download}
              download
              className="inline-flex min-h-10 items-center gap-2 border border-white/25 px-3 text-xs font-bold hover:border-white"
            >
              <Download className="size-4" /> Download SVG
            </a>
          )}
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-10 items-center gap-2 bg-red px-3 text-xs font-bold hover:bg-red-dark"
          >
            <Printer className="size-4" /> Print / Save PDF
          </button>
        </div>
      </div>
      <p className="px-4 pb-3 text-center text-[11px] text-white/50">
        In the print dialog, enable background graphics and choose Save as PDF.
      </p>
    </header>
  );
}
