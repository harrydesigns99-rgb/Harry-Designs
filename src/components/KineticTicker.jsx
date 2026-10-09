import { motion } from 'framer-motion';

const TICKER_ITEMS = [
  'Brand Identity System',
  '✦',
  'Packaging Architecture',
  '✦',
  'Art Direction & Styling',
  '✦',
  'Commercial Shelf Impact',
  '✦',
  'ISO 12647-2 Calibration',
  '✦',
  'Tactile Substrates & Foils',
  '✦',
  'Creative Direction',
  '✦',
];

const KineticTicker = () => {
  return (
    <div className="relative w-full overflow-hidden border-y border-black/[0.06] bg-white/60 backdrop-blur-md py-3.5 z-10 select-none">
      <div className="flex w-max">
        {/* Set 1 */}
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-6 whitespace-nowrap pr-6"
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span
              key={`tick-1-${idx}`}
              className={`font-mono text-xs uppercase tracking-wider ${
                item === '✦' ? 'text-crimson text-sm' : 'text-[#86868b] font-medium'
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
            duration: 28,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-6 whitespace-nowrap pr-6"
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span
              key={`tick-2-${idx}`}
              className={`font-mono text-xs uppercase tracking-wider ${
                item === '✦' ? 'text-crimson text-sm' : 'text-[#86868b] font-medium'
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
