import { motion } from 'framer-motion';
import { useState } from 'react';
import { TOOLS } from '../data/aboutData';
import { useIsMobile } from '@/hooks';
import { fadeInUp, TRANSITIONS, DELAYS } from '@/animations';

const ToolsCarousel = ({ isInView }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay: DELAYS.large, ...TRANSITIONS.slow }}
      className="mb-20"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 border-b border-black/[0.06] pb-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-mono text-[#86868b]">
            <span>●</span>
            <span>PRODUCTION &amp; SOFTWARE STACK</span>
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-[#1d1d1f]">
            The Tools I <span className="text-gradient">Trust.</span>
          </h3>
        </div>
        <p className="max-w-xs text-sm sm:text-base text-[#86868b] leading-relaxed">
          Industry-standard software and craft equipment for pixel-perfect identity and print execution.
        </p>
      </div>

      <div className="apple-card p-6 sm:p-10 bg-white border border-black/[0.08] rounded-3xl shadow-[0_16px_40px_-8px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
          {TOOLS.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  delay: 0.35 + index * 0.05,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={
                  !isMobile
                    ? {
                        y: -6,
                        transition: { duration: 0.2 },
                      }
                    : {}
                }
                className="group relative flex flex-col items-center justify-center cursor-pointer"
                onMouseEnter={() => !isMobile && setHoveredCard(tool.name)}
                onMouseLeave={() => !isMobile && setHoveredCard(null)}
              >
                {/* Icon container */}
                <motion.div
                  className={`relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-br ${tool.color} shadow-sm group-hover:shadow-md transition-shadow`}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${tool.color}`}
                    animate={{
                      opacity: !isMobile && hoveredCard === tool.name ? 1 : 0.92,
                    }}
                    transition={TRANSITIONS.fast}
                  />

                  <motion.div
                    className="text-3xl md:text-4xl text-white relative z-10"
                    animate={{
                      rotateY: !isMobile && hoveredCard === tool.name ? 360 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon />
                  </motion.div>
                </motion.div>

                <span className="text-xs font-mono text-[#86868b] text-center mt-3 group-hover:text-[#1d1d1f] transition-colors truncate max-w-full block font-medium capitalize">
                  {tool.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ToolsCarousel;
