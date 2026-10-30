import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import { useCMS } from '@/features/cms';
import { sound } from '@/utils/audio';
import WordReveal from '@/components/WordReveal';
import UIArchiveFolder from '@/components/UIArchiveFolder';

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'packaging', label: 'Packaging' },
  { id: 'branding', label: 'Brand Identity' },
];

const PortfolioSection = ({ onSelectProject, onNavigateWork }) => {
  const cms = useCMS();
  const allProjects = cms.projects && cms.projects.length > 0 ? cms.projects : PORTFOLIO_ITEMS;

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return allProjects;
    return allProjects.filter((p) => p.category === activeCategory);
  }, [allProjects, activeCategory]);

  return (
    <section
      id="work"
      className="relative w-full bg-transparent text-[#1e1e20] py-24 sm:py-32 md:py-36 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header matching shriyap.com */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-black/[0.08]">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#FC7A69] font-semibold block mb-2">
              Selected Portfolio
            </span>
            <h2 className="font-display text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1e1e20]">
              <WordReveal text="Work I'm proud of" />
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? allProjects.length
                  : allProjects.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playPop();
                    setActiveCategory(cat.id);
                  }}
                  className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-sans transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#1e1e20] text-[#f5f4f0] shadow-sm font-medium'
                      : 'bg-white/80 hover:bg-white text-[#1e1e20]/70 hover:text-[#1e1e20] border border-black/[0.08]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="ml-1.5 opacity-60 text-xs">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Project Grid matching shriyap.com */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  sound.playClick();
                  onSelectProject?.(project);
                }}
                data-cursor="VIEW CASE ↗"
                className="group flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.08] shadow-[0_12px_32px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Media Container */}
                <div className="relative w-full aspect-[16/10] bg-[#1e1e20] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/image/Image Gallery/Artboard 1.webp';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                </div>

                {/* Card Content Footer */}
                <div className="p-5 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    {/* Eyebrow */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FC7A69] font-semibold">
                        {project.category}
                      </span>
                      {project.client && (
                        <>
                          <span className="text-black/30">•</span>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-black/60 font-medium">
                            {project.client}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Card Title */}
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#1e1e20] group-hover:text-black transition-colors">
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="font-sans text-sm sm:text-base text-[#1e1e20]/70 mt-2.5 line-clamp-2 leading-relaxed">
                      {project.description || project.brief || project.approach}
                    </p>
                  </div>

                  {/* CTA Bar */}
                  <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#1e1e20]/50 group-hover:text-[#1e1e20] transition-colors">
                      {project.metric || 'Case Study Available'}
                    </span>

                    {/* Icon CTA Button */}
                    <div className="w-10 h-10 rounded-full bg-[#1e1e20] group-hover:bg-[#FC7A69] text-white flex items-center justify-center transition-all duration-300 shadow-sm group-hover:scale-110">
                      <span className="text-sm font-bold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                        ↗
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Tactile Frosted Glass UI Archive Folder matching shriyap.com */}
        <div className="mt-14 sm:mt-20">
          <UIArchiveFolder onSelectProject={onSelectProject} />
        </div>

        {/* Bottom Full Archive Button */}
        <div className="mt-8 sm:mt-12 flex justify-center px-4">
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              onNavigateWork?.();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#1e1e20] hover:bg-black text-[#f5f4f0] font-sans text-xs sm:text-base font-medium tracking-wide transition-all shadow-md hover:shadow-xl cursor-pointer group"
          >
            <span>Explore Full 12-Project Archive</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
