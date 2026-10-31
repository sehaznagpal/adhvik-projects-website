import React, { useEffect, useRef, useState } from 'react';
import { Wordmark } from './Wordmark';

interface LoaderProps {
  imageSrcs: string[];
  onDone: () => void;
}

const COUNT_MS = 1200;
const MAX_WAIT_MS = 3500;
const EXIT_MS = 600;

export const Loader: React.FC<LoaderProps> = ({ imageSrcs, onDone }) => {
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const reduced = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  // Lock scroll while the loader is visible
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let imagesReady = false;
    let counted = false;
    let exited = false;
    const timers: number[] = [];
    let raf = 0;
    const start = performance.now();

    const exit = () => {
      if (exited || cancelled) return;
      exited = true;
      setExiting(true);
      timers.push(window.setTimeout(() => !cancelled && onDone(), reduced ? 300 : EXIT_MS));
    };
    const tryExit = () => {
      if (counted && imagesReady) exit();
    };

    // Wait for the hero images, but never longer than MAX_WAIT_MS
    let pending = imageSrcs.length;
    if (pending === 0) imagesReady = true;
    imageSrcs.forEach((src) => {
      const img = new Image();
      const settle = () => {
        pending -= 1;
        if (pending <= 0) {
          imagesReady = true;
          tryExit();
        }
      };
      img.onload = settle;
      img.onerror = settle;
      img.src = src;
    });
    timers.push(
      window.setTimeout(() => {
        imagesReady = true;
        counted = true;
        setPercent(100);
        tryExit();
      }, MAX_WAIT_MS)
    );

    if (reduced) {
      setPercent(100);
      timers.push(
        window.setTimeout(() => {
          counted = true;
          tryExit();
        }, 400)
      );
    } else {
      const tick = (now: number) => {
        const t = Math.min((now - start) / COUNT_MS, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setPercent(Math.round(eased * 100));
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          counted = true;
          tryExit();
        }
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [imageSrcs, onDone, reduced]);

  return (
    <div
      aria-hidden="true"
      className={`loader ${exiting ? (reduced ? 'loader-fade' : 'loader-exit') : ''}`}
    >
      <Wordmark animated={!reduced} className="loader-wordmark" />
      <div className="loader-percent">{percent}%</div>
    </div>
  );
};
