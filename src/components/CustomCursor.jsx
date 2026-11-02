import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const isVisibleRef = useRef(false);
  const hoveredTargetRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Check hovered elements for data-cursor attribute
      const target = e.target.closest ? e.target.closest('[data-cursor]') : null;
      if (target !== hoveredTargetRef.current) {
        hoveredTargetRef.current = target;
        if (target) {
          const text = target.getAttribute('data-cursor') || 'View ↗';
          setCursorText(text);
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      hoveredTargetRef.current = null;
      setIsVisible(false);
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        willChange: 'transform',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-150 hidden md:block ${
        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}
    >
      <div className="px-3.5 py-1.5 rounded-full bg-[#1e1e20] text-[#f5f4f0] text-xs font-mono font-medium tracking-wider shadow-2xl border border-white/20 flex items-center gap-1.5 whitespace-nowrap">
        <span>{cursorText}</span>
      </div>
    </motion.div>
  );
};

export default CustomCursor;

