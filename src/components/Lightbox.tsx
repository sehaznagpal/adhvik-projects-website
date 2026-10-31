import React, { useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const touchX = useRef<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm text-neutral-100"
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null || images.length < 2) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) < 50) return;
        onNavigate(dx < 0 ? (currentIndex + 1) % images.length : (currentIndex - 1 + images.length) % images.length);
      }}
    >
      {/* Top Bar with Counter and Close Button */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-5 md:px-10 z-10 border-b border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xs uppercase tracking-[0.08em] text-neutral-400 font-mono">
          <span className="text-white font-semibold">{currentIndex + 1}</span> / {images.length}
        </div>
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-neutral-200 hover:text-[var(--accent-color)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-color)]"
        >
          <span>Close</span>
          <X size={18} />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative max-w-6xl max-h-[82vh] w-full mx-4 md:mx-16 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden flex items-center justify-center max-h-[75vh]">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-h-[75vh] w-auto max-w-full object-contain select-none"
          />
        </div>

        {/* Caption below image */}
        <p className="mt-4 text-xs md:text-sm text-neutral-300 text-center max-w-2xl px-4 line-clamp-2">
          {currentImage.caption || currentImage.alt}
        </p>
      </div>

      {/* Prev / Next Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 p-3 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-color)]"
          >
            <ChevronLeft size={30} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex + 1) % images.length);
            }}
            aria-label="Next image"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 p-3 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-color)]"
          >
            <ChevronRight size={30} />
          </button>
        </>
      )}
    </div>
  );
};
