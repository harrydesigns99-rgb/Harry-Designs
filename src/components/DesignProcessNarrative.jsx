import { memo } from 'react';

const DesignProcessNarrative = ({
  process,
  client,
  category,
  approach,
  brief,
  description,
}) => {
  if (!process && !approach && !brief && !description) {
    return null;
  }

  // Derive the clean, concise process narrative paragraph
  const processParagraph =
    process?.summary ||
    (process?.stages && process.stages.length > 0
      ? [
          process.stages[0]?.narrative,
          process.stages[1]?.narrative,
          process.stages[process.stages.length - 1]?.narrative,
        ]
          .filter(Boolean)
          .join(' ')
      : null) ||
    approach ||
    description ||
    brief ||
    `A strategic design process combining deep category diagnosis, bespoke visual architecture, and meticulous production oversight tailored for ${client}.`;

  return (
    <div className="w-full text-[#1d1d1f]">
      <div className="apple-card p-6 sm:p-8 bg-white border border-black/[0.08] rounded-3xl space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/[0.06] pb-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-crimson">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
            <span>02 / THE DESIGN PROCESS</span>
          </div>
          <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider">
            {client} • {category || 'Design'}
          </span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-[#1d1d1f]">
          The Process Behind the Design
        </h3>

        <p className="text-sm sm:text-base text-[#1d1d1f]/85 leading-relaxed font-normal">
          {processParagraph}
        </p>
      </div>
    </div>
  );
};

export default memo(DesignProcessNarrative);
