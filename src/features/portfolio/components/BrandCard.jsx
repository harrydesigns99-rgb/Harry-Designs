import { memo } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks';
import { TRANSITIONS } from '@/animations';

const BrandCard = ({ brand, index, hoveredItem, setHoveredItem, duplicate = false }) => {
  const isMobile = useIsMobile();
  const isThisHovered = !isMobile && hoveredItem === brand.name;

  return (
    <motion.div
      key={`brand-${duplicate ? 2 : 1}-${index}`}
      whileHover={!isMobile ? { scale: 1.08, y: -6 } : {}}
      className="group relative flex-shrink-0 w-44 sm:w-48 h-28 sm:h-32 flex flex-col items-center justify-center overflow-hidden px-4 sm:px-5 py-3 sm:py-4 border-r border-[#1e1e20]/10 transition-colors hover:bg-white/80"
      onMouseEnter={() => !isMobile && setHoveredItem(brand.name)}
      onMouseLeave={() => !isMobile && setHoveredItem(null)}
    >
      <motion.div
        className="w-full h-16 sm:h-20 relative flex items-center justify-center"
        animate={{
          scale: isThisHovered ? 1.08 : 1,
        }}
        transition={TRANSITIONS.fast}
      >
        <img
          src={typeof brand.logo === 'string' ? encodeURI(brand.logo) : brand.logo}
          alt={brand.name}
          className="max-w-[85%] max-h-full object-contain mix-blend-multiply transition-opacity duration-200"
        />
      </motion.div>
      <p className="text-[0.68rem] uppercase tracking-[0.08em] text-[#1e1e20]/60 mt-1 sm:mt-2 text-center relative z-10 group-hover:text-[#1e1e20] transition-colors whitespace-nowrap">
        {brand.name}
      </p>
    </motion.div>
  );
};

export default memo(BrandCard);
