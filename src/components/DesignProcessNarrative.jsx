import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { sound } from '@/utils/audio';

const DesignProcessNarrative = ({
  process,
  finalImage,
  client,
  title,
  category,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [comparisonMode, setComparisonMode] = useState('slider'); // 'slider' | 'side-by-side'

  if (!process || !process.stages || process.stages.length === 0) {
    return null;
  }

  const stages = process.stages;
  const currentStage = stages[activeStageIndex] || stages[0];
  const hasConceptImage = Boolean(process.conceptImage);

  return (
    <div className="w-full space-y-10 text-[#1d1d1f]">
      {/* Section Header */}
      <div className="text-center sm:text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 text-crimson text-xs font-mono font-semibold">
          <span>●</span> 02 / THE MAKING PROCESS • 5-PHASE CRAFT METHODOLOGY
        </div>
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1d1d1f]">
          The Process Behind the Design
        </h3>
        <p className="text-sm sm:text-base text-[#86868b] max-w-2xl leading-relaxed">
          How strategic diagnosis, iterative prototyping, material exploration, and production oversight shaped the {title ? `"${title}"` : ''} {category || 'design'} for {client}.
        </p>
      </div>

      {/* Apple Segmented Stepper Track */}
      <div className="overflow-x-auto no-scrollbar pb-1">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/[0.04] border border-black/[0.05] min-w-full sm:min-w-0">
          {stages.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.step}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveStageIndex(idx);
                }}
                className={`flex-1 sm:flex-initial text-left px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#1d1d1f] shadow-sm'
                    : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.02]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-crimson text-white' : 'bg-black/[0.06] text-[#86868b]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {stage.phase}
                  </span>
                </div>
                <div
                  className={`text-xs truncate max-w-[150px] sm:max-w-[170px] mt-1 ${
                    isActive ? 'text-[#1d1d1f] font-medium' : 'text-[#86868b]'
                  }`}
                >
                  {stage.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep-Dive Apple Bento Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStageIndex}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="apple-card p-6 sm:p-10 space-y-8 bg-white border border-black/[0.08]"
        >
          {/* Stage Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.06] pb-5">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-crimson font-semibold mb-1">
                Phase {currentStage.step} • {currentStage.phase}
              </div>
              <h4 className="font-display text-2xl sm:text-3xl font-medium text-[#1d1d1f] tracking-tight">
                {currentStage.title}
              </h4>
            </div>
            <span className="px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-mono text-[#86868b] self-start sm:self-auto">
              Deliverable: {currentStage.artifact || 'Design Specification'}
            </span>
          </div>

          {/* Narrative Paragraph */}
          <p className="text-base sm:text-lg text-[#1d1d1f]/85 leading-relaxed font-normal">
            {currentStage.narrative}
          </p>

          {/* Strategic Rationale Highlight Callout */}
          {currentStage.decision && (
            <div className="p-5 sm:p-6 rounded-2xl bg-black/[0.02] border-l-4 border-crimson space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-crimson font-semibold flex items-center gap-1.5">
                <span>✦</span> Strategic Design Rationale
              </div>
              <p className="text-sm sm:text-base text-[#1d1d1f]/90 font-medium leading-relaxed italic">
                &ldquo;{currentStage.decision}&rdquo;
              </p>
            </div>
          )}

          {/* Visual Evolution Slider (Concept Exploration vs Final Production) */}
          {(currentStage.hasComparison || activeStageIndex === 2) && hasConceptImage && (
            <div className="pt-6 border-t border-black/[0.06] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-crimson font-semibold">
                    Visual Craft Evolution
                  </span>
                  <h5 className="text-base sm:text-lg font-display font-medium text-[#1d1d1f]">
                    Initial Concept Exploration vs. Final Master
                  </h5>
                </div>

                {/* Segmented Comparison Pill Toggle */}
                <div className="inline-flex items-center p-1 rounded-full bg-black/[0.05] border border-black/[0.04]">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setComparisonMode('slider');
                    }}
                    className={`px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      comparisonMode === 'slider'
                        ? 'bg-white text-[#1d1d1f] shadow-xs'
                        : 'text-[#86868b] hover:text-[#1d1d1f]'
                    }`}
                  >
                    Interactive Slider
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setComparisonMode('side-by-side');
                    }}
                    className={`px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      comparisonMode === 'side-by-side'
                        ? 'bg-white text-[#1d1d1f] shadow-xs'
                        : 'text-[#86868b] hover:text-[#1d1d1f]'
                    }`}
                  >
                    Side-by-Side
                  </button>
                </div>
              </div>

              {comparisonMode === 'slider' ? (
                <div className="w-full h-80 sm:h-96 md:h-[28rem] rounded-2xl bg-neutral-900 border border-black/[0.08] relative overflow-hidden shadow-lg">
                  <BeforeAfterSlider
                    beforeImage={process.conceptImage}
                    afterImage={finalImage}
                    beforeLabel={process.conceptLabel || 'Initial Concept Draft'}
                    afterLabel={process.finalLabel || 'Final Production System'}
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="apple-card p-3 space-y-2 bg-neutral-900 border-black/[0.08] text-white">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/60 px-1 font-semibold">
                      {process.conceptLabel || 'Initial Concept Exploration'}
                    </div>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center">
                      <img
                        src={process.conceptImage}
                        alt="Initial Concept"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="apple-card p-3 space-y-2 bg-neutral-900 border-crimson/30 text-white">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-crimson-light px-1 font-semibold">
                      {process.finalLabel || 'Final Production System'}
                    </div>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center">
                      <img
                        src={finalImage}
                        alt="Final Production"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Trajectory Bento Matrix (5 stages summarized at a glance) */}
      <div className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-[#86868b] font-medium">
          Full 5-Phase Trajectory at a Glance
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {stages.map((stg, i) => (
            <button
              key={stg.step}
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveStageIndex(i);
              }}
              className={`p-4 text-left rounded-2xl border transition-all cursor-pointer ${
                activeStageIndex === i
                  ? 'border-crimson bg-crimson/[0.03] shadow-xs'
                  : 'border-black/[0.07] bg-white hover:border-black/[0.2] hover:bg-black/[0.01]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-crimson">
                  0{i + 1}
                </span>
                <span className="text-[10px] font-mono uppercase text-[#86868b]">
                  {stg.phase.split(' ')[0]}
                </span>
              </div>
              <div className="text-xs font-semibold text-[#1d1d1f] line-clamp-1">
                {stg.title}
              </div>
              <div className="text-[11px] text-[#86868b] line-clamp-2 mt-1 leading-snug">
                {stg.decision || stg.narrative}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignProcessNarrative;
