import { memo } from 'react';
import { motion } from 'framer-motion';

const TICKER_ITEMS = [
  'Brand Identity Systems',
  '✦',
  'Creative UI/UX',
  '✦',
  'Design Systems & Tokens',
  '✦',
  'Packaging Architecture',
  '✦',
  'Interactive Prototyping',
  '✦',
  'Art Direction & 3D',
  '✦',
  'Retail & Digital Conversion',
  '✦',
];

const KineticTicker = () => {
  return (
    <div className="relative w-full overflow-hidden border-y border-black/[0.08] bg-white/40 backdrop-blur-md py-4 sm:py-5 z-10 select-none">
      <div className="relative flex w-max">
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ willChange: 'transform' }}
          className="flex items-center gap-8 whitespace-nowrap pr-8"
        >
          {/* Duplicated list for 100% glitch-free continuous loop */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span
              key={`tick-${idx}`}
              className={`font-sans text-xs sm:text-sm uppercase tracking-[0.2em] ${
                item === '✦' ? 'text-[#FC7A69] text-base' : 'text-[#1e1e20]/60 font-medium'
              }`}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default memo(KineticTicker);
