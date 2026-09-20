import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

const LivingBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 60 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 60);
      mouseY.set((e.clientY / innerHeight - 0.5) * 60);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#f4f1ea]"
      aria-hidden="true"
    >
      {/* Subtle Noise Texture for tactile paper feel */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Ambient Orb 1 - Soft Iris Blue (Top Right) */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 50, 0],
          scale: [1, 1.18, 0.95, 1],
          opacity: [0.22, 0.38, 0.25, 0.22],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#8490ef]/30 via-[#5263d8]/20 to-transparent blur-[110px]"
      />

      {/* Floating Ambient Orb 2 - Warm Terracotta Amber (Bottom Left) */}
      <motion.div
        style={{
          x: useSpring(mouseX, { damping: 50, stiffness: 45 }),
          y: useSpring(mouseY, { damping: 50, stiffness: 45 }),
        }}
        animate={{
          x: [0, -60, 50, 0],
          y: [0, 70, -35, 0],
          scale: [1, 1.25, 0.9, 1],
          opacity: [0.18, 0.32, 0.2, 0.18],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#d4775c]/25 via-[#e8a87c]/20 to-transparent blur-[120px]"
      />

      {/* Floating Ambient Orb 3 - Radiant Pearl Crimson (Center Subtle Glow) */}
      <motion.div
        animate={{
          x: [0, 40, -50, 0],
          y: [0, -30, 40, 0],
          scale: [0.95, 1.15, 1, 0.95],
          opacity: [0.12, 0.24, 0.15, 0.12],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 6,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full bg-gradient-to-r from-[#5263d8]/15 via-[#d4775c]/10 to-transparent blur-[140px]"
      />

      {/* Subtle Architectural Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(18,18,18,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,18,18,0.03)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Animated Light Sweep Line */}
      <motion.div
        animate={{
          x: ['-100%', '200%'],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 8,
        }}
        className="absolute top-0 bottom-0 w-[400px] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none"
      />
    </div>
  );
};

export default LivingBackground;
