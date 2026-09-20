import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const LivingBackground = () => {
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches;
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 45, stiffness: 50 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return undefined;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 45);
      mouseY.set((e.clientY / innerHeight - 0.5) * 45);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouchDevice, mouseX, mouseY]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#f8f6f0]"
      style={{
        transform: 'translate3d(0, 0, 0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Subtle Editorial Grain Texture (Lightweight CSS SVG, Zero Thrashing) */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(18, 18, 18, 0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Primary Ambient Light Orb - Soft Iris / Atelier Blue (Top-Right) */}
      <motion.div
        animate={
          isTouchDevice
            ? {
                scale: [1, 1.08, 1],
                opacity: [0.35, 0.5, 0.35],
              }
            : {
                x: [0, 60, -30, 0],
                y: [0, -45, 35, 0],
                scale: [1, 1.12, 0.96, 1],
                opacity: [0.35, 0.55, 0.4, 0.35],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 -right-24 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(132, 144, 239, 0.22) 0%, rgba(82, 99, 216, 0.08) 45%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)',
          WebkitBackfaceVisibility: 'hidden',
          x: !isTouchDevice ? smoothX : 0,
          y: !isTouchDevice ? smoothY : 0,
        }}
      />

      {/* Secondary Ambient Light Orb - Warm Terracotta Sand (Bottom-Left) */}
      <motion.div
        animate={
          isTouchDevice
            ? {
                scale: [1, 1.06, 1],
                opacity: [0.3, 0.45, 0.3],
              }
            : {
                x: [0, -50, 40, 0],
                y: [0, 50, -25, 0],
                scale: [1, 1.14, 0.94, 1],
                opacity: [0.3, 0.48, 0.32, 0.3],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute -bottom-28 -left-28 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212, 119, 92, 0.18) 0%, rgba(232, 168, 124, 0.08) 50%, transparent 75%)',
          transform: 'translate3d(0, 0, 0)',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />

      {/* Central Radiance - Subtle Alabaster Highlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(248, 246, 240, 0.2) 60%, transparent 80%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Fine Swiss Architectural Grid (Subtle luxury studio lines) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(18, 18, 18, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(18, 18, 18, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
        }}
      />

      {/* Corner Minimal Architectural Crosshairs */}
      <div className="hidden lg:block absolute top-12 left-12 text-eerie/15 font-mono text-xs select-none">
        +
      </div>
      <div className="hidden lg:block absolute top-12 right-12 text-eerie/15 font-mono text-xs select-none">
        +
      </div>
      <div className="hidden lg:block absolute bottom-12 left-12 text-eerie/15 font-mono text-xs select-none">
        +
      </div>
      <div className="hidden lg:block absolute bottom-12 right-12 text-eerie/15 font-mono text-xs select-none">
        +
      </div>
    </div>
  );
};

export default LivingBackground;
