import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GALLERY } from '../data/gallery';
import { Lightbox } from './Lightbox';

const GAP = 12;
const ROWS_PER_CLICK = 3;

interface Row {
  idx: number[]; // positions in the current order
  h: number;
  w: number[];
}

const aspect = (i: number) => GALLERY[i].width / GALLERY[i].height;

/** Split the ordered images into rows that each fill `width` exactly, as close to `target` height as possible. */
function partition(order: number[], width: number, target: number): Row[] {
  const n = order.length;
  const best = new Array(n + 1).fill(Infinity);
  const from = new Array(n + 1).fill(0);
  best[0] = 0;
  for (let j = 1; j <= n; j++) {
    let sum = 0;
    for (let i = j - 1; i >= Math.max(0, j - 8); i--) {
      sum += aspect(order[i]);
      const k = j - i;
      const h = (width - GAP * (k - 1)) / sum;
      const cost = best[i] + ((h - target) / target) ** 2;
      if (cost < best[j]) {
        best[j] = cost;
        from[j] = i;
      }
    }
  }
  const rows: Row[] = [];
  for (let j = n; j > 0; j = from[j]) {
    const i = from[j];
    const idx = order.slice(i, j);
    const sum = idx.reduce((a, g) => a + aspect(g), 0);
    const h = (width - GAP * (idx.length - 1)) / sum;
    rows.unshift({ idx, h, w: idx.map((g) => aspect(g) * h) });
  }
  return rows;
}

/** Pairs of same-brand images that touch: side by side, or overlapping in x across neighbouring rows. */
function conflicts(rows: Row[]): [number, number][] {
  const out: [number, number][] = [];
  const spans = rows.map((r) => {
    let x = 0;
    return r.idx.map((g, k) => {
      const s = { g, a: x, b: x + r.w[k] };
      x += r.w[k] + GAP;
      return s;
    });
  });
  const same = (a: number, b: number) => GALLERY[a].caption === GALLERY[b].caption;
  spans.forEach((row, r) => {
    row.forEach((s, k) => {
      if (k > 0 && same(row[k - 1].g, s.g)) out.push([row[k - 1].g, s.g]);
      if (r > 0) {
        spans[r - 1].forEach((t) => {
          if (Math.min(s.b, t.b) - Math.max(s.a, t.a) > 1 && same(t.g, s.g)) out.push([t.g, s.g]);
        });
      }
    });
  });
  return out;
}

/** Lay out all images; if same-brand images end up touching, swap images until none do. */
function layout(width: number, target: number) {
  let order = GALLERY.map((_, i) => i);
  let rows = partition(order, width, target);
  let bad = conflicts(rows);
  for (let guard = 0; bad.length && guard < 40; guard++) {
    let bestOrder: number[] | null = null;
    let bestRows = rows;
    let bestBad = bad;
    const movers = Array.from(new Set(bad.map((p) => p[1])));
    for (const m of movers) {
      const p = order.indexOf(m);
      for (let q = 0; q < order.length; q++) {
        if (q === p) continue;
        const next = order.slice();
        [next[p], next[q]] = [next[q], next[p]];
        const r = partition(next, width, target);
        const b = conflicts(r);
        if (b.length < bestBad.length) {
          bestOrder = next;
          bestRows = r;
          bestBad = b;
        }
      }
    }
    if (!bestOrder) break;
    order = bestOrder;
    rows = bestRows;
    bad = bestBad;
  }
  return { order, rows, conflicts: bad.length };
}

export const Gallery: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [clicks, setClicks] = useState(0);
  const [size, setSize] = useState({ width: 0, vw: 0 });
  const gridRef = useRef<HTMLDivElement>(null);
  const seen = useRef<Set<string>>(new Set());

  // Track the grid width so rows can be recomputed on resize
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const measure = () => setSize({ width: el.clientWidth, vw: window.innerWidth });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const target = size.vw >= 1024 ? 320 : size.vw >= 640 ? 240 : 200;
  const firstRows = size.vw >= 640 ? 3 : 4;
  const { order, rows, conflicts: touching } = useMemo(
    () =>
      size.width > 0
        ? layout(size.width, target)
        : { order: [] as number[], rows: [] as Row[], conflicts: 0 },
    [size.width, target]
  );
  const shownRows = Math.min(firstRows + clicks * ROWS_PER_CLICK, rows.length);

  const lightboxImages = useMemo(
    () =>
      order.map((g) => ({
        src: `/images/${GALLERY[g].file}`,
        alt: `${GALLERY[g].caption} interior`,
        caption: GALLERY[g].caption,
      })),
    [order]
  );

  // Fade each tile up the first time it enters the viewport
  useEffect(() => {
    const tiles = gridRef.current?.querySelectorAll<HTMLElement>('[data-tile]');
    if (!tiles) return;
    const mark = (t: Element) => {
      t.classList.add('is-in');
      seen.current.add((t as HTMLElement).dataset.tile!);
    };
    if (!('IntersectionObserver' in window)) {
      tiles.forEach(mark);
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            mark(e.target);
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -5% 0px', threshold: 0.05 }
    );
    tiles.forEach((t) => {
      if (!seen.current.has(t.dataset.tile!)) io.observe(t);
    });
    return () => io.disconnect();
  }, [rows, shownRows]);

  let position = 0;
  return (
    <section
      id="gallery"
      className="pt-20 md:pt-32 pb-8 md:pb-16 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14 scroll-mt-20"
    >
      <div className="mb-10 md:mb-16">
        <span className="eyebrow">Gallery</span>
        <h2 className="section-heading">A look inside</h2>
        <p className="mt-4 text-base text-[var(--muted-color)]">
          Glimpses of retail stores, fitness spaces and interiors we have designed and delivered across India and abroad.
        </p>
      </div>

      <div ref={gridRef} className="gallery-rows" data-touching={touching}>
        {rows.slice(0, shownRows).map((row, r) => (
          <div key={r} className="gallery-row" style={{ height: row.h }}>
            {row.idx.map((g, k) => {
              const item = GALLERY[g];
              const index = position++;
              return (
                <button
                  key={item.file}
                  type="button"
                  data-tile={item.file}
                  onClick={() => setOpen(index)}
                  aria-label={`Open ${item.caption} photo`}
                  className={`gallery-tile group ${seen.current.has(item.file) ? 'is-in' : ''}`}
                  style={{ width: row.w[k], height: row.h }}
                >
                  <span className="relative block h-full w-full overflow-hidden rounded-xl bg-[var(--surface-color)]">
                    <img
                      src={`/images/${item.file}`}
                      alt={`${item.caption} interior`}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      className="block h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none"
                    />
                    <span className="cap-overlay" aria-hidden="true">
                      <span className="cap-name">{item.caption}</span>
                      {item.location && <span className="cap-place">{item.location}</span>}
                    </span>
                    <span className="cap-pill" aria-hidden="true">{item.caption}</span>
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {shownRows < rows.length && (
        <div className="mt-10 flex justify-center">
          <button type="button" className="pill-btn" onClick={() => setClicks((c) => c + 1)}>
            <span>Load more</span>
          </button>
        </div>
      )}

      <Lightbox
        images={lightboxImages}
        currentIndex={open ?? 0}
        isOpen={open !== null}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
      />
    </section>
  );
};
