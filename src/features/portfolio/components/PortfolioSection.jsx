import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_ITEMS, FEATURED_COUNT } from '../data/portfolioData';
import { usePortfolioFilter } from '../hooks/usePortfolioFilter';
import { useIsMobile } from '@/hooks';
import { useCMS } from '@/features/cms';
import BrandsCarousel from './BrandsCarousel';
import FeaturedScrollStack from './FeaturedScrollStack';
import FeaturedProjects from './FeaturedProjects';
import PortfolioFilters from './PortfolioFilters';
import PortfolioGrid from './PortfolioGrid';
import ProjectDetailModal from './ProjectDetailModal';
import { fadeInUp, scaleIn, TRANSITIONS, DELAYS } from '@/animations';
import AnimatedBackdrop from '@/components/AnimatedBackdrop';

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isMobile = useIsMobile();
  const [selectedGridProject, setSelectedGridProject] = useState(null);
  const cms = useCMS();
  const projects = cms.projects && cms.projects.length > 0 ? cms.projects : PORTFOLIO_ITEMS;

  const {
    filter,
    setFilter,
    showAll,
    displayItems,
    featuredItems,
    handleShowAll,
    handleBackToFeatured,
    setShowAll,
  } = usePortfolioFilter(projects, FEATURED_COUNT);

  return (
    <section id="portfolio" className="relative py-20 md:py-32 bg-transparent text-eerie" ref={ref}>
      <AnimatedBackdrop tone="light" />
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
            <span className="hidden md:block text-xs uppercase tracking-[0.14em] text-eerie/45">{projects.length} projects</span>
          </div>
          <div className="flex flex-wrap gap-2 border-y border-eerie/15 py-4">
            <button type="button" onClick={() => { setFilter('all'); setShowAll(true); }} className="topic-link">All work <span>{projects.length}</span></button>
            {['branding', 'packaging', 'posters', 'brochures', 'uiux'].map((topic) => (
              <button key={topic} type="button" onClick={() => { setFilter(topic); setShowAll(true); }} className="topic-link">
                {topic === 'uiux' ? 'UI/UX' : topic} <span>{projects.filter((item) => item.category === topic).length}</span>
              </button>
            ))}
          </div>
        </div>


        {/* ==================== FEATURED PROJECTS SECTION ==================== */}
        <div id="featured-projects" className="w-full">
            {!showAll ? (
              <FeaturedProjects
                items={featuredItems}
                isInView={isInView}
                onViewAll={handleShowAll}
              />
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
                <PortfolioGrid items={displayItems} onSelect={setSelectedGridProject} />

                {/* Back to Featured Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: DELAYS.medium, ...TRANSITIONS.medium }}
                  className="text-center mt-14"
                >
                  <motion.button
                    onClick={handleBackToFeatured}
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-8 py-4 border border-eerie/30 bg-cloud-white text-eerie font-semibold text-sm hover:bg-eerie hover:text-white transition-all shadow-sm cursor-pointer"
                  >
                    <span className="text-lg">←</span>
                    <span>Back to Featured Selection</span>
                  </motion.button>
                </motion.div>

                {/* Modal for Grid Items */}
                <ProjectDetailModal
                  item={selectedGridProject}
                  onClose={() => setSelectedGridProject(null)}
                />
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
