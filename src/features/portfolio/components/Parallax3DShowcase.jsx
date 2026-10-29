import { useRef, useState, useEffect, useMemo, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sound } from '@/utils/audio';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';

/**
 * ShowcaseCard component - Simple & Minimal:
 * - Pure 4:3 high-resolution artwork
 * - Rounded corners with subtle shadow
 * - Minimal bottom overlay: client name & project title only
 * - No cluttered badges, no metric chips, no long descriptions
 */
const ShowcaseCard = memo(({ project, onSelect }) => {
  return (
    <div
      onClick={() => {
        sound.playClick();
        onSelect?.(project);
      }}
      className="group relative w-full aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden bg-black/5 border border-black/[0.08] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.22)] hover:shadow-[0_24px_50px_-10px_rgba(0,0,0,0.32)] cursor-pointer transform-gpu transition-all duration-500 hover:-translate-y-1 select-none"
    >
      {/* High-Resolution Project Artwork */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '/image/Image Gallery/Artboard 1.webp';
        }}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
      />

      {/* Subtle Bottom Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

      {/* Minimal Bottom Information Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white flex flex-col justify-end z-10 pointer-events-none">
        <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-crimson font-medium">
          {project.client}
        </span>
        <h4 className="font-display text-xs sm:text-base md:text-lg font-medium tracking-tight text-white line-clamp-1 mt-0.5">
          {project.title}
        </h4>
      </div>
    </div>
  );
});

ShowcaseCard.displayName = 'ShowcaseCard';

/**
 * Parallax3DShowcase Component - Clean & Minimal Parallax:
 * - Permanent 3D perspective unwinding smoothly into a flat 2D grid
 * - Calibrated top clearance so cards never collide with the navbar
 * - Locks flat in 2D from 65% to 100% scroll progress
 * - Zero floating HUD pills or intrusive overlays
 */
const Parallax3DShowcase = ({ projects = [], onSelectProject }) => {
  const containerRef = useRef(null);
  const [deviceTier, setDeviceTier] = useState(() => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    if (w < 640) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
  });

  const [isShortViewport, setIsShortViewport] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerHeight < 780;
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w < 640) setDeviceTier('mobile');
      else if (w < 1024) setDeviceTier('tablet');
      else setDeviceTier('desktop');
      setIsShortViewport(h < 780);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = deviceTier === 'mobile';
  const isTablet = deviceTier === 'tablet';

  // Track scroll position through the sticky showcase runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 1. Perspective Rotations:
  // Starts in 3D tilted space, unwinds to 0deg by 0.65 progress, and stays flat in 2D from 0.65 to 1.0
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [isMobile ? 14 : isTablet ? 24 : 36, 0, 0]
  );
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [isMobile ? -3 : isTablet ? -6 : -10, 0, 0]
  );

  // 2. Perspective Scale:
  // Starts zoomed in, settles down to comfortable non-clipped view
  const settledScale = isMobile ? 0.90 : isTablet ? 0.72 : isShortViewport ? 0.58 : 0.62;
  const initialScale = isMobile ? 1.25 : isTablet ? 1.35 : isShortViewport ? 1.30 : 1.48;

  const scale = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [initialScale, settledScale, settledScale]
  );

  // 3. Subtle vertical center adjustment
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    ['2%', '0%', '0%']
  );

  // 4. Smooth opacity
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.95, 1],
    [0.75, 1, 1, 0.85]
  );

  // 5. Parallax Column Shifts:
  // Column 1 and 3 slide down to 0, Column 2 glides up to 0 (counter-direction).
  // All reach 0 at progress 0.65, locking the 2 rows of 3 columns into a flat 2D grid.
  const col1Y = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [isMobile ? 30 : isTablet ? 60 : 90, 0, 0]
  );
  const col2Y = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [isMobile ? -30 : isTablet ? -60 : -90, 0, 0]
  );
  const col3Y = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [isMobile ? 45 : isTablet ? 90 : 140, 0, 0]
  );

  // Take exactly 6 projects for the permanent curated showcase (2 rows of 3 columns)
  const items = useMemo(() => {
    const list = projects && projects.length > 0 ? projects : PORTFOLIO_ITEMS;
    return list.slice(0, 6);
  }, [projects]);

  // Distribute into 3 columns so Row 1 is items[0..2] and Row 2 is items[3..5]:
  // Column 1: [items[0], items[3]] -> [Gokul Oils, CSIR India]
  // Column 2: [items[1], items[4]] -> [Sendra Gold, Thomas Bakers]
  // Column 3: [items[2], items[5]] -> [Diyaa Pure, Mo Elixir]
  const col1 = [items[0], items[3]].filter(Boolean);
  const col2 = [items[1], items[4]].filter(Boolean);
  const col3 = [items[2], items[5]].filter(Boolean);

  return (
    <div className="w-full relative">
      {/* Scroll Runway giving the physical height to scroll through */}
      <div
        ref={containerRef}
        className={`${
          isMobile ? 'h-[190vh]' : isTablet ? 'h-[250vh]' : 'h-[290vh]'
        } relative`}
      >
        {/* Sticky 3D Viewport pinned to screen during scroll runway */}
        {/* Top clearance pt-24 sm:pt-28 guarantees clear separation below the fixed navbar */}
        <div
          className={`sticky top-0 ${
            isMobile ? 'h-[100dvh]' : 'h-screen'
          } w-full overflow-hidden flex flex-col items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-3 sm:px-6`}
          style={{ perspective: '2000px' }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(186,32,38,0.06)_0%,transparent_65%)] pointer-events-none" />

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
              isMobile ? 'w-[96vw]' : isTablet ? 'w-[92vw] max-w-[1000px]' : 'w-[88vw] max-w-[1200px]'
            } mx-auto px-2 sm:px-4 transform-gpu`}
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
        </div>
      </div>
    </div>
  );
};

export default memo(Parallax3DShowcase);
