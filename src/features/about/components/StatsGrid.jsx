import React from 'react';
import { motion, animate, useMotionValue, useTransform, useInView } from 'framer-motion';
import { useIsMobile } from '@/hooks';
import { fadeInUp, TRANSITIONS, DELAYS } from '@/animations';

const STATS = [
  { rawNumber: 6, suffix: '+', label: 'Years of independent studio practice' },
  { rawNumber: 60, suffix: '+', label: 'Global clients & partners launched' },
  { rawNumber: 35, suffix: '+', label: 'Brand identity architectures deployed' },
  { rawNumber: 40, suffix: '%', label: 'Average sales velocity lift achieved' },
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
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16"
    >
      {STATS.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            delay: 0.4 + index * 0.08,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={
            !isMobile
              ? {
                  y: -4,
                  transition: { duration: 0.2 },
                }
              : {}
          }
          className="apple-card p-6 sm:p-8 bg-white border border-black/[0.08] flex flex-col justify-center min-h-[150px] space-y-2 hover:border-black/[0.18] transition-all"
        >
          <div className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-[#1d1d1f] tracking-tight">
            <AnimatedCounter value={stat.rawNumber} suffix={stat.suffix} />
          </div>
          <div className="text-[#86868b] text-xs sm:text-sm font-normal leading-relaxed">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsGrid;
