import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Wordmark } from './Wordmark';

interface LoaderProps {
  imageSrcs: string[];
  onDone: () => void;
}

const COUNT_MS = 2600;
const HOLD_MS = 800;
const MAX_WAIT_MS = 3500;
const EXIT_MS = 700;
const REDUCED_HOLD_MS = 1000;
const REDUCED_EXIT_MS = 300;

export const Loader: React.FC<LoaderProps> = ({ imageSrcs, onDone }) => {
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const skipRef = useRef<() => void>(() => {});
  const reduced = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  // Fit the wordmark to 85% of the viewport width (never larger than its CSS size)
  const markRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const fit = () => {
      const el = markRef.current?.firstElementChild as HTMLElement | null;
      if (!el) return;
      el.style.fontSize = '';
      const max = window.innerWidth * 0.85;
      const w = el.getBoundingClientRect().width;
      if (w > max) {
        el.style.fontSize = `${(parseFloat(getComputedStyle(el).fontSize) * max) / w}px`;
      }
    };
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

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
    let held = false;
    let exited = false;
    const timers: number[] = [];
    let raf = 0;
    const start = performance.now();

    const exit = () => {
      if (exited || cancelled) return;
      exited = true;
      cancelAnimationFrame(raf);
      setPercent(100);
      setExiting(true);
      timers.push(window.setTimeout(() => !cancelled && onDone(), reduced ? REDUCED_EXIT_MS : EXIT_MS));
    };
    const tryExit = () => {
      if (held && imagesReady) exit();
    };
    skipRef.current = exit;

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
        tryExit();
      }, MAX_WAIT_MS)
    );

    if (reduced) {
      setPercent(100);
      timers.push(
        window.setTimeout(() => {
          held = true;
          tryExit();
        }, REDUCED_HOLD_MS)
      );
    } else {
      const tick = (now: number) => {
        const t = Math.min((now - start) / COUNT_MS, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setPercent(Math.round(eased * 100));
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          timers.push(
            window.setTimeout(() => {
              held = true;
              tryExit();
            }, HOLD_MS)
          );
        }
      };
      raf = requestAnimationFrame(tick);
    }

    // Skip: any key press or tap/click anywhere
    const skip = () => exit();
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [imageSrcs, onDone, reduced]);

  return (
    <div
      aria-hidden="true"
      className={`loader ${exiting ? (reduced ? 'loader-fade' : 'loader-exit') : ''}`}
    >
      <div ref={markRef} className="flex max-w-full justify-center">
        <Wordmark animated={!reduced} showLine className="loader-wordmark" />
      </div>
      <div className="loader-percent">{percent}%</div>
      <button
        type="button"
        tabIndex={-1}
        onClick={() => skipRef.current()}
        className="loader-skip"
      >
        Skip
      </button>
    </div>
  );
};
