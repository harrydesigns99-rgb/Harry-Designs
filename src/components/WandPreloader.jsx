import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SPARKS = [
  { id: 1, x: 25, y: -20, scale: 1.2, delay: 0.2 },
  { id: 2, x: -15, y: -35, scale: 0.8, delay: 0.4 },
  { id: 3, x: 35, y: -10, scale: 1, delay: 0.6 },
  { id: 4, x: -25, y: -15, scale: 0.9, delay: 0.8 },
  { id: 5, x: 15, y: -45, scale: 1.1, delay: 1.0 },
  { id: 6, x: 40, y: -30, scale: 0.7, delay: 1.2 },
];

const WandPreloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds - fast, snappy, minimal

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            onComplete?.();
          }, 600);
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(8px)',
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0d0e] text-white select-none px-6"
        >
          {/* Subtle Ambient Magic Glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-amber-500/20 via-crimson/20 to-purple-600/20 blur-[120px] pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
            {/* Minimal Brand Monogram */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-amber-300/70 font-semibold block mb-1">
                Atelier Launch
              </span>
              <h1 className="font-display text-lg tracking-[0.25em] font-medium text-white/90">
                HARRY DESIGNS
              </h1>
            </motion.div>

            {/* Harry Potter Wand Graphic Container */}
            <div className="relative w-64 h-16 flex items-center justify-center">
              {/* Wand SVG */}
              <svg
                viewBox="0 0 240 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible drop-shadow-[0_0_12px_rgba(251,191,36,0.2)]"
              >
                {/* Wand Handle & Shaft Base (Dark Wood Outline) */}
                <path
                  d="M 12 16 L 50 16 L 220 16"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Wand Handle Details / Grips */}
                <circle cx="16" cy="16" r="4.5" fill="#2d1f18" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="1" />
                <rect x="24" y="13" width="6" height="6" rx="1.5" fill="#3a271d" />
                <rect x="34" y="13" width="6" height="6" rx="1.5" fill="#3a271d" />
                <rect x="44" y="13.5" width="5" height="5" rx="1" fill="#3a271d" />

                {/* Animated Golden Energy Filling Core */}
                <motion.path
                  d="M 12 16 L 220 16"
                  stroke="url(#wandGoldGradiant)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="208"
                  strokeDashoffset={208 - (208 * progress) / 100}
                  transition={{ ease: 'linear' }}
                />

                {/* Glowing Core Defs */}
                <defs>
                  <linearGradient id="wandGoldGradiant" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="70%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#fef08a" />
                  </linearGradient>
                  <filter id="lumosGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Wand Tip "Lumos" Flare */}
                {progress > 10 && (
                  <motion.g
                    style={{
                      transformOrigin: '220px 16px',
                    }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    {/* Glowing Tip Orb */}
                    <circle
                      cx="220"
                      cy="16"
                      r={Math.min(7, 2 + (progress / 100) * 5)}
                      fill="#fff"
                      filter="url(#lumosGlow)"
                    />
                    <circle
                      cx="220"
                      cy="16"
                      r={Math.min(14, 4 + (progress / 100) * 10)}
                      fill="rgba(251, 191, 36, 0.4)"
                    />
                  </motion.g>
                )}
              </svg>

              {/* Magical Lumos Spark Emitters from Wand Tip */}
              {progress > 30 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  {SPARKS.map((spark) => (
                    <motion.span
                      key={spark.id}
                      animate={{
                        x: [0, spark.x],
                        y: [0, spark.y],
                        opacity: [1, 0],
                        scale: [spark.scale, 0],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: spark.delay,
                        ease: 'easeOut',
                      }}
                      className="absolute text-amber-200 text-xs font-serif"
                    >
                      ✦
                    </motion.span>
                  ))}
                </div>
              )}
            </div>

            {/* Minimal Progress Line & Status */}
            <div className="w-full mt-6 flex flex-col items-center gap-2">
              <div className="flex items-center justify-between w-48 text-[11px] font-mono text-white/50">
                <span className="text-amber-200/80 font-semibold tracking-wider">
                  {progress < 100 ? 'Lumos' : 'Ready'}
                </span>
                <span>{progress}%</span>
              </div>

              <div className="w-48 h-[2px] bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-[10px] text-white/35 font-mono tracking-widest uppercase mt-2">
                Casting visual worlds...
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WandPreloader;
