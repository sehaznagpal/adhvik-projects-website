import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/projects';
import { Lightbox, LightboxImage } from '../components/Lightbox';

interface ProjectDetailProps {
  slug: string;
  onNavigate: (path: string, scrollToWork?: boolean) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ slug, onNavigate }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project: Project | undefined = PROJECTS[currentIndex];

  if (!project) {
    return (
      <main className="w-full pt-36 pb-28 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14">
        <button
          onClick={() => onNavigate('/', true)}
          className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)] hover:text-[var(--text-color)] transition-colors mb-12 block"
        >
          ← All work
        </button>
        <h1 className="font-heading text-4xl font-bold tracking-[-0.01em] text-[var(--text-color)] mb-4">
          Project Not Found
        </h1>
        <p className="text-sm text-[var(--muted-color)] mb-8">
          The requested project could not be found.
        </p>
        <button
          onClick={() => onNavigate('/', true)}
          className="text-xs uppercase tracking-[0.08em] font-semibold text-[var(--accent-color)] hover:underline"
        >
          Return to Selected Projects
        </button>
      </main>
    );
  }

  // Next project logic (looping from last to first)
  const nextProjectIndex = (currentIndex + 1) % PROJECTS.length;
  const nextProject = PROJECTS[nextProjectIndex];

  // All images for lightbox (cover + gallery)
  const allImages: LightboxImage[] = [
    { src: project.coverImage, alt: project.coverAlt, caption: `${project.name}, Façade and Cover` },
    ...project.gallery.map((g) => ({
      src: g.src,
      alt: g.alt,
      caption: g.alt,
    })),
  ];

  const handleOpenLightbox = (index: number) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="w-full pt-24 sm:pt-28 md:pt-36 pb-24 md:pb-36 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14">
        {/* Back Link */}
        <div className="mb-8 md:mb-12">
          <button
            onClick={() => onNavigate('/', true)}
            className="group inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.08em] text-[var(--muted-color)] hover:text-[var(--accent-color)] transition-colors focus:outline-none"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>All work</span>
          </button>
        </div>

        {/* Project Header */}
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 text-xs md:text-sm font-mono text-[var(--muted-color)] uppercase tracking-[0.08em] mb-3">
            <span>{project.number}</span>
            <span aria-hidden="true">/</span>
            <span>08</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] text-[var(--text-color)] uppercase leading-[0.9] mb-6">
            {project.name}
          </h1>

          {/* Meta Row: Location · Area · Type · Scope */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm md:text-base text-[var(--muted-color)] border-t border-b border-[var(--border-color)] py-4">
            <span className="text-[var(--text-color)] font-medium">{project.location}</span>
            <span aria-hidden="true" className="text-[var(--border-color)]">·</span>
            <span>{project.area}</span>
            <span aria-hidden="true" className="text-[var(--border-color)]">·</span>
            <span className="text-[var(--text-color)] font-medium">{project.type}</span>
            {project.scope && (
              <>
                <span aria-hidden="true" className="text-[var(--border-color)]">·</span>
                <span className="text-[var(--muted-color)]">{project.scope}</span>
              </>
            )}
          </div>
        </div>

        {/* Full-Width Cover Image */}
        <div className="mb-12 md:mb-16">
          <button
            onClick={() => handleOpenLightbox(0)}
            className="w-full text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)]"
            aria-label={`Open full size cover image for ${project.name}`}
          >
            <div className="aspect-[16/9] w-full bg-[var(--surface-color)] overflow-hidden relative cursor-zoom-in">
              <img
                src={project.coverImage}
                alt={project.coverAlt}
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-xs text-[var(--muted-color)]">
              <span>{project.coverAlt}</span>
              <span className="uppercase tracking-[0.08em] font-mono">01 / {String(allImages.length).padStart(2, '0')}</span>
            </div>
          </button>
        </div>

        {/* Remaining Gallery Photos (2-Column Grid on desktop, 1 on mobile) */}
        {project.gallery.length > 0 && (
          <div className="mb-20 md:mb-28">
            <div className="mb-6 flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:justify-between text-xs uppercase tracking-[0.08em] text-[var(--muted-color)]">
              <span>Gallery</span>
              <span>{project.gallery.length} Additional Perspectives</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {project.gallery.map((item, idx) => {
                const photoIndex = idx + 1;
                return (
                  <button
                    key={item.src}
                    onClick={() => handleOpenLightbox(photoIndex)}
                    className="w-full text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)]"
                    aria-label={`Open image: ${item.alt}`}
                  >
                    <div className="aspect-[4/3] bg-[var(--surface-color)] overflow-hidden relative cursor-zoom-in">
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-xs text-[var(--muted-color)]">
                      <span className="line-clamp-1">{item.alt}</span>
                      <span className="uppercase tracking-[0.08em] font-mono pl-3 shrink-0">
                        {String(photoIndex + 1).padStart(2, '0')} / {String(allImages.length).padStart(2, '0')}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Navigation: Next project → (looping from last to first) */}
        <div className="pt-12 md:pt-16 border-t border-[var(--border-color)] flex items-center justify-between">
          <button
            onClick={() => onNavigate('/', true)}
            className="text-xs md:text-sm uppercase tracking-[0.08em] text-[var(--muted-color)] hover:text-[var(--text-color)] transition-colors focus:outline-none"
          >
            ← Back to all work
          </button>

          <button
            onClick={() => onNavigate(`/work/${nextProject.slug}`)}
            className="group text-right focus:outline-none"
          >
            <span className="text-xs uppercase tracking-[0.08em] text-[var(--muted-color)] block mb-1">
              Next project
            </span>
            <span className="font-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-[-0.01em] text-[var(--text-color)] group-hover:text-[var(--accent-color)] transition-colors inline-flex items-center gap-2">
              <span>{nextProject.name}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={allImages}
        currentIndex={activePhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setActivePhotoIndex}
      />
    </main>
  );
};
