import { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * Editorial Overall Impact Section
 * Replicates the high-impact dark metric sheet matching shriyap.com / user reference:
 * - Deep dark slate canvas with micro-dot grid
 * - OVERALL IMPACT kicker
 * - Giant bold typography values (e.g. 14%, 10K, $2.4M)
 * - Muted descriptive statements with horizontal dividers
 */

const OverallImpactSection = ({ impact, project }) => {
  // Fallback metrics if project has no custom impact array
  const defaultImpact = [
    {
      value: project?.metric || '+40%',
      description: 'improvement in overall retail shelf conversion and velocity across modern trade stores.',
    },
    {
      value: '350+',
      description: 'supermarket retail locations deploying the redesigned visual system with zero misregistration.',
    },
    {
      value: '100%',
      description: 'compliance with ISO 12647-2 certified flexographic print standards and barrier specifications.',
    },
  ];

  const impactStats = impact && impact.length > 0 ? impact : defaultImpact;

  return (
    <div className="w-full">
      <div
        className="w-full rounded-3xl bg-[#18191c] p-8 sm:p-12 md:p-16 border border-white/[0.08] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.5)] text-white relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Eyebrow Header: OVERALL IMPACT */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-8 sm:mb-12 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span>OVERALL IMPACT</span>
        </div>

        {/* Impact Metric Rows */}
        <div className="space-y-8 sm:space-y-12">
          {impactStats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`${
                index > 0 ? 'pt-8 sm:pt-12 border-t border-white/[0.1]' : ''
              } grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 md:gap-8 items-center`}
            >
              {/* Left Column: Giant Stat Number */}
              <div className="md:col-span-5 lg:col-span-6">
                <span className="font-display font-bold text-5xl sm:text-7xl md:text-8xl tracking-tight text-white leading-none block">
                  {item.value}
                </span>
              </div>

              {/* Right Column: Narrative Description */}
              <div className="md:col-span-7 lg:col-span-6 md:pl-4">
                <p className="font-sans text-sm sm:text-base md:text-lg text-neutral-300/80 font-normal leading-relaxed max-w-lg">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(OverallImpactSection);
