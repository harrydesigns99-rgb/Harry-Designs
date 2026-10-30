import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/audio';

const UIArchiveFolder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const containerRef = useRef(null);

  // Screen width breakpoint for mobile vs tablet vs desktop scatter
  const [deviceTier, setDeviceTier] = useState('desktop');

  useEffect(() => {
    const updateTier = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
      if (width < 640) {
        setDeviceTier('mobile');
      } else if (width < 1024) {
        setDeviceTier('tablet');
      } else {
        setDeviceTier('desktop');
      }
    };
    updateTier();
    window.addEventListener('resize', updateTier);
    return () => window.removeEventListener('resize', updateTier);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeCard) {
          setActiveCard(null);
        } else if (isOpen) {
          sound.playClick();
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeCard]);

  const toggleOpen = () => {
    if (!isOpen) {
      sound.playPop();
      setIsOpen(true);
    } else {
      sound.playClick();
      setIsOpen(false);
      setActiveCard(null);
    }
  };

  // Carefully calibrated coordinates per device tier to avoid horizontal overflow on mobile
  const cardCoordinates = {
    mobile: {
      cloudpass: { x: -75, y: -160 },
      aurora: { x: 75, y: -160 },
      dualPhone: { x: -85, y: -10 },
      healthIos: { x: 85, y: -10 },
      orbPhone: { x: -75, y: 140 },
      tokensBar: { x: 0, y: 240 },
    },
    tablet: {
      cloudpass: { x: -170, y: -180 },
      aurora: { x: 170, y: -180 },
      dualPhone: { x: -280, y: 15 },
      healthIos: { x: 280, y: 15 },
      orbPhone: { x: -120, y: 200 },
      tokensBar: { x: 140, y: 210 },
    },
    desktop: {
      cloudpass: { x: -240, y: -220 },
      aurora: { x: 230, y: -220 },
      dualPhone: { x: -420, y: 20 },
      healthIos: { x: 430, y: 20 },
      orbPhone: { x: -170, y: 250 },
      tokensBar: { x: 210, y: 260 },
    },
  }[deviceTier];

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-center select-none transition-all duration-700 ${
        isOpen
          ? 'min-h-[680px] sm:min-h-[840px] lg:min-h-[920px] py-12 sm:py-16'
          : 'min-h-[260px] sm:min-h-[300px] py-8 sm:py-12'
      }`}
    >
      {/* Background hint / instruction banner when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="absolute top-2 sm:top-6 z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.08] text-xs font-sans text-[#1e1e20]/75 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#35804d] animate-pulse" />
            <span>UI Archive &bull; 6 items &bull; <strong>Drag the cards around</strong></span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 6 FLOATING WORK CARDS (BURST OUT INTO POSITION WHEN OPEN) */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 1. TOP-LEFT CARD: CLOUDPASS SKY CARD */}
            <motion.div
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              whileDrag={{ scale: 1.06, zIndex: 60 }}
              initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: cardCoordinates.cloudpass.x,
                y: cardCoordinates.cloudpass.y,
              }}
              exit={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.05 }}
              onClick={() => setActiveCard('cloudpass')}
              className="absolute z-20 w-[125px] sm:w-[150px] lg:w-[170px] aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#70b2f5] via-[#5ca0ec] to-[#458de0] p-3 sm:p-4 text-white shadow-[0_20px_40px_-10px_rgba(69,141,224,0.4)] border border-white/50 cursor-grab active:cursor-grabbing flex flex-col justify-between overflow-hidden group touch-none"
            >
              {/* Top Hanger Punch Hole */}
              <div className="flex flex-col items-center">
                <div className="w-7 h-2 rounded-full bg-white/40 mb-1 border border-white/30" />
                <div className="w-full flex justify-between items-center opacity-85 px-1">
                  <div className="w-8 h-4 rounded-full bg-white/40 blur-[1px]" />
                  <div className="w-10 h-5 rounded-full bg-white/50 blur-[1px]" />
                </div>
              </div>

              {/* Share Icon in Center */}
              <div className="flex flex-col items-center text-center my-auto">
                <div className="w-9 h-9 rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center mb-2 shadow-xs border border-white/40">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </div>
                <p className="text-[10px] sm:text-[11px] font-sans font-medium text-white leading-tight">
                  Share this template with friends
                </p>
              </div>

              {/* White Share Now Pill Button */}
              <button
                type="button"
                className="w-full py-1.5 sm:py-2 rounded-full bg-white text-[#2a68b5] font-sans font-semibold text-[10px] sm:text-[11px] shadow-sm hover:bg-white/90 transition-all text-center"
              >
                Share now
              </button>
            </motion.div>

            {/* 2. MID-LEFT CARD: DUAL-SCREEN PHONE (MESSENGER & COORDINATE PAD) */}
            <motion.div
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              whileDrag={{ scale: 1.06, zIndex: 60 }}
              initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: cardCoordinates.dualPhone.x,
                y: cardCoordinates.dualPhone.y,
              }}
              exit={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.1 }}
              onClick={() => setActiveCard('dual-phone')}
              className="absolute z-20 w-[130px] sm:w-[155px] lg:w-[175px] aspect-[9/18] rounded-[30px] sm:rounded-[36px] bg-[#121214] p-2.5 sm:p-3 text-white shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] border border-white/15 cursor-grab active:cursor-grabbing flex flex-col justify-between overflow-hidden touch-none"
            >
              {/* Top Chat Screen */}
              <div className="flex-1 flex flex-col justify-between p-2 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent">
                <div className="flex justify-between items-center text-[7px] font-mono text-white/40">
                  <span>9:41</span>
                  <span>5G</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                  <p className="text-[9px] font-sans text-white/90 leading-snug">
                    Hey, just making sure we&apos;re still on for tomorrow! Need to know if I should save you a spot in my very important schedule 😅
                  </p>
                  <div className="flex justify-end">
                    <span className="text-[8px] opacity-40">🔊</span>
                  </div>
                </div>
              </div>

              {/* Fold Divider Line */}
              <div className="h-[2px] w-full bg-white/10 my-1" />

              {/* Bottom Screen: Coordinate Matrix */}
              <div className="h-[110px] sm:h-[120px] rounded-2xl bg-[#0a0a0c] border border-white/10 p-2 flex flex-col justify-between relative">
                <div className="text-[7px] font-mono text-center text-white/40 uppercase">Professional</div>
                <div className="absolute inset-0 bg-dot-grid-cream opacity-20 pointer-events-none" />
                <div className="flex justify-between items-center text-[7px] font-mono text-white/40">
                  <span>Concise</span>
                  {/* Glowing Draggable Cursor Token */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] border border-white/60"
                  />
                  <span>Detailed</span>
                </div>
                <div className="text-[7px] font-mono text-center text-white/40 uppercase">Fun</div>
              </div>
            </motion.div>

            {/* 3. BOTTOM-LEFT CARD: 3D HOLOGRAPHIC ORB PHONE */}
            <motion.div
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              whileDrag={{ scale: 1.06, zIndex: 60 }}
              initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: cardCoordinates.orbPhone.x,
                y: cardCoordinates.orbPhone.y,
              }}
              exit={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.14 }}
              onClick={() => setActiveCard('orb-phone')}
              className="absolute z-20 w-[120px] sm:w-[145px] lg:w-[160px] aspect-[9/18] rounded-[28px] sm:rounded-[34px] bg-gradient-to-b from-[#1b1528] via-[#3a203f] to-[#5a2e46] p-2.5 sm:p-3 text-white shadow-[0_24px_50px_-12px_rgba(0,0,0,0.45)] border border-white/20 cursor-grab active:cursor-grabbing flex flex-col justify-between overflow-hidden touch-none"
            >
              {/* Top Text Header */}
              <div className="text-center pt-2 space-y-0.5">
                <p className="text-[7px] sm:text-[8px] font-serif italic text-white/70 leading-tight">
                  The AI agent that networks overtime for you so
                </p>
                <p className="text-[9px] font-serif font-medium text-white leading-tight">
                  You don&apos;t have to
                </p>
              </div>

              {/* 3D Iridescent Liquid Bubble Graphic */}
              <div className="flex items-center justify-center my-auto">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-300 via-rose-400 to-indigo-400 shadow-[0_0_24px_rgba(244,114,182,0.6)] border border-white/60 flex items-center justify-center overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs transform rotate-45 scale-90" />
                </motion.div>
              </div>

              {/* Bottom LinkedIn Auth Button */}
              <div className="space-y-1.5 pb-1">
                <button
                  type="button"
                  className="w-full py-1.5 rounded-full bg-[#0077b5] text-white font-sans font-semibold text-[8px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm"
                >
                  <span>in</span>
                  <span>Continue with LinkedIn</span>
                </button>
                <div className="text-[6px] font-mono text-center text-white/40 underline">
                  OR SIGN AND GO &gt;
                </div>
              </div>
            </motion.div>

            {/* 4. TOP-RIGHT CARD: AURORA DARK HOLOGRAPHIC CARD */}
            <motion.div
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              whileDrag={{ scale: 1.06, zIndex: 60 }}
              initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: cardCoordinates.aurora.x,
                y: cardCoordinates.aurora.y,
              }}
              exit={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.08 }}
              onClick={() => setActiveCard('aurora')}
              className="absolute z-20 w-[125px] sm:w-[150px] lg:w-[170px] aspect-[4/5] rounded-3xl bg-black p-3 sm:p-4 text-white shadow-[0_20px_45px_-10px_rgba(0,0,0,0.6)] border border-white/20 cursor-grab active:cursor-grabbing flex flex-col justify-between overflow-hidden touch-none"
            >
              {/* Top Text Header */}
              <div className="space-y-0.5">
                <div className="text-[7px] font-mono text-white/60">
                  Shriya, your invite is here
                </div>
                <div className="text-sm font-display font-bold tracking-tight text-white flex items-center gap-1">
                  <span>aurora</span>
                  <span className="text-[8px] text-emerald-400">&bull;</span>
                </div>
                <div className="text-[6px] font-mono tracking-widest uppercase text-white/50">
                  NOT EVERYONE GETS TO WITNESS IT
                </div>
              </div>

              {/* Aurora Borealis Liquid Light Swirl */}
              <div className="relative my-auto h-20 w-full flex items-center justify-center overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-teal-400/40 to-transparent blur-md" />
                <motion.div
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-12 h-14 rounded-lg bg-gradient-to-tr from-emerald-400 to-cyan-300 shadow-[0_0_20px_rgba(52,211,153,0.8)] border border-white/40 flex items-center justify-center text-[10px] text-black font-bold rotate-6"
                >
                  PASS
                </motion.div>
              </div>

              {/* Card Footer Tag */}
              <div className="flex items-center justify-between text-[7px] font-mono text-white/40 border-t border-white/10 pt-2">
                <span>VERIFIED VIP</span>
                <span className="text-emerald-400">● LIVE</span>
              </div>
            </motion.div>

            {/* 5. FAR-RIGHT CARD: WHITE HEALTH & FITNESS IPHONE SCREEN */}
            <motion.div
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              whileDrag={{ scale: 1.06, zIndex: 60 }}
              initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: cardCoordinates.healthIos.x,
                y: cardCoordinates.healthIos.y,
              }}
              exit={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.12 }}
              onClick={() => setActiveCard('health-ios')}
              className="absolute z-20 w-[130px] sm:w-[155px] lg:w-[175px] aspect-[9/19] rounded-[30px] sm:rounded-[36px] bg-white p-2.5 sm:p-3 text-black shadow-[0_24px_50px_-12px_rgba(0,0,0,0.22)] border border-black/10 cursor-grab active:cursor-grabbing flex flex-col justify-between overflow-hidden touch-none"
            >
              {/* iOS Top Status */}
              <div className="flex justify-between items-center text-[7px] font-mono text-black/50">
                <span>9:41</span>
                <span>⚡ 100%</span>
              </div>

              {/* Greeting */}
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[8px]">
                    👩
                  </div>
                  <span className="text-[10px] font-bold">Hi, Ana</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[6px] font-semibold">
                  ⚡ 21 days
                </span>
              </div>

              {/* Progress Card */}
              <div className="p-2 rounded-2xl bg-black text-white space-y-1">
                <div className="text-[7px] text-white/70">Great progress today</div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold">84%</span>
                  <span className="text-[6px] text-emerald-400 font-mono">ON TARGET</span>
                </div>
              </div>

              {/* Calorie Check-In */}
              <div className="space-y-1">
                <div className="flex justify-between text-[7px] text-black/60 font-semibold">
                  <span>Calorie check-in</span>
                  <span className="text-black/40">View details</span>
                </div>
                <div className="text-[11px] font-display font-bold">
                  2,100 <span className="text-[8px] font-normal text-black/50">/ 2,600 kcal</span>
                </div>
                {/* 3 Nutrient Pills */}
                <div className="grid grid-cols-3 gap-1">
                  <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-100">
                    <span className="text-[7px] block font-bold text-emerald-800">Protein</span>
                    <span className="text-[7px] text-black/60">140g</span>
                  </div>
                  <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-100">
                    <span className="text-[7px] block font-bold text-emerald-800">Carbs</span>
                    <span className="text-[7px] text-black/60">180g</span>
                  </div>
                  <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-100">
                    <span className="text-[7px] block font-bold text-emerald-800">Fats</span>
                    <span className="text-[7px] text-black/60">65g</span>
                  </div>
                </div>
              </div>

              {/* Light Green Tip Banner */}
              <div className="p-1.5 rounded-xl bg-emerald-100/70 text-emerald-950 text-[7px] leading-tight">
                Try a banana, peanut butter and oats smoothie to close in on 500 kcal.
              </div>

              {/* Bottom iOS Navigation Bar */}
              <div className="flex justify-around items-center pt-1 border-t border-black/5 text-[9px] text-black/40">
                <span>🏠</span>
                <span>📊</span>
                <div className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px]">
                  +
                </div>
                <span>❤️</span>
                <span>🏆</span>
              </div>
            </motion.div>

            {/* 6. BOTTOM-RIGHT CARD: HORIZONTAL 3D TOKENS BAR */}
            <motion.div
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              whileDrag={{ scale: 1.05, zIndex: 60 }}
              initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: cardCoordinates.tokensBar.x,
                y: cardCoordinates.tokensBar.y,
              }}
              exit={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.18 }}
              onClick={() => setActiveCard('3d-tokens')}
              className="absolute z-20 w-[240px] sm:w-[320px] lg:w-[340px] h-[66px] sm:h-[85px] rounded-3xl bg-black p-2.5 sm:p-3 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.55)] border border-white/20 cursor-grab active:cursor-grabbing flex items-center justify-between overflow-hidden touch-none"
            >
              {/* 7 Glowing 3D Tokens */}
              <div className="w-full flex items-center justify-around px-2">
                {/* 1. Wireframe Orb */}
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full border border-cyan-400/60 bg-cyan-950/40 flex items-center justify-center text-[8px] text-cyan-300">
                  🌐
                </div>
                {/* 2. Liquid Emerald */}
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-300 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
                {/* 3. Pastel Lavender Gem */}
                <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-xl bg-gradient-to-tr from-indigo-300 to-pink-300 shadow-[0_0_10px_rgba(244,114,182,0.5)] rotate-12" />
                {/* 4. Pink Metallic Ring */}
                <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full border-4 border-rose-400 bg-transparent shadow-[0_0_10px_rgba(251,113,133,0.6)]" />
                {/* 5. Neon Torus */}
                <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full border-2 border-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.7)]" />
                {/* 6. Chrome Ribbon Sphere */}
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-gradient-to-br from-neutral-200 via-neutral-500 to-black border border-white/50" />
                {/* 7. Dark Planet Sphere */}
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-gradient-to-tr from-blue-900 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* CENTRAL TACTILE FOLDER COMPONENT (ANCHOR IN CENTER) */}
      {/* Exact green folder styling matching user uploaded image */}
      {/* ============================================================ */}
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={toggleOpen}
        data-cursor={isOpen ? 'CLOSE FOLDER ✕' : 'OPEN ARCHIVE 📂'}
        className="group relative flex flex-col items-center cursor-pointer z-30 focus:outline-none"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* The Folder Wrapper */}
        <div className="relative w-[260px] sm:w-[320px] h-[175px] sm:h-[210px] flex items-end justify-center">
          {/* Back Folder Flap with Tab in Studio Lush Green (#35804d) */}
          <div className="absolute inset-x-0 bottom-0 top-3 bg-gradient-to-br from-[#35804d] via-[#2d6f42] to-[#205531] rounded-3xl shadow-[0_16px_36px_-10px_rgba(47,125,73,0.4)] transition-all duration-500 group-hover:shadow-[0_22px_45px_-10px_rgba(47,125,73,0.55)]">
            {/* Folder Tab at Top Left */}
            <div className="absolute -top-3.5 left-4 w-28 h-6 bg-[#35804d] rounded-t-xl" />
          </div>

          {/* Peeking Cards (Only visible when closed) */}
          {!isOpen && (
            <div className="absolute inset-x-4 bottom-7 h-44 flex items-end justify-center pointer-events-none">
              {/* Left card: Aurora Invite */}
              <motion.div
                animate={
                  isHovered
                    ? { y: -38, x: -35, rotate: -14, scale: 1.02 }
                    : { y: -16, x: -24, rotate: -8, scale: 0.95 }
                }
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="absolute w-[120px] sm:w-[135px] aspect-[4/5] rounded-2xl bg-[#0f172a] border border-white/20 p-2.5 shadow-xl overflow-hidden flex flex-col justify-between"
              >
                <div className="text-[10px] font-bold text-white font-display">aurora&reg;</div>
                <div className="w-full h-8 rounded-lg bg-emerald-500/20" />
              </motion.div>

              {/* Right card: Live Chat */}
              <motion.div
                animate={
                  isHovered
                    ? { y: -36, x: 35, rotate: 14, scale: 1.02 }
                    : { y: -14, x: 24, rotate: 8, scale: 0.95 }
                }
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="absolute w-[120px] sm:w-[135px] aspect-[4/5] rounded-2xl bg-[#18181b] border border-white/20 p-2.5 shadow-xl overflow-hidden flex flex-col justify-between"
              >
                <div className="text-[10px] font-bold text-white font-display">Live Chat</div>
                <div className="w-3/4 h-2 rounded bg-white/20" />
              </motion.div>

              {/* Center card: Cloudpass Sky */}
              <motion.div
                animate={
                  isHovered
                    ? { y: -52, rotate: 0, scale: 1.06 }
                    : { y: -24, rotate: 0, scale: 1.0 }
                }
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="absolute w-[128px] sm:w-[145px] aspect-[4/5] rounded-2xl bg-gradient-to-b from-[#60a5fa] to-[#2563eb] border border-white/40 p-2.5 shadow-2xl overflow-hidden flex flex-col justify-between z-10"
              >
                <div className="text-[8px] font-mono text-white/90 uppercase font-semibold">Share Template</div>
                <div className="w-full h-10 rounded-xl bg-white/30 flex items-center justify-center text-[10px] text-white font-bold">
                  Cloudpass
                </div>
                <div className="text-[8px] font-mono text-white/80">✦ TAP TO OPEN</div>
              </motion.div>
            </div>
          )}

          {/* Frosted Translucent Front Pocket with Iridescent Refraction */}
          <div className="relative w-full h-[140px] sm:h-[150px] rounded-3xl bg-gradient-to-b from-white/40 via-emerald-100/25 to-teal-900/15 backdrop-blur-xl border border-white/60 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.18)] overflow-hidden z-20 flex flex-col justify-between p-4 sm:p-5">
            {/* Top Gloss Highlight Line */}
            <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            {/* Specular Diagonal Reflection */}
            <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none transform rotate-12" />

            {/* Folder Header */}
            <div className="flex items-center justify-between z-10">
              <span className="px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest font-semibold bg-white/30 backdrop-blur-md text-[#1e1e20] border border-white/30">
                {isOpen ? 'UNFOLDED' : 'UI ARCHIVE'}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#35804d] animate-pulse" />
            </div>

            {/* Bottom Indicator */}
            <div className="flex items-center justify-between z-10 text-[#1e1e20]/80">
              <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                {isOpen ? 'Click to pack inside ✕' : 'Click to reveal works ↗'}
              </span>
              <span className="text-sm font-bold transition-transform">
                {isOpen ? '✕' : '↗'}
              </span>
            </div>
          </div>
        </div>

        {/* Text Details Beneath Folder matching screenshot exactly */}
        <div className="text-center mt-5 space-y-1">
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1e1e20] group-hover:text-black transition-colors">
            UI archive
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#1e1e20]/60 font-medium">
            {isOpen ? '6 works scattered • Click folder to close' : '6 items'}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UIArchiveFolder;
