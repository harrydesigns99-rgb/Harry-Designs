import { motion } from 'framer-motion';
import { sound } from '@/utils/audio';
import StudioShuttle from '@/components/StudioShuttle';
import HeroToolConstellation, { HeroToolMobileDock } from './HeroToolConstellation';
import { useCMS } from '@/features/cms';

const HeroSection = () => {
  const cms = useCMS();
  const profile = cms.profile || {};

  const heroGreeting = profile.heroGreeting || "Hello, I'm Hariharan";
  const heroHeadline =
    profile.heroHeadline ||
    'A product & brand designer who loves shaping complex challenges into intuitive solutions';
  const heroSubline =
    profile.heroSubline ||
    'Visual Designer at TCS • Crafting intuitive digital experiences & strategic brand identities';
  const heroBadgeIcon = profile.heroBadgeIcon || '';
  const heroBadgeText = profile.heroBadgeText || '';

  const handleScrollCue = () => {
    sound.playClick();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="introduction"
      className="relative min-h-[92svh] sm:min-h-screen w-full flex flex-col items-center justify-center pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 md:px-8 overflow-hidden select-none"
    >
      {/* Floating Studio Telemetry Shuttle (Docked HUD Capsule) */}
      <StudioShuttle />

      {/* Floating Minimal Frosted Glass Tool Constellation (Figma, Ps, Ai, Id, Pr, XD) */}
      <HeroToolConstellation />

      {/* ========================================================================= */}
      {/* ARCHITECTURAL TECHNICAL GRID FRAME WITH SOFT ARCHED DOME (MATCHES REFERENCE) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <div className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center">
          {/* Arched Architectural Canvas */}
          <div className="absolute inset-x-2 sm:inset-x-6 md:inset-x-10 top-12 sm:top-16 bottom-8 sm:bottom-12 rounded-t-[100px] sm:rounded-t-[180px] md:rounded-t-[260px] border-t border-x border-black/[0.06] bg-white/[0.4] overflow-hidden shadow-[0_20px_80px_-20px_rgba(0,0,0,0.02)]">
            {/* Crisp Square Technical Grid */}
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0, 0, 0, 0.055) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 0, 0, 0.055) 1px, transparent 1px)
                `,
                backgroundSize: '56px 56px',
                backgroundPosition: 'center top',
              }}
            />

            {/* Subtle Radial Gradient Vignette to blend edges */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(245,244,240,0.45) 75%, #f5f4f0 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CENTERED EDITORIAL HERO CONTENT (MATCHES REFERENCE SCREENSHOT) */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-4xl lg:max-w-5xl mx-auto text-center px-2 sm:px-6 flex flex-col items-center">
        {/* 1. Greeting: "Hello, I'm Neel" / "Hello, I'm Hariharan" */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[#37373a] text-base sm:text-lg md:text-xl font-normal tracking-normal mb-3 sm:mb-5"
        >
          {heroGreeting}
        </motion.p>

        {/* 2. Main Large Headline in High-End Contemporary Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[1.95rem] xs:text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] text-[#18181b] font-normal tracking-tight leading-[1.18] sm:leading-[1.12] max-w-4xl lg:max-w-5xl mx-auto"
        >
          {heroHeadline}
        </motion.h1>

        {/* 3. Subline with TCS Role (Clean, concise on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 sm:mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-2 text-center text-xs sm:text-sm md:text-base text-[#52525b] font-sans font-normal max-w-3xl leading-relaxed"
        >
          {/* Mobile optimized concise kicker vs desktop full detail */}
          <span className="sm:hidden font-medium text-[#3f3f46]">
            Visual Designer at TCS • Brand &amp; Digital Products
          </span>
          <span className="hidden sm:inline">
            {heroSubline}
          </span>

          {heroBadgeText ? (
            <span className="inline-flex items-center gap-1.5 align-middle px-2.5 py-0.5 rounded-lg bg-white/95 border border-black/10 shadow-2xs text-[#18181b] font-medium text-xs sm:text-sm">
              {heroBadgeIcon && (
                <span className="w-4 h-4 rounded bg-[#1e1e20] flex items-center justify-center text-white text-[10px] font-bold shadow-2xs">
                  {heroBadgeIcon}
                </span>
              )}
              <span>{heroBadgeText}</span>
            </span>
          ) : null}
        </motion.div>

        {/* 4. Mobile Tool Dock: all 6 tools floating together on mobile view */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="sm:hidden mt-5 w-full flex justify-center"
        >
          <HeroToolMobileDock />
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* SUBTLE MINIMALIST SCROLL CUE */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="absolute bottom-6 sm:bottom-8 inset-x-0 flex flex-col items-center justify-center gap-1.5 z-10"
      >
        <button
          type="button"
          onClick={handleScrollCue}
          aria-label="Scroll to about section"
          className="group flex flex-col items-center gap-1.5 cursor-pointer text-[#18181b]/35 hover:text-[#18181b] transition-colors"
        >
          <div className="w-5 h-8 rounded-full border border-black/20 group-hover:border-black/50 flex items-start justify-center p-1 transition-colors">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1 rounded-full bg-[#18181b]"
            />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#18181b]/40 group-hover:text-[#18181b] transition-colors">
            SCROLL
          </span>
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
