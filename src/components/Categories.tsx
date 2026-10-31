import React, { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from '../data/categories';

export const Categories: React.FC = () => {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLLIElement>) => {
    const row = e.currentTarget;
    const img = row.querySelector<HTMLElement>('[data-cursor-image]');
    if (!img) return;
    const rect = row.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left + 24, rect.width - img.offsetWidth));
    const y = e.clientY - rect.top - img.offsetHeight / 2;
    img.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <section
      id="what-we-build"
      className="pt-20 md:pt-32 pb-8 md:pb-16 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14 scroll-mt-20"
    >
      <div className="mb-10 md:mb-16">
        <span className="eyebrow">What we build</span>
        <h2 className="section-heading">
          Spaces we deliver,{' '}
          <span className="font-serif-italic font-light whitespace-nowrap">end to end.</span>
        </h2>
      </div>

      <ul className="border-t border-[var(--border-color)] [overflow-x:clip]">
        {CATEGORIES.map((cat, idx) => {
          return (
          <li
            key={cat.slug}
            onMouseMove={canHover && cat.image ? handleMove : undefined}
            className="category-row group relative border-b border-[var(--border-color)] py-6 md:py-8"
          >
            <div>
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-10">
              <div className="flex items-baseline gap-4 md:gap-6 min-w-0">
                <span className="text-xs md:text-sm tabular-nums text-[var(--muted-color)] transition-colors duration-300 group-hover:text-[var(--accent-color)] shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="font-heading text-[clamp(1.5rem,5.5vw,3.5rem)] md:text-[clamp(1.75rem,4vw,3.5rem)] font-semibold tracking-[0] text-[var(--text-color)] leading-[1.05] [overflow-wrap:break-word] min-w-0 transition-transform duration-300 ease-out md:group-hover:translate-x-3 motion-reduce:transform-none">
                  {cat.name}
                </h3>
              </div>
              <p className="text-base text-[var(--muted-color)] pl-9 md:pl-0 md:max-w-[26ch] md:text-right shrink-0">
                {cat.line}
              </p>
            </div>
            </div>

            {canHover && cat.image && (
              <div
                data-cursor-image
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-10 w-[280px] aspect-[4/5] rounded-xl overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden md:block"
                style={{ transform: 'translate3d(60%, 0, 0)' }}
              >
                <img src={cat.image} alt="" className="w-full h-full object-cover" />
              </div>
            )}
          </li>
          );
        })}
      </ul>
    </section>
  );
};
