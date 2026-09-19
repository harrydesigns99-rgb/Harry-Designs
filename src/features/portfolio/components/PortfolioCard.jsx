import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks';

const PortfolioCard = ({ item, index, onSelect }) => {
  const isMobile = useIsMobile();
  const Icon = item.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        delay: index * 0.04,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-cursor="View"
      onClick={() => onSelect?.(item)}
      className="group relative overflow-hidden cursor-pointer bg-neutral-900 border border-eerie/10 aspect-[4/5] flex flex-col justify-end"
    >
      {/* Background Image / Artwork */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
            <Icon className="text-7xl text-white/30" />
          </div>
        )}

        {/* Dynamic Dark Gradient for Legibility */}
        <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

        {/* Top subtle fade */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Top Section: Category & Metric Badge */}
      <div className="absolute top-4 inset-x-4 z-10 flex justify-between items-start pointer-events-none">
        <span className="text-[0.65rem] uppercase tracking-[0.16em] px-2.5 py-1 bg-black/60 backdrop-blur-md text-white/90 border border-white/15">
          {item.category}
        </span>
        {item.metric && (
          <span className="text-[0.65rem] font-semibold tracking-wide px-2.5 py-1 bg-crimson text-white">
            {item.metric}
          </span>
        )}
      </div>

      {/* Bottom Section: Client, Title & View Case Study Link */}
      <div className="relative z-10 p-6 text-white text-left">
        <p className="text-xs uppercase tracking-[0.14em] text-white/60 mb-1 font-medium">
          {item.client}
        </p>
        <h4 className="font-display text-2xl font-medium tracking-tight text-white mb-2 leading-snug">
          {item.title}
        </h4>
        <p className="text-xs text-white/75 line-clamp-2 leading-relaxed mb-4">
          {item.description}
        </p>

        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-crimson-light group-hover:text-white transition-colors">
          <span>Explore Case Study</span>
          <span className="text-base transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>

      {/* Animated Card Border on Desktop */}
      {!isMobile && (
        <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 transition-colors pointer-events-none" />
      )}
    </motion.div>
  );
};

export default PortfolioCard;
