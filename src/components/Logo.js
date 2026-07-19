import Link from 'next/link';

import { cn } from '@/lib/utils';

export function Mark({ className, inverted = false }) {
  const color = inverted ? '#FFFDFC' : '#C81522';

  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Your Home Like You"
      className={cn('size-10', className)}
    >
      <path
        d="M10 54V24L32 9l22 15v30"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="miter"
      />
      <path
        d="m20 28 12 11 12-11M32 39v15"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function Logo({ className, inverted = false }) {
  return (
    <Link href="/" className={cn('inline-flex items-center gap-3', className)}>
      <Mark inverted={inverted} />
      <span className="leading-none">
        <span
          className={cn(
            'block font-display text-xl tracking-[-0.035em]',
            inverted ? 'text-white' : 'text-ink',
          )}
        >
          Your Home
        </span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-red">
          Like You
        </span>
      </span>
    </Link>
  );
}
