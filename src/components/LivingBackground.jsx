import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Stable deterministic particle parameters to avoid SSR/hydration mismatches and unnecessary re-renders
const PARTICLES = [
  { id: 1, left: '8%', top: '15%', size: 5, duration: 22, delay: 0, type: 'dot', color: 'rgba(252, 122, 105, 0.45)' },
  { id: 2, left: '22%', top: '70%', size: 4, duration: 26, delay: 2.5, type: 'dot', color: 'rgba(99, 102, 241, 0.45)' },
  { id: 3, left: '35%', top: '30%', size: 12, duration: 28, delay: 1, type: 'sparkle', color: 'rgba(252, 122, 105, 0.35)' },
  { id: 4, left: '48%', top: '85%', size: 6, duration: 24, delay: 4, type: 'dot', color: 'rgba(245, 158, 11, 0.4)' },
  { id: 5, left: '62%', top: '20%', size: 10, duration: 30, delay: 1.5, type: 'cross', color: 'rgba(30, 30, 32, 0.22)' },
  { id: 6, left: '75%', top: '65%', size: 5, duration: 20, delay: 3, type: 'dot', color: 'rgba(99, 102, 241, 0.4)' },
  { id: 7, left: '88%', top: '25%', size: 12, duration: 25, delay: 5, type: 'sparkle', color: 'rgba(139, 21, 27, 0.3)' },
  { id: 8, left: '15%', top: '45%', size: 10, duration: 27, delay: 6, type: 'cross', color: 'rgba(30, 30, 32, 0.2)' },
  { id: 9, left: '30%', top: '90%', size: 4, duration: 23, delay: 3.5, type: 'dot', color: 'rgba(16, 185, 129, 0.4)' },
  { id: 10, left: '54%', top: '12%', size: 12, duration: 29, delay: 7, type: 'sparkle', color: 'rgba(245, 158, 11, 0.35)' },
  { id: 11, left: '70%', top: '40%', size: 5, duration: 21, delay: 2, type: 'dot', color: 'rgba(252, 122, 105, 0.45)' },
  { id: 12, left: '82%', top: '80%', size: 10, duration: 32, delay: 4.5, type: 'cross', color: 'rgba(30, 30, 32, 0.22)' },
  { id: 13, left: '94%', top: '55%', size: 4, duration: 24, delay: 8, type: 'dot', color: 'rgba(99, 102, 241, 0.45)' },
  { id: 14, left: '42%', top: '60%', size: 14, duration: 26, delay: 0.5, type: 'ring', color: 'rgba(139, 21, 27, 0.2)' },
];

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
      mouseX.set((e.clientX / innerWidth - 0.5) * 50);
      mouseY.set((e.clientY / innerHeight - 0.5) * 50);
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
      {/* 1. Tactile Fine-Art Paper & Film Grain Texture */}
      {!isTouchDevice && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.038] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* 2. Micro Dot Grid with slow ambient breath */}
      <motion.div
        animate={{
          opacity: [0.032, 0.055, 0.032],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1e1e20 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* ========================================================================= */}
      {/* 3. LIVING AMBIENT ORBS (DUAL-DISCIPLINE AURORA: BRAND CORAL & UI/UX INDIGO) */}
      {/* ========================================================================= */}

      {/* Orb A: Brand Coral & Atelier Wine Shimmer (Top-Right) */}
      <motion.div
        className="absolute -top-32 -right-32 pointer-events-none will-change-transform"
        style={{
          x: !isTouchDevice ? smoothX : 0,
          y: !isTouchDevice ? smoothY : 0,
        }}
      >
        <motion.div
          animate={{
            x: [0, 45, -25, 0],
            y: [0, -35, 25, 0],
            scale: [1, 1.18, 0.96, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-[450px] sm:w-[650px] md:w-[750px] h-[450px] sm:h-[650px] md:h-[750px] rounded-full pointer-events-none blur-[90px] sm:blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(252,122,105,0.45) 0%, rgba(139,21,27,0.22) 40%, rgba(245,244,240,0) 72%)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </motion.div>

      {/* Orb B: UI/UX & Digital Experience Iris / Indigo Glow (Bottom-Left) */}
      <motion.div
        className="absolute -bottom-36 -left-36 pointer-events-none will-change-transform"
        style={{
          x: !isTouchDevice ? smoothX : 0,
          y: !isTouchDevice ? smoothY : 0,
        }}
      >
        <motion.div
          animate={{
            x: [0, -40, 35, 0],
            y: [0, 30, -35, 0],
            scale: [1, 1.15, 0.94, 1],
            opacity: [0.32, 0.52, 0.32],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="w-[480px] sm:w-[680px] md:w-[780px] h-[480px] sm:h-[680px] md:h-[780px] rounded-full pointer-events-none blur-[90px] sm:blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(99,102,241,0.38) 0%, rgba(79,70,229,0.18) 45%, rgba(245,244,240,0) 72%)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </motion.div>

      {/* Orb C: Studio Amber & Honey Light Pool (Center-Right Drift) */}
      <motion.div
        animate={{
          y: [-50, 50, -50],
          x: [-30, 30, -30],
          scale: [0.94, 1.12, 0.94],
          opacity: [0.25, 0.42, 0.25],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.5,
        }}
        className="absolute top-1/2 -right-28 w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] rounded-full pointer-events-none blur-[80px] sm:blur-[110px] will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(245,158,11,0.32) 0%, rgba(251,191,36,0.14) 50%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Orb D: Soft Sage & Mint Aurora Pool (Center-Left Drift) */}
      <motion.div
        animate={{
          y: [40, -40, 40],
          x: [25, -25, 25],
          scale: [1.08, 0.92, 1.08],
          opacity: [0.22, 0.38, 0.22],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute top-1/3 -left-24 w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full pointer-events-none blur-[80px] sm:blur-[110px] will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.26) 0%, rgba(52,211,153,0.12) 48%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* ========================================================================= */}
      {/* 4. FLOATING ATMOSPHERIC CRAFT PARTICLES (SUBTLE DANCING ELEMENTS) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 0,
              y: 0,
            }}
            animate={{
              y: [-15, -45, -15],
              x: [-12, 12, -12],
              opacity: [0.15, 0.65, 0.15],
              rotate: p.type === 'sparkle' || p.type === 'cross' ? [0, 90, 180, 270, 360] : 0,
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
            className="absolute will-change-transform flex items-center justify-center"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
          >
            {p.type === 'dot' && (
              <span
                className="w-full h-full rounded-full shadow-[0_0_8px_currentColor]"
                style={{ backgroundColor: p.color, color: p.color }}
              />
            )}
            {p.type === 'sparkle' && (
              <span
                className="select-none font-serif leading-none"
                style={{ color: p.color, fontSize: `${p.size}px` }}
              >
                ✦
              </span>
            )}
            {p.type === 'cross' && (
              <span
                className="select-none font-mono leading-none"
                style={{ color: p.color, fontSize: `${p.size}px` }}
              >
                +
              </span>
            )}
            {p.type === 'ring' && (
              <span
                className="w-full h-full rounded-full border border-dashed"
                style={{ borderColor: p.color }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* 5. Minimal Studio Alignment Crosshairs in the Four Corners */}
      <div className="hidden lg:block absolute top-10 left-10 text-[#1e1e20]/20 font-mono text-xs select-none">
        +
      </div>
      <div className="hidden lg:block absolute top-10 right-10 text-[#1e1e20]/20 font-mono text-xs select-none">
        +
      </div>
      <div className="hidden lg:block absolute bottom-10 left-10 text-[#1e1e20]/20 font-mono text-xs select-none">
        +
      </div>
      <div className="hidden lg:block absolute bottom-10 right-10 text-[#1e1e20]/20 font-mono text-xs select-none">
        +
      </div>
    </div>
  );
};

export default LivingBackground;
