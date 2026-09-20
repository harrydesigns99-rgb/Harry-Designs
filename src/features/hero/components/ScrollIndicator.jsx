import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';

const ScrollIndicator = () => {
  return (
    <div className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-eerie/40 select-none">
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex items-center justify-center w-6 h-6 border border-eerie/15 rounded-full text-crimson"
      >
        <HiArrowDown className="text-xs" />
      </motion.div>
      <span>Scroll to explore</span>
    </div>
  );
};

export default ScrollIndicator;
