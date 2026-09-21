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
      {/* 1. Tactile Fine-Art Paper & Film Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. Micro Dot Grid (Precision Studio Alignment) */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--color-eerie) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 3. Primary Ambient Light Orb - Accent Light (Top-Right) */}
      <motion.div
        animate={
          isTouchDevice
            ? {
                scale: [1, 1.08, 1],
                opacity: [0.22, 0.35, 0.22],
              }
            : {
                x: [0, 60, -30, 0],
                y: [0, -45, 35, 0],
                scale: [1, 1.12, 0.96, 1],
                opacity: [0.22, 0.38, 0.28, 0.22],
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

      {/* 4. Secondary Ambient Light Orb - Secondary Tonal Glow (Bottom-Left) */}
      <motion.div
        animate={
          isTouchDevice
            ? {
                scale: [1, 1.06, 1],
                opacity: [0.18, 0.3, 0.18],
              }
            : {
                x: [0, -50, 40, 0],
                y: [0, 50, -25, 0],
                scale: [1, 1.14, 0.94, 1],
                opacity: [0.18, 0.32, 0.22, 0.18],
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

      {/* 5. Fine Architectural Grid (Subtle luxury studio lines) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-eerie) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-eerie) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
        }}
      />

      {/* 6. Corner Minimal Architectural Crosshairs */}
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
