import { motion } from 'framer-motion';

const ProcessBehindProcess = ({ data, client, category }) => {
  if (!data) return null;

  return (
    <div className="w-full space-y-10 text-[#1d1d1f]">
      {/* Section Header */}
      <div className="text-center sm:text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 text-crimson text-xs font-mono font-semibold">
          <span>●</span> 03 / STUDIO OPERATING RIGOR • THE CRAFT BEHIND THE CRAFT
        </div>
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1d1d1f]">
          The Process Behind the Process
        </h3>
        <p className="text-sm sm:text-base text-[#86868b] max-w-2xl leading-relaxed">
          {data.subtitle || `The unseen diagnostic rigor, discarded iterations, and physical stress-testing that shaped the ${category || 'design'} for ${client}.`}
        </p>
      </div>

      {/* Studio Working Principle (Keynote Callout Card) */}
      {data.quote && (
        <div className="apple-card p-6 sm:p-10 rounded-3xl border-l-4 border-crimson space-y-3 bg-white">
          <div className="text-xs font-mono uppercase tracking-wider text-crimson font-semibold flex items-center gap-2">
            <span>✦</span> STUDIO OPERATING TRUTH
          </div>
          <blockquote className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-[#1d1d1f] leading-snug italic tracking-tight">
            &ldquo;{data.quote}&rdquo;
          </blockquote>
          <div className="text-xs font-mono text-[#86868b] pt-2">
            — Hariharan S, Independent Brand &amp; Packaging Studio
          </div>
        </div>
      )}

      {/* 4 Apple Pro Diagnostic Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.pillars?.map((pillar, idx) => (
          <motion.div
            key={pillar.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="apple-card p-6 sm:p-8 rounded-3xl space-y-4 flex flex-col justify-between hover:border-black/[0.18] transition-all bg-white border border-black/[0.08]"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono text-[#86868b] tracking-wider">
                  DIAGNOSTIC PROTOCOL 0{idx + 1}
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-crimson/10 text-crimson font-semibold">
                  {pillar.metric}
                </span>
              </div>
              <h4 className="font-display text-xl sm:text-2xl font-medium text-[#1d1d1f] tracking-tight">
                {pillar.label}
              </h4>
            </div>

            <p className="text-sm text-[#1d1d1f]/75 leading-relaxed">
              {pillar.detail}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Deep-Dive Adversarial Filter Bento */}
      {data.deepDive && (
        <div className="apple-card p-6 sm:p-8 rounded-3xl space-y-3 bg-black/[0.02] border border-black/[0.06]">
          <div className="text-xs font-mono uppercase tracking-wider text-[#86868b] font-medium flex items-center gap-2">
            <span>⚙</span> ADVERSARIAL FILTER: KILL YOUR DARLINGS
          </div>
          <p className="text-sm sm:text-base text-[#1d1d1f]/80 leading-relaxed font-normal">
            {data.deepDive}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProcessBehindProcess;
