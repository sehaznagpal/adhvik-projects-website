import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/contact';
import { Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string, section?: 'work' | 'gallery') => void;
}

const telHref = (n: string) => `tel:${n.replace(/\s+/g, '')}`;

const LINKS: { label: string; path: string; section?: 'work' | 'gallery' }[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Work', path: '/', section: 'work' },
  { label: 'Gallery', path: '/', section: 'gallery' },
  { label: 'Contact', path: '/contact' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard?.writeText(CONTACT_INFO.email);
    } catch (e) {
      // Clipboard blocked: the heading link still opens mail
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="site-footer mt-24 rounded-t-[32px] bg-[#4A1418] text-[#F4F1EA]">
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

      <div className="mx-auto max-w-[1440px] px-5 pt-24 pb-12 md:px-10 md:pt-40 lg:px-14">
        <h2 className="footer-heading font-heading font-bold">
          <span className="block">Have a space in mind?</span>
          <a href={`mailto:${CONTACT_INFO.email}`} className="footer-cta">
            <span>Let's build it.</span>
            <svg
              className="footer-cta-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 19L19 5M7 5h12v12" />
            </svg>
          </a>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-8 md:mt-24 md:grid-cols-2 md:gap-12">
          {/* Left: email and phone */}
          <div className="flex flex-col gap-8 md:gap-6">
            <div className="flex flex-col items-start">
              <span className="footer-label">Email</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={`Copy email address ${CONTACT_INFO.email}`}
                className="footer-line break-all"
              >
                {CONTACT_INFO.email}
              </button>
            </div>
            <div className="flex flex-col items-start">
              <span className="footer-label">Phone</span>
              <a href={telHref(CONTACT_INFO.phone)} className="footer-line">
                {CONTACT_INFO.phone}
              </a>
              <a href={telHref(CONTACT_INFO.phoneSecondary)} className="footer-line">
                {CONTACT_INFO.phoneSecondary}
              </a>
            </div>
          </div>

          {/* Right: office and workshop, right-aligned on desktop */}
          <div className="flex flex-col gap-8 md:items-end md:gap-6 md:text-right">
            <div className="flex flex-col items-start md:items-end">
              <span className="footer-label">Office</span>
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Office, ${CONTACT_INFO.addressShort}, opens Google Maps in a new tab`}
                className="footer-line"
              >
                {CONTACT_INFO.addressShort}
              </a>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <span className="footer-label">Workshop</span>
              <a
                href={CONTACT_INFO.workshopMapsUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Workshop, ${CONTACT_INFO.workshopAddressShort}, opens Google Maps in a new tab`}
                className="footer-line"
              >
                {CONTACT_INFO.workshopAddressShort}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start gap-4 border-t border-[#F4F1EA]/15 pt-8 md:mt-24 md:flex-row md:items-center md:justify-between">
          <p className="m-0 text-[13px] text-[#F4F1EA]/65">© 2026 ADHVIK PROJECTS. All rights reserved.</p>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Footer">
            {LINKS.map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={() => onNavigate(l.path, l.section)}
                className="footer-link"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
