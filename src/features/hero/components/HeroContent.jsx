import { motion } from 'framer-motion';
import { TRANSITIONS } from '@/animations';

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
        {/* Availability Badge & Location */}
        <motion.div
          className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...TRANSITIONS.medium }}
        >
          <span className="section-kicker">Independent designer / Chennai, India</span>
          <span className="hidden sm:inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-emerald-600/30 bg-emerald-50 text-emerald-700 text-[10px] font-mono uppercase tracking-wider font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for Q3/Q4 Projects
          </span>
        </motion.div>

        {/* Main Kinetic Headline with Masked Reveal */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-[6.7rem] font-medium leading-[0.94] tracking-[-0.06em] text-eerie"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.35,
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="flex flex-col">
              <span className="block">Brands with</span>
              <span className="block text-gradient">something to say.</span>
            </div>
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg text-eerie/65 font-normal leading-relaxed mx-auto lg:mx-0 max-w-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Harry Designs is an independent studio creating visual identities, packaging, and brand
          worlds for people building what comes next.
        </motion.p>

        {/* CTAs with Magnetic Spring Physics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-6"
        >
          <motion.button
            data-cursor="Explore"
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center gap-5 px-7 py-4 bg-crimson text-white font-semibold text-sm transition-all hover:bg-crimson-dark shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>View selected work</span>
            <span className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
          </motion.button>
          <motion.a
            data-cursor="Email"
            href="#contact"
            whileHover={{ x: 3 }}
            className="editorial-link text-sm font-semibold text-eerie/75 flex items-center gap-1.5"
          >
            Start a project <span aria-hidden="true">↗</span>
          </motion.a>
        </motion.div>

        {/* Disciplines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 flex items-center justify-center lg:justify-start gap-8 text-left text-xs uppercase tracking-[0.16em] text-eerie/45"
        >
          <span className="hover:text-eerie transition-colors">Brand identity</span>
          <span className="h-1 w-1 rounded-full bg-crimson" />
          <span className="hover:text-eerie transition-colors">Packaging</span>
          <span className="h-1 w-1 rounded-full bg-crimson" />
          <span className="hover:text-eerie transition-colors">Art direction</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
