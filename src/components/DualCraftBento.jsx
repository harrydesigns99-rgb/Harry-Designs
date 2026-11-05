import { motion } from 'framer-motion';
import { sound } from '@/utils/audio';
import {
  LuPenTool,
  LuPackage,
  LuBookOpen,
  LuLayers,
  LuUsers,
  LuCreditCard,
  LuBox,
  LuMousePointerClick,
} from 'react-icons/lu';

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
            <p className="mt-3 sm:mt-4 font-sans text-xs sm:text-base text-[#1e1e20]/75 leading-relaxed font-normal">
              <span className="sm:hidden">
                Bridging physical packaging and brand codes into fluid, human-centered software interfaces.
              </span>
              <span className="hidden sm:inline">
                Most design practices isolate the physical brand from the digital product. I operate at the exact convergence point: engineering shelf-dominant brand codes that translate into fluid, human-centered software interfaces.
              </span>
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
          {/* CARD 1: SIDE 01 • THE BRAND DESIGNER */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-3xl bg-white border border-[#f87171]/35 p-6 sm:p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-[#8b151b]/40 transition-colors"
          >
            {/* Subtle Architectural Dot Pattern Accent */}
            <div
              className="absolute inset-0 opacity-[0.22] pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(185,28,28,0.2) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />

            <div className="space-y-6 relative z-10">
              {/* Header Pill & Subtitle */}
              <div className="flex items-center justify-between gap-3">
                <span className="px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-bold bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5]/60 shadow-2xs">
                  SIDE 01 • THE BRAND DESIGNER
                </span>
                <span className="text-xs font-mono text-[#1e1e20]/50 tracking-tight">
                  Identity &amp; Communication
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#18181b] leading-[1.2]">
                  Brand Identity, Packaging &amp; Visual Communication
                </h3>
                <p className="mt-3 font-sans text-xs sm:text-sm text-[#1e1e20]/75 leading-relaxed hidden sm:block">
                  Building distinctive brand experiences through strategic visual identities, thoughtful packaging, impactful print designs, and cohesive brand communication.
                </p>
              </div>

              {/* 4 Brand Pillars (2x2 Grid with icons) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
                {/* 01 / BRAND IDENTITY SYSTEMS */}
                <div className="p-3 sm:p-4.5 rounded-2xl bg-[#faf9f5] border border-black/[0.05] flex items-center sm:items-start gap-3 sm:gap-3.5 hover:bg-[#f5f4ee] transition-colors">
                  <div className="text-[#b91c1c] w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <LuPenTool className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#b91c1c] block">
                      01 / BRAND IDENTITY SYSTEMS
                    </span>
                    <p className="text-xs sm:text-[13px] font-sans text-[#1e1e20]/80 leading-relaxed hidden sm:block">
                      Distinctive logos, visual languages, typography, colour systems, and cohesive brand guidelines.
                    </p>
                  </div>
                </div>

                {/* 02 / PACKAGING DESIGN */}
                <div className="p-3 sm:p-4.5 rounded-2xl bg-[#faf9f5] border border-black/[0.05] flex items-center sm:items-start gap-3 sm:gap-3.5 hover:bg-[#f5f4ee] transition-colors">
                  <div className="text-[#b91c1c] w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <LuPackage className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#b91c1c] block">
                      02 / PACKAGING DESIGN
                    </span>
                    <p className="text-xs sm:text-[13px] font-sans text-[#1e1e20]/80 leading-relaxed hidden sm:block">
                      Creative packaging concepts, label design, product visualisation, and production-ready artwork.
                    </p>
                  </div>
                </div>

                {/* 03 / PRINT & COLLATERAL DESIGN */}
                <div className="p-3 sm:p-4.5 rounded-2xl bg-[#faf9f5] border border-black/[0.05] flex items-center sm:items-start gap-3 sm:gap-3.5 hover:bg-[#f5f4ee] transition-colors">
                  <div className="text-[#b91c1c] w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <LuBookOpen className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#b91c1c] block">
                      03 / PRINT &amp; COLLATERAL DESIGN
                    </span>
                    <p className="text-xs sm:text-[13px] font-sans text-[#1e1e20]/80 leading-relaxed hidden sm:block">
                      Brochures, company profiles, catalogues, stationery, and marketing materials.
                    </p>
                  </div>
                </div>

                {/* 04 / BRAND COMMUNICATION */}
                <div className="p-3 sm:p-4.5 rounded-2xl bg-[#faf9f5] border border-black/[0.05] flex items-center sm:items-start gap-3 sm:gap-3.5 hover:bg-[#f5f4ee] transition-colors">
                  <div className="text-[#b91c1c] w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <LuLayers className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#b91c1c] block">
                      04 / BRAND COMMUNICATION
                    </span>
                    <p className="text-xs sm:text-[13px] font-sans text-[#1e1e20]/80 leading-relaxed hidden sm:block">
                      Consistent visual storytelling across campaigns, promotional materials, and brand touchpoints.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <span className="text-[11px] font-mono text-[#1e1e20]/50 tracking-tight hidden sm:inline">
                Medium: Identity &bull; Packaging &bull; Print &bull; Digital
              </span>
              <button
                type="button"
                onClick={() => handleFilterClick('branding')}
                className="px-5 py-2.5 rounded-full bg-[#1e1e20] hover:bg-[#8b151b] text-white text-xs font-sans font-medium uppercase tracking-wider transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
              >
                EXPLORE BRAND WORK →
              </button>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 2: SIDE 02 • THE DIGITAL EXPERIENCE DESIGNER */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-3xl bg-white border border-[#6366f1]/35 p-6 sm:p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-indigo-500/50 transition-colors"
          >
            {/* Subtle Digital Dot Pattern Accent */}
            <div
              className="absolute inset-0 opacity-[0.22] pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(99,102,241,0.2) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />

            <div className="space-y-6 relative z-10">
              {/* Header Pill & Subtitle */}
              <div className="flex items-center justify-between gap-3">
                <span className="px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-bold bg-[#e0e7ff] text-[#4338ca] border border-[#c7d2fe] shadow-2xs">
                  SIDE 02 • THE DIGITAL EXPERIENCE DESIGNER
                </span>
                <span className="text-xs font-mono text-[#1e1e20]/50 tracking-tight">
                  Product &amp; Experience
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#18181b] leading-[1.2]">
                  User-Centred Design, Interfaces &amp; Digital Experiences
                </h3>
                <p className="mt-3 font-sans text-xs sm:text-sm text-[#1e1e20]/75 leading-relaxed hidden sm:block">
                  Creating intuitive digital experiences through user-focused layouts, clean visual systems, meaningful iconography, and seamless interactions.
                </p>
              </div>

              {/* 4 UI/UX Pillars (2x2 Grid with icons) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
                {/* 01 / USER-CENTRED DESIGN */}
                <div className="p-3 sm:p-4.5 rounded-2xl bg-[#faf9f5] border border-black/[0.05] flex items-center sm:items-start gap-3 sm:gap-3.5 hover:bg-[#f5f4ee] transition-colors">
                  <div className="text-[#4338ca] w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <LuUsers className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#4338ca] block">
                      01 / USER-CENTRED DESIGN
                    </span>
                    <p className="text-xs sm:text-[13px] font-sans text-[#1e1e20]/80 leading-relaxed hidden sm:block">
                      Understanding user needs and translating them into intuitive, accessible, and purposeful experiences.
                    </p>
                  </div>
                </div>

                {/* 02 / UI DESIGN & LAYOUTS */}
                <div className="p-3 sm:p-4.5 rounded-2xl bg-[#faf9f5] border border-black/[0.05] flex items-center sm:items-start gap-3 sm:gap-3.5 hover:bg-[#f5f4ee] transition-colors">
                  <div className="text-[#4338ca] w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <LuCreditCard className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#4338ca] block">
                      02 / UI DESIGN &amp; LAYOUTS
                    </span>
                    <p className="text-xs sm:text-[13px] font-sans text-[#1e1e20]/80 leading-relaxed hidden sm:block">
                      Clean interfaces, structured layouts, visual hierarchy, typography, and consistent design patterns.
                    </p>
                  </div>
                </div>

                {/* 03 / ICONOGRAPHY & DESIGN SYSTEMS */}
                <div className="p-3 sm:p-4.5 rounded-2xl bg-[#faf9f5] border border-black/[0.05] flex items-center sm:items-start gap-3 sm:gap-3.5 hover:bg-[#f5f4ee] transition-colors">
                  <div className="text-[#4338ca] w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <LuBox className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#4338ca] block">
                      03 / ICONOGRAPHY &amp; DESIGN SYSTEMS
                    </span>
                    <p className="text-xs sm:text-[13px] font-sans text-[#1e1e20]/80 leading-relaxed hidden sm:block">
                      Custom icon sets, reusable components, scalable design systems, and consistent visual languages.
                    </p>
                  </div>
                </div>

                {/* 04 / INTERACTION & PROTOTYPING */}
                <div className="p-3 sm:p-4.5 rounded-2xl bg-[#faf9f5] border border-black/[0.05] flex items-center sm:items-start gap-3 sm:gap-3.5 hover:bg-[#f5f4ee] transition-colors">
                  <div className="text-[#4338ca] w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <LuMousePointerClick className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#4338ca] block">
                      04 / INTERACTION &amp; PROTOTYPING
                    </span>
                    <p className="text-xs sm:text-[13px] font-sans text-[#1e1e20]/80 leading-relaxed hidden sm:block">
                      Interactive prototypes, intuitive navigation, responsive experiences, and seamless user journeys.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <span className="text-[11px] font-mono text-[#1e1e20]/50 tracking-tight hidden sm:inline">
                Medium: Figma &bull; Web &bull; Mobile &bull; Digital Products
              </span>
              <button
                type="button"
                onClick={() => handleFilterClick('uiux')}
                className="px-5 py-2.5 rounded-full bg-[#3b49e6] hover:bg-[#2d3ac9] text-white text-xs font-sans font-medium uppercase tracking-wider transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
              >
                EXPLORE UI/UX WORK →
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
