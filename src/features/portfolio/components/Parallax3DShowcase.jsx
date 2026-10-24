import { useRef, useState, useEffect, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sound } from '@/utils/audio';

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
      className="group relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-black/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.28)] cursor-pointer transform-gpu transition-all duration-500 hover:shadow-[0_24px_60px_-12px_rgba(186,32,38,0.38)] hover:-translate-y-1.5"
    >
      {/* High-Resolution Project Artwork */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
      />

      {/* Dark Vignette Gradient for Crisp Typography Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

      {/* Top Floating Badges */}
      <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-black/55 backdrop-blur-md text-white/95 border border-white/15 shadow-xs">
          {project.category}
        </span>
        {project.metric && (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-crimson/90 backdrop-blur-md text-white border border-white/20 shadow-xs">
            {project.metric}
          </span>
        )}
      </div>

      {/* Bottom Information Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white flex flex-col justify-end">
        <div className="font-display text-base sm:text-xl font-medium tracking-tight text-white group-hover:text-white transition-colors">
          {project.client}
        </div>
        <p className="text-xs text-white/75 line-clamp-1 mt-0.5">
          {project.title}
        </p>

        {/* Action Link Revealed on Hover */}
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-mono text-crimson-light font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Explore Case Study</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </div>
  );
});

ShowcaseCard.displayName = 'ShowcaseCard';

/**
 * Parallax3DShowcase Component
 * Recreates the dramatic 3D perspective scroll effect:
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

  // 3D Perspective Angles: Unwinds from dramatic tilt to flat straight view
  const rotateX = useTransform(scrollYProgress, [0, 1], [isMobile ? 18 : 42, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [isMobile ? -4 : -14, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [isMobile ? 1.3 : 1.85, isMobile ? 1 : 0.72]);
  const translateY = useTransform(scrollYProgress, [0, 1], ['2%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 1]);

  // Parallax Column Shifts (Center column glides in reverse direction)
  const col1Y = useTransform(scrollYProgress, [0, 1], [isMobile ? 30 : 120, 0]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [isMobile ? -30 : -140, 0]);
  const col3Y = useTransform(scrollYProgress, [0, 1], [isMobile ? 60 : 220, 0]);

  // Distribute projects evenly into 3 columns
  const col1 = projects.filter((_, idx) => idx % 3 === 0);
  const col2 = projects.filter((_, idx) => idx % 3 === 1);
  const col3 = projects.filter((_, idx) => idx % 3 === 2);

  return (
    <div className="w-full relative">
      {/* Scroll Runway giving the physical height to scroll through */}
      <div
        ref={containerRef}
        className={`${isMobile ? 'h-[160vh]' : 'h-[280vh] md:h-[320vh]'} relative`}
      >
        {/* Sticky 3D Viewport pinned to screen */}
        <div
          className={`sticky top-0 ${
            isMobile ? 'h-[72vh]' : 'h-screen'
          } w-full overflow-hidden flex items-center justify-center`}
          style={{ perspective: '2000px' }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(186,32,38,0.06)_0%,transparent_65%)] pointer-events-none" />

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
            className={`flex gap-3.5 sm:gap-6 md:gap-8 ${
              isMobile ? 'w-[96vw]' : 'w-[130vw] md:w-[125vw]'
            } max-w-[2200px] mx-auto px-2 sm:px-4 transform-gpu`}
          >
            {/* Column 1 */}
            <motion.div style={{ y: col1Y }} className="flex flex-col gap-3.5 sm:gap-6 md:gap-8 w-1/3">
              {col1.map((p) => (
                <ShowcaseCard key={`col1-${p.id}`} project={p} onSelect={onSelectProject} />
              ))}
            </motion.div>

            {/* Column 2 (Counter-direction parallax glide) */}
            <motion.div style={{ y: col2Y }} className="flex flex-col gap-3.5 sm:gap-6 md:gap-8 w-1/3">
              {col2.map((p) => (
                <ShowcaseCard key={`col2-${p.id}`} project={p} onSelect={onSelectProject} />
              ))}
            </motion.div>

            {/* Column 3 */}
            <motion.div style={{ y: col3Y }} className="flex flex-col gap-3.5 sm:gap-6 md:gap-8 w-1/3">
              {col3.map((p) => (
                <ShowcaseCard key={`col3-${p.id}`} project={p} onSelect={onSelectProject} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Exploration Hint & Archive Route */}
      <div className="py-6 sm:py-10 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onNavigateWork?.();
          }}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1d1d1f] hover:bg-crimson text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer group"
        >
          <span>Explore All {projects.length} Archive Case Studies</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

export default memo(Parallax3DShowcase);
