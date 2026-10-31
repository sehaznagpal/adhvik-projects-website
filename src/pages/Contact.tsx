import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/projects';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    try {
      navigator.clipboard?.writeText(text);
      setToastMessage(`${label} copied to clipboard`);
      setTimeout(() => setToastMessage(null), 2000);
    } catch (e) {
      // Fallback
    }
  };

  return (
    <main className="w-full pt-24 sm:pt-28 md:pt-36 pb-24 md:pb-36 transition-colors duration-300 relative">
      {/* Toast Notification */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-50 bg-[var(--text-color)] text-[var(--bg-color)] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.08em] flex items-center gap-2 shadow-lg transition-all duration-300 ${
          toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Check size={14} className="text-[var(--accent-color)]" />
        <span>{toastMessage}</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14">
        {/* Section Header */}
        <div className="mb-14 md:mb-20 max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-color)] block mb-3">
            Get in Touch
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.02em] text-[var(--text-color)] leading-[0.92]">
            Let's talk about <br />
            your space.
          </h1>
        </div>

        {/* Big Clickable Lines */}
        <div className="divide-y divide-[var(--border-color)] border-y border-[var(--border-color)] mb-16 md:mb-24">
          {/* Email Row with Click-to-Copy and Mailto */}
          <div className="py-8 md:py-12 group flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="w-full md:w-1/4">
              <span className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)] font-medium">
                Email Inquiries
              </span>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => handleCopy(CONTACT_INFO.email, 'Email')}
                className="text-left text-xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-[0em] md:tracking-[-0.02em] text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors break-all focus:outline-none"
                title="Click to copy email address"
              >
                {CONTACT_INFO.email}
              </button>
              <div className="flex items-center gap-4 shrink-0">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-xs uppercase tracking-[0.08em] font-semibold text-[var(--muted-color)] hover:text-[var(--accent-color)] transition-colors flex items-center gap-1.5"
                >
                  <span>Open Email</span>
                  <ArrowUpRight size={16} />
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(CONTACT_INFO.email, 'Email')}
                  aria-label="Copy email address"
                  className="p-2 text-[var(--muted-color)] hover:text-[var(--accent-color)] transition-colors"
                  title="Copy email"
                >
                  <Copy size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Telephone Row (Both Numbers) */}
          <div className="py-8 md:py-12 group flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="w-full md:w-1/4 pt-1">
              <span className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)] font-medium">
                Telephone & Direct
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-6">
              {/* Primary Phone */}
              <div className="flex items-center justify-between gap-4">
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                  className="text-xl sm:text-3xl md:text-4xl font-heading font-bold tracking-[0em] text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy(CONTACT_INFO.phone, 'Primary phone')}
                    aria-label="Copy primary phone number"
                    className="p-2 text-[var(--muted-color)] hover:text-[var(--accent-color)] transition-colors"
                    title="Copy phone"
                  >
                    <Copy size={18} />
                  </button>
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                    aria-label="Call primary phone number"
                    className="p-2 text-[var(--muted-color)] hover:text-[var(--accent-color)] transition-colors"
                  >
                    <ArrowUpRight size={22} />
                  </a>
                </div>
              </div>

              {/* Secondary Phone */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-[var(--border-color)]">
                <a
                  href={`tel:${CONTACT_INFO.phoneSecondary.replace(/\s+/g, '')}`}
                  className="text-xl sm:text-3xl md:text-4xl font-heading font-bold tracking-[0em] text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors"
                >
                  {CONTACT_INFO.phoneSecondary}
                </a>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy(CONTACT_INFO.phoneSecondary, 'Secondary phone')}
                    aria-label="Copy secondary phone number"
                    className="p-2 text-[var(--muted-color)] hover:text-[var(--accent-color)] transition-colors"
                    title="Copy phone"
                  >
                    <Copy size={18} />
                  </button>
                  <a
                    href={`tel:${CONTACT_INFO.phoneSecondary.replace(/\s+/g, '')}`}
                    aria-label="Call secondary phone number"
                    className="p-2 text-[var(--muted-color)] hover:text-[var(--accent-color)] transition-colors"
                  >
                    <ArrowUpRight size={22} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Office Row */}
          <div className="py-8 md:py-12 group flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="w-full md:w-1/4">
              <span className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)] font-medium">
                Office
              </span>
            </div>
            <div className="flex-1 flex items-center justify-between gap-4">
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-lg sm:text-2xl md:text-3xl font-medium text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors"
              >
                {CONTACT_INFO.address}
              </a>
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open office in Google Maps"
                className="p-2 text-[var(--muted-color)] hover:text-[var(--accent-color)] transition-colors shrink-0"
              >
                <ArrowUpRight size={26} />
              </a>
            </div>
          </div>

          {/* Workshop Row */}
          <div className="py-8 md:py-12 group flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="w-full md:w-1/4">
              <span className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)] font-medium">
                Workshop
              </span>
            </div>
            <div className="flex-1 flex items-center justify-between gap-4">
              <a
                href={CONTACT_INFO.workshopMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-lg sm:text-2xl md:text-3xl font-medium text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors"
              >
                {CONTACT_INFO.workshopAddress}
              </a>
              <a
                href={CONTACT_INFO.workshopMapsUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open workshop in Google Maps"
                className="p-2 text-[var(--muted-color)] hover:text-[var(--accent-color)] transition-colors shrink-0"
              >
                <ArrowUpRight size={26} />
              </a>
            </div>
          </div>
        </div>

        {/* Google Maps: office and workshop */}
        <div className="space-y-16 md:space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <h2 className="section-heading mb-3">Office</h2>
              <p className="text-sm md:text-base text-[var(--muted-color)] leading-relaxed mb-6 font-normal">
                Our central office in Azadpur, Delhi, managing turnkey rollouts across North India and
                coordinating international projects in the Middle East.
              </p>
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.08em] font-semibold text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors border-b border-[var(--text-color)] pb-1 hover:border-[var(--accent-color)]"
              >
                <span>Open office in Google Maps</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="lg:col-span-8 aspect-[16/9] w-full bg-[var(--surface-color)] border border-[var(--border-color)] overflow-hidden">
              <iframe
                title="Adhvik Projects office map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13997.771900130932!2d77.1687258!3d28.7062402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d023b499ee8db%3A0xb30e38634c44f57c!2sAzadpur%2C%20Delhi%2C%20110033!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <h2 className="section-heading mb-3">Workshop</h2>
              <p className="text-sm md:text-base text-[var(--muted-color)] leading-relaxed mb-6 font-normal">
                Our in-house production workshop in Mundka, Delhi, where furniture, fixtures and wall
                modules are made.
              </p>
              <a
                href={CONTACT_INFO.workshopMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.08em] font-semibold text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors border-b border-[var(--text-color)] pb-1 hover:border-[var(--accent-color)]"
              >
                <span>Open workshop in Google Maps</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="lg:col-span-8 aspect-[16/9] w-full bg-[var(--surface-color)] border border-[var(--border-color)] overflow-hidden">
              <iframe
                title="Adhvik Projects workshop map"
                src={CONTACT_INFO.workshopMapsEmbedUrl}
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
