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
    <section id="portfolio" className="relative pt-14 pb-0 bg-transparent text-[#1d1d1f]" ref={ref}>
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

        {/* ==================== CINEMATIC DARK STAGE (AUTHENTIC ADWANTS STYLE) ==================== */}
        <div className="w-full bg-[#0a0a0e] text-white pt-20 sm:pt-28 relative overflow-hidden border-t border-black/10">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(186,32,38,0.12)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

          {/* Dark Stage Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 relative z-10 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/70 text-xs font-mono font-semibold shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
              <span>SELECTED WORK // 3D PARALLAX SHOWCASE</span>
            </div>
            <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white leading-[0.95]">
              Work that <span className="text-crimson italic font-serif font-light">delivered.</span>
            </h3>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/60 leading-relaxed font-light">
              Not just design systems that look good in presentations, but brand identities, packaging architectures, and visual worlds engineered for commercial velocity.
            </p>
          </div>

          {/* Permanent 3D Parallax Showcase Runway */}
          <Parallax3DShowcase
            projects={projects}
            onSelectProject={(item) =>
              onSelectProject ? onSelectProject(item) : setSelectedGridProject(item)
            }
            onNavigateWork={onNavigateWork}
          />

          {/* Sleek Adwants-Style Archive CTA Pill Button */}
          <div className="pb-20 sm:pb-28 pt-8 sm:pt-12 flex flex-col items-center justify-center text-center relative z-20 px-4">
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.25em] mb-4">
              Curated commercial systems • Explore all 12 case studies
            </p>
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                onNavigateWork?.();
              }}
              className="flex items-center gap-3 px-8 sm:px-10 py-4 bg-white/10 hover:bg-white text-white hover:text-[#0a0a0e] border border-white/20 rounded-full font-mono text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl group cursor-pointer"
            >
              <span>Explore Full 12-Project Archive</span>
              <span className="text-crimson group-hover:text-[#0a0a0e] group-hover:translate-x-1.5 transition-transform font-bold">↗</span>
            </button>
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
