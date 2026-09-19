import React from 'react';
import { motion, animate, useMotionValue, useTransform, useInView } from 'framer-motion';
import { useIsMobile } from '@/hooks';
import { fadeInUp, TRANSITIONS, DELAYS } from '@/animations';

const STATS = [
  { rawNumber: 6, suffix: '+', label: 'Years of independent practice' },
  { rawNumber: 60, suffix: '+', label: 'Global clients partnered with' },
  { rawNumber: 35, suffix: '+', label: 'Complete brand identity systems' },
  { rawNumber: 40, suffix: '%', label: 'Sales lift achieved for packaging' },
];

const AnimatedCounter = ({ value, suffix }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  
  React.useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [inView, motionValue, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const StatsGrid = ({ isInView }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay: DELAYS.xxl, ...TRANSITIONS.slow }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16"
    >
      {STATS.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            delay: 0.5 + index * 0.08,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={
            !isMobile
              ? {
                  y: -5,
                  transition: { duration: 0.2 },
                }
              : {}
          }
          className="group relative p-6 bg-cloud-white border border-eerie/15 transition-all duration-300 hover:border-crimson/50 hover:shadow-md flex flex-col justify-center min-h-[140px]"
        >
          <div
            className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-crimson mb-2"
          >
            <AnimatedCounter value={stat.rawNumber} suffix={stat.suffix} />
          </div>
          <div className="text-eerie/70 text-xs sm:text-sm font-medium leading-snug group-hover:text-eerie transition-colors">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsGrid;
