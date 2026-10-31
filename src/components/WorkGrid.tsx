import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PROJECTS, hasPhotos, imageUrl, imageAlt } from '../data/projects';
import { CATEGORIES, categoryName } from '../data/categories';

const INITIAL_COUNT = 12;
const FADE_MS = 250;

interface WorkGridProps {
  category: string;
  onCategoryChange: (slug: string) => void;
  onHoverImage: (hovering: boolean) => void;
}

export const WorkGrid: React.FC<WorkGridProps> = ({ category, onCategoryChange, onHoverImage }) => {
  const [shown, setShown] = useState(category);
  const [leaving, setLeaving] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const timer = useRef<number | null>(null);

  const chips = useMemo(
    () => [
      { slug: 'all', name: 'All' },
      ...CATEGORIES.filter((c) => PROJECTS.some((p) => p.category === c.slug)).map((c) => ({
        slug: c.slug,
        name: c.name,
      })),
    ],
    []
  );

  // Fade out, swap the content, fade back in with an 8px rise
  useEffect(() => {
    if (category === shown) return;
    setLeaving(true);
    timer.current = window.setTimeout(() => {
      setShown(category);
      setShowAll(false);
      setLeaving(false);
    }, FADE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [category, shown]);

  const filtered = PROJECTS.filter((p) => shown === 'all' || p.category === shown);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <section
      id="work"
      className="pt-20 md:pt-32 pb-24 md:pb-36 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14 scroll-mt-20"
    >
      <div className="mb-8 md:mb-10 flex flex-col items-start gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-color)] block mb-2">
            Portfolio
          </span>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.02em] text-[var(--text-color)]">
            Our Work
          </h2>
        </div>
        <div className="text-sm md:text-base text-[var(--muted-color)] tabular-nums" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-10 md:mb-14" role="group" aria-label="Filter projects by category">
        {chips.map((chip) => {
          const active = category === chip.slug;
          return (
            <button
              key={chip.slug}
              type="button"
              aria-pressed={active}
              onClick={() => onCategoryChange(chip.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] ${
                active
                  ? 'bg-[var(--accent-fill)] text-[var(--on-accent)] border-[var(--accent-fill)]'
                  : 'border-[var(--border-color)] text-[var(--text-color)] hover:border-[var(--text-color)]'
              }`}
            >
              {chip.name}
            </button>
          );
        })}
      </div>

      <div
        className={`grid grid-cols-1 min-[640px]:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-[250ms] ease-out ${
          leaving ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        {visible.map((project) => {
          const meta = `${project.location} · ${categoryName(project.category)}`;
          if (hasPhotos(project)) {
            return (
              <a
                key={project.slug}
                href={`#/work/${project.slug}`}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] rounded-xl"
              >
                <div
                  className="aspect-[4/5] rounded-xl overflow-hidden bg-[var(--surface-color)]"
                  onMouseEnter={() => onHoverImage(true)}
                  onMouseLeave={() => onHoverImage(false)}
                >
                  <img
                    src={imageUrl(project.images[0])}
                    alt={imageAlt(project, 0)}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-4 font-heading-plain text-xl text-[var(--text-color)] group-hover:text-[var(--accent-color)] transition-colors">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted-color)]">{meta}</p>
              </a>
            );
          }
          return (
            <div key={project.slug} data-project={project.slug}>
              <div className="aspect-[4/5] rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)] flex items-center justify-center p-6 text-center">
                <span className="font-serif-italic text-[32px] leading-[1.1] text-[var(--text-color)] [overflow-wrap:break-word] min-w-0">
                  {project.name}
                </span>
              </div>
              <p className="mt-4 text-sm text-[var(--muted-color)]">{meta}</p>
            </div>
          );
        })}
      </div>

      {!showAll && filtered.length > INITIAL_COUNT && (
        <div className="mt-12 md:mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="px-6 py-3 rounded-full border border-[var(--text-color)] text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)]"
          >
            Show all projects
          </button>
        </div>
      )}
    </section>
  );
};
