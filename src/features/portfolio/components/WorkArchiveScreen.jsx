import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_ITEMS, FILTER_BUTTONS } from '../data/portfolioData';
import { useCMS } from '@/features/cms';
import { sound } from '@/utils/audio';
import PortfolioGrid from './PortfolioGrid';
import PortfolioListView from './PortfolioListView';
import AnimatedBackdrop from '@/components/AnimatedBackdrop';

const WorkArchiveScreen = ({ onNavigateHome, onSelectProject }) => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('harry_portfolio_layout');
        if (saved && ['loose', 'grid', 'index'].includes(saved)) {
          return saved;
        }
      } catch {
        // ignore
      }
    }
    return 'grid';
  });

  const cms = useCMS();
  const projects = cms.projects && cms.projects.length > 0 ? cms.projects : PORTFOLIO_ITEMS;

  // Keyboard navigation: Escape to go back to studio home
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onNavigateHome?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNavigateHome]);

  // Filter & search memoized
  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchesCategory = filter === 'all' || item.category === filter;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      const clientMatch = item.client?.toLowerCase().includes(query);
      const titleMatch = item.title?.toLowerCase().includes(query);
      const descMatch = item.description?.toLowerCase().includes(query);
      const categoryMatch = item.category?.toLowerCase().includes(query);
      const deliverMatch = item.deliverables?.toLowerCase().includes(query);
      return clientMatch || titleMatch || descMatch || categoryMatch || deliverMatch;
    });
  }, [projects, filter, searchQuery]);

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] text-[#1d1d1f] relative selection:bg-crimson selection:text-white pb-24">
      <AnimatedBackdrop tone="light" />

      {/* ==================== STICKY APPLE FROSTED GLASS SUB-NAV ==================== */}
      <header className="sticky top-0 z-50 w-full apple-glass border-b border-black/[0.08] backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          {/* Back Pill Button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigateHome?.();
            }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-xs font-mono font-medium text-[#1d1d1f] transition-all cursor-pointer border border-black/[0.05]"
            title="Return to Studio Home [Esc]"
          >
            <span>←</span>
            <span className="hidden sm:inline">Studio Overview</span>
            <span className="sm:hidden">Home</span>
            <span className="hidden md:inline-block text-[10px] text-[#86868b] bg-black/[0.06] px-1.5 py-0.5 rounded">
              Esc
            </span>
          </button>

          {/* Center Monogram / Breadcrumb */}
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-crimson text-[11px] font-bold text-white shadow-xs">
              H
            </span>
            <span className="text-xs sm:text-sm font-mono tracking-tight text-[#1d1d1f] font-semibold">
              HARRY DESIGNS // ARCHIVE
            </span>
          </div>

          {/* Right Action: Inquire CTA */}
          <div className="flex items-center gap-3">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-mono text-[#86868b]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Q3/Q4
            </span>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onNavigateHome?.('contact');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-crimson text-white text-xs font-medium tracking-wide hover:bg-crimson-dark transition-all cursor-pointer shadow-xs"
            >
              <span>Let&apos;s Talk</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </header>

      {/* ==================== HERO SECTION (DZINR-INSPIRED BOLD KEYNOTE) ==================== */}
      <section className="pt-12 sm:pt-20 pb-8 sm:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 border-b border-black/[0.06] pb-10">
          <div className="space-y-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-mono text-[#86868b]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
              <span>COMPLETE PORTFOLIO CATALOG // 2022 — 2025</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-[#1d1d1f] leading-[0.95]"
            >
              Our <span className="text-gradient">Work.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base sm:text-xl text-[#86868b] leading-relaxed max-w-2xl"
            >
              Where strategic positioning turns into packaging architecture, iconic brand identities, and shelf velocity. Complete catalog of client commissions.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2 text-xs font-mono text-[#86868b]"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Chennai, IN • 13°04&apos;N 80°16&apos;E</span>
            </div>
            <span>ISO 12647-2 Certified • Press Supervised</span>
            <span className="px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-[#1d1d1f] font-semibold mt-1">
              {projects.length} Verified Production Systems
            </span>
          </motion.div>
        </div>
      </section>

      {/* ==================== SEARCH & SEGMENTED CONTROLS BAR ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 py-3 border-b border-black/[0.06]">
          {/* Category Segmented Pills */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-black/[0.04] border border-black/[0.05] overflow-x-auto no-scrollbar">
            {FILTER_BUTTONS.map((btn) => {
              const count =
                btn.value === 'all'
                  ? projects.length
                  : projects.filter((item) => item.category === btn.value).length;
              const isActive = filter === btn.value;

              return (
                <button
                  key={btn.value}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setFilter(btn.value);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold'
                      : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  <span>{btn.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-black/[0.08] text-[#1d1d1f]' : 'bg-black/[0.04] text-[#86868b]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box & 3-Way Layout Switcher */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Live Search Input */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients or specs..."
                className="w-full pl-8 pr-7 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-mono text-[#1d1d1f] placeholder-[#86868b] outline-none focus:bg-white focus:border-crimson transition-all"
              />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#86868b] pointer-events-none">
                🔍
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#86868b] hover:text-[#1d1d1f]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Apple 3-Way Layout Switcher */}
            <div className="inline-flex items-center p-1 rounded-full bg-black/[0.04] border border-black/[0.05] text-xs shrink-0">
              <button
                type="button"
                onClick={() => {
                  sound.playSwitch();
                  setLayoutMode('loose');
                  try {
                    localStorage.setItem('harry_portfolio_layout', 'loose');
                  } catch {
                    // ignore
                  }
                }}
                title="Spacious 2-column editorial view"
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  layoutMode === 'loose'
                    ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                ◫ Loose
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playSwitch();
                  setLayoutMode('grid');
                  try {
                    localStorage.setItem('harry_portfolio_layout', 'grid');
                  } catch {
                    // ignore
                  }
                }}
                title="Standard 3-column grid view"
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                ⊞ Grid
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playSwitch();
                  setLayoutMode('index');
                  try {
                    localStorage.setItem('harry_portfolio_layout', 'index');
                  } catch {
                    // ignore
                  }
                }}
                title="Index list view"
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  layoutMode === 'index'
                    ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                ☰ Index
              </button>
            </div>
          </div>
        </div>

        {/* Live Active Query Pill indicator */}
        {(filter !== 'all' || searchQuery) && (
          <div className="flex items-center gap-2 pt-3 text-xs font-mono text-[#86868b]">
            <span>Showing {filteredProjects.length} of {projects.length} projects</span>
            {searchQuery && (
              <span className="px-2 py-0.5 rounded-full bg-crimson/10 text-crimson font-medium">
                Matching: &ldquo;{searchQuery}&rdquo;
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setFilter('all');
                setSearchQuery('');
              }}
              className="underline hover:text-[#1d1d1f] ml-2 cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* ==================== WORK DISPLAY: LOOSE / GRID / INDEX ==================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center apple-card p-10 max-w-xl mx-auto space-y-3"
            >
              <div className="text-3xl">🔍</div>
              <h3 className="font-display text-xl font-medium text-[#1d1d1f]">No matching commissions</h3>
              <p className="text-sm text-[#86868b]">
                No projects matched your criteria. Try resetting the search or category filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setFilter('all');
                  setSearchQuery('');
                }}
                className="mt-2 px-5 py-2 rounded-full bg-crimson text-white text-xs font-medium cursor-pointer shadow-sm hover:bg-crimson-dark"
              >
                Reset to All Work
              </button>
            </motion.div>
          ) : layoutMode === 'index' ? (
            <motion.div
              key="index-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-20"
            >
              <PortfolioListView
                items={filteredProjects}
                onSelect={(item) => onSelectProject?.(item)}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`grid-view-${layoutMode}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-20"
            >
              <PortfolioGrid
                items={filteredProjects}
                onSelect={(item) => onSelectProject?.(item)}
                density={layoutMode}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==================== DZINR-INSPIRED STUDIO CLOSING SECTION ==================== */}
        <section className="mt-24 p-8 sm:p-14 rounded-3xl apple-card bg-gradient-to-b from-white to-[#fbfbfd] border border-black/[0.08] text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 text-crimson text-xs font-mono font-semibold">
            <span>●</span> INITIATE A PROJECT
          </div>
          <h3 className="font-display text-3xl sm:text-5xl font-medium text-[#1d1d1f] tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to build work with commercial momentum?
          </h3>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#86868b] leading-relaxed">
            Whether launching a new SKU line or completely overhauling an existing brand identity, let&apos;s engineer packaging that demands retail shelf space.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onNavigateHome?.('contact');
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-crimson text-white font-medium text-xs tracking-wider uppercase hover:bg-crimson-dark transition-all cursor-pointer shadow-md hover:shadow-lg text-center"
            >
              Inquire About A Commission ↗
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onNavigateHome?.();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-[#1d1d1f] font-medium text-xs tracking-wider uppercase transition-all cursor-pointer border border-black/[0.04] text-center"
            >
              Back to Studio Overview
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WorkArchiveScreen;
