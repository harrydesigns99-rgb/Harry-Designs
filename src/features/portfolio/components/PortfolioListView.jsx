import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/audio';

const PortfolioListView = ({ items, onSelect }) => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: fine)').matches;
  });
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth floating spring physics
  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const handleMediaChange = (e) => setIsDesktop(e.matches);

    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full text-[#1d1d1f]">
      {/* Floating Image Preview Following Cursor (Desktop Only) */}
      {isDesktop && (
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 2 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                left: smoothX,
                top: smoothY,
                x: 24,
                y: -130,
                pointerEvents: 'none',
                zIndex: 50,
              }}
              className="w-72 h-84 rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl border border-black/[0.1]"
            >
              <img
                src={hoveredProject.image}
                alt={hoveredProject.client}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-white/70 block">
                  {hoveredProject.category} / {hoveredProject.year || '2024'}
                </span>
                <p className="font-display font-medium text-base text-white tracking-tight">
                  {hoveredProject.client}
                </p>
                {hoveredProject.metric && (
                  <span className="inline-block text-[10px] font-mono font-semibold bg-crimson text-white px-2.5 py-0.5 rounded-full mt-1">
                    {hoveredProject.metric}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Index Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 py-3.5 px-3 border-b border-black/[0.08] text-xs font-mono uppercase tracking-wider text-[#86868b] select-none font-medium">
        <span className="col-span-1">No.</span>
        <span className="col-span-4">Client / Brand</span>
        <span className="col-span-3">Discipline</span>
        <span className="col-span-3">Commercial Impact</span>
        <span className="col-span-1 text-right">View</span>
      </div>

      {/* Project Rows */}
      <div className="divide-y divide-black/[0.06] border-b border-black/[0.06]">
        {items.map((item, index) => {
          const numStr = String(index + 1).padStart(2, '0');
          const isHovered = hoveredProject?.id === item.id;

          return (
            <motion.div
              key={item.id}
              onClick={() => {
                sound.playClick();
                onSelect?.(item);
              }}
              onMouseEnter={() => {
                sound.playPop();
                setHoveredProject(item);
              }}
              onMouseLeave={() => setHoveredProject(null)}
              className={`group py-5 sm:py-6 px-3.5 cursor-pointer transition-all duration-150 flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center rounded-2xl ${
                isHovered ? 'bg-black/[0.02]' : 'hover:bg-black/[0.01]'
              }`}
            >
              {/* Mobile View Layout */}
              <div className="flex items-center gap-4 md:hidden">
                <div className="w-14 h-14 bg-neutral-900 rounded-xl flex-shrink-0 overflow-hidden border border-black/[0.06]">
                  <img src={item.image} alt={item.client} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#86868b]">{numStr}</span>
                    <h4 className="font-display text-base font-semibold text-[#1d1d1f] truncate">
                      {item.client}
                    </h4>
                  </div>
                  <p className="text-xs text-[#86868b] truncate">{item.title}</p>
                  {item.metric && (
                    <span className="inline-block text-[10px] font-semibold text-crimson font-mono mt-0.5">
                      {item.metric}
                    </span>
                  )}
                </div>
                <span className="text-sm text-[#86868b] group-hover:text-crimson transition-colors">↗</span>
              </div>

              {/* Desktop Grid Layout */}
              <span className="hidden md:block col-span-1 font-mono text-xs text-[#86868b] group-hover:text-crimson transition-colors">
                {numStr}
              </span>

              <div className="hidden md:block col-span-4">
                <h4 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-[#1d1d1f] group-hover:text-crimson transition-colors">
                  {item.client}
                </h4>
                <p className="text-xs text-[#86868b] mt-0.5">{item.title}</p>
              </div>

              <div className="hidden md:block col-span-3">
                <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.05] text-[#86868b] group-hover:text-[#1d1d1f] transition-colors">
                  {item.category}
                </span>
              </div>

              <div className="hidden md:block col-span-3">
                {item.metric ? (
                  <span className="text-xs font-semibold text-crimson font-mono flex items-center gap-1.5">
                    <span>✦</span> {item.metric}
                  </span>
                ) : (
                  <span className="text-xs text-[#86868b] font-mono">—</span>
                )}
              </div>

              <div className="hidden md:block col-span-1 text-right">
                <span className="inline-block text-base text-[#86868b] group-hover:text-crimson group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioListView;
