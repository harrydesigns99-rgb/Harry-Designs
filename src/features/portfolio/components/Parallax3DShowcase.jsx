import { useRef, useState, useEffect, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sound } from '@/utils/audio';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';

/**
 * ShowcaseCard component representing an individual project in 3D parallax space
 */
const ShowcaseCard = memo(({ project, onSelect }) => {
  return (
    <div
      onClick={() => {
        sound.playClick();
        onSelect?.(project);
      }}
      className="group relative w-full aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden bg-[#16161a] border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] cursor-pointer transform-gpu transition-all duration-500 hover:shadow-[0_28px_70px_-12px_rgba(186,32,38,0.45)] hover:border-crimson/40 hover:-translate-y-2"
    >
      {/* High-Resolution Project Artwork */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Dark Cinematic Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-75 group-hover:opacity-95 transition-opacity duration-500" />

      {/* Top Floating Badges */}
      <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-black/60 backdrop-blur-md text-white border border-white/15 shadow-sm">
          {project.category}
        </span>
        {project.metric && (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-crimson backdrop-blur-md text-white border border-white/20 shadow-sm">
            {project.metric}
          </span>
        )}
      </div>

      {/* Bottom Content Information Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white flex flex-col justify-end">
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-crimson font-semibold">
          {project.client}
        </span>
        <h4 className="font-display text-base sm:text-xl md:text-2xl font-medium tracking-tight text-white group-hover:text-white transition-colors mt-0.5">
          {project.title}
        </h4>
        <p className="text-xs text-white/70 line-clamp-1 mt-1 font-normal">
          {project.description || project.approach}
        </p>

        {/* Action Link Revealed on Hover */}
        <div className="mt-3 flex items-center gap-2 text-xs font-mono text-crimson font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
 * Recreates the adwants.in 3D perspective scroll effect:
 * 3 vertical columns tilted at an oblique angle inside a 2000px perspective field
 * that smoothly unroll and flatten as the visitor scrolls through the runway.
 */
const Parallax3DShowcase = ({ projects = [], onSelectProject, onNavigateWork }) => {
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

  // Exact adwants.in 3D Perspective Angles & Zoom Scale:
  // Starts tilted in 3D space, smoothly flattens out into straight frontal view
  const rotateX = useTransform(scrollYProgress, [0, 1], [isMobile ? 15 : 45, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [isMobile ? -4 : -15, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [isMobile ? 1.45 : 1.95, isMobile ? 1 : 0.65]);
  const translateY = useTransform(scrollYProgress, [0, 1], ['2%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.85, 1, 1, 1]);

  // Parallax Column Shifts: Column 2 glides in reverse direction against columns 1 and 3
  const col1Y = useTransform(scrollYProgress, [0, 1], [isMobile ? 40 : 100, 0]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [isMobile ? -40 : -100, 0]);
  const col3Y = useTransform(scrollYProgress, [0, 1], [isMobile ? 80 : 200, 0]);

  // Use projects or fallback to all 12 PORTFOLIO_ITEMS
  const items = projects && projects.length > 0 ? projects : PORTFOLIO_ITEMS;

  // Distribute projects evenly into 3 columns
  const col1 = items.filter((_, idx) => idx % 3 === 0);
  const col2 = items.filter((_, idx) => idx % 3 === 1);
  const col3 = items.filter((_, idx) => idx % 3 === 2);

  return (
    <div className="w-full relative">
      {/* Scroll Runway giving the physical height to scroll through */}
      <div
        ref={containerRef}
        className={`${isMobile ? 'h-[150vh]' : 'h-[260vh] md:h-[300vh]'} relative`}
      >
        {/* Sticky 3D Viewport pinned to screen */}
        <div
          className={`sticky top-0 ${
            isMobile ? 'h-[62vh]' : 'h-screen'
          } w-full overflow-hidden flex items-center justify-center`}
          style={{ perspective: '2000px' }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,37,69,0.08)_0%,transparent_65%)] pointer-events-none" />

          {/* 3D Tilted Plane containing 3 Parallax Columns */}
          <motion.div
            style={{
              rotateX,
              rotateZ,
              scale,
              y: translateY,
              opacity,
              transformStyle: 'preserve-3d',
            }}
            className={`flex gap-3 sm:gap-6 md:gap-8 ${
              isMobile ? 'w-[95vw]' : 'w-[125vw] md:w-[120vw]'
            } max-w-[2000px] mx-auto px-2 sm:px-4 transform-gpu`}
          >
            {/* Column 1 */}
            <motion.div style={{ y: col1Y }} className="flex flex-col gap-3 sm:gap-6 md:gap-8 w-1/3">
              {col1.map((p) => (
                <ShowcaseCard key={`col1-${p.id}`} project={p} onSelect={onSelectProject} />
              ))}
            </motion.div>

            {/* Column 2 (Counter-direction parallax glide) */}
            <motion.div style={{ y: col2Y }} className="flex flex-col gap-3 sm:gap-6 md:gap-8 w-1/3">
              {col2.map((p) => (
                <ShowcaseCard key={`col2-${p.id}`} project={p} onSelect={onSelectProject} />
              ))}
            </motion.div>

            {/* Column 3 */}
            <motion.div style={{ y: col3Y }} className="flex flex-col gap-3 sm:gap-6 md:gap-8 w-1/3">
              {col3.map((p) => (
                <ShowcaseCard key={`col3-${p.id}`} project={p} onSelect={onSelectProject} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Exploration Hint & Archive Route */}
      <div className="py-8 sm:py-12 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onNavigateWork?.();
          }}
          className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 hover:bg-white text-white hover:text-[#0c0c0f] backdrop-blur-md border border-white/20 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all duration-500 shadow-xl cursor-pointer group"
        >
          <span>View More Works ({items.length})</span>
          <span className="group-hover:translate-x-2 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

export default memo(Parallax3DShowcase);
