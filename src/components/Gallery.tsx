import React, { useEffect, useRef, useState } from 'react';
import { GALLERY } from '../data/gallery';
import { Lightbox } from './Lightbox';

const images = GALLERY.map((g) => ({
  src: `/images/${g.file}`,
  alt: `${g.caption} interior`,
  caption: g.caption,
}));

export const Gallery: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Fade each tile up the first time it enters the viewport
  useEffect(() => {
    const tiles = gridRef.current?.querySelectorAll<HTMLElement>('[data-tile]');
    if (!tiles) return;
    if (!('IntersectionObserver' in window)) {
      tiles.forEach((t) => t.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    tiles.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="gallery"
      className="pt-20 md:pt-32 pb-8 md:pb-16 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14 scroll-mt-20"
    >
      <div className="mb-10 md:mb-16">
        <span className="eyebrow">Gallery</span>
        <h2 className="section-heading">A look inside</h2>
        <p className="mt-4 max-w-[52ch] text-base text-[var(--muted-color)]">
          Glimpses of retail stores, fitness spaces and interiors we have designed and delivered across India and abroad.
        </p>
      </div>

      <div ref={gridRef} className="gallery-grid">
        {GALLERY.map((g, i) => (
          <button
            key={g.file}
            type="button"
            data-tile
            onClick={() => setOpen(i)}
            aria-label={`Open ${g.caption} photo`}
            className="gallery-tile group"
          >
            <span className="block overflow-hidden rounded-xl bg-[var(--surface-color)]">
              <img
                src={`/images/${g.file}`}
                alt={`${g.caption} interior`}
                width={g.width}
                height={g.height}
                loading="lazy"
                className="block w-full h-auto transition-transform duration-500 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none"
              />
            </span>
            <span className="gallery-caption" aria-hidden="true">{g.caption}</span>
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        currentIndex={open ?? 0}
        isOpen={open !== null}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
      />
    </section>
  );
};
