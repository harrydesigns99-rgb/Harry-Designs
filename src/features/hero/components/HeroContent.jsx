import { motion } from 'framer-motion';
import { fadeInUp, TRANSITIONS, DELAYS } from '@/animations';

const HeroContent = () => {
  return (
    <motion.div
      className="text-center lg:text-left order-1 lg:order-1 flex flex-col justify-center h-full px-6 sm:px-8 lg:pl-20 xl:pl-32 z-20 py-12 lg:py-0"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...TRANSITIONS.verySlow }}
        className="max-w-3xl"
      >
        <motion.span
          className="section-kicker mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: DELAYS.small, ...TRANSITIONS.slow }}
        >
          Independent designer / Chennai, India
        </motion.span>

        {/* Main Headline */}
        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-[6.7rem] font-medium mb-6 leading-[0.94] tracking-[-0.06em] text-eerie"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: DELAYS.medium, ...TRANSITIONS.slow, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col">
            <span className="block">Brands with</span>
            <span className="block text-gradient">something to say.</span>
          </div>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg text-eerie/65 font-normal leading-relaxed mx-auto lg:mx-0 max-w-lg mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: DELAYS.xxxl, ...TRANSITIONS.slow }}
        >
          Harry Designs is an independent studio creating visual identities, packaging, and brand
          worlds for people building what comes next.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.9, ...TRANSITIONS.slow }}
          className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-6"
        >
          <motion.button
            data-cursor="Explore"
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-5 px-6 py-4 bg-crimson text-white font-semibold text-sm transition-all hover:bg-crimson-dark mb-0"
          >
            View selected work <span className="text-lg transition-transform group-hover:translate-x-1">↗</span>
          </motion.button>
          <a data-cursor="Email" href="#contact" className="editorial-link text-sm font-semibold text-eerie/75">
            Start a project <span aria-hidden="true">↗</span>
          </a>
        </motion.div>

        <div className="mt-16 flex items-center justify-center lg:justify-start gap-8 text-left text-xs uppercase tracking-[0.16em] text-eerie/45">
          <span>Brand identity</span>
          <span className="h-1 w-1 rounded-full bg-crimson" />
          <span>Packaging</span>
          <span className="h-1 w-1 rounded-full bg-crimson" />
          <span>Art direction</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
