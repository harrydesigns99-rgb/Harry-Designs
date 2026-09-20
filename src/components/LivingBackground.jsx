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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-cloud-dancer transition-colors duration-500"
      style={{
        transform: 'translate3d(0, 0, 0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Subtle Editorial Grain Texture (Lightweight CSS SVG, Zero Thrashing) */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--color-eerie) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Primary Ambient Light Orb - Accent Light (Top-Right) */}
      <motion.div
        animate={
          isTouchDevice
            ? {
                scale: [1, 1.08, 1],
                opacity: [0.25, 0.4, 0.25],
              }
            : {
                x: [0, 60, -30, 0],
                y: [0, -45, 35, 0],
                scale: [1, 1.12, 0.96, 1],
                opacity: [0.25, 0.45, 0.3, 0.25],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 -right-24 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-crimson-light) 0%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)',
          WebkitBackfaceVisibility: 'hidden',
          x: !isTouchDevice ? smoothX : 0,
          y: !isTouchDevice ? smoothY : 0,
        }}
      />

      {/* Secondary Ambient Light Orb - Secondary Tonal Glow (Bottom-Left) */}
      <motion.div
        animate={
          isTouchDevice
            ? {
                scale: [1, 1.06, 1],
                opacity: [0.2, 0.35, 0.2],
              }
            : {
                x: [0, -50, 40, 0],
                y: [0, 50, -25, 0],
                scale: [1, 1.14, 0.94, 1],
                opacity: [0.2, 0.38, 0.24, 0.2],
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
          background: 'radial-gradient(circle, var(--color-clay) 0%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />

      {/* Fine Architectural Grid (Subtle luxury studio lines) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-eerie) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-eerie) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          opacity: 0.035,
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
