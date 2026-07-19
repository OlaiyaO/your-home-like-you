import { cn } from '@/lib/utils';

export function SectionHeading({ eyebrow, title, body, align = 'left', light = false }) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      <p className={cn('eyebrow', light ? 'text-red-light' : 'text-red')}>{eyebrow}</p>
      <h2 className={cn('section-title mt-4', light && 'text-white')}>{title}</h2>
      {body && (
        <p className={cn('mt-5 text-lg leading-relaxed', light ? 'text-white/65' : 'text-ink/62')}>
          {body}
        </p>
      )}
    </div>
  );
}
