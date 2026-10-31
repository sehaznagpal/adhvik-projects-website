import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CATEGORIES } from '../data/categories';
import { Ticker } from '../components/Ticker';
import { Categories } from '../components/Categories';
import { AboutIntro } from '../components/AboutIntro';
import { Wordmark } from '../components/Wordmark';
import { WorkGrid } from '../components/WorkGrid';
import { HERO_FEATURED_PHOTOS } from '../data/projects';
import { TAGLINE, DESCRIPTOR } from '../data/brand';

export const HERO_IMAGES = HERO_FEATURED_PHOTOS.map(({ src, alt }) => ({ src, alt }));

interface HomeProps {
  onNavigate: (path: string) => void;
  introDone?: boolean;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, introDone = true }) => {
  const [heroAnimated, setHeroAnimated] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState(() => {
    const c = new URLSearchParams(window.location.search).get('category');
    return c && CATEGORIES.some((x) => x.slug === c) ? c : 'all';
  });

  // Keep ?category=slug in the URL so a filtered view is shareable
  const handleCategoryChange = useCallback((slug: string) => {
    setCategory(slug);
    const url = new URL(window.location.href);
    if (slug === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', slug);
    window.history.replaceState(null, '', url.toString());
  }, []);

  const handleSelectCategory = useCallback(
    (slug: string) => {
      handleCategoryChange(slug);
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    },
    [handleCategoryChange]
  );
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const targetRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  // Detect touch devices
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Hero entrance plays once the loader has gone
  useEffect(() => {
    if (!introDone) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setHeroAnimated(true);
      return;
    }
    const timer = setTimeout(() => setHeroAnimated(true), 50);
    return () => clearTimeout(timer);
  }, [introDone]);

  // Slow crossfade through the hero photos
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActiveSlide((i) => (i + 1) % HERO_IMAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  // Slight scale-down of the portrait card on scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      if (cardRef.current) cardRef.current.style.transform = `scale(${1 - 0.06 * p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Smooth custom cursor following logic
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animateCursor = () => {
      cursorRef.current.x += (targetRef.current.x - cursorRef.current.x) * 0.18;
      cursorRef.current.y += (targetRef.current.y - cursorRef.current.y) * 0.18;
      setCursorPos({ x: cursorRef.current.x, y: cursorRef.current.y });
      animFrameId.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animFrameId.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isTouchDevice]);

  return (
    <main className="w-full">
      {/* Floating View Cursor for Desktop */}
      {!isTouchDevice && (
        <div
          className={`fixed top-0 left-0 pointer-events-none z-50 w-20 h-20 rounded-full bg-[var(--accent-fill)] text-[var(--on-accent)] flex items-center justify-center text-xs font-semibold uppercase tracking-[0.08em] shadow-xl transition-opacity duration-250 ease-out ${
            isHoveringImage ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            transform: `translate3d(${cursorPos.x - 40}px, ${cursorPos.y - 40}px, 0)`,
          }}
        >
          View
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14 pt-28 md:pt-36 pb-16 lg:pt-0 lg:pb-0 lg:min-h-[100svh] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_30vw_1fr] gap-10 lg:gap-12 items-center">
          {/* Left: wordmark + meta */}
          <div className={`hero-reveal ${heroAnimated ? 'is-in' : ''}`} style={{ transitionDelay: '0ms' }}>
            <h1 className="m-0 text-[var(--text-color)] text-[clamp(28px,2.6vw,40px)] max-lg:text-[clamp(32px,8vw,44px)]">
              <span className="sr-only">Adhvik Projects</span>
              <span aria-hidden="true">
                <Wordmark />
              </span>
            </h1>
            <p className="mt-4 text-xs uppercase tracking-[0.08em] text-[var(--muted-color)] font-medium">
              {DESCRIPTOR} · Est. 2013 · Delhi, India
            </p>
          </div>

          {/* Center: crossfading portrait card */}
          <div
            className={`hero-reveal ${heroAnimated ? 'is-in' : ''} lg:justify-self-center w-full`}
            style={{ transitionDelay: '150ms' }}
          >
            <div
              ref={cardRef}
              className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--surface-color)] will-change-transform"
            >
              {HERO_IMAGES.map((img, i) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={i === activeSlide ? img.alt : ''}
                  aria-hidden={i !== activeSlide}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
                    i === activeSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: tagline */}
          <div className={`hero-reveal ${heroAnimated ? 'is-in' : ''}`} style={{ transitionDelay: '300ms' }}>
            <p className="font-serif-light text-[clamp(36px,3.6vw,56px)] leading-[1.05] tracking-[0em] text-[var(--text-color)] m-0">
              {TAGLINE}
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-[var(--muted-color)]"
          aria-hidden="true"
        >
          <span>Scroll</span>
          <span className="block w-px h-8 bg-[var(--muted-color)] opacity-60" />
        </div>
      </section>

      {/* INFINITE TICKER MARQUEE */}
      <section className="my-4 md:my-8">
        <Ticker />
      </section>

      <AboutIntro />

      <Categories onSelect={handleSelectCategory} />

      <WorkGrid category={category} onCategoryChange={handleCategoryChange} onHoverImage={setIsHoveringImage} />
    </main>
  );
};
