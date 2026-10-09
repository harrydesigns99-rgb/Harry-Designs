import { motion } from 'framer-motion';
import { TRANSITIONS } from '@/animations';
import { sound } from '@/utils/audio';

const HeroContent = () => {
  return (
    <motion.div
      className="text-center lg:text-left flex flex-col justify-center h-full z-20 relative px-0 lg:pr-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...TRANSITIONS.verySlow }}
        className="max-w-3xl"
      >
        {/* Availability Badge & Studio Origin */}
        <motion.div
          className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, ...TRANSITIONS.medium }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-mono text-[#86868b]">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
            <span>Independent Design Studio // Chennai, IN</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-mono font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for Select Projects
          </span>
        </motion.div>

        {/* Main Keynote Kinetic Headline */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="font-display text-4xl sm:text-6xl md:text-7xl xl:text-[6.2rem] font-medium leading-[1.04] sm:leading-[0.96] tracking-tight text-[#1d1d1f]"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.25,
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="flex flex-col">
              <span className="block">Brands with</span>
              <span className="block text-gradient">something to say.</span>
            </div>
          </motion.h1>
        </div>

        {/* Description Narrative */}
        <motion.p
          className="text-base sm:text-lg text-[#1d1d1f]/70 font-normal leading-relaxed mx-auto lg:mx-0 max-w-lg mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Harry Designs crafts distinctive brand identities, shelf-dominant packaging systems, and visual worlds engineered for lasting commercial impact.
        </motion.p>

        {/* Apple Rounded-Full CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3.5"
        >
          <motion.button
            data-cursor="Explore"
            onClick={() => {
              sound.playClick();
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-crimson text-white font-medium text-xs sm:text-sm tracking-wide transition-all hover:bg-crimson-dark shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>View selected work</span>
            <span className="text-sm">↗</span>
          </motion.button>

          <motion.a
            data-cursor="Email"
            href="#contact"
            onClick={() => sound.playClick()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black/[0.05] hover:bg-black/[0.09] text-[#1d1d1f] font-medium text-xs sm:text-sm tracking-wide border border-black/[0.05] transition-all cursor-pointer"
          >
            <span>Start a project</span>
            <span className="text-sm">→</span>
          </motion.a>
        </motion.div>

        {/* Disciplines Segmented Pill Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-2"
        >
          <span className="px-3 py-1 rounded-full bg-black/[0.03] border border-black/[0.05] text-xs font-mono text-[#86868b]">
            Brand Identity
          </span>
          <span className="px-3 py-1 rounded-full bg-black/[0.03] border border-black/[0.05] text-xs font-mono text-[#86868b]">
            Packaging Systems
          </span>
          <span className="px-3 py-1 rounded-full bg-black/[0.03] border border-black/[0.05] text-xs font-mono text-[#86868b]">
            Art Direction
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
