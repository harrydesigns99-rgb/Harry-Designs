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
    <div ref={containerRef} className="relative w-full">
      {/* Floating Image Preview Following Cursor (Desktop Only) */}
      {isDesktop && (
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                left: smoothX,
                top: smoothY,
                x: 30,
                y: -140,
                pointerEvents: 'none',
                zIndex: 50,
              }}
              className="w-72 h-80 rounded-none overflow-hidden bg-eerie shadow-2xl border border-eerie/20"
            >
              <img
                src={hoveredProject.image}
                alt={hoveredProject.client}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                <span className="text-[10px] uppercase font-mono tracking-wider text-white/70 block">
                  {hoveredProject.category} / {hoveredProject.year || '2024'}
                </span>
                <p className="font-display font-medium text-base text-white">
                  {hoveredProject.client}
                </p>
                {hoveredProject.metric && (
                  <span className="inline-block text-[9px] uppercase font-bold bg-crimson text-white px-2 py-0.5 mt-1">
                    {hoveredProject.metric}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Editorial Index Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 py-3 border-b border-eerie/20 text-[11px] font-mono uppercase tracking-[0.16em] text-eerie/45 select-none">
        <span className="col-span-1">No.</span>
        <span className="col-span-4">Client / Brand</span>
        <span className="col-span-3">Discipline</span>
        <span className="col-span-3">Commercial Impact</span>
        <span className="col-span-1 text-right">Explore</span>
      </div>

      {/* Project Rows */}
      <div className="divide-y divide-eerie/15 border-b border-eerie/15">
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
              className={`group py-5 sm:py-7 cursor-pointer transition-all duration-200 flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center ${
                isHovered ? 'bg-cloud-white/70 pl-2' : 'hover:pl-2'
              }`}
            >
              {/* Mobile View Layout */}
              <div className="flex items-center gap-4 md:hidden">
                <div className="w-14 h-14 bg-eerie flex-shrink-0 overflow-hidden border border-eerie/10">
                  <img src={item.image} alt={item.client} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-eerie/40">{numStr}</span>
                    <h4 className="font-display text-lg font-bold text-eerie truncate">
                      {item.client}
                    </h4>
                  </div>
                  <p className="text-xs text-eerie/60 truncate">{item.title}</p>
                  {item.metric && (
                    <span className="inline-block text-[9px] font-bold text-crimson uppercase tracking-wider mt-0.5">
                      {item.metric}
                    </span>
                  )}
                </div>
                <span className="text-lg text-eerie/40 group-hover:text-crimson transition-colors">↗</span>
              </div>

              {/* Desktop Grid Layout */}
              <span className="hidden md:block col-span-1 font-mono text-xs text-eerie/40 group-hover:text-crimson transition-colors">
                {numStr}
              </span>

              <div className="hidden md:block col-span-4">
                <h4 className="font-display text-2xl font-bold tracking-tight text-eerie group-hover:text-crimson transition-colors">
                  {item.client}
                </h4>
                <p className="text-xs text-eerie/60 mt-0.5">{item.title}</p>
              </div>

              <div className="hidden md:block col-span-3">
                <span className="text-xs uppercase tracking-wider font-mono px-2.5 py-1 bg-white border border-eerie/15 text-eerie/70 group-hover:border-crimson/50 transition-colors">
                  {item.category}
                </span>
              </div>

              <div className="hidden md:block col-span-3">
                {item.metric ? (
                  <span className="text-xs font-semibold text-crimson font-mono flex items-center gap-1.5">
                    <span>✦</span> {item.metric}
                  </span>
                ) : (
                  <span className="text-xs text-eerie/40 font-mono">—</span>
                )}
              </div>

              <div className="hidden md:block col-span-1 text-right">
                <span className="inline-block text-xl text-eerie/40 group-hover:text-crimson group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
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
