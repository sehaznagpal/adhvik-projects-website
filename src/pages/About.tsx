import React, { useState, useEffect, useRef } from 'react';
import { Compass, Hammer, Layers, Zap, Wrench } from 'lucide-react';
import { SERVICE_GROUPS, TEAM_PHASES, WORKSHOP_IMAGES } from '../data/projects';
import { Lightbox } from '../components/Lightbox';

const STEPS = [
  { n: '01', title: 'Plan', text: 'Every project starts with research: the site, the brand and the people who will use the space.' },
  { n: '02', title: 'Design', text: 'Modern, contemporary spaces that are simple, useful and right for their location.' },
  { n: '03', title: 'Build', text: 'Our own workshop and execution teams take every project from concept to handover, under one roof.' },
];

const STATS: { value: number; suffix: string; label: React.ReactNode }[] = [
  { value: 2013, suffix: '', label: 'Founded' },
  { value: 900, suffix: '+', label: 'Projects delivered' },
  { value: 20, suffix: '', label: 'States across India' },
  {
    value: 2,
    suffix: '',
    label: (
      <>
        International markets
        <br />
        UAE &amp; Saudi Arabia
      </>
    ),
  },
];

const ICONS: Record<string, React.ElementType> = {
  compass: Compass,
  hammer: Hammer,
  layers: Layers,
  zap: Zap,
  wrench: Wrench,
};

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Adds `is-in` to the element, and to its [data-reveal] children, the first time it scrolls into view. */
function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => {
      el.classList.add('is-in');
      el.querySelectorAll('[data-reveal]').forEach((c) => c.classList.add('is-in'));
    };
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      show();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

export const About: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const stepsRef = useReveal<HTMLDivElement>(0.1);
  const statsRef = useRef<HTMLDivElement>(null);
  const teamRef = useReveal<HTMLDivElement>(0.05);
  const servicesRef = useReveal<HTMLDivElement>(0.05);
  const [counts, setCounts] = useState<number[]>(() =>
    prefersReducedMotion() ? STATS.map((s) => s.value) : STATS.map(() => 0)
  );

  // The page colours follow the maroon hero (so the header turns off-white over it), then ease back
  useEffect(() => {
    const root = document.documentElement;
    const hero = heroRef.current;
    if (!hero) return;
    const reduced = prefersReducedMotion();
    if (reduced) root.classList.add('shift-fade');
    const update = () => {
      // 1 while the maroon section fills the screen, easing to 0 as it scrolls away
      const bottom = hero.getBoundingClientRect().bottom;
      const p = Math.min(Math.max(bottom / (window.innerHeight * 0.6), 0), 1);
      root.style.setProperty('--shift', (reduced ? (bottom > window.innerHeight * 0.3 ? 1 : 0) : p).toFixed(3));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      root.classList.remove('shift-fade');
      root.style.removeProperty('--shift');
    };
  }, []);

  // Count the stats up once, when they scroll into view
  useEffect(() => {
    const el = statsRef.current;
    if (!el || prefersReducedMotion()) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1400, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setCounts(STATS.map((s) => Math.round(s.value * ease)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="w-full">
      {/* HERO + STATS: one maroon screen (in both themes) */}
      <section ref={heroRef} className="about-hero">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-14">
          <h1 className="section-heading about-hero-title">
            We design spaces,<br className="hidden md:inline" /> then we build them.
          </h1>
          <p className="about-hero-lead">
            Founded in Delhi in 2013 by Mr. Nagpal, Adhvik Projects is a project management company delivering turnkey
            spaces across India and the Middle East.
          </p>

          <div ref={stepsRef} className="about-steps">
            {STEPS.map((s, i) => (
              <div key={s.n} data-reveal className="about-step reveal" style={{ ['--d' as string]: `${i * 100}ms` }}>
                <span className="about-step-num">{s.n}</span>
                <h2 className="about-step-title">{s.title}</h2>
                <p className="about-step-text">{s.text}</p>
              </div>
            ))}
          </div>

          <div ref={statsRef} className="stats">
            {STATS.map((s, i) => (
              <div key={s.value} className="stat">
                <div className="stat-num">
                  {counts[i]}
                  {s.suffix}
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        {/* OUR WORKSHOP */}
        <section className="py-20 md:py-28">
          <div className="mb-10 md:mb-14">
            <span className="eyebrow">Fabrication Facility</span>
            <h2 className="section-heading">Our Workshop</h2>
            <p className="mt-4 text-base text-[var(--muted-color)]">Furniture and fixtures, built in our own workshop.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {WORKSHOP_IMAGES.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => openLightbox(index)}
                className="cap-host group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)]"
                aria-label={`View workshop photo: ${item.caption}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-color)]">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  <span className="cap-overlay" aria-hidden="true">
                    <span className="cap-name">{item.caption}</span>
                  </span>
                  <span className="cap-pill" aria-hidden="true">{item.caption}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* THE TEAM */}
        <section className="border-t border-[var(--border-color)] py-20 md:py-28">
          <div className="mb-12 md:mb-16">
            <h2 className="section-heading">The team</h2>
            <p className="mt-4 text-base text-[var(--muted-color)]">Every discipline a project needs, working as one team.</p>
          </div>

          <div ref={teamRef} className="team-flow">
            <span className="team-line" aria-hidden="true" />
            {TEAM_PHASES.map((p, i) => (
              <div key={p.phase} data-reveal className="team-col reveal" style={{ ['--d' as string]: `${i * 100}ms` }}>
                <span className="team-dot" aria-hidden="true" />
                <h3 className="team-head">{p.phase}</h3>
                <ul className="team-pills m-0 list-none p-0">
                  {p.roles.map((r) => (
                    <li key={r} className="team-pill">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="border-t border-[var(--border-color)] py-20 md:py-28">
          <div className="mb-10 md:mb-14">
            <h2 className="section-heading">Services</h2>
            <p className="mt-4 text-base text-[var(--muted-color)]">
              End-to-end capabilities, from first survey to final handover.
            </p>
          </div>

          <div ref={servicesRef} className="service-grid">
            {SERVICE_GROUPS.map((g, i) => {
              const Icon = ICONS[g.icon];
              return (
                <div key={g.title} data-reveal className="service-slot reveal" style={{ ['--d' as string]: `${i * 80}ms` }}>
                  <article className="service-card">
                    <div className="flex items-center justify-between">
                      <Icon className="service-icon" size={28} strokeWidth={1.25} aria-hidden="true" />
                      <span className="service-count">
                        {g.items.length} {g.items.length === 1 ? 'service' : 'services'}
                      </span>
                    </div>
                    <h3 className="service-title">{g.title}</h3>
                    <ul className="service-list">
                      {g.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </article>
                </div>
              );
            })}
          </div>
        </section>
      </div>

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
