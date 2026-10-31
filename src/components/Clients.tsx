import React, { useEffect, useRef, useState } from 'react';
import { BRANDS } from '../data/brands';

const SPEED_PX_PER_SEC = 40;
const ROTATIONS = [-1.5, 1, -0.5, 1.5];
const OFFSETS = [0, 6, -4, 4, -6, 2];

export const Clients: React.FC = () => {
  const firstRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(0);

  // One steady speed: duration follows the width of a single copy of the row
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

  const renderCards = (prefix: string) =>
    BRANDS.map((client, idx) => (
      <div
        key={`${prefix}-${idx}`}
        className="client-card"
        style={
          {
            '--r': `${ROTATIONS[idx % ROTATIONS.length]}deg`,
            '--y': `${OFFSETS[idx % OFFSETS.length]}px`,
          } as React.CSSProperties
        }
      >
        {client.logo ? (
          <span
            role="img"
            aria-label={`${client.name} logo`}
            className="client-logo"
            style={
              {
                '--logo': `url(${client.logo})`,
                '--ratio': client.ratio,
              } as React.CSSProperties
            }
          />
        ) : (
          <span
            className={
              idx % 2 === 0
                ? 'font-heading-plain uppercase tracking-[0.06em] text-sm md:text-lg'
                : 'font-serif-italic text-2xl md:text-3xl leading-tight'
            }
          >
            {client.name}
          </span>
        )}
      </div>
    ));

  return (
    <section
      aria-labelledby="clients-heading"
      className="w-full border-y border-[var(--border-color)] bg-[var(--bg-color)] py-16 md:py-24 overflow-hidden select-none transition-colors duration-300"
    >
      <div className="px-5 text-center">
        <span className="eyebrow !text-[var(--muted-color)]">Clients</span>
        <h2 id="clients-heading" className="section-heading">
          We're trusted by
        </h2>
      </div>

      <div className="mt-12 client-marquee">
        <div
          className="client-track"
          style={duration ? { animationDuration: `${duration}s` } : { animationPlayState: 'paused' }}
        >
          <div ref={firstRef} className="flex shrink-0 items-center">{renderCards('a')}</div>
          <div className="flex shrink-0 items-center" aria-hidden="true">{renderCards('b')}</div>
        </div>
      </div>

      <div className="client-static mt-12 px-5 mx-auto max-w-[1100px] items-center justify-center">
        {renderCards('s')}
      </div>
    </section>
  );
};
