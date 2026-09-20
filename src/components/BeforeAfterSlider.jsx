import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/audio';

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before • Legacy Packaging',
  afterLabel = 'After • Redesigned System (+40% Lift)',
  className = '',
  initialPosition = 50,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef(null);
  const lastSoundPos = useRef(initialPosition);

  // Trigger tactile tick when dragging across intervals
  const handlePositionChange = useCallback((newPos) => {
    const clamped = Math.max(0, Math.min(100, newPos));
    setPosition(clamped);

    if (Math.abs(clamped - lastSoundPos.current) >= 8) {
      sound.playClick();
      lastSoundPos.current = clamped;
    }
  }, []);

  const calculatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    handlePositionChange(percentage);
  }, [handlePositionChange]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setHasInteracted(true);
    sound.playPop();
    calculatePosition(e.clientX);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging) return;
      calculatePosition(e.clientX);
    };

    const handlePointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
        sound.playClick();
      }
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging, calculatePosition]);

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setHasInteracted(true);
      handlePositionChange(position - 5);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setHasInteracted(true);
      handlePositionChange(position + 5);
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label="Before and after transformation slider"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      className={`relative select-none overflow-hidden touch-none cursor-ew-resize bg-neutral-900 group ${className}`}
    >
      {/* After Image (Full Base) */}
      <img
        src={afterImage}
        alt="After Redesign"
        className="w-full h-full object-cover pointer-events-none"
        loading="lazy"
        draggable={false}
      />

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
        }}
      >
        <img
          src={beforeImage}
          alt="Before Redesign"
          className="w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Divider Bar */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none z-20"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)]" />

        {/* Handle Knob */}
        <div
          className={`absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 sm:-left-5 rounded-full bg-white text-eerie shadow-[0_4px_16px_rgba(0,0,0,0.45)] flex items-center justify-center border-2 border-crimson transition-transform duration-100 ${
            isDragging ? 'scale-110' : 'group-hover:scale-105'
          }`}
        >
          <div className="flex items-center gap-1 text-[11px] font-bold tracking-tighter text-crimson">
            <span>◂</span>
            <span>▸</span>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-4 left-4 z-30 pointer-events-none">
        <span className="inline-block px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase bg-black/70 backdrop-blur-md text-white/90 border border-white/15">
          {beforeLabel}
        </span>
      </div>

      <div className="absolute top-4 right-4 z-30 pointer-events-none">
        <span className="inline-block px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase bg-crimson/90 backdrop-blur-md text-white border border-crimson-light">
          {afterLabel}
        </span>
      </div>

      {/* Hint overlay (dismisses after first drag) */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-4 inset-x-0 mx-auto w-max z-30 pointer-events-none"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium tracking-wide bg-eerie/80 backdrop-blur-md text-white border border-white/20 rounded-full shadow-lg">
              <span className="text-crimson animate-pulse">●</span> Drag slider to compare transformation
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BeforeAfterSlider;
