import React, { useState, useEffect, useRef } from 'react';
import { TICKER_ITEMS } from '../data/projects';

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

  return (
    <div
      aria-label="Capabilities and delivery marquee"
      className="w-full border-y border-[var(--border-color)] bg-[var(--bg-color)] py-3.5 md:py-4 overflow-hidden select-none transition-colors duration-300"
    >
      <div
        className="animate-ticker flex items-center whitespace-nowrap text-xs md:text-sm font-medium tracking-[0.08em] text-[var(--text-color)] uppercase"
        style={{
          animationDuration: `${currentDuration}s`,
          animationDirection: isReverse ? 'reverse' : 'normal',
        }}
      >
        {/* First repetition */}
        <div className="flex items-center">
          {TICKER_ITEMS.map((item, idx) => (
            <React.Fragment key={`ticker-1-${idx}`}>
              <span className="px-4 md:px-6">{item}</span>
              <span className="text-[var(--accent-color)] text-xs" aria-hidden="true">✦</span>
            </React.Fragment>
          ))}
        </div>

        {/* Second repetition for smooth infinite loop */}
        <div className="flex items-center" aria-hidden="true">
          {TICKER_ITEMS.map((item, idx) => (
            <React.Fragment key={`ticker-2-${idx}`}>
              <span className="px-4 md:px-6">{item}</span>
              <span className="text-[var(--accent-color)] text-xs">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
