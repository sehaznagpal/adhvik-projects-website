import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GALLERY } from '../data/gallery';
import { TAGLINE } from '../data/brand';

/** Photos in the strip, in order. Pulled from the curated gallery list. */
const STRIP_FILES = [
  'kuber-01.jpg',
  'global-republic-rajouri-garden-01.jpg',
  'madame-jeddah-02.jpg',
  'wardrobe-gwalior-02.jpg',
  'anytime-fitness-karol-bagh-01.jpg',
  'shri-ram-hari-ram-jewellers-01.jpg',
  'mi-arcus-01.jpg',
  'global-republic-mohali-01.jpg',
  'stanmax-dehradun-05.jpg',
  'madame-jeddah-03.jpg',
];
const STRIP = STRIP_FILES.map((f) => GALLERY.find((g) => g.file === f)!).filter(Boolean);

/** Used by the loader to preload the first photos. */
export const HERO_IMAGES = STRIP.slice(0, 3).map((g) => ({ src: `/images/${g.file}`, alt: g.caption }));

/** Image heights as a share of the strip's available height */
const HEIGHT_SHARE = [0.7, 1, 0.8, 0.95, 0.75];
const SPEED = 20; // px per second

const DESCRIPTION =
  'Turnkey solutions across 20 states. Est. 2013.';

function useDesktop() {
  const query = '(min-width: 768px)';
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return match;
}

/** Letters that rise in one by one (25ms apart); `start` offsets the stagger across lines. */
const Letters: React.FC<{ text: string; start?: number }> = ({ text, start = 0 }) => (
  <>
    {text.split('').map((ch, i) =>
      ch === ' ' ? (
        <span key={i} className="hero-space" />
      ) : (
        <span key={i} className="hero-letter" style={{ ['--i' as string]: start + i }}>
          {ch}
        </span>
      )
    )}
  </>
);

/** A line of text sized to fill the width of its container, but never taller than `maxRatio` of the hero height. */
const FitLine: React.FC<{ children: React.ReactNode; maxRatio: number }> = ({ children, maxRatio }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const box = boxRef.current!;
    const inner = box.firstElementChild as HTMLElement;
    let lastW = -1;
    const fit = () => {
      const width = box.clientWidth;
      if (!width) return;
      // Glyph widths change slightly with size (optical sizing), so refine a few times
      let size = 100;
      for (let i = 0; i < 4; i++) {
        inner.style.fontSize = `${size}px`;
        const natural = inner.getBoundingClientRect().width;
        if (!natural) return;
        const next = (size * width) / natural;
        if (Math.abs(next - size) < 0.05) break;
        size = next;
      }
      // Height cap, so a short screen keeps room for the photo strip (skipped on very short screens)
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 64;
      if (window.innerHeight >= 520) size = Math.min(size, (window.innerHeight - header) * maxRatio);
      inner.style.fontSize = `${size}px`;
    };
    fit();
    const ro = new ResizeObserver(() => {
      const w = box.clientWidth;
      if (w !== lastW) {
        lastW = w;
        fit();
      }
    });
    ro.observe(box);
    window.addEventListener('resize', fit);
    document.fonts?.ready.then(fit);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, [maxRatio]);
  return (
    <div ref={boxRef} className="hero-fit">
      <span className="hero-fit-inner">{children}</span>
    </div>
  );
};

