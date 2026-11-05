import { useRef, memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks';
import { sound } from '@/utils/audio';
import ShowcaseMediaCarousel from './ShowcaseMediaCarousel';

const PortfolioCard = ({ item, index, onSelect }) => {
  const isMobile = useIsMobile();
  const Icon = item.icon;
  const glareRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { damping: 20, stiffness: 220 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { damping: 20, stiffness: 220 });

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    mouseX.set(relX - 0.5);
    mouseY.set(relY - 0.5);
    if (glareRef.current) {
      glareRef.current.style.opacity = '0.22';
      glareRef.current.style.background = `radial-gradient(circle at ${relX * 100}% ${relY * 100}%, rgba(255,255,255,0.25) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
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
      data-cursor="VIEW CASE ↗"
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
          ref={glareRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20 opacity-0"
        />
      )}

      {/* Background Image / Artwork */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {item.image || (item.images && item.images.length > 0) ? (
          <ShowcaseMediaCarousel
            images={item.images || (item.image ? [item.image] : [])}
            fallbackImage={item.image || '/image/Image Gallery/Artboard 1.webp'}
            alt={item.title}
            interval={item.autoScrollInterval || 3800}
            cardIndex={index}
            aspectRatio="w-full h-full"
            showCounter={false}
            showIndicators={false}
            showControls={false}
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
        <h4 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-white leading-snug">
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

export default memo(PortfolioCard);
