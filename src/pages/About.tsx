import React, { useState, useEffect, useRef } from 'react';
import { SERVICES, TEAM_ROLES, WORKSHOP_IMAGES } from '../data/projects';
import { Lightbox } from '../components/Lightbox';

export const About: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Count-up stats state
  const [countYears, setCountYears] = useState(0);
  const [countProjects, setCountProjects] = useState(0);
  const statsCardRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedStats = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCountYears(2013);
      setCountProjects(900);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimatedStats.current) {
          hasAnimatedStats.current = true;
          const duration = 1200; // 1.2s
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setCountYears(Math.round(ease * 2013));
            setCountProjects(Math.round(ease * 900));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (statsCardRef.current) {
      observer.observe(statsCardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="w-full pt-24 sm:pt-28 md:pt-36 pb-24 md:pb-36 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-color)] block mb-3">
            About · Turnkey Solutions
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.02em] text-[var(--text-color)] leading-[0.92]">
            We design spaces, <br className="hidden sm:inline" />
            then we build them.
          </h1>
        </div>

        {/* Editorial Body Copy & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-20 md:pb-28 border-b border-[var(--border-color)]">
          <div className="lg:col-span-8 space-y-6 md:space-y-8 text-base sm:text-lg md:text-xl text-[var(--text-color)] leading-relaxed font-normal">
            <p>
              Adhvik Projects was founded in Delhi in 2013 by Mr. Nagpal. Since then we've grown
              into a design-and-build practice working across North India and beyond, with over 900
              projects completed across 20 states and work delivered in the UAE and Saudi Arabia.
            </p>
            <p>
              Our work spans large-format retail (multi-brand, exclusive brand and high-end stores),
              commercial buildings, hotels and resorts, and corporate interiors. Every project starts
              with research: understanding the site, the brand and the people who'll use the space.
              Our approach is modern and contemporary: simple, useful spaces that respond to local
              conditions and culture.
            </p>
            <p className="text-[var(--muted-color)]">
              Because we run our own furniture workshop and execution teams, we can take a project
              from concept to completion under one roof: one team, one point of accountability.
            </p>
          </div>

          {/* Key Facts / Studio Credentials with Count-Up Stats */}
          <div
            ref={statsCardRef}
            className="lg:col-span-4 bg-[var(--surface-color)] border border-[var(--border-color)] p-8 md:p-10 flex flex-col justify-between transition-colors duration-300"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)] font-medium block mb-6">
                Practice Overview
              </span>
              <dl className="space-y-6 divide-y divide-[var(--border-color)]">
                <div className="pt-2">
                  <dt className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)]">
                    Established
                  </dt>
                  <dd className="font-heading text-3xl md:text-4xl font-bold tracking-[0em] text-[var(--text-color)] tabular-nums">
                    {countYears || 2013}
                  </dd>
                </div>
                <div className="pt-4">
                  <dt className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)]">
                    Projects Delivered
                  </dt>
                  <dd className="font-heading text-3xl md:text-4xl font-bold tracking-[0em] text-[var(--text-color)] tabular-nums">
                    {countProjects || 900}+
                  </dd>
                </div>
                <div className="pt-4">
                  <dt className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)]">
                    Geographic Reach
                  </dt>
                  <dd className="text-sm font-medium text-[var(--text-color)] mt-1">
                    20 Indian States · UAE · Saudi Arabia
                  </dd>
                </div>
                <div className="pt-4">
                  <dt className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)]">
                    Capabilities
                  </dt>
                  <dd className="text-sm font-medium text-[var(--text-color)] mt-1">
                    Turnkey Solutions · In-house Workshop
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* SERVICES SECTION */}
        <section className="py-20 md:py-28 border-b border-[var(--border-color)]">
          <div className="mb-10 md:mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-color)] block mb-2">
              End-to-End Capabilities
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-[0em] md:tracking-[-0.02em] text-[var(--text-color)]">
              Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {SERVICES.map((service, index) => (
              <div
                key={index}
                className="py-4 border-b border-[var(--border-color)] flex items-baseline gap-4"
              >
                <span className="font-mono text-xs text-[var(--muted-color)] font-medium">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base text-[var(--text-color)] font-medium leading-snug">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* THE TEAM SECTION */}
        <section className="py-16 md:py-24 border-b border-[var(--border-color)]">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-color)] block mb-2">
              Cross-Functional Expertise
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-[0em] text-[var(--text-color)]">
              The Team
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base md:text-lg text-[var(--text-color)] font-medium">
            {TEAM_ROLES.map((role, idx) => (
              <React.Fragment key={role}>
                <span className="hover:text-[var(--accent-color)] transition-colors">{role}</span>
                {idx < TEAM_ROLES.length - 1 && (
                  <span className="text-[var(--muted-color)]" aria-hidden="true">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* OUR WORKSHOP SECTION */}
        <section className="pt-20 md:pt-28">
          <div className="mb-10 md:mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-color)] block mb-2">
              Fabrication Facility
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-[0em] md:tracking-[-0.02em] text-[var(--text-color)] mb-3">
              Our Workshop
            </h2>
            <p className="text-sm md:text-base text-[var(--muted-color)]">
              Furniture and fixtures, built in our own workshop.
            </p>
          </div>

          {/* Workshop photo grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {WORKSHOP_IMAGES.map((item, index) => (
              <button
                key={item.src}
                onClick={() => openLightbox(index)}
                className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)]"
                aria-label={`View workshop photo: ${item.caption}`}
              >
                <div className="aspect-[4/3] bg-[var(--surface-color)] overflow-hidden relative">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-2.5 flex items-center justify-between text-xs text-[var(--muted-color)]">
                  <span className="font-medium text-[var(--text-color)] group-hover:text-[var(--accent-color)] transition-colors">
                    {item.caption}
                  </span>
                  <span>0{index + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox for Workshop images */}
      <Lightbox
        images={WORKSHOP_IMAGES}
        currentIndex={selectedPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setSelectedPhotoIndex}
      />
    </main>
  );
};