const Strip: React.FC<{ mobile: boolean; reduced: boolean }> = ({ mobile, reduced }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Slow right-to-left drift over three copies of the list, so it loops seamlessly and can be dragged either way
  useEffect(() => {
    const el = ref.current!;
    let pos = 0;
    let last = 0;
    let hover = false;
    let down = false;
    let pauseUntil = 0;
    let prev = performance.now();
    let raf = 0;
    let dragX = 0;
    let dragStart = 0;
    const third = () => el.scrollWidth / 3;
    // Image heights are shares of the strip's available height
    const setAvail = () =>
      el.style.setProperty('--avail', `${Math.max(el.clientHeight, 60)}px`);
    setAvail();
    const roH = new ResizeObserver(setAvail);
    roH.observe(el);
    const write = () => {
      el.scrollLeft = pos;
      last = el.scrollLeft;
    };
    pos = third();
    write();

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;
      const h = third();
      let changed = false;
      if (!reduced && !hover && !down && now > pauseUntil) {
        pos += SPEED * dt;
        changed = true;
      }
      if (pos >= 2 * h) {
        pos -= h;
        changed = true;
      } else if (pos < 1 && h > 0) {
        pos += h;
        changed = true;
      }
      if (changed) write();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onScroll = () => {
      if (Math.abs(el.scrollLeft - last) > 1.5) {
        pos = el.scrollLeft;
        last = el.scrollLeft;
        pauseUntil = performance.now() + 1500;
      }
    };
    const enter = () => (hover = true);
    const leave = () => (hover = false);
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      down = true;
      dragX = e.clientX;
      dragStart = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.classList.add('is-dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (down) el.scrollLeft = dragStart - (e.clientX - dragX);
    };
    const onUp = () => {
      down = false;
      el.classList.remove('is-dragging');
    };
    const ro = new ResizeObserver(() => {
      const h = third();
      if (h) {
        pos = Math.min(Math.max(pos, h), 2 * h - 1);
        write();
      }
    });
    ro.observe(el.firstElementChild as Element);

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      roH.disconnect();
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
    };
  }, [reduced, mobile]);

  return (
    <div ref={ref} className={`hero-strip ${mobile ? 'hero-strip-mobile' : ''}`}>
      <div className="hero-track">
        {[0, 1, 2].map((copy) =>
          STRIP.map((g, i) => (
            <figure
              key={`${copy}-${g.file}`}
              className="hero-item"
              aria-hidden={copy !== 1}
              style={{ ['--p' as string]: HEIGHT_SHARE[i % HEIGHT_SHARE.length] }}
            >
              <img
                src={`/images/${g.file}`}
                width={g.width}
                height={g.height}
                alt={copy === 1 ? `${g.caption}, ${g.location}` : ''}
                draggable={false}
                loading={copy === 1 && i < 4 ? 'eager' : 'lazy'}
              />
              <span className="cap-overlay" aria-hidden="true">
                <span className="cap-name">{g.caption}</span>
                <span className="cap-place">{g.location}</span>
              </span>
              <span className="cap-pill" aria-hidden="true">{g.caption}</span>
            </figure>
          ))
        )}
      </div>
    </div>
  );
};

export const Hero: React.FC<{ introDone?: boolean }> = ({ introDone = true }) => {
  const desktop = useDesktop();
  const [animated, setAnimated] = useState(false);
  const reduced = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;

  // Entrance plays once the loader has gone
  useEffect(() => {
    if (!introDone) return;
    if (reduced) {
      setAnimated(true);
      return;
    }
    const t = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(t);
  }, [introDone, reduced]);

  return (
    <section className={`hero ${animated ? 'is-in' : ''}`}>
      <h1 className="sr-only">Adhvik Projects</h1>
      {desktop ? (
        <>
          <div aria-hidden="true" className="hero-word">
            <FitLine maxRatio={0.22}>
              <span className="hero-a">
                <Letters text="ADHVIK" />
              </span>
              <span className="hero-space" />
              <span className="hero-p">
                <Letters text="PROJECTS" start={6} />
              </span>
            </FitLine>
          </div>
          <div className="hero-rule hero-rule-top" aria-hidden="true" />
          <div className="hero-fade hero-info" style={{ ['--d' as string]: '700ms' }}>
            <p className="hero-tagline">{TAGLINE}</p>
            <p className="hero-desc">{DESCRIPTION}</p>
          </div>
          <div className="hero-rule hero-rule-bottom" aria-hidden="true" />
          <div className="hero-fade hero-strip-wrap" style={{ ['--d' as string]: '900ms' }}>
            <Strip mobile={false} reduced={reduced} />
          </div>
        </>
      ) : (
        <>
          <p className="hero-fade hero-est" style={{ ['--d' as string]: '0ms' }}>
            Established 2013 · Delhi, India
          </p>
          <div aria-hidden="true" className="hero-word hero-word-mobile">
            <FitLine maxRatio={0.14}>
              <span className="hero-a">
                <Letters text="ADHVIK" />
              </span>
            </FitLine>
            <FitLine maxRatio={0.14}>
              <span className="hero-p">
                <Letters text="PROJECTS" start={6} />
              </span>
            </FitLine>
          </div>
          <div className="hero-rule" aria-hidden="true" />
          <p className="hero-fade hero-tagline hero-tagline-mobile" style={{ ['--d' as string]: '600ms' }}>
            {TAGLINE}
          </p>
          <div className="hero-rule" aria-hidden="true" />
          <div className="hero-fade hero-strip-wrap" style={{ ['--d' as string]: '800ms' }}>
            <Strip mobile reduced={reduced} />
          </div>
        </>
      )}
    </section>
  );
};
