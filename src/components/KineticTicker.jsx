import { motion } from 'framer-motion';

const TICKER_ITEMS = [
  'Brand Identity System',
  '✦',
  'Packaging Architecture',
  '✦',
  'Art Direction & Styling',
  '✦',
  'Commercial Impact',
  '✦',
  'Editorial Design',
  '✦',
  'Luxury Finish Oversight',
  '✦',
  'Creative Direction',
  '✦',
];

const KineticTicker = () => {
  return (
    <div className="relative w-full overflow-hidden border-y border-eerie/15 bg-cloud-white py-3 z-10 select-none">
      <div className="flex w-max">
        {/* Set 1 */}
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-6 whitespace-nowrap pr-6"
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span
              key={`tick-1-${idx}`}
              className={`font-mono text-xs uppercase tracking-[0.22em] ${
                item === '✦' ? 'text-crimson text-sm' : 'text-eerie/60 font-semibold'
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
          className="flex items-center gap-6 whitespace-nowrap pr-6"
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span
              key={`tick-2-${idx}`}
              className={`font-mono text-xs uppercase tracking-[0.22em] ${
                item === '✦' ? 'text-crimson text-sm' : 'text-eerie/60 font-semibold'
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
