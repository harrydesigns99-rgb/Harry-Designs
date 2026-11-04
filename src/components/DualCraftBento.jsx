import { motion } from 'framer-motion';
import { sound } from '@/utils/audio';

const DualCraftBento = ({ onSelectCategory }) => {
  const handleFilterClick = (catId) => {
    sound.playClick();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('harry_portfolio_set_category', { detail: { category: catId } })
      );
    }
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const workEl = document.getElementById('work');
    if (workEl) {
      workEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="dual-craft"
      className="relative w-full bg-transparent text-[#1e1e20] py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-black/[0.08]">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8b151b] font-bold block mb-2 sm:mb-3">
              ✦ DUAL-DISCIPLINE ARCHITECTURE • 50% BRAND &amp; 50% UI/UX
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#18181b] leading-[1.12]">
              Two Sides of One Craft.
            </h2>
            <p className="mt-4 font-sans text-xs sm:text-base text-[#1e1e20]/75 leading-relaxed font-normal">
              Most design practices isolate the physical brand from the digital product. I operate at the exact convergence point: engineering shelf-dominant brand codes that translate into fluid, human-centered software interfaces.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#1e1e20]/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Dual-Discipline Active Practice</span>
          </div>
        </div>

        {/* 2-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* ========================================================= */}
          {/* CARD 1: SIDE A — THE BRAND ARCHITECT (PHYSICAL & IDENTITY) */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-[#8b151b]/30 transition-colors"
          >
            {/* Subtle Architectural Grid Accent */}
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-25 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(139,21,27,0.15) 1.5px, transparent 1.5px)',
                backgroundSize: '18px 18px',
              }}
            />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold bg-[#8b151b]/10 text-[#8b151b] border border-[#8b151b]/20">
                  SIDE 01 • THE BRAND ARCHITECT
                </span>
                <span className="text-xs font-mono text-[#1e1e20]/40">Shelf &amp; Identity</span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#18181b] leading-tight">
                  Brand Strategy, Visual Identity &amp; Packaging
                </h3>
                <p className="mt-3 font-sans text-xs sm:text-sm text-[#1e1e20]/75 leading-relaxed">
                  Building lasting brand equity through bespoke marks, category shelf audits, CAD dieline engineering, and tactile unboxing rituals.
                </p>
              </div>

              {/* 4 Brand Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#f5f4f0]/70 border border-black/5 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#8b151b]">
                    01 / Identity Suites
                  </span>
                  <p className="text-xs font-sans text-[#1e1e20]/80 leading-snug">
                    Bespoke monograms, tailored typographic lockups, and emblem suites.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f5f4f0]/70 border border-black/5 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#8b151b]">
                    02 / Packaging CAD
                  </span>
                  <p className="text-xs font-sans text-[#1e1e20]/80 leading-snug">
                    Dielines, barrier substrate proofing, debossing &amp; foil stamping.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f5f4f0]/70 border border-black/5 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#8b151b]">
                    03 / Print Calibration
                  </span>
                  <p className="text-xs font-sans text-[#1e1e20]/80 leading-snug">
                    Spot Pantone ink formulation, ISO 12647-2 checks &amp; flexo proofs.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f5f4f0]/70 border border-black/5 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#8b151b]">
                    04 / Shelf Dominance
                  </span>
                  <p className="text-xs font-sans text-[#1e1e20]/80 leading-snug">
                    High-contrast retail audits that win customer attention in 3 seconds.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between relative z-10">
              <span className="text-[11px] font-mono text-[#1e1e20]/50">
                Medium: Physical &bull; Shelf &bull; Paper &bull; Foil
              </span>
              <button
                type="button"
                onClick={() => handleFilterClick('branding')}
                className="px-4 py-2 rounded-full bg-[#1e1e20] hover:bg-[#8b151b] text-white text-xs font-sans font-medium uppercase tracking-wider transition-all cursor-pointer shadow-2xs hover:scale-105"
              >
                Explore Brand Work →
              </button>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 2: SIDE B — THE UI/UX ARCHITECT (DIGITAL & SYSTEMS) */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-indigo-500/40 transition-colors"
          >
            {/* Subtle Technical Grid Accent */}
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-25 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(79,70,229,0.18) 1.5px, transparent 1.5px)',
                backgroundSize: '18px 18px',
              }}
            />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  SIDE 02 • THE UI/UX &amp; PRODUCT ARCHITECT
                </span>
                <span className="text-xs font-mono text-[#1e1e20]/40">Screen &amp; Systems</span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#18181b] leading-tight">
                  Human-Centered Interfaces, Design Systems &amp; UX
                </h3>
                <p className="mt-3 font-sans text-xs sm:text-sm text-[#1e1e20]/75 leading-relaxed">
                  Transforming complex software logic into fluid mobile apps, multi-brand design token systems, and high-conversion user journeys.
                </p>
              </div>

              {/* 4 UI/UX Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#f5f4f0]/70 border border-black/5 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-indigo-600">
                    01 / Design Tokens
                  </span>
                  <p className="text-xs font-sans text-[#1e1e20]/80 leading-snug">
                    Scalable Figma token libraries, component variables &amp; handoff specs.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f5f4f0]/70 border border-black/5 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-indigo-600">
                    02 / Workflow Untangling
                  </span>
                  <p className="text-xs font-sans text-[#1e1e20]/80 leading-snug">
                    Untangling dense multi-step enterprise workflows into zero-friction user journeys.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f5f4f0]/70 border border-black/5 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-indigo-600">
                    03 / Fluid Interactions
                  </span>
                  <p className="text-xs font-sans text-[#1e1e20]/80 leading-snug">
                    Spatial UI rhythm, spring-physics micro-interactions &amp; responsive states.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f5f4f0]/70 border border-black/5 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-indigo-600">
                    04 / Conversion Rigor
                  </span>
                  <p className="text-xs font-sans text-[#1e1e20]/80 leading-snug">
                    Checkout funnel clarity, D1 retention lifts &amp; quantifiable business metrics.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between relative z-10">
              <span className="text-[11px] font-mono text-[#1e1e20]/50">
                Medium: Screen &bull; Figma &bull; iOS/Android &bull; Web
              </span>
              <button
                type="button"
                onClick={() => handleFilterClick('uiux')}
                className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-sans font-medium uppercase tracking-wider transition-all cursor-pointer shadow-2xs hover:scale-105"
              >
                Open Interface Atelier →
              </button>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* BANNER: THE DUAL-DISCIPLINE SUPERPOWER BRIDGE */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-12 rounded-3xl bg-[#1e1e20] text-[#f5f4f0] p-6 sm:p-8 md:p-10 shadow-lg relative overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FC7A69] font-bold">
                  THE DUAL-DISCIPLINE ADVANTAGE
                </span>
                <h4 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-normal">
                  Brand identity gives the product a soul. UI/UX gives the brand usability.
                </h4>
                <p className="font-sans text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
                  Traditional agencies design identities that look great on posters but break in 16px digital interfaces. Isolated product designers build efficient layouts that lack brand emotion. Practicing both guarantees your brand lives cohesively across physical shelf and digital glass.
                </p>
              </div>

              <div className="md:col-span-4 flex flex-wrap md:flex-col items-start md:items-end justify-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-white/10 text-white border border-white/15">
                  50% Brand Strategy
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-white/10 text-white border border-white/15">
                  50% UI/UX Product Design
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#FC7A69]/20 text-[#FC7A69] border border-[#FC7A69]/40">
                  100% Unified Studio Standard
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DualCraftBento;
