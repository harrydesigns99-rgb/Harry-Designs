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
    <div className="w-full space-y-8 text-eerie">
      {/* Section Header */}
      <div className="border-b border-eerie/15 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-crimson font-bold flex items-center gap-1.5">
            <span>●</span> 02 / THE MAKING PROCESS
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 border border-eerie/20 bg-eerie/5 text-eerie/80">
            5-PHASE CRAFT METHODOLOGY
          </span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-eerie">
          The Process Behind the Design
        </h3>
        <p className="mt-2 text-sm sm:text-base text-eerie/70 max-w-3xl leading-relaxed">
          How strategic diagnosis, iterative prototyping, material exploration, and production oversight shaped the {title ? `"${title}"` : ''} {category || 'design'} for {client}.
        </p>
      </div>

      {/* Interactive Phase Navigation Strip */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 border-b border-eerie/10">
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
                className={`flex-shrink-0 px-3 sm:px-4 py-2 border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-crimson text-white border-crimson shadow-sm'
                    : 'bg-cloud-white border-eerie/15 text-eerie/70 hover:text-eerie hover:border-eerie/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-xs ${
                      isActive ? 'bg-white/20 text-white' : 'bg-eerie/10 text-eerie/70'
                    }`}
                  >
                    {stage.step}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                    {stage.phase}
                  </span>
                </div>
                <div
                  className={`text-[11px] truncate max-w-[140px] sm:max-w-[180px] mt-1 ${
                    isActive ? 'text-white/85 font-medium' : 'text-eerie/60'
                  }`}
                >
                  {stage.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep-Dive Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStageIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-cloud-white border border-eerie/15 p-5 sm:p-8 space-y-6"
        >
          {/* Stage Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-eerie/10 pb-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-crimson font-bold mb-1">
                Phase {currentStage.step} • {currentStage.phase}
              </div>
              <h4 className="font-display text-xl sm:text-2xl font-medium text-eerie">
                {currentStage.title}
              </h4>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 bg-eerie/5 border border-eerie/15 text-eerie/80">
              Deliverable: {currentStage.artifact || 'Design Deliverable'}
            </span>
          </div>

          {/* Narrative Paragraph */}
          <p className="text-sm sm:text-base text-eerie/85 leading-relaxed font-normal">
            {currentStage.narrative}
          </p>

          {/* Key Design Decision Highlight Card */}
          {currentStage.decision && (
            <div className="p-4 sm:p-5 bg-cloud-dancer border-l-4 border-crimson space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-crimson font-bold flex items-center gap-1.5">
                <span>✦</span> Strategic Design Rationale
              </div>
              <p className="text-xs sm:text-sm text-eerie/90 font-medium leading-relaxed italic">
                &ldquo;{currentStage.decision}&rdquo;
              </p>
            </div>
          )}

          {/* If this stage has or is the prototyping/comparison phase, show the Concept vs Final visual slider! */}
          {(currentStage.hasComparison || activeStageIndex === 2) && hasConceptImage && (
            <div className="pt-4 border-t border-eerie/15 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-crimson font-bold">
                    Visual Craft Evolution
                  </span>
                  <h5 className="text-sm sm:text-base font-display font-medium text-eerie">
                    Initial Concept Exploration vs. Final Production
                  </h5>
                </div>

                {/* Toggle comparison view mode */}
                <div className="flex items-center gap-1 bg-cloud-dancer p-1 border border-eerie/15">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setComparisonMode('slider');
                    }}
                    className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      comparisonMode === 'slider'
                        ? 'bg-crimson text-white font-bold'
                        : 'text-eerie/70 hover:text-eerie'
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
                    className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      comparisonMode === 'side-by-side'
                        ? 'bg-crimson text-white font-bold'
                        : 'text-eerie/70 hover:text-eerie'
                    }`}
                  >
                    Side-by-Side
                  </button>
                </div>
              </div>

              {comparisonMode === 'slider' ? (
                <div className="w-full h-80 sm:h-96 md:h-[26rem] bg-neutral-900 border border-eerie/20 relative overflow-hidden">
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
                  <div className="border border-eerie/20 bg-neutral-900 p-2.5 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/70 px-1 font-bold">
                      {process.conceptLabel || 'Initial Concept Exploration'}
                    </div>
                    <div className="aspect-[3/4] max-h-[380px] mx-auto overflow-hidden bg-neutral-950 flex items-center justify-center p-2">
                      <img
                        src={process.conceptImage}
                        alt="Initial Concept"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="border border-crimson/40 bg-neutral-900 p-2.5 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-crimson-light px-1 font-bold">
                      {process.finalLabel || 'Final Production System'}
                    </div>
                    <div className="aspect-[3/4] max-h-[380px] mx-auto overflow-hidden bg-neutral-950 flex items-center justify-center p-2">
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

      {/* Overview Timeline Matrix (All 5 stages summarized at a glance) */}
      <div className="pt-6 border-t border-eerie/15">
        <div className="text-xs font-mono uppercase tracking-wider text-eerie/60 font-semibold mb-4">
          Complete Craft Trajectory at a Glance
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
              className={`p-3 text-left border transition-all cursor-pointer ${
                activeStageIndex === i
                  ? 'border-crimson bg-crimson/5 shadow-xs'
                  : 'border-eerie/15 bg-cloud-white hover:border-eerie/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold text-crimson">
                  0{i + 1}
                </span>
                <span className="text-[9px] font-mono uppercase text-eerie/40">
                  {stg.phase.split(' ')[0]}
                </span>
              </div>
              <div className="text-xs font-semibold text-eerie line-clamp-1">
                {stg.title}
              </div>
              <div className="text-[10px] text-eerie/60 line-clamp-2 mt-1">
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
