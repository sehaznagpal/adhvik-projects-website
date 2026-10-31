import React, { useState, useEffect, useRef } from 'react';
import { BRANDS } from '../data/brands';

export const Ticker: React.FC = () => {
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [isReverse, setIsReverse] = useState(false);
  const lastScrollY = useRef(0);
  const velocityRef = useRef(1);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      if (Math.abs(delta) > 1) {
        setIsReverse(delta < 0);
        // Boost velocity according to scroll amount, capped at 4x
        const boost = 1 + Math.min(Math.abs(delta) / 6, 3.5);
        velocityRef.current = Math.max(velocityRef.current, boost);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Decay velocity back to 1x smoothly
    const updateVelocity = () => {
      if (velocityRef.current > 1.01) {
        velocityRef.current += (1 - velocityRef.current) * 0.08;
        setSpeedMultiplier(velocityRef.current);
      } else if (velocityRef.current !== 1) {
        velocityRef.current = 1;
        setSpeedMultiplier(1);
      }
      animFrameId.current = requestAnimationFrame(updateVelocity);
    };

    animFrameId.current = requestAnimationFrame(updateVelocity);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  const baseDuration = 38;
  const currentDuration = baseDuration / speedMultiplier;

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
      <p className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14 mb-3 text-xs uppercase tracking-[0.08em] text-[var(--muted-color)] font-medium">
        Brands we've built for
      </p>
      <div
        className="animate-ticker flex items-center whitespace-nowrap text-[var(--text-color)]"
        style={{
          animationDuration: `${currentDuration}s`,
          animationDirection: isReverse ? 'reverse' : 'normal',
        }}
      >
        <div className="flex items-center">{renderBrands('b1')}</div>
        <div className="flex items-center" aria-hidden="true">{renderBrands('b2')}</div>
      </div>
    </div>
  );
};
