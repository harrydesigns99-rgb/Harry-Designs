import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks';
import { TRANSITIONS } from '@/animations';
import { CARD_DIMENSIONS } from '@/constants';

const BrandCard = ({ brand, index, hoveredItem, setHoveredItem, duplicate = false }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      key={`brand-${duplicate ? 2 : 1}-${index}`}
      whileHover={!isMobile ? { scale: 1.1, y: -10 } : {}}
      className="group relative flex-shrink-0 w-44 h-36 bg-white/45 flex flex-col items-center justify-center overflow-hidden p-4 border border-eerie/10 transition-colors hover:bg-white/75"
      onMouseEnter={() => !isMobile && setHoveredItem(brand.name)}
      onMouseLeave={() => !isMobile && setHoveredItem(null)}
    >
      <motion.div
        className="w-full h-32 relative flex items-center justify-center"
        animate={{
          scale: !isMobile && hoveredItem === brand.name ? 1.1 : 1,
        }}
        transition={TRANSITIONS.fast}
      >
        <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
      </motion.div>
      <p className="text-[0.68rem] uppercase tracking-[0.08em] text-eerie/55 mt-2 text-center relative z-10 group-hover:text-eerie transition-colors whitespace-nowrap">
        {brand.name}
      </p>
    </motion.div>
  );
};

export default BrandCard;
