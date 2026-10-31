import React, { useEffect, useRef, useState } from 'react';
import { CONTACT_INFO } from '../data/projects';
import { Wordmark } from './Wordmark';
import { ArrowUpRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string, section?: 'work' | 'gallery') => void;
}

const telHref = (n: string) => `tel:${n.replace(/\s+/g, '')}`;

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const bigRef = useRef<HTMLDivElement>(null);
  const [bigSize, setBigSize] = useState(0);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard?.writeText(CONTACT_INFO.email);
    } catch (e) {
      // Clipboard blocked: still confirm nothing, the mailto link remains
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Size the big wordmark so it spans the full footer width
  useEffect(() => {
    const el = bigRef.current;
    if (!el) return;
    const fit = () => {
      const probe = el.querySelector<HTMLElement>('[data-probe]');
      if (!probe) return;
      const width = el.clientWidth;
      const natural = probe.getBoundingClientRect().width; // measured at 100px
      if (natural > 0 && width > 0) setBigSize((100 * width) / natural);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    if (document.fonts?.ready) document.fonts.ready.then(fit);
    return () => ro.disconnect();
  }, []);

  return (
    <footer className="site-footer relative mt-24 overflow-hidden rounded-t-[32px] bg-[#4A1418] text-[#F4F1EA]">
      {/* Toast */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#F4F1EA] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.08em] text-[#4A1418] shadow-lg transition-all duration-300 ${
          copied ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <Check size={14} />
        <span>Copied</span>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pt-16 md:px-10 md:pt-24 lg:px-14">
        {/* Heading */}
        <h2 className="mb-12 font-heading text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-6xl md:mb-16 md:text-7xl lg:text-8xl">
          <span className="block">Have a space in mind?</span>
          <span className="mt-[0.15em] block font-serif-italic font-light leading-[1.1] text-[#E7A9AC]">
            Let's build it.
          </span>
        </h2>

        {/* Contact cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Email: whole card copies, small link opens mail */}
          <div className="footer-card">
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label={`Copy email address ${CONTACT_INFO.email}`}
              className="footer-card-hit"
            />
            <span className="footer-card-label">Email</span>
            <ArrowUpRight className="footer-card-arrow" size={20} aria-hidden="true" />
            <span className="footer-card-value break-all">{CONTACT_INFO.email}</span>
            <a href={`mailto:${CONTACT_INFO.email}`} className="footer-card-link">
              Open mail
            </a>
          </div>

          {/* Phone: two tel links */}
          <div className="footer-card">
            <span className="footer-card-label">Phone</span>
            <ArrowUpRight className="footer-card-arrow" size={20} aria-hidden="true" />
            <div className="flex flex-col gap-1.5">
              <a href={telHref(CONTACT_INFO.phone)} className="footer-card-value footer-card-inline">
                {CONTACT_INFO.phone}
              </a>
              <a href={telHref(CONTACT_INFO.phoneSecondary)} className="footer-card-value footer-card-inline">
                {CONTACT_INFO.phoneSecondary}
              </a>
            </div>
          </div>

          {/* Office */}
          <a
            href={CONTACT_INFO.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Office, ${CONTACT_INFO.address}, opens Google Maps`}
            className="footer-card"
          >
            <span className="footer-card-label">Office</span>
            <ArrowUpRight className="footer-card-arrow" size={20} aria-hidden="true" />
            <span className="footer-card-value">{CONTACT_INFO.address}</span>
          </a>

          {/* Workshop */}
          <a
            href={CONTACT_INFO.workshopMapsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Workshop, ${CONTACT_INFO.workshopAddress}, opens Google Maps`}
            className="footer-card"
          >
            <span className="footer-card-label">Workshop</span>
            <ArrowUpRight className="footer-card-arrow" size={20} aria-hidden="true" />
            <span className="footer-card-value">{CONTACT_INFO.workshopAddress}</span>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start gap-4 border-t border-[#F4F1EA]/15 pt-8 text-xs md:mt-20 lg:flex-row lg:items-center lg:justify-between">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Footer">
            {[
              { label: 'About', path: '/about' },
              { label: 'Work', path: '/', section: 'work' as const },
              { label: 'Gallery', path: '/', section: 'gallery' as const },
              { label: 'Contact', path: '/contact' },
            ].map((l) => (
              <button
                key={l.label}
                onClick={() => onNavigate(l.path, l.section)}
                className="footer-link uppercase tracking-[0.08em]"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <p className="text-[#F4F1EA]/65">© 2026 ADHVIK PROJECTS. All rights reserved.</p>
        </div>
      </div>

      {/* Edge-to-edge wordmark, decorative */}
      <div
        ref={bigRef}
        aria-hidden="true"
        className="footer-bigmark mt-10 w-full select-none overflow-hidden"
        style={{ height: bigSize ? bigSize * 0.74 : undefined }}
      >
        <span
          data-probe
          className="pointer-events-none invisible absolute whitespace-nowrap text-[100px] leading-none"
        >
          <Wordmark />
        </span>
        <span className="block whitespace-nowrap leading-none" style={{ fontSize: bigSize || undefined }}>
          <Wordmark />
        </span>
      </div>
    </footer>
  );
};
