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
    <section id="portfolio" className="relative pt-14 pb-8 md:pt-20 md:pb-10 bg-transparent text-[#1d1d1f]" ref={ref}>
      <AnimatedBackdrop tone="light" />
      <div className="absolute inset-x-0 top-0 h-px bg-black/[0.06] pointer-events-none" />

      <div className="relative z-10">
        {/* ==================== BRANDS SECTION ==================== */}
        <div className="mb-8 sm:mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* ==================== MAIN PORTFOLIO SHOWCASE HEADER ==================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-black/[0.06]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-crimson/10 text-crimson text-xs font-mono font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
                <span>SELECTED WORK // 3D PARALLAX SHOWCASE</span>
              </div>
              <h3 className="font-display text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-[#1d1d1f] leading-[0.95]">
                Work that <span className="text-crimson italic font-serif font-light">delivered.</span>
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="max-w-xs text-xs sm:text-sm text-[#86868b] leading-relaxed">
                Identity systems, packaging architecture, and visual worlds designed for commercial impact.
              </p>
            </div>
          </div>
        </div>

        {/* ==================== PERMANENT 3D PARALLAX SHOWCASE (ADWANTS.IN STYLE) ==================== */}
        {/* Note: Rendered directly without overflow-hidden wrapper so position:sticky pins smoothly */}
        <Parallax3DShowcase
          projects={projects}
          onSelectProject={(item) =>
            onSelectProject ? onSelectProject(item) : setSelectedGridProject(item)
          }
          onNavigateWork={onNavigateWork}
        />

        {/* ==================== COMPLETE CASE ARCHIVE & MANIFESTO FOOTER ==================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32 md:mt-40">
          <div className="p-8 sm:p-12 rounded-3xl apple-card bg-gradient-to-br from-white via-white to-black/[0.02] border border-black/[0.08] text-center space-y-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-crimson/10 text-crimson text-xs font-mono font-semibold">
              <span>●</span> COMPLETE CASE ARCHIVE
            </div>
            <h4 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#1d1d1f]">
              Form meets <span className="text-crimson italic font-serif">commercial velocity.</span>
            </h4>
            <p className="text-sm text-[#86868b] max-w-xl mx-auto leading-relaxed">
              Every system is engineered from raw brand strategy to tactile dieline execution. Explore all 12 commercial and cultural case studies in the complete archive.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  onNavigateWork?.();
                }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-medium tracking-wide uppercase transition-all shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Explore Full 12-Project Archive</span>
                <span className="text-sm group-hover:translate-x-1 transition-transform">↗</span>
              </button>
            </div>
          </div>
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
