import React, { useState, useEffect, useRef } from 'react';
import { CONTACT_INFO } from '../data/contact';
import { Wordmark } from './Wordmark';
import { TAGLINE, DESCRIPTOR } from '../data/brand';

interface NavigationProps {
  currentPath: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onNavigate: (path: string, section?: 'work' | 'gallery') => void;
}

type LinkKey = 'about' | 'work' | 'gallery' | 'contact';

const PREVIEW_IMAGES: Record<LinkKey, { src: string; title: string }> = {
  about: { src: '/images/workshop-06.jpg', title: 'Furniture Workshop' },
  work: { src: '/images/wardrobe-gwalior-02.jpg', title: 'Wardrobe, Gwalior' },
  gallery: { src: '/images/kuber-01.jpg', title: 'Kuber' },
  contact: { src: '/images/madame-jeddah-02.jpg', title: 'Madame, Jeddah' },
};

const MENU_LINKS: { key: LinkKey; label: string; path: string; section?: 'work' | 'gallery' }[] = [
  { key: 'about', label: 'About', path: '/about' },
  { key: 'work', label: 'Work', path: '/', section: 'work' },
  { key: 'gallery', label: 'Gallery', path: '/', section: 'gallery' },
  { key: 'contact', label: 'Contact', path: '/contact' },
];

