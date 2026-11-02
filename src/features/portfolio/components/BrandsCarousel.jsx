import { useState } from 'react';
import { motion } from 'framer-motion';
import { BRANDS } from '../data/portfolioData';
import { useCMS } from '@/features/cms';
import BrandCard from './BrandCard';
import { fadeInUp, TRANSITIONS, DELAYS } from '@/animations';

const BrandsCarousel = ({ isInView = true }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const cms = useCMS();
  const brands = cms.brands && cms.brands.length > 0 ? cms.brands : BRANDS;

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay: DELAYS.small, ...TRANSITIONS.medium }}
      className="relative my-8 sm:my-12 overflow-hidden border-y border-black/[0.08] py-4 bg-white/40 backdrop-blur-xs select-none"
    >
      <div className="relative">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-[#f5f4f0] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-[#f5f4f0] to-transparent z-10 pointer-events-none" />

        {/* Scrolling brands container */}
        <div className="flex w-max">
          <motion.div
            animate={{
              x: [0, '-50%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 32,
                ease: 'linear',
              },
            }}
            className="flex items-center gap-8 pr-8"
          >
            {/* Set 1 */}
            {brands.map((brand, index) => (
              <BrandCard
                key={`brand-1-${index}`}
                brand={brand}
                index={index}
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
              />
            ))}

            {/* Set 2 (duplicate for seamless loop) */}
            {brands.map((brand, index) => (
              <BrandCard
                key={`brand-2-${index}`}
                brand={brand}
                index={index}
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
                duplicate
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BrandsCarousel;
