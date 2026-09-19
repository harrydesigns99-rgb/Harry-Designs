import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_ITEMS, FEATURED_COUNT } from '../data/portfolioData';
import { usePortfolioFilter } from '../hooks/usePortfolioFilter';
import { useIsMobile } from '@/hooks';
import BrandsCarousel from './BrandsCarousel';
import FeaturedScrollStack from './FeaturedScrollStack';
import FeaturedProjects from './FeaturedProjects';
import PortfolioFilters from './PortfolioFilters';
import PortfolioGrid from './PortfolioGrid';
import { fadeInUp, scaleIn, TRANSITIONS, DELAYS } from '@/animations';

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isMobile = useIsMobile();

  const {
    filter,
    setFilter,
    showAll,
    displayItems,
    featuredItems,
    handleShowAll,
    handleBackToFeatured,
    setShowAll,
  } = usePortfolioFilter(PORTFOLIO_ITEMS, FEATURED_COUNT);

  return (
    <section id="portfolio" className="relative py-20 md:py-32 bg-cloud-dancer text-eerie" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-white/10 pointer-events-none" />

      <div className="relative z-10">
        
        {/* ==================== BRANDS SECTION ==================== */}
        <div className="mb-8 md:mb-16 container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ ...TRANSITIONS.slow, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12"
            >
              <motion.div
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={scaleIn}
                transition={TRANSITIONS.medium}
                className="inline-block mb-4"
              >
                <span className="section-kicker mb-4">Selected clients</span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-5 text-eerie">
                Built with <span className="text-gradient">good people.</span>
              </h2>
              <p className="text-lg md:text-xl text-eerie/60 max-w-3xl mx-auto">
                A selection of brands and teams I&apos;ve helped shape through identity, packaging, and design.
              </p>
            </motion.div>

            {/* Infinite Scrolling Brands Carousel */}
            <BrandsCarousel isInView={isInView} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-end justify-between gap-6 mb-5">
            <div>
              <span className="section-kicker mb-4">Explore by discipline</span>
              <h3 className="font-display text-3xl md:text-5xl tracking-[-0.05em]">Different formats. One point of view.</h3>
            </div>
            <span className="hidden md:block text-xs uppercase tracking-[0.14em] text-eerie/45">{PORTFOLIO_ITEMS.length} projects</span>
          </div>
          <div className="flex flex-wrap gap-2 border-y border-eerie/15 py-4">
            <button type="button" onClick={() => { setFilter('all'); setShowAll(true); }} className="topic-link">All work <span>{PORTFOLIO_ITEMS.length}</span></button>
            {['branding', 'packaging', 'posters', 'brochures', 'uiux'].map((topic) => (
              <button key={topic} type="button" onClick={() => { setFilter(topic); setShowAll(true); }} className="topic-link">
                {topic === 'uiux' ? 'UI/UX' : topic} <span>{PORTFOLIO_ITEMS.filter((item) => item.category === topic).length}</span>
              </button>
            ))}
          </div>
        </div>


        {/* ==================== FEATURED PROJECTS SECTION ==================== */}
        <div id="featured-projects" className="w-full">
            {/* Featured Section: Stack for Mobile, Grid for Desktop */}
            {!showAll ? (
              isMobile ? (
                <FeaturedScrollStack
                  items={featuredItems}
                  onViewAll={handleShowAll}
                />
              ) : (
                <FeaturedProjects
                  items={featuredItems}
                  isInView={isInView}
                  onViewAll={handleShowAll}
                />
              )
            ) : (
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Grid View Header */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="text-center mb-16"
                >
                  <h3 className="text-2xl md:text-4xl font-bold text-center mb-4 text-eerie">
                    Featured <span className="text-gradient">Projects</span>
                  </h3>
                  <p className="text-center text-eerie/60 mb-8 text-sm md:text-base px-4">
                    Explore all my creative work
                  </p>
                </motion.div>

                {/* Filter Buttons */}
                <PortfolioFilters filter={filter} setFilter={setFilter} />

                {/* Portfolio Grid */}
                <PortfolioGrid items={displayItems} />

                {/* Back to Featured Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: DELAYS.medium, ...TRANSITIONS.medium }}
                  className="text-center mt-12"
                >
                  <motion.button
                    onClick={handleBackToFeatured}
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-8 py-3 glass-effect text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
                  >
                    <span className="text-xl">←</span>
                    <span>Back to Featured</span>
                  </motion.button>
                </motion.div>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
