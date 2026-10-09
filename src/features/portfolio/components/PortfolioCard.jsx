import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks';
import { sound } from '@/utils/audio';

const PortfolioCard = ({ item, index, onSelect }) => {
  const isMobile = useIsMobile();
  const Icon = item.icon;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { damping: 20, stiffness: 220 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { damping: 20, stiffness: 220 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    mouseX.set(relX - 0.5);
    mouseY.set(relY - 0.5);
    setGlare({ x: relX * 100, y: relY * 100, opacity: 0.22 });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        delay: index * 0.04,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        perspective: 1000,
        rotateX: !isMobile ? rotateX : 0,
        rotateY: !isMobile ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={
        !isMobile
          ? {
              y: -6,
              transition: { duration: 0.25 },
            }
          : {}
      }
      data-cursor="View"
      onClick={() => {
        sound.playClick();
        onSelect?.(item);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden cursor-pointer rounded-3xl bg-neutral-900 border border-black/[0.08] aspect-[4/5] flex flex-col justify-end shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)] transition-all"
    >
      {/* Specular Ambient Glare */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Background Image / Artwork */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
            {Icon && <Icon className="text-7xl text-white/30" />}
          </div>
        )}

        {/* Dynamic Vignette Gradient for Apple Text Readability */}
        <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

        {/* Top subtle fade */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Top Bar: Apple Pill Badges */}
      <div className="absolute top-4 inset-x-4 z-10 flex justify-between items-center pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 border border-white/15">
          {item.category}
        </span>
        {item.metric && (
          <span className="text-[10px] font-mono font-semibold tracking-wide px-3 py-1 rounded-full bg-crimson text-white shadow-xs">
            {item.metric}
          </span>
        )}
      </div>

      {/* Bottom Content: Client, Title & Explore Link */}
      <div className="relative z-10 p-6 sm:p-7 text-white text-left space-y-2">
        <div className="text-xs uppercase tracking-wider text-white/60 font-medium font-mono">
          {item.client}
        </div>
        <h4 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-white leading-snug">
          {item.title}
        </h4>
        <p className="text-xs sm:text-sm text-white/75 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        <div className="pt-2 flex items-center gap-2 text-xs font-medium text-crimson-light group-hover:text-white transition-colors">
          <span>Explore Case Study</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
