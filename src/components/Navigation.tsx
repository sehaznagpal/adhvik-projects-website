import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../data/projects';
import { Wordmark } from './Wordmark';
import { TAGLINE, DESCRIPTOR } from '../data/brand';

interface NavigationProps {
  currentPath: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onNavigate: (path: string, scrollToWork?: boolean) => void;
}

const PREVIEW_IMAGES: Record<string, { src: string; title: string }> = {
  work: { src: '/images/wardrobe-gwalior-01.jpg', title: 'Wardrobe, Gwalior' },
  about: { src: '/images/workshop-06.jpg', title: 'Furniture Workshop' },
  contact: { src: '/images/madame-jeddah-02.jpg', title: 'Madame, Jeddah' },
};

export const Navigation: React.FC<NavigationProps> = ({
  currentPath,
  theme,
  onToggleTheme,
  onNavigate,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<'work' | 'about' | 'contact'>('work');

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

  const handleLinkClick = (path: string, scrollToWork: boolean = false) => {
    setIsMenuOpen(false);
    onNavigate(path, scrollToWork);
  };

  return (
    <>
      {/* Sticky Top Bar */}
      <header
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
            <nav className="lg:col-span-7 flex flex-col gap-6 md:gap-10">
              <div
                className={`transition-all duration-500 delay-75 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                onMouseEnter={() => setHoveredLink('work')}
              >
                <button
                  onClick={() => handleLinkClick('/', true)}
                  className="group text-left font-heading text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.02em] text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors inline-flex items-start gap-2 focus:outline-none cursor-pointer"
                >
                  <span>Work</span>
                  <span className="text-[14px] tracking-[0.04em] font-normal leading-normal text-[var(--muted-color)] group-hover:text-[var(--accent-color)] transition-colors pt-2">
                    (07)
                  </span>
                </button>
              </div>

              <div
                className={`transition-all duration-500 delay-150 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                onMouseEnter={() => setHoveredLink('about')}
              >
                <button
                  onClick={() => handleLinkClick('/about')}
                  className={`text-left font-heading text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.02em] hover:text-[var(--accent-color)] transition-colors focus:outline-none cursor-pointer ${
                    currentPath === '/about' ? 'text-[var(--accent-color)]' : 'text-[var(--text-color)]'
                  }`}
                >
                  About
                </button>
              </div>

              <div
                className={`transition-all duration-500 delay-225 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                onMouseEnter={() => setHoveredLink('contact')}
              >
                <button
                  onClick={() => handleLinkClick('/contact')}
                  className={`text-left font-heading text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.02em] hover:text-[var(--accent-color)] transition-colors focus:outline-none cursor-pointer ${
                    currentPath === '/contact' ? 'text-[var(--accent-color)]' : 'text-[var(--text-color)]'
                  }`}
                >
                  Contact
                </button>
              </div>
            </nav>

            {/* Right Column: Desktop Hover Preview Photo */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative aspect-[4/3] w-full max-w-md ml-auto bg-[var(--surface-color)] overflow-hidden">
                {(['work', 'about', 'contact'] as const).map((key) => {
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
      </div>
    </>
  );
};
