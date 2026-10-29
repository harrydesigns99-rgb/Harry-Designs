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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#f5f4f0] transition-colors duration-500"
      style={{
        transform: 'translate3d(0, 0, 0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* 1. Tactile Fine-Art Paper & Film Grain Texture (Desktop only to prevent mobile GPU repaint flicker) */}
      {!isTouchDevice && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* 2. Micro Dot Grid (Precision Studio Alignment) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1e1e20 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 3. Primary Ambient Light Orb - Coral Shimmer (Top-Right) */}
      <motion.div
        className="absolute -top-24 -right-24 pointer-events-none"
        style={{
          x: !isTouchDevice ? smoothX : 0,
          y: !isTouchDevice ? smoothY : 0,
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.18, 0.32, 0.18],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] rounded-full pointer-events-none blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(252,122,105,0.3) 0%, rgba(139,21,27,0.12) 45%, transparent 70%)',
            transform: 'translate3d(0, 0, 0)',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
      </motion.div>

      {/* 4. Secondary Ambient Light Orb - Studio Moss & Amber (Bottom-Left) */}
      <motion.div
        className="absolute -bottom-28 -left-28 pointer-events-none"
        style={{
          x: !isTouchDevice ? smoothX : 0,
          y: !isTouchDevice ? smoothY : 0,
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.15, 0.28, 0.15],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
          className="w-[440px] sm:w-[620px] h-[440px] sm:h-[620px] rounded-full pointer-events-none blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(53,128,77,0.18) 0%, rgba(212,165,116,0.12) 50%, transparent 70%)',
            transform: 'translate3d(0, 0, 0)',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
      </motion.div>

      {/* 5. Center Gentle Drifting Aurora Pool */}
      <motion.div
        animate={{
          y: [-30, 30, -30],
          x: [-20, 20, -20],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full pointer-events-none blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(252,122,105,0.15) 0%, transparent 65%)',
        }}
      />

      {/* 6. Corner Minimal Architectural Crosshairs */}
      <div className="hidden lg:block absolute top-12 left-12 text-[#1e1e20]/15 font-mono text-xs select-none">
        +
      </div>
      <div className="hidden lg:block absolute top-12 right-12 text-[#1e1e20]/15 font-mono text-xs select-none">
        +
      </div>
      <div className="hidden lg:block absolute bottom-12 left-12 text-[#1e1e20]/15 font-mono text-xs select-none">
        +
      </div>
      <div className="hidden lg:block absolute bottom-12 right-12 text-[#1e1e20]/15 font-mono text-xs select-none">
        +
      </div>
    </div>
  );
};

export default LivingBackground;
