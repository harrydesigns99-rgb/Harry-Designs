import { motion } from 'framer-motion';

const ProcessBehindProcess = ({ data, client, category }) => {
  if (!data) return null;

  return (
    <div className="w-full space-y-8 text-eerie">
      {/* Section Header */}
      <div className="border-b border-eerie/15 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-crimson font-bold flex items-center gap-1.5">
            <span>●</span> 03 / THE PROCESS BEHIND THE PROCESS
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 border border-eerie/20 bg-eerie/5 text-eerie/80">
            STUDIO OPERATING PROTOCOL
          </span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-eerie">
          The Craft Behind the Craft
        </h3>
        <p className="mt-2 text-sm sm:text-base text-eerie/70 max-w-3xl leading-relaxed">
          {data.subtitle || `The unseen diagnostic rigor, discarded iterations, and physical stress-testing that shaped the ${category || 'design'} for ${client}.`}
        </p>
      </div>

      {/* Studio Quote / Guiding Truth */}
      {data.quote && (
        <div className="p-5 sm:p-7 bg-cloud-white border-l-4 border-crimson border border-eerie/15 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-crimson font-bold flex items-center gap-2">
            <span>✦</span> Studio Working Principle
          </div>
          <blockquote className="font-display text-lg sm:text-xl font-medium text-eerie leading-snug italic">
            &ldquo;{data.quote}&rdquo;
          </blockquote>
          <div className="text-xs font-mono text-eerie/50 pt-2">
            — Hariharan S, Independent Brand &amp; Packaging Studio
          </div>
        </div>
      )}

      {/* 4 Pillars of Studio Rigor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.pillars?.map((pillar, idx) => (
          <motion.div
            key={pillar.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="p-5 sm:p-6 bg-cloud-white border border-eerie/15 space-y-3 flex flex-col justify-between hover:border-crimson/50 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono text-eerie/40 tracking-wider">
                  PROTOCOL 0{idx + 1}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-crimson/10 text-crimson font-bold">
                  {pillar.metric}
                </span>
              </div>
              <h4 className="font-display text-lg font-medium text-eerie">
                {pillar.label}
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-eerie/75 leading-relaxed">
              {pillar.detail}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Deep-Dive Narrative */}
      {data.deepDive && (
        <div className="p-6 bg-cloud-dancer border border-eerie/15 space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-eerie/50 font-bold">
            The Adversarial Standard: Kill Your Darlings
          </div>
          <p className="text-sm text-eerie/80 leading-relaxed font-normal">
            {data.deepDive}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProcessBehindProcess;
