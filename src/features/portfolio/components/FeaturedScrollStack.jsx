import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile, useIsTablet } from '@/hooks';
import ProjectDetailModal from './ProjectDetailModal';
import {
  createScrollTransforms,
  getResponsiveDimensions,
  SCROLL_STACK_CONFIG,
} from '@/animations/scrollStack';

/**
 * Scroll-driven card component with transforms applied
 */
const ScrollDrivenCard = ({ item, index, totalCards, dimensions, scrollProgress, isMobile, onSelect }) => {
  const Icon = item.icon;
  
  // Create scroll transforms for this card
  const transforms = createScrollTransforms(
    index,
    totalCards,
    dimensions.stackOffset,
    dimensions.scaleDecrement
  );
  
  // Apply scroll-based transformations
  const y = useTransform(
    scrollProgress,
    transforms.y.input,
    transforms.y.output.map((val) => `${val}vh`)
  );
  
  const scale = useTransform(
    scrollProgress,
    transforms.scale.input,
    transforms.scale.output
  );
  
  const opacity = useTransform(
    scrollProgress,
    transforms.opacity.input,
    transforms.opacity.output
  );
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        top: isMobile ? '23%' : '18%', // Adjusted to provide space for the header on both mobile and desktop
        margin: 'auto',
        width: dimensions.cardWidth,
        maxWidth: dimensions.cardMaxWidth,
        height: dimensions.cardHeight,
        y,
        scale,
        opacity,
        zIndex: index + 1,
      }}
      className="will-change-transform"
    >
      <div
        onClick={() => onSelect?.(item)}
        className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group flex flex-col bg-slate-900 cursor-pointer"
      >
        {/* Full Image Background */}
        <div className="absolute inset-0 z-0">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.client}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
              <Icon className="text-8xl text-white/50" />
            </div>
          )}
          
          {/* Enhanced Text Readability Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
        </div>

        {/* Top Metric Badge */}
        {item.metric && (
          <div className="absolute top-5 right-5 z-10">
            <span className="text-[0.65rem] font-bold tracking-wider uppercase px-3 py-1 bg-crimson text-white rounded-full shadow-lg">
              {item.metric}
            </span>
          </div>
        )}
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 text-white">
          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-white/65 mb-2">
            {item.category} / {item.year || '2024'}
          </span>
          <h3 className="font-display text-3xl md:text-5xl font-medium tracking-[-0.05em]">
            {item.client}
          </h3>
          <p className="mt-2 text-sm md:text-base text-white/75">{item.description}</p>
          <span className="mt-3 text-xs uppercase tracking-[0.14em] font-semibold text-crimson-light flex items-center gap-1.5">
            Tap to explore case study →
          </span>
        </div>
        
        {/* Border Glow */}
        <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
      </div>
    </motion.div>
  );
};

/**
 * FeaturedScrollStack Component
 * 
 * Creates a scroll-driven stacking card effect where featured projects
 * stack on top of each other as the user scrolls.
 * 
 * Architecture:
 * 1. Tall container (300vh) - creates scroll distance
 * 2. Sticky viewport (100vh) - cards animate within this fixed view
 * 3. Absolute positioned cards - stacked using transforms
 * 4. useScroll tracks container scroll progress (0-1)
 * 5. useTransform maps scroll → card position/scale/opacity
 * 
 * @param {Array} items - Featured project items to display
 * @param {Function} onViewAll - Callback for "View All" button
 */
const FeaturedScrollStack = ({ items, onViewAll, onSelect }) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [selectedModalItem, setSelectedModalItem] = useState(null);
  
  // Get responsive dimensions
  const dimensions = getResponsiveDimensions(isMobile, isTablet);
  
  // Ref for the tall scroll container
  const containerRef = useRef(null);
  
  // Track scroll progress through the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  
  const totalCards = items.length;

  const handleCardClick = (item) => {
    if (onSelect) {
      onSelect(item);
    } else {
      setSelectedModalItem(item);
    }
  };
  
  return (
    <div className="relative w-full overflow-x-clip">
      {/* Tall scroll container - creates scroll room for animations */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{
          height: isMobile ? '600vh' : SCROLL_STACK_CONFIG.containerHeight,
        }}
      >
        {/* Sticky viewport - LOCKS the view in place */}
        <div
          className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Title Header - Sticky with the cards */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-16 md:top-20 left-0 w-full z-20 text-center px-4 pointer-events-none"
          >
            <h3 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-eerie drop-shadow-lg pt-4 md:pt-0">
              Featured <span className="text-gradient">Projects</span>
            </h3>
            <p className="text-eerie/60 text-xs md:text-base font-medium tracking-wide drop-shadow-md">
              Scroll to explore verified client design systems
            </p>
          </motion.div>

          {/* All cards stacked in same position - animate within locked viewport */}
          <div className="relative w-full h-full flex items-center justify-center">
            {items.map((item, index) => (
              <ScrollDrivenCard
                key={item.id}
                item={item}
                index={index}
                totalCards={totalCards}
                dimensions={dimensions}
                scrollProgress={scrollYProgress}
                isMobile={isMobile}
                onSelect={handleCardClick}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* View All Button - positioned after scroll stack with proper spacing */}
      {onViewAll && (
        <div className="relative z-20 pt-12 pb-24 flex justify-center bg-cloud-dancer">
          <motion.button
            onClick={onViewAll}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-eerie/25 bg-cloud-white text-eerie font-semibold text-base md:text-lg hover:bg-eerie hover:text-white transition-colors cursor-pointer shadow-sm"
          >
            View All {items.length ? '12' : ''} Projects →
          </motion.button>
        </div>
      )}

      {/* Detail Modal for Mobile Stacks */}
      <ProjectDetailModal
        item={selectedModalItem}
        onClose={() => setSelectedModalItem(null)}
      />
    </div>
  );
};

export default FeaturedScrollStack;
