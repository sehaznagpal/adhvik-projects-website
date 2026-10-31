import React, { useEffect, useRef, useState } from 'react';
import { BRANDS } from '../data/brands';

const SPEED_PX_PER_SEC = 40;

export const Ticker: React.FC = () => {
  const firstRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(0);

  // One steady speed: duration follows the width of a single copy of the list
  useEffect(() => {
    const el = firstRef.current;
    if (!el) return;
    const measure = () => setDuration(el.offsetWidth / SPEED_PX_PER_SEC);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  const renderBrands = (prefix: string) =>
    BRANDS.map((item, idx) => (
      <React.Fragment key={`${prefix}-${idx}`}>
        {idx % 2 === 0 ? (
          <span className="px-5 md:px-7 font-heading-plain uppercase tracking-[0.08em] text-sm md:text-base">
            {item}
          </span>
        ) : (
          <span className="px-5 md:px-7 font-serif-italic text-xl md:text-2xl">{item}</span>
        )}
        <span className="text-[var(--accent-color)] text-xs" aria-hidden="true">✦</span>
      </React.Fragment>
    ));

  return (
    <div
      aria-label="Brands we've built for"
      className="w-full border-y border-[var(--border-color)] bg-[var(--bg-color)] pt-5 pb-4 md:pt-6 md:pb-5 overflow-hidden select-none transition-colors duration-300"
    >
      <p className="px-5 mb-6 md:mb-8 text-center text-xs uppercase tracking-[0.08em] text-[var(--muted-color)] font-medium">
        Brands we've built for
      </p>

      {/* Moving strip (hidden for reduced motion) */}
      <div className="brand-marquee">
        <div
          className="brand-marquee-track flex items-center whitespace-nowrap text-[var(--text-color)]"
          style={duration ? { animationDuration: `${duration}s` } : { animationPlayState: 'paused' }}
        >
          <div ref={firstRef} className="flex items-center shrink-0">{renderBrands('b1')}</div>
          <div className="flex items-center shrink-0" aria-hidden="true">{renderBrands('b2')}</div>
        </div>
      </div>

      {/* Static wrapped list for reduced motion */}
      <div className="brand-static flex-wrap items-center justify-center text-[var(--text-color)] max-w-[1100px] mx-auto">
        {renderBrands('s')}
      </div>
    </div>
  );
};