export const Navigation: React.FC<NavigationProps> = ({
  currentPath,
  theme,
  onToggleTheme,
  onNavigate,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<LinkKey>('about');

  // Publish the real header height so the hero can fill exactly the rest of the viewport
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const set = () => document.documentElement.style.setProperty('--header-height', `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const handleLinkClick = (path: string, section?: 'work' | 'gallery') => {
    setIsMenuOpen(false);
    onNavigate(path, section);
  };

  return (
    <>
      {/* Sticky Top Bar */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[var(--bg-color)]/95 backdrop-blur-md border-b border-[var(--border-color)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14 h-16 md:h-20 flex items-center justify-between">
          {/* Wordmark with 0.02em letter-spacing */}
          <button
            onClick={() => handleLinkClick('/')}
            className="text-left text-lg md:text-xl text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-color)] cursor-pointer"
            aria-label="Adhvik Projects Home"
          >
            <Wordmark />
          </button>

          {/* Right Action Cluster: Theme Toggle Icon Button + Menu Button */}
          <div className="flex items-center gap-6 sm:gap-8">
            {/* Theme Toggle Icon Button (min 44x44px tap target, 20px 1.5px line icon) */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              aria-pressed={theme === 'dark'}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-color)] cursor-pointer"
            >
              <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                {/* Moon Icon (Light Mode -> Switch to Dark) */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`absolute inset-0 transition-all duration-250 ease-out motion-reduce:transition-none ${
                    theme === 'light'
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-90 scale-75 pointer-events-none'
                  }`}
                  aria-hidden="true"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>

                {/* Sun Icon (Dark Mode -> Switch to Light) */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`absolute inset-0 transition-all duration-250 ease-out motion-reduce:transition-none ${
                    theme === 'dark'
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 rotate-90 scale-75 pointer-events-none'
                  }`}
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              </div>
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-label="Open menu"
              className="text-xs md:text-sm font-medium uppercase tracking-[0.08em] text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors py-2 px-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-color)] cursor-pointer"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Menu Overlay (Goodside.studio style) */}
      <div
        className={`fixed inset-0 z-50 bg-[var(--bg-color)] transition-opacity duration-300 flex flex-col justify-between ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        {/* Overlay Top Bar with Close button in exact same spot as Menu */}
        <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 lg:px-14 h-16 md:h-20 flex items-center justify-between border-b border-[var(--border-color)]">
          <button
            onClick={() => handleLinkClick('/')}
            className="text-lg md:text-xl text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors focus:outline-none cursor-pointer"
          >
            <Wordmark />
          </button>

          <div className="flex items-center gap-6 sm:gap-8">
            {/* Theme toggle icon button also in overlay header */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              aria-pressed={theme === 'dark'}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-color)] cursor-pointer"
            >
              <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`absolute inset-0 transition-all duration-250 ease-out motion-reduce:transition-none ${
                    theme === 'light'
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-90 scale-75 pointer-events-none'
                  }`}
                  aria-hidden="true"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`absolute inset-0 transition-all duration-250 ease-out motion-reduce:transition-none ${
                    theme === 'dark'
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 rotate-90 scale-75 pointer-events-none'
                  }`}
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              </div>
            </button>

            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
              className="text-xs md:text-sm font-medium uppercase tracking-[0.08em] text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors py-2 px-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-color)] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        {/* Large Navigation Links & Desktop Preview Image */}
        <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 lg:px-14 py-8 md:py-12 flex-1 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-8 lg:gap-16 items-center">
            {/* Left Column: Navigation with Staggered Entrance */}
            <nav className="lg:col-span-7 flex flex-col gap-4 md:gap-6">
              {MENU_LINKS.map((link, i) => {
                const active = !link.section && currentPath === link.path;
                return (
                  <div
                    key={link.key}
                    className={`transition-all duration-500 ${
                      isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${75 + i * 75}ms` }}
                    onMouseEnter={() => setHoveredLink(link.key)}
                    onFocus={() => setHoveredLink(link.key)}
                  >
                    <button
                      onClick={() => handleLinkClick(link.path, link.section)}
                      className={`text-left font-heading text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.02em] hover:text-[var(--accent-color)] transition-colors focus:outline-none focus-visible:text-[var(--accent-color)] cursor-pointer ${
                        active ? 'text-[var(--accent-color)]' : 'text-[var(--text-color)]'
                      }`}
                    >
                      {link.label}
                    </button>
                  </div>
                );
              })}
            </nav>

            {/* Right Column: Desktop Hover Preview Photo */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative aspect-[4/3] w-full max-w-md ml-auto bg-[var(--surface-color)] overflow-hidden">
                {(['about', 'work', 'gallery', 'contact'] as const).map((key) => {
                  const preview = PREVIEW_IMAGES[key];
                  const isCurrent = hoveredLink === key;
                  return (
                    <div
                      key={key}
                      className={`absolute inset-0 transition-opacity duration-400 ease-out ${
                        isCurrent ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={preview.src}
                        alt={preview.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 left-3 text-[11px] uppercase tracking-[0.08em] px-2.5 py-1 bg-black/60 text-white backdrop-blur-xs">
                        {preview.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Overlay Bottom Details */}
        <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 lg:px-14 py-8 border-t border-[var(--border-color)] flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between text-xs md:text-sm text-[var(--muted-color)]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hover:text-[var(--text-color)] transition-colors"
            >
              {CONTACT_INFO.email}
            </a>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                className="hover:text-[var(--text-color)] transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={`tel:${CONTACT_INFO.phoneSecondary.replace(/\s+/g, '')}`}
                className="hover:text-[var(--text-color)] transition-colors"
              >
                {CONTACT_INFO.phoneSecondary}
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1 lg:items-end">
            <span className="font-serif-italic text-lg md:text-xl text-[var(--text-color)]">{TAGLINE}</span>
            <span className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)]">
              {DESCRIPTOR} · Delhi, India · Est. {CONTACT_INFO.est}
            </span>
          </div>
        </div>

        <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 lg:px-14 pb-8 flex flex-col gap-1 sm:flex-row sm:gap-8 text-xs md:text-sm text-[var(--muted-color)]">
                      <a
              href={CONTACT_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-color)] transition-colors"
            >
              Office: {CONTACT_INFO.address}
            </a>
            <a
              href={CONTACT_INFO.workshopMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-color)] transition-colors"
            >
              Workshop: {CONTACT_INFO.workshopAddress}
            </a>
                  </div>
      </div>
    </>
  );
};
