import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/audio';

const HumanCraftPreloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check if seen in this session
    if (typeof window !== 'undefined') {
      try {
        if (sessionStorage.getItem('harry_human_manifesto_seen_v2') === 'true') {
          onComplete?.();
          return;
        }
      } catch {
        // ignore
      }
    }

    const startTime = Date.now();
    const duration = 2400; // 2.4s: perfect reading time for the statement

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        try {
          sessionStorage.setItem('harry_human_manifesto_seen_v2', 'true');
        } catch {
          // ignore
        }
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            onComplete?.();
          }, 450);
        }, 200);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    sound.playClick();
    try {
      sessionStorage.setItem('harry_human_manifesto_seen_v2', 'true');
    } catch {
      // ignore
    }
    setIsFinished(true);
    setTimeout(() => {
      onComplete?.();
    }, 350);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: 'blur(10px)',
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0d0f] text-[#f5f4f0] select-none px-6 sm:px-12 overflow-hidden"
        >
          {/* Subtle Ambient Light Bloom */}
          <div
            className="absolute w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full pointer-events-none blur-[140px] opacity-25"
            style={{
              background:
                'radial-gradient(circle, rgba(252,122,105,0.35) 0%, rgba(139,21,27,0.2) 40%, rgba(99,102,241,0.15) 70%, transparent 100%)',
            }}
          />

          {/* Architectural Fine Dot Grid Texture */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Skip Intro Pill in Corner */}
          <button
            type="button"
            onClick={handleSkip}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 font-mono text-[11px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.03] backdrop-blur-sm"
          >
            Skip Intro ↗
          </button>

          {/* Main Manifesto Card */}
          <div className="relative z-10 flex flex-col items-center max-w-4xl w-full text-center">
            {/* Top Badge: Human Touch Verified */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-8 sm:mb-10 shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] text-neutral-300 font-medium">
                ✦ 100% HUMAN-CRAFTED INTELLIGENCE
              </span>
            </motion.div>

            {/* The Main User Statement */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-[#f5f4f0] tracking-tight leading-[1.22] sm:leading-[1.18]"
            >
              &ldquo;All the designs you are about to see{' '}
              <span className="italic font-light text-white underline decoration-[#FC7A69] underline-offset-8">
                are purely created by humans
              </span>
              .&rdquo;
            </motion.h1>

            {/* Editorial Subline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-6 sm:mt-8 font-sans text-xs sm:text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed font-normal"
            >
              No AI generation. Every brand mark, packaging dieline, spatial token, and interface architecture is shaped by human empathy, strategic intent, and uncompromised craft.
            </motion.p>

            {/* 3 Craft Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden sm:flex items-center justify-center gap-3 mt-8 font-mono text-[11px] text-neutral-400"
            >
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                01 / Bespoke Identity &amp; CAD
              </span>
              <span className="text-white/20">•</span>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                02 / Human UX Intuition
              </span>
              <span className="text-white/20">•</span>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                03 / Shelf &amp; Screen Dominance
              </span>
            </motion.div>

            {/* Minimal Progress Line & Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-56 sm:w-72 mt-10 sm:mt-12 flex flex-col items-center gap-2"
            >
              <div className="flex items-center justify-between w-full text-[11px] font-mono text-neutral-400">
                <span className="text-[#FC7A69] font-medium tracking-wider uppercase">
                  Entering Atelier
                </span>
                <span>{progress}%</span>
              </div>

              <div className="w-full h-[2px] bg-white/10 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8b151b] via-[#FC7A69] to-amber-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase mt-1">
                Hariharan S &bull; Visual &amp; UI/UX Designer
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HumanCraftPreloader;
