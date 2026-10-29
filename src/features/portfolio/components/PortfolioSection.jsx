import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import { useCMS } from '@/features/cms';
import { sound } from '@/utils/audio';
import BrandsCarousel from './BrandsCarousel';
import Parallax3DShowcase from './Parallax3DShowcase';
import ProjectDetailModal from './ProjectDetailModal';
import { fadeInUp, scaleIn, TRANSITIONS } from '@/animations';
import AnimatedBackdrop from '@/components/AnimatedBackdrop';

const PortfolioSection = ({ onSelectProject, onNavigateWork }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedGridProject, setSelectedGridProject] = useState(null);

  const cms = useCMS();
  const projects = cms.projects && cms.projects.length > 0 ? cms.projects : PORTFOLIO_ITEMS;

  return (
    <section id="portfolio" className="relative pt-14 pb-8 md:pt-20 md:pb-12 bg-transparent text-[#1d1d1f]" ref={ref}>
      <AnimatedBackdrop tone="light" />
      <div className="absolute inset-x-0 top-0 h-px bg-black/[0.06] pointer-events-none" />

      <div className="relative z-10">
        {/* ==================== BRANDS SECTION ==================== */}
        <div className="mb-14 sm:mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ ...TRANSITIONS.slow, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 space-y-3"
          >
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={scaleIn}
              transition={TRANSITIONS.medium}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-mono text-[#86868b]"
            >
              <span>●</span>
              <span>SELECTED CLIENTS &amp; PARTNERS</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-[#1d1d1f]">
              Built with <span className="text-gradient">good people.</span>
            </h2>
            <p className="text-base md:text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed">
              A curated selection of brands and forward-looking teams shaped through identity systems, packaging, and design architecture.
            </p>
          </motion.div>

          {/* Infinite Scrolling Brands Carousel */}
          <BrandsCarousel isInView={isInView} />
        </div>

        {/* ==================== SELECTED WORK HEADER ==================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-black/[0.06]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 text-crimson text-xs font-mono font-medium mb-2">
                <span>●</span>
                <span>SELECTED WORK</span>
              </div>
              <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#1d1d1f]">
                Work that <span className="text-crimson italic font-serif font-light">worked.</span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#86868b] max-w-xs">
              Commercial packaging and identity systems engineered for shelf standout.
            </p>
          </div>
        </div>

        {/* ==================== PERMANENT 3D PARALLAX SHOWCASE ==================== */}
        <Parallax3DShowcase
          projects={projects}
          onSelectProject={(item) =>
            onSelectProject ? onSelectProject(item) : setSelectedGridProject(item)
          }
          onNavigateWork={onNavigateWork}
        />

        {/* ==================== SIMPLE & MINIMAL ARCHIVE CTA ==================== */}
        <div className="py-12 sm:py-16 flex justify-center items-center">
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              onNavigateWork?.();
            }}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-medium tracking-wider uppercase transition-all shadow-md hover:shadow-xl cursor-pointer group"
          >
            <span>Explore Full Archive</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">↗</span>
          </button>
        </div>
      </div>

      {/* Modal for project quick preview if opened via internal state */}
      <ProjectDetailModal
        item={selectedGridProject}
        project={selectedGridProject}
        onClose={() => setSelectedGridProject(null)}
      />
    </section>
  );
};

export default PortfolioSection;
