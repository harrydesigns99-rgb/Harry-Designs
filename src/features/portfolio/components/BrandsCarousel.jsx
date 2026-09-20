import { useState } from 'react';
import { motion } from 'framer-motion';
import { BRANDS } from '../data/portfolioData';
import { useCMS } from '@/features/cms';
import BrandCard from './BrandCard';
import { CARD_DIMENSIONS } from '@/constants';
import { fadeInUp, TRANSITIONS, DELAYS } from '@/animations';

const BrandsCarousel = ({ isInView }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const cms = useCMS();
  const brands = cms.brands && cms.brands.length > 0 ? cms.brands : BRANDS;

  // Calculate animation distance
  const scrollDistance = (CARD_DIMENSIONS.width + CARD_DIMENSIONS.gap) * brands.length;

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay: DELAYS.small, ...TRANSITIONS.medium }}
      className="relative mb-20 overflow-hidden border-y border-eerie/10 py-2"
    >
      <motion.div
        aria-hidden="true"
        className="absolute -right-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-crimson/10 blur-3xl"
        animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div aria-hidden="true" className="absolute inset-0 opacity-40 [background-image:linear-gradient(90deg,transparent_0%,rgba(18,18,18,0.06)_50%,transparent_100%)] [background-size:24rem_100%]" />
      <div className="relative">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-cloud-dancer to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cloud-dancer to-transparent z-10 pointer-events-none" />

        {/* Scrolling brands container */}
        <div className="flex">
          {/* First set */}
          <motion.div
            animate={{
              x: [0, -scrollDistance],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
            className="flex gap-8 pr-8"
          >
            {brands.map((brand, index) => (
              <BrandCard
                key={`brand-1-${index}`}
                brand={brand}
                index={index}
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
              />
            ))}
          </motion.div>

          {/* Second set (duplicate for seamless loop) */}
          <motion.div
            animate={{
              x: [0, -scrollDistance],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
            className="flex gap-8 pr-8"
          >
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
