import { useRef, useState, useEffect, useMemo, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sound } from '@/utils/audio';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';

/**
 * ShowcaseCard component representing an individual project in 3D parallax space
 * Optimized with 16:10 aspect ratio and responsive scaling to ensure 2 rows
 * fit entirely inside the viewport without overlapping the floating navbar or bottom pill.
 */
const ShowcaseCard = memo(({ project, onSelect }) => {
  return (
    <div
      onClick={() => {
        sound.playClick();
        onSelect?.(project);
      }}
      className="group relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden bg-[#16161a] border border-white/10 shadow-[0_16px_45px_-15px_rgba(0,0,0,0.65)] cursor-pointer transform-gpu transition-all duration-500 hover:shadow-[0_24px_60px_-10px_rgba(186,32,38,0.45)] hover:border-crimson/50 hover:-translate-y-1.5 select-none"
    >
      {/* High-Resolution Project Artwork */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
      />

      {/* Dark Cinematic Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15 opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

      {/* Top Floating Badges */}
      <div className="absolute top-2.5 sm:top-3 inset-x-2.5 sm:inset-x-3 flex items-center justify-between pointer-events-none z-10">
        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-semibold bg-black/60 backdrop-blur-md text-white border border-white/15 shadow-sm">
          {project.category}
        </span>
        {project.metric && (
          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-crimson backdrop-blur-md text-white border border-white/20 shadow-sm">
            {project.metric}
          </span>
        )}
      </div>

      {/* Bottom Content Information Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-5 text-white flex flex-col justify-end z-10">
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-crimson font-semibold">
          {project.client}
        </span>
        <h4 className="font-display text-xs sm:text-base md:text-lg lg:text-xl font-medium tracking-tight text-white group-hover:text-white transition-colors mt-0.5 line-clamp-1">
          {project.title}
        </h4>
        <p className="text-[10px] sm:text-xs text-white/70 line-clamp-1 mt-0.5 font-normal hidden sm:block">
          {project.description || project.approach}
        </p>

        {/* Action Link Revealed on Hover */}
        <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-crimson font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Explore Case Study</span>
          <span className="group-hover:translate-x-1.5 transition-transform">→</span>
        </div>
      </div>
    </div>
  );
});

ShowcaseCard.displayName = 'ShowcaseCard';

/**
 * Parallax3DShowcase Component
 * Permanent 3D Parallax Showcase modeled after adwants.in:
 * - Oblique 3D perspective scroll runway that stays pinned on the screen.
 * - Parallax counter-glide across 3 columns.
 * - Smoothly unwinds and settles into a crystal-clear 2D grid view of all 6 projects from 65% to 100% of runway.
 * - Scaled and padded so 2 rows sit completely clear of the floating navbar and screen borders.
 */
const Parallax3DShowcase = ({ projects = [], onSelectProject }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll position through the sticky showcase runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 1. Perspective Rotations:
  // Starts in 3D tilted space, unwinds to 0deg by 0.65 progress, and stays perfectly flat in 2D view from 0.65 to 1.0
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [isMobile ? 16 : 40, 0, 0]
  );
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [isMobile ? -4 : -12, 0, 0]
  );

  // 2. Perspective Scale:
  // Starts dramatically zoomed in (1.65 desktop / 1.25 mobile), scales down to fit all 6 cards
  // perfectly in the safe viewport area (0.70 desktop / 0.90 mobile) at 0.65 and stays locked flat until 1.0
  const scale = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [isMobile ? 1.25 : 1.65, isMobile ? 0.90 : 0.70, isMobile ? 0.90 : 0.70]
  );

  // 3. Subtle vertical center adjustment
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    ['2%', '0%', '0%']
  );

  // 4. Subtle fade in
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.92, 1],
    [0.75, 1, 1, 1]
  );

  // 5. Parallax Column Shifts:
  // Column 1 and 3 slide down to 0, Column 2 glides up to 0 (counter-direction).
  // All reach 0 at progress 0.65, perfectly locking the 2 rows of 3 columns into a flat 2D grid.
  const col1Y = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [isMobile ? 35 : 100, 0, 0]
  );
  const col2Y = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [isMobile ? -35 : -120, 0, 0]
  );
  const col3Y = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [isMobile ? 50 : 150, 0, 0]
  );

  // 6. Settled 2D View Pill Indicator (fades in when 2D view is reached)
  const settledPillOpacity = useTransform(scrollYProgress, [0, 0.6, 0.68, 1], [0, 0, 1, 1]);
  const settledPillY = useTransform(scrollYProgress, [0, 0.6, 0.68, 1], [12, 12, 0, 0]);

  // Take exactly 6 projects for the permanent curated showcase (2 rows of 3 columns)
  const items = useMemo(() => {
    const list = projects && projects.length > 0 ? projects : PORTFOLIO_ITEMS;
    return list.slice(0, 6);
  }, [projects]);

  // Distribute into 3 columns so Row 1 is items[0..2] and Row 2 is items[3..5]:
  // Column 1: [items[0], items[3]]
  // Column 2: [items[1], items[4]]
  // Column 3: [items[2], items[5]]
  const col1 = [items[0], items[3]].filter(Boolean);
  const col2 = [items[1], items[4]].filter(Boolean);
  const col3 = [items[2], items[5]].filter(Boolean);

  return (
    <div className="w-full relative">
      {/* Scroll Runway giving the physical height to scroll through */}
      <div
        ref={containerRef}
        className={`${isMobile ? 'h-[190vh]' : 'h-[280vh] md:h-[300vh]'} relative`}
      >
        {/* Sticky 3D Viewport pinned to screen during scroll runway */}
        {/* Safe padding pt-16 sm:pt-20 pb-14 sm:pb-16 guarantees clear separation from Navbar and bottom */}
        <div
          className={`sticky top-0 ${
            isMobile ? 'h-[100dvh]' : 'h-screen'
          } w-full overflow-hidden flex flex-col items-center justify-center pt-16 sm:pt-20 pb-14 sm:pb-16 px-2 sm:px-4`}
          style={{ perspective: '2000px' }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,37,69,0.06)_0%,transparent_65%)] pointer-events-none" />

          {/* 3D Tilted Plane containing 3 Parallax Columns (settles into flat 2D grid) */}
          <motion.div
            style={{
              rotateX,
              rotateZ,
              scale,
              y: translateY,
              opacity,
              transformStyle: 'preserve-3d',
            }}
            className={`flex gap-3 sm:gap-4 md:gap-5 ${
              isMobile ? 'w-[96vw]' : 'w-[115vw] md:w-[108vw]'
            } max-w-[1550px] mx-auto px-2 sm:px-4 transform-gpu`}
          >
            {/* Column 1 */}
            <motion.div style={{ y: col1Y }} className="flex flex-col gap-3 sm:gap-4 md:gap-5 w-1/3">
              {col1.map((p) => (
                <ShowcaseCard key={`col1-${p.id}`} project={p} onSelect={onSelectProject} />
              ))}
            </motion.div>

            {/* Column 2 (Counter-direction parallax glide) */}
            <motion.div style={{ y: col2Y }} className="flex flex-col gap-3 sm:gap-4 md:gap-5 w-1/3">
              {col2.map((p) => (
                <ShowcaseCard key={`col2-${p.id}`} project={p} onSelect={onSelectProject} />
              ))}
            </motion.div>

            {/* Column 3 */}
            <motion.div style={{ y: col3Y }} className="flex flex-col gap-3 sm:gap-4 md:gap-5 w-1/3">
              {col3.map((p) => (
                <ShowcaseCard key={`col3-${p.id}`} project={p} onSelect={onSelectProject} />
              ))}
            </motion.div>
          </motion.div>

          {/* Floating Pill: Fades in when 2D view is reached with clear breathing room below cards */}
          <motion.div
            style={{ opacity: settledPillOpacity, y: settledPillY }}
            className="absolute bottom-4 sm:bottom-6 inset-x-0 flex justify-center pointer-events-none z-30 px-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/15 text-white shadow-2xl text-[10px] sm:text-xs font-mono">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-crimson animate-pulse" />
              <span className="font-semibold text-white/95">6 FEATURED CASE STUDIES // 2D VIEW</span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-white/70 hidden sm:inline">CLICK ANY TO EXPLORE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default memo(Parallax3DShowcase);
