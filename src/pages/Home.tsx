import React, { useState, useEffect, useRef } from 'react';
import { Ticker } from '../components/Ticker';
import { PROJECTS, HERO_FEATURED_PHOTOS } from '../data/projects';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [heroAnimated, setHeroAnimated] = useState(false);
  const [photosVisible, setPhotosVisible] = useState(false);
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

  // Hero staggered letter animation on mount
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setHeroAnimated(true);
      setPhotosVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setHeroAnimated(true);
    }, 50);

    const photosTimer = setTimeout(() => {
      setPhotosVisible(true);
    }, 700);

    return () => {
      clearTimeout(timer);
      clearTimeout(photosTimer);
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

  const word1 = 'ADHVIK'.split('');
  const word2 = 'PROJECTS'.split('');

  return (
    <main className="w-full">
      {/* Floating View Cursor for Desktop */}
      {!isTouchDevice && (
        <div
          className={`fixed top-0 left-0 pointer-events-none z-50 w-20 h-20 rounded-full bg-[var(--accent-color)] text-white flex items-center justify-center text-xs font-semibold uppercase tracking-[0.08em] shadow-xl transition-opacity duration-250 ease-out ${
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
      <section className="pt-24 sm:pt-28 md:pt-36 pb-12 md:pb-20 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14">
        {/* Top Meta Line: stacked below 1024px with 8px gap, side-by-side on 1024px+ */}
        <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:justify-between text-xs md:text-sm text-[var(--muted-color)] uppercase tracking-[0.08em] mb-6 md:mb-10 font-medium">
          <span>Architecture and Turnkey Execution</span>
          <span>Est. 2013 · Delhi, India</span>
        </div>

        {/* Huge Uppercase Brand Name with Staggered Letter Rise Animation */}
        <div className="mb-6 md:mb-10 overflow-hidden">
          <h1
            className="font-heading font-extrabold uppercase text-[var(--text-color)] leading-[0.88] tracking-[-0.04em] text-[clamp(2.75rem,11.5vw,10.5rem)] select-none break-words"
            aria-label="ADHVIK PROJECTS"
          >
            {/* Word 1: ADHVIK */}
            <span className="inline-block whitespace-nowrap mr-3 sm:mr-6">
              {word1.map((char, index) => (
                <span
                  key={`char-1-${index}`}
                  className="inline-block overflow-hidden"
                >
                  <span
                    className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      heroAnimated ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 30}ms` }}
                  >
                    {char}
                  </span>
                </span>
              ))}
            </span>

            {/* Word 2: PROJECTS */}
            <span className="inline-block whitespace-nowrap">
              {word2.map((char, index) => (
                <span
                  key={`char-2-${index}`}
                  className="inline-block overflow-hidden"
                >
                  <span
                    className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      heroAnimated ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
                    style={{ transitionDelay: `${(word1.length + index) * 30}ms` }}
                  >
                    {char}
                  </span>
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Hero Tagline: Single line on screens 768px and wider, no dashes */}
        <div className="w-full mb-12 md:mb-16">
          <p className="text-base sm:text-lg md:text-[clamp(1.1rem,1.9vw,1.65rem)] md:whitespace-nowrap font-normal leading-relaxed text-[var(--text-color)]">
            Architecture, interiors and turnkey execution,{' '}
            <span className="font-serif-italic text-[1.12em] text-[var(--text-color)]">
              from first sketch to opening day.
            </span>
          </p>
        </div>

        {/* How&How Style Hero Collage Row with gentle fade-up after title */}
        <div
          className={`w-full transition-all duration-700 ease-out ${
            photosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {/* Mobile scroll indicator */}
          <div className="sm:hidden flex items-center justify-between text-[11px] text-[var(--muted-color)] uppercase tracking-[0.08em] mb-2">
            <span>Featured Spaces</span>
            <span>Scroll horizontally →</span>
          </div>

          <div className="flex sm:grid sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory no-scrollbar">
            {HERO_FEATURED_PHOTOS.map((photo, idx) => (
              <button
                key={photo.slug}
                onClick={() => onNavigate(`/work/${photo.slug}`)}
                className="group flex-none w-[72vw] sm:w-auto text-left focus:outline-none snap-start cursor-pointer"
              >
                <div className="aspect-[4/5] bg-[var(--surface-color)] overflow-hidden relative">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-2.5 flex items-baseline justify-between text-xs">
                  <span className="font-medium text-[var(--text-color)] group-hover:text-[var(--accent-color)] transition-colors">
                    {photo.label}
                  </span>
                  <span className="text-[var(--muted-color)]">{photo.location}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* INFINITE TICKER MARQUEE */}
      <section className="my-4 md:my-8">
        <Ticker />
      </section>

      {/* WORK SECTION (dvdrod style) */}
      <section id="work" className="pt-20 md:pt-32 pb-24 md:pb-36 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14 scroll-mt-20">
        {/* Section Header: stacked below 1024px, side by side on 1024px+ */}
        <div className="mb-14 md:mb-20 pb-6 border-b border-[var(--border-color)] flex flex-col items-start gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-color)] block mb-2">
              Selected Projects
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] text-[var(--text-color)]">
              Work
            </h2>
          </div>
          <div className="text-xs md:text-sm text-[var(--muted-color)] tracking-[0.02em]">
            08 Retail and Hospitality Commissions
          </div>
        </div>

        {/* Numbered Vertical Project List */}
        <div className="divide-y divide-[var(--border-color)]">
          {PROJECTS.map((project) => (
            <article
              key={project.slug}
              className="group py-12 md:py-20 first:pt-0"
            >
              <button
                onClick={() => onNavigate(`/work/${project.slug}`)}
                className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)]"
                aria-label={`View ${project.name} in ${project.location}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                  {/* Left Column: Number + Metadata */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      {/* Number */}
                      <span className="text-xs md:text-sm font-mono tracking-[0.08em] text-[var(--muted-color)] uppercase block mb-3 md:mb-4">
                        {project.number}
                      </span>

                      {/* Project Name (tracking-[-0.01em] for between 20px and 48px, [-0.04em] for >=48px) */}
                      <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.01em] md:tracking-[-0.04em] text-[var(--text-color)] group-hover:text-[var(--accent-color)] transition-colors mb-4 md:mb-6">
                        {project.name}
                      </h3>

                      {/* Clean Unboxed Metadata line */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm text-[var(--muted-color)] font-normal mb-6">
                        <span>{project.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.area}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[var(--text-color)] font-medium">{project.type}</span>
                      </div>
                    </div>

                    {/* View Project prompt (desktop subtle indicator) */}
                    <div className="hidden lg:flex items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-[var(--text-color)] group-hover:text-[var(--accent-color)] transition-colors pt-8">
                      <span>Explore Project</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>

                  {/* Right Column: Large Cover Image with Cursor Detection */}
                  <div
                    className="lg:col-span-7"
                    onMouseEnter={() => setIsHoveringImage(true)}
                    onMouseLeave={() => setIsHoveringImage(false)}
                  >
                    <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-[var(--surface-color)] overflow-hidden relative">
                      <img
                        src={project.coverImage}
                        alt={project.coverAlt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                    {/* Mobile explore label */}
                    <div className="flex lg:hidden items-center justify-between text-xs font-medium text-[var(--text-color)] pt-3">
                      <span className="group-hover:text-[var(--accent-color)] transition-colors">
                        View gallery ({project.gallery.length + 1} photos)
                      </span>
                      <span className="group-hover:text-[var(--accent-color)] transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};
