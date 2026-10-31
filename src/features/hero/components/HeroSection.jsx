import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { sound } from '@/utils/audio';
import StudioShuttle from '@/components/StudioShuttle';

const HERO_PILLS = [
  {
    id: 'architect',
    label: 'Hariharan S',
    tag: 'FOUNDER & LEAD',
    photo: '/image/hariharan.jpg',
    badge: 'HARIHARAN S',
    subtitle: 'Brand & Packaging Designer',
    meta: 'Chennai, India • Global Remote',
  },
  {
    id: 'designs',
    label: '50+ Designs Completed',
    tag: 'PRODUCTION RIGOR',
    photo: '/image/Image Gallery/Artboard 2.webp',
    badge: '50+ DESIGNS COMPLETED',
    subtitle: 'Print-Ready Packaging Systems',
    meta: '12+ Retail Lines • Press Supervised',
  },
  {
    id: 'clients',
    label: '12+ Client Brands',
    tag: 'COMMERCIAL REACH',
    photo: '/image/Image Gallery/Artboard 1.webp',
    badge: '12+ CLIENT BRANDS',
    subtitle: 'Gokul Oils • Sendra • CSIR',
    meta: 'Commercial Velocity & Shelf Dominance',
  },
];

const DISCIPLINE_TAGS = [
  'Brand Identity',
  'Packaging Systems',
  'Print & Production',
  'Art Direction',
  '3D Visualization',
];

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeItem = HERO_PILLS[activeTab];

  // 3D Card tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 10,
      y: (x / (rect.width / 2)) * 10,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleScrollCue = () => {
    sound.playClick();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="introduction"
      className="relative min-h-[100svh] w-full bg-transparent text-[#1e1e20] flex flex-col items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 px-3.5 sm:px-6 overflow-hidden select-none"
    >
      {/* Floating Studio Telemetry Shuttle (Draggable HUD Capsule in Viewport) */}
      <StudioShuttle />

      {/* Eyebrow matching shriyap.com */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-[#FC7A69] font-semibold mb-4 sm:mb-6 text-center"
      >
        MY FORMULA FOR GREAT WORK
      </motion.p>

      {/* Main 3-line Headline with High-End Kinetic Text Reveal */}
      <div className="w-full max-w-5xl lg:max-w-6xl mx-auto text-center mb-8 sm:mb-12 px-2">
        <h1 className="font-display text-[1.85rem] xs:text-3xl sm:text-5xl md:text-[3.5rem] lg:text-[4.2rem] xl:text-[4.6rem] font-bold tracking-tight text-[#1e1e20] leading-[1.12] sm:leading-[1.06]">
          {/* Line 1: A sharp brand strategy. */}
          <span className="block overflow-hidden py-0.5 sm:py-1">
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block sm:whitespace-nowrap"
            >
              A sharp brand strategy.
            </motion.span>
          </span>

          {/* Line 2: A stubborn shelf. */}
          <span className="block overflow-hidden py-0.5 sm:py-1">
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block sm:whitespace-nowrap text-[#1e1e20]/85"
            >
              A stubborn shelf.
            </motion.span>
          </span>

          {/* Line 3: A little room to disrupt the aisle. */}
          <span className="block overflow-hidden py-0.5 sm:py-1">
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              <span className="text-[#1e1e20]/75">
                A little room to&nbsp;
              </span>
              <span className="whitespace-nowrap font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#8b151b] via-[#FC7A69] to-[#8b151b] hover:from-[#FC7A69] hover:to-[#8b151b] transition-all duration-300">
                disrupt the aisle.
              </span>
            </motion.span>
          </span>
        </h1>
      </div>

      {/* Clean Interactive Switcher Pills (Single Uncluttered Row) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 mb-8 sm:mb-14 z-20 px-2"
      >
        {HERO_PILLS.map((pill, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={pill.id}
              onClick={() => {
                sound.playPop();
                setActiveTab(idx);
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-[#1e1e20] text-[#f5f4f0] shadow-md scale-105'
                  : 'bg-white/85 hover:bg-white text-[#1e1e20]/75 hover:text-[#1e1e20] border border-black/[0.08] shadow-xs'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  isActive ? 'bg-[#FC7A69] animate-pulse' : 'bg-black/20'
                }`}
              />
              <span className="font-medium">{pill.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* 3D Depth Card Stage (`g-stage`) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative perspective-[1200px] z-10 mb-8 sm:mb-12"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.15s ease-out',
            transformStyle: 'preserve-3d',
          }}
          className="relative w-[260px] sm:w-[320px] aspect-[280/408] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#2b2d33] border border-black/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] cursor-pointer group select-none"
        >
          {/* Card Image */}
          <motion.img
            key={activeItem.id}
            src={activeItem.photo}
            alt={activeItem.badge}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

          {/* Top Tag */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold bg-black/60 backdrop-blur-md text-white border border-white/15">
              {activeItem.tag}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#FC7A69] animate-pulse" />
          </div>

          {/* Bottom Card Title & Subtitle */}
          <div className="absolute inset-x-0 bottom-0 p-5 text-white flex flex-col justify-end z-10 pointer-events-none">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#FC7A69] font-semibold">
              {activeItem.badge}
            </span>
            <h4 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white mt-0.5 line-clamp-1">
              {activeItem.subtitle}
            </h4>
            <p className="text-xs text-white/70 font-sans mt-0.5 line-clamp-1">
              {activeItem.meta}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Simplified Discipline Tag Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="w-full max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 z-10 mb-8 sm:mb-12 px-2"
      >
        {DISCIPLINE_TAGS.map((tag) => (
          <span
            key={tag}
            className="px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-sans font-medium bg-white/75 hover:bg-white text-[#1e1e20]/80 border border-black/[0.06] shadow-2xs transition-all hover:scale-105"
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Scroll Cue at Bottom */}
      <button
        type="button"
        onClick={handleScrollCue}
        aria-label="Scroll to about section"
        className="group flex flex-col items-center gap-2 cursor-pointer z-20 transition-opacity hover:opacity-100"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[#1e1e20]/40 group-hover:border-[#1e1e20] flex items-start justify-center p-1.5 transition-colors">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-[#1e1e20]"
          />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#1e1e20]/50 group-hover:text-[#1e1e20] transition-colors">
          SCROLL
        </span>
      </button>
    </section>
  );
};

export default HeroSection;
