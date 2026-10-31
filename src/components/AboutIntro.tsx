import React, { useEffect, useMemo, useRef } from 'react';

const SOURCE =
  'Adhvik Projects is a [[turnkey design and build]] firm. Since 2013, we have taken more than [[900 spaces]] from site survey to handover, covering design, in-house fabrication, {{workshop}} civil works, MEP and fit-out, {{store}} delivered by one team with a [[single point of accountability]].';

const PILLS: Record<string, string> = {
  workshop: '/images/workshop-01.jpg',
  store: '/images/wardrobe-gwalior-02.jpg',
};

const PLAIN_TEXT = SOURCE.replace(/\{\{\w+\}\}\s?/g, '').replace(/\[\[|\]\]/g, '');

type Token = { kind: 'word'; text: string; key: boolean } | { kind: 'pill'; name: string };

function tokenize(): Token[] {
  const tokens: Token[] = [];
  const re = /\[\[(.+?)\]\]([.,]?)|\{\{(\w+)\}\}|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(SOURCE))) {
    if (m[1]) {
      const words = (m[1] + m[2]).split(' ');
      words.forEach((w) => tokens.push({ kind: 'word', text: w, key: true }));
    } else if (m[3]) tokens.push({ kind: 'pill', name: m[3] });
    else if (m[4]) tokens.push({ kind: 'word', text: m[4], key: false });
  }
  return tokens;
}

export const AboutIntro: React.FC = () => {
  const tokens = useMemo(tokenize, []);
  const textRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const units = Array.from(el.querySelectorAll<HTMLElement>('[data-unit]'));
    const root = document.documentElement;
    const section = sectionRef.current;
    const setAll = (t: number) => units.forEach((u) => u.style.setProperty('--t', String(t)));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Page background shift: 0 outside the section, 1 while reading it, eased over the
    // first and last 20% of the section's travel through the viewport
    const updateShift = () => {
      if (!section) return;
      const vh = window.innerHeight;
      const r = section.getBoundingClientRect();
      const q = (vh - r.top) / (vh + r.height);
      let shift: number;
      if (reduced) {
        shift = r.top < vh * 0.5 && r.bottom > vh * 0.5 ? 1 : 0;
      } else {
        shift = Math.min(Math.max(Math.min(q / 0.2, (1 - q) / 0.2), 0), 1);
      }
      root.style.setProperty('--shift', shift.toFixed(3));
    };

    if (reduced) {
      root.classList.add('shift-fade');
      setAll(1);
      updateShift();
      window.addEventListener('scroll', updateShift, { passive: true });
      window.addEventListener('resize', updateShift);
      return () => {
        window.removeEventListener('scroll', updateShift);
        window.removeEventListener('resize', updateShift);
        root.classList.remove('shift-fade');
        root.style.removeProperty('--shift');
      };
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      updateShift();
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const startY = vh * 0.85;
      const endY = vh * 0.5;
      const p = Math.min(Math.max((startY - rect.top) / (startY - endY + rect.height), 0), 1);
      const n = units.length;
      units.forEach((u, i) => {
        const t = Math.min(Math.max(p * (n + 3) - i, 0), 1);
        u.style.setProperty('--t', t.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      root.style.removeProperty('--shift');
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-intro"
      className="py-24 md:py-36 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14 scroll-mt-20"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted-color)] block mb-6 md:mb-8">
        About us
      </span>

      <p className="sr-only">{PLAIN_TEXT}</p>
      <p
        ref={textRef}
        aria-hidden="true"
        className="about-statement font-medium text-[clamp(1.625rem,3.4vw,3.25rem)] leading-[1.2] max-w-[22ch] sm:max-w-[22ch] max-sm:max-w-none text-[var(--text-color)]"
      >
        {tokens.map((tok, i) =>
          tok.kind === 'word' ? (
            <React.Fragment key={i}>
              <span
                data-unit
                className={`about-unit ${tok.key ? 'about-key font-serif-italic' : ''}`}
              >
                {tok.text}
              </span>{' '}
            </React.Fragment>
          ) : (
            <React.Fragment key={i}>
              <span data-unit className="about-unit about-pill">
                <img src={PILLS[tok.name]} alt="" loading="lazy" />
              </span>{' '}
            </React.Fragment>
          )
        )}
      </p>

      <a
        href="#/about"
        className="group mt-10 md:mt-14 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted-color)] hover:text-[var(--text-color)] transition-colors"
      >
        <span>More about us</span>
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>
    </section>
  );
};
