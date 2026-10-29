import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/audio';

const STUDIO_METRICS = [
  {
    id: 'designs',
    value: '50+',
    label: 'Packaging Designs',
    subtext: 'End-to-end commercial production',
    icon: '📦',
  },
  {
    id: 'clients',
    value: '12+',
    label: 'Client Brands',
    subtext: 'FMCG, luxury, & retail leaders',
    icon: '✦',
  },
  {
    id: 'experience',
    value: '6+',
    label: 'Years Practice',
    subtext: 'ISO & pre-press certified rigor',
    icon: '⏳',
  },
  {
    id: 'velocity',
    value: '+40%',
    label: 'Sales Velocity',
    subtext: 'Average retail shelf lift',
    icon: '📈',
  },
];

const StudioShuttle = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMetricIdx, setActiveMetricIdx] = useState(0);

  const toggleExpand = () => {
    sound.playPop();
    setIsExpanded((prev) => !prev);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: -120, right: 120, top: -60, bottom: 60 }}
      dragElastic={0.15}
      whileDrag={{ scale: 1.04, cursor: 'grabbing' }}
      className={`relative z-30 select-none ${className}`}
    >
      {/* Floating Levitation Wrapper */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
          rotate: [-0.3, 0.3, -0.3],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex flex-col items-center"
      >
        {/* Main Floating Capsule */}
        <div
          onClick={toggleExpand}
          className="group relative flex items-center gap-2.5 sm:gap-3.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-xl border border-black/[0.08] hover:border-black/20 shadow-[0_14px_35px_-8px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.18)] transition-all duration-300 cursor-pointer"
        >
          {/* Pulsing Studio Beacon */}
          <div className="flex items-center gap-1.5 pl-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest font-semibold text-black/45 group-hover:text-black/70 transition-colors">
              Studio
            </span>
          </div>

          <div className="h-3 w-[1px] bg-black/10" />

          {/* Metric Badges */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-sans">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-[#1e1e20]">50+</span>
              <span className="text-[#1e1e20]/65 text-[11px] sm:text-xs font-medium">Designs Completed</span>
            </div>

            <span className="text-black/20 text-xs">•</span>

            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-[#1e1e20]">12+</span>
              <span className="text-[#1e1e20]/65 text-[11px] sm:text-xs font-medium">Client Brands</span>
            </div>
          </div>

          <div className="h-3 w-[1px] bg-black/10 hidden sm:block" />

          {/* Interactive Expand Hint Pill */}
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-[#FC7A69] font-medium bg-[#FC7A69]/10 px-2 py-0.5 rounded-full">
            <span>{isExpanded ? 'CLOSE' : 'EXPAND'}</span>
            <motion.span
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              +
            </motion.span>
          </div>
        </div>

        {/* Expanded Telemetry Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 12 }}
              exit={{ opacity: 0, scale: 0.92, y: 8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full mt-1 w-[320px] sm:w-[360px] p-4 rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/10 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.2)] text-[#1e1e20] z-40"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black/50 font-semibold">
                    Verified Studio Track Record
                  </span>
                </div>
                <button
                  type="button"
                  onClick={toggleExpand}
                  className="w-5 h-5 rounded-full bg-black/5 hover:bg-black/10 text-black/60 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {STUDIO_METRICS.map((metric, idx) => (
                  <div
                    key={metric.id}
                    onMouseEnter={() => setActiveMetricIdx(idx)}
                    className={`p-3 rounded-2xl border transition-all ${
                      activeMetricIdx === idx
                        ? 'bg-[#1e1e20] text-white border-transparent shadow-sm'
                        : 'bg-black/[0.02] border-black/[0.05] text-[#1e1e20]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs opacity-75">{metric.icon}</span>
                      <span className="font-display text-lg font-bold">
                        {metric.value}
                      </span>
                    </div>
                    <div className="text-[11px] font-sans font-semibold leading-tight">
                      {metric.label}
                    </div>
                    <div className={`text-[9px] mt-0.5 leading-snug ${
                      activeMetricIdx === idx ? 'text-white/60' : 'text-black/50'
                    }`}>
                      {metric.subtext}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-2 border-t border-black/[0.06] flex items-center justify-between text-[10px] font-mono text-black/45">
                <span>📍 CHENNAI // REMOTE</span>
                <span>DRAG TO REPOSITION</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default StudioShuttle;
