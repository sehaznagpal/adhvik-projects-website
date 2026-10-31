import React, { useEffect, useMemo, useRef } from 'react';

// [[accent]] = italic rose phrase, <<strong>> = Raleway 600, {{name}} = inline image pill
const SOURCE =
  'Adhvik Projects is a <<project management company>> delivering [[turnkey design and build]]. Since 2013, we have taken more than [[900 spaces]] from site survey to handover, covering design, in-house fabrication, {{workshop}} civil works, MEP and fit-out, {{store}} delivered by one team with a [[single point of accountability]].';

const PILLS: Record<string, string> = {
  workshop: '/images/workshop-01.jpg',
  store: '/images/wardrobe-gwalior-03.jpg',
};

const PLAIN_TEXT = SOURCE.replace(/\{\{\w+\}\}\s?/g, '').replace(/\[\[|\]\]|<<|>>/g, '');

type Token = { kind: 'word'; text: string; key: boolean; strong?: boolean } | { kind: 'pill'; name: string };

function tokenize(): Token[] {
  const tokens: Token[] = [];
  const re = /\[\[(.+?)\]\]([.,]?)|<<(.+?)>>|\{\{(\w+)\}\}|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(SOURCE))) {
    if (m[1]) {
      const words = (m[1] + m[2]).split(' ');
      words.forEach((w) => tokens.push({ kind: 'word', text: w, key: true }));
    } else if (m[3]) {
      m[3].split(' ').forEach((w) => tokens.push({ kind: 'word', text: w, key: false, strong: true }));
    } else if (m[4]) tokens.push({ kind: 'pill', name: m[4] });
    else if (m[5]) tokens.push({ kind: 'word', text: m[5], key: false });
  }
  return tokens;
}

export const AboutIntro: React.FC = () => {
  const tokens = useMemo(tokenize, []);
  const groups = useMemo(() => {
    const out: Token[][] = [];
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].kind === 'pill' && tokens[i + 1]) {
        out.push([tokens[i], tokens[i + 1]]);
        i++;
      } else out.push([tokens[i]]);
    }
    return out;
  }, [tokens]);
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
      className="about-section max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14 scroll-mt-20"
    >
      <p className="sr-only">{PLAIN_TEXT}</p>
      <p
        ref={textRef}
        aria-hidden="true"
        className="about-statement font-medium leading-[1.2] max-w-[30ch] max-sm:max-w-none mx-auto text-center text-[var(--text-color)]"
      >
        {groups.map((g, i) => {
          const unit = (tok: Token, k: number) =>
            tok.kind === 'word' ? (
              <span key={k} data-unit className={`about-unit ${tok.key ? 'about-key font-serif-italic' : ''} ${tok.strong ? 'about-strong' : ''}`}>
                {tok.text}
              </span>
            ) : (
              <span key={k} data-unit className="about-unit about-pill">
                <img src={PILLS[tok.name]} alt="" loading="lazy" />
              </span>
            );
          // A pill never starts a line on its own: it is kept with the word that follows.
          // Its only spacing is its own 0.25em margins, so no space characters sit next to it.
          const nextIsPill = groups[i + 1]?.[0].kind === 'pill';
          return g.length > 1 ? (
            <React.Fragment key={i}>
              <span className="whitespace-nowrap">{g.map(unit)}</span>{' '}
            </React.Fragment>
          ) : (
            <React.Fragment key={i}>
              {unit(g[0], 0)}
              {nextIsPill ? <wbr /> : ' '}
            </React.Fragment>
          );
        })}
      </p>

      <a href="#/about" className="about-btn">
        <span>More about us</span>
        <svg
          className="about-btn-arrow"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2 8h11M9 4l4 4-4 4" />
        </svg>
      </a>
    </section>
  );
};
