import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/projects';
import { TAGLINE, DESCRIPTOR } from '../data/brand';
import { Check, Copy } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string, scrollToWork?: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard?.writeText(CONTACT_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Fallback
    }
  };

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-color)] pt-20 md:pt-28 pb-12 transition-colors duration-300 relative">
      {/* Toast Notification */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-50 bg-[var(--text-color)] text-[var(--bg-color)] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.08em] flex items-center gap-2 shadow-lg transition-all duration-300 ${
          copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Check size={14} className="text-[var(--accent-color)]" />
        <span>Email copied to clipboard</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14">
        {/* Big Call to Action line */}
        <div className="mb-16 md:mb-24">
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.02em] text-[var(--text-color)] leading-[0.95]">
            Have a space in mind?{' '}
            <span className="font-serif-italic font-light text-[var(--accent-color)] block sm:inline">
              Let's build it.
            </span>
          </h2>
          <p className="font-serif-italic text-2xl md:text-3xl text-[var(--text-color)] mt-6 md:mt-8">
            {TAGLINE}
          </p>
        </div>

        {/* Contact Block & Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16 border-b border-[var(--border-color)]">
          {/* Email with Click-to-Copy and separate mailto link */}
          <div className="md:col-span-5">
            <span className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)] block mb-2 font-medium">
              Inquiries
            </span>
            <div className="flex flex-col items-start gap-1">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group text-left text-lg sm:text-xl md:text-2xl font-medium text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors break-all flex items-center gap-2 focus:outline-none"
                title="Click to copy email address"
              >
                <span>{CONTACT_INFO.email}</span>
                <Copy size={16} className="text-[var(--muted-color)] group-hover:text-[var(--accent-color)] transition-colors opacity-70 group-hover:opacity-100 shrink-0" />
              </button>
              <div className="flex items-center gap-2 text-xs text-[var(--muted-color)] mt-1">
                <span>Click address to copy</span>
                <span aria-hidden="true">·</span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-[var(--text-color)] underline hover:text-[var(--accent-color)] transition-colors"
                >
                  Open Email Client
                </a>
              </div>
            </div>
          </div>

          {/* Phone (Stacked two numbers) */}
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)] block mb-2 font-medium">
              Telephone
            </span>
            <div className="flex flex-col gap-1.5">
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                className="text-lg sm:text-xl md:text-2xl font-medium text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
              <a
                href={`tel:${CONTACT_INFO.phoneSecondary.replace(/\s+/g, '')}`}
                className="text-lg sm:text-xl md:text-2xl font-medium text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors"
              >
                {CONTACT_INFO.phoneSecondary}
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)] block mb-2 font-medium">
              Studio & Workshop
            </span>
            <p className="text-sm md:text-base text-[var(--text-color)] leading-relaxed">
              {CONTACT_INFO.address}
            </p>
          </div>
        </div>

        {/* Bottom Bar: stacked below 1024px, side by side on 1024px+ */}
        <div className="pt-8 flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between text-xs text-[var(--muted-color)]">
          {/* Navigation links */}
          <nav className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('/', true)}
              className="hover:text-[var(--text-color)] transition-colors uppercase tracking-[0.08em] focus:outline-none"
            >
              Work
            </button>
            <button
              onClick={() => onNavigate('/about')}
              className="hover:text-[var(--text-color)] transition-colors uppercase tracking-[0.08em] focus:outline-none"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="hover:text-[var(--text-color)] transition-colors uppercase tracking-[0.08em] focus:outline-none"
            >
              Contact
            </button>
          </nav>

          {/* Copyright */}
          <div className="text-xs">
            © 2026 Adhvik Projects · {DESCRIPTOR}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
