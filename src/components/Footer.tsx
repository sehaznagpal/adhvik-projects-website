import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/projects';
import { Check } from 'lucide-react';

const telHref = (n: string) => `tel:${n.replace(/\s+/g, '')}`;

export const Footer: React.FC = () => {
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
    <footer className="site-footer mt-24 border-t border-[var(--border-color)]">
      {/* Toast */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[var(--text-color)] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.08em] text-[var(--bg-color)] shadow-lg transition-all duration-300 ${
          copied ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <Check size={14} />
        <span>Copied</span>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pt-24 pb-12 md:px-10 md:pt-40 lg:px-14">
        <h2 className="footer-heading font-heading font-bold text-[var(--text-color)]">
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

        <div className="mt-16 flex flex-col gap-6 md:mt-24 md:flex-row md:items-start md:justify-between">
          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label={`Copy email address ${CONTACT_INFO.email}`}
            className="footer-line self-start break-all"
          >
            {CONTACT_INFO.email}
          </button>
          <div className="flex flex-col items-start gap-1 md:items-end">
            <a href={telHref(CONTACT_INFO.phone)} className="footer-line">
              {CONTACT_INFO.phone}
            </a>
            <a href={telHref(CONTACT_INFO.phoneSecondary)} className="footer-line">
              {CONTACT_INFO.phoneSecondary}
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--border-color)] pt-12 md:mt-24">
          <p className="m-0 text-center text-[13px] text-[var(--muted-color)]">© 2026 ADHVIK PROJECTS</p>
        </div>
      </div>
    </footer>
  );
};
