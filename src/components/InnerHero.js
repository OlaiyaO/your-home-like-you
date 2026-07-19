export function InnerHero({ eyebrow, title, body, marker = 'Property / made personal' }) {
  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-ivory">
      <div className="absolute inset-0 dossier-grid-dark opacity-35" />
      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[1.08fr_0.62fr] lg:items-end">
        <div className="max-w-5xl">
          <p className="eyebrow text-red">{eyebrow}</p>
          <h1 className="mt-6 font-display text-[clamp(3.8rem,8vw,8rem)] leading-[0.84] tracking-[-0.06em] text-ink">
            {title}
          </h1>
        </div>
        <div className="border-t border-black/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="eyebrow text-ink/35">{marker}</p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/60 md:text-xl">{body}</p>
        </div>
      </div>
    </section>
  );
}
