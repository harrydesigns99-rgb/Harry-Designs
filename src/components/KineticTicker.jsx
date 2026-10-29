import { motion } from 'framer-motion';

const TICKER_ITEMS = [
  'Brand Identity',
  '✦',
  'Packaging Systems',
  '✦',
  'Art Direction',
  '✦',
  'Retail Standout',
  '✦',
  '3D Visualization',
  '✦',
  'Print & Production',
  '✦',
  'Founder-Led Studio',
  '✦',
];

const KineticTicker = () => {
  return (
    <div className="relative w-full overflow-hidden border-y border-black/[0.08] bg-white/40 backdrop-blur-md py-4 sm:py-5 z-10 select-none">
      <div className="flex w-max">
        {/* Set 1 */}
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-8 whitespace-nowrap pr-8"
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span
              key={`tick-1-${idx}`}
              className={`font-sans text-xs sm:text-sm uppercase tracking-[0.2em] ${
                item === '✦' ? 'text-[#FC7A69] text-base' : 'text-[#1e1e20]/60 font-medium'
              }`}
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* Set 2 (for seamless loop) */}
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-8 whitespace-nowrap pr-8"
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span
              key={`tick-2-${idx}`}
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

export default KineticTicker;
