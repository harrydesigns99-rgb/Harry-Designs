import { motion } from 'framer-motion';
import { sound } from '@/utils/audio';

const BRAND_DISCIPLINES = [
  { no: '01', title: 'Brand Identity Systems', cat: 'branding' },
  { no: '02', title: 'Packaging & Label Design', cat: 'packaging' },
  { no: '03', title: 'Print & Marketing Collateral', cat: 'brochures' },
  { no: '04', title: 'Brand Guidelines & Strategy', cat: 'branding' },
];

const UIUX_DISCIPLINES = [
  { no: '01', title: 'User-Centred Product Design', cat: 'uiux' },
  { no: '02', title: 'UI Design & Responsive Layouts', cat: 'uiux' },
  { no: '03', title: 'Design Systems & Component Tokens', cat: 'uiux' },
  { no: '04', title: 'Interactive Prototyping & Flows', cat: 'uiux' },
];

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
      className="relative w-full bg-transparent text-[#1e1e20] py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14 pb-6 border-b border-black/[0.08]">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#8b151b] font-semibold block mb-2 sm:mb-3">
              ✦ DUAL CRAFT • BRAND &amp; UI/UX
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#18181b] leading-[1.15]">
              Two Sides of One Craft.
            </h2>
            <p className="mt-3 font-sans text-xs sm:text-sm text-[#1e1e20]/75 leading-relaxed font-normal">
              Connecting shelf-dominant packaging and strategic brand codes into fluid, human-centered software interfaces.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#1e1e20]/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Dual-Discipline Active Practice</span>
          </div>
        </div>

        {/* 2-Column Minimal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* ========================================================= */}
          {/* CARD 1: SIDE 01 • BRAND & PACKAGING */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-white/85 backdrop-blur-xs border border-black/[0.08] p-6 sm:p-9 shadow-[0_12px_36px_-16px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:border-[#b91c1c]/40 transition-colors"
          >
            <div>
              {/* Header Label */}
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] font-semibold text-[#b91c1c] tracking-wider uppercase">
                  SIDE 01 // BRAND DESIGN
                </span>
                <span className="font-mono text-[11px] text-black/40">
                  Identity &amp; Packaging
                </span>
              </div>

              {/* Title & Concise Subtitle */}
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181b] mt-4 leading-tight">
                Brand Identity &amp; Packaging
              </h3>
              <p className="mt-2 text-xs sm:text-sm font-sans text-[#1e1e20]/70 leading-relaxed">
                Strategic visual identities, shelf-dominant packaging, and cohesive print collateral.
              </p>

              {/* Minimal Disciplines List */}
              <div className="mt-7 border-t border-black/[0.07]">
                {BRAND_DISCIPLINES.map((item) => (
                  <button
                    key={item.no}
                    type="button"
                    onClick={() => handleFilterClick(item.cat)}
                    className="group/item w-full flex items-center justify-between py-3 sm:py-3.5 border-b border-black/[0.06] text-left transition-colors cursor-pointer hover:bg-black/[0.015]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-black/35 group-hover/item:text-[#b91c1c] transition-colors">
                        {item.no}
                      </span>
                      <span className="font-sans text-xs sm:text-sm font-medium text-[#1e1e20]/90 group-hover/item:text-black group-hover/item:translate-x-0.5 transition-all">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-xs text-black/25 group-hover/item:text-[#b91c1c] group-hover/item:translate-x-0.5 transition-all">
                      ↗
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-7 mt-3 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => handleFilterClick('branding')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e1e20] hover:bg-[#8b151b] text-white text-xs font-sans font-medium tracking-wide transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
              >
                <span>Explore Brand Work</span>
                <span>→</span>
              </button>
              <span className="font-mono text-[10px] sm:text-[11px] text-black/40">
                35+ Systems Delivered
              </span>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 2: SIDE 02 • DIGITAL & UI/UX */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-white/85 backdrop-blur-xs border border-black/[0.08] p-6 sm:p-9 shadow-[0_12px_36px_-16px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:border-indigo-400/50 transition-colors"
          >
            <div>
              {/* Header Label */}
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] font-semibold text-[#4338ca] tracking-wider uppercase">
                  SIDE 02 // UI/UX DESIGN
                </span>
                <span className="font-mono text-[11px] text-black/40">
                  Product &amp; Systems
                </span>
              </div>

              {/* Title & Concise Subtitle */}
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181b] mt-4 leading-tight">
                Digital Products &amp; UI/UX
              </h3>
              <p className="mt-2 text-xs sm:text-sm font-sans text-[#1e1e20]/70 leading-relaxed">
                Intuitive software interfaces, scalable design tokens, and human-centered workflows.
              </p>

              {/* Minimal Disciplines List */}
              <div className="mt-7 border-t border-black/[0.07]">
                {UIUX_DISCIPLINES.map((item) => (
                  <button
                    key={item.no}
                    type="button"
                    onClick={() => handleFilterClick(item.cat)}
                    className="group/item w-full flex items-center justify-between py-3 sm:py-3.5 border-b border-black/[0.06] text-left transition-colors cursor-pointer hover:bg-black/[0.015]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-black/35 group-hover/item:text-[#4338ca] transition-colors">
                        {item.no}
                      </span>
                      <span className="font-sans text-xs sm:text-sm font-medium text-[#1e1e20]/90 group-hover/item:text-black group-hover/item:translate-x-0.5 transition-all">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-xs text-black/25 group-hover/item:text-[#4338ca] group-hover/item:translate-x-0.5 transition-all">
                      ↗
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-7 mt-3 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => handleFilterClick('uiux')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3b49e6] hover:bg-[#2d3ac9] text-white text-xs font-sans font-medium tracking-wide transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
              >
                <span>Explore UI/UX Work</span>
                <span>→</span>
              </button>
              <span className="font-mono text-[10px] sm:text-[11px] text-black/40">
                Figma &amp; Production Rigor
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DualCraftBento;
