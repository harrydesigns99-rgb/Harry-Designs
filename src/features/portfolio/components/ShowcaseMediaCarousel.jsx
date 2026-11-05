import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { sound } from '@/utils/audio';

/**
 * ShowcaseMediaCarousel
 * Architectural micro-slideshow for project showcase cards.
 * 
 * Features:
 * - Timed auto-scroll with customizable interval (default: 3800ms)
 * - Pause-on-hover so visitors can examine details without interruption
 * - Staggered initial delay based on cardIndex to prevent synchronized jumps
 * - Floating frosted-glass chevrons and tactile indicator pills
 * - Event stopPropagation so image scrubbing never accidentally opens the case study
 * - Touch swipe support for mobile devices
 * - Zero overhead when only 1 image exists
 */
const ShowcaseMediaCarousel = ({
  images = [],
  fallbackImage = '/image/Image Gallery/Artboard 1.webp',
  alt = 'Design Showcase',
  interval = 3800,
  cardIndex = 0,
  aspectRatio = 'aspect-[16/10]',
  className = '',
  showControls = true,
  showIndicators = true,
  showCounter = true,
  autoPlay = true,
}) => {
  // Normalize images list
  const validImages = Array.isArray(images) && images.length > 0
    ? images.filter(Boolean)
    : [fallbackImage];

  const total = validImages.length;
  const isMulti = total > 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(null);

  // Safe index within bounds
  const safeIndex = currentIndex < total ? currentIndex : 0;
  const currentImg = validImages[safeIndex] || fallbackImage;

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    sound.playClick();
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    sound.playClick();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = useCallback((e, idx) => {
    e.stopPropagation();
    sound.playClick();
    setCurrentIndex(idx);
  }, []);

  // Staggered interval auto-play
  useEffect(() => {
    if (!isMulti || !autoPlay || isPaused) return;

    // Stagger the first tick so cards on the page don't flip in unison
    const initialStagger = (cardIndex * 900) % (interval || 3800);
    let intervalTimer = null;

    const initialTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      intervalTimer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
      }, interval || 3800);
    }, initialStagger > 0 ? initialStagger : interval || 3800);

    return () => {
      clearTimeout(initialTimer);
      if (intervalTimer) clearInterval(intervalTimer);
    };
  }, [isMulti, autoPlay, isPaused, interval, cardIndex, total]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (diff > 45) {
      // Swiped left -> next
      handleNext();
    } else if (diff < -45) {
      // Swiped right -> prev
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  // If only 1 image, render clean static image with zero overhead
  if (!isMulti) {
    return (
      <div className={`relative w-full ${aspectRatio} bg-[#18181b] overflow-hidden ${className}`}>
        <img
          src={currentImg}
          alt={alt}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${aspectRatio} bg-[#18181b] overflow-hidden select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Animated Crossfade + Micro-Drift Image Layer */}
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={currentImg}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={currentImg}
            alt={`${alt} - Artboard ${safeIndex + 1}`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImage;
            }}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle Ambient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none z-10" />

      {/* Top-Right Multi-Image Counter Badge */}
      {showCounter && (
        <div className="absolute top-3 right-3 z-20 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[10px] font-mono font-medium text-white/90 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FC7A69] animate-pulse" />
            <span>
              {safeIndex + 1} / {total}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-white/60 hidden xs:inline">
              Views
            </span>
          </div>
        </div>
      )}

      {/* Paused Tooltip / Status (Subtle) */}
      {isPaused && (
        <div className="absolute top-3 left-3 z-20 pointer-events-none transition-opacity duration-200">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase tracking-wider text-white/70">
            ❚❚ Paused
          </span>
        </div>
      )}

      {/* Hover Chevrons Navigation */}
      {showControls && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Design"
            className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-20 shadow-md cursor-pointer"
          >
            <FiChevronLeft className="w-4 h-4 -translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Design"
            className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-20 shadow-md cursor-pointer"
          >
            <FiChevronRight className="w-4 h-4 translate-x-0.5" />
          </button>
        </>
      )}

      {/* Bottom Micro Progress Indicators */}
      {showIndicators && (
        <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 shadow-sm pointer-events-auto">
            {validImages.map((_, idx) => {
              const isActive = idx === safeIndex;
              return (
                <button
                  key={`indicator-${idx}`}
                  type="button"
                  aria-label={`Jump to design ${idx + 1}`}
                  onClick={(e) => handleSelect(e, idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-6 bg-white shadow-xs'
                      : 'w-2 bg-white/40 hover:bg-white/80 hover:w-3'
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ShowcaseMediaCarousel);

