import { motion } from 'framer-motion';
import { SKILLS } from '../data/aboutData';
import { useIsMobile } from '@/hooks';
import { fadeInUp, TRANSITIONS, DELAYS } from '@/animations';

const SkillsGrid = ({ isInView }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay: DELAYS.medium, ...TRANSITIONS.slow }}
      className="mb-24"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 border-b border-black/[0.06] pb-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-mono text-[#86868b]">
            <span>●</span>
            <span>CORE COMPETENCIES</span>
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-[#1d1d1f]">
            Crafted for <span className="text-gradient">longevity.</span>
          </h3>
        </div>
        <p className="max-w-xs text-sm sm:text-base text-[#86868b] leading-relaxed">
          Disciplines developed across 6+ years of independent studio practice and high-growth commercial collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={
                !isMobile
                  ? {
                      y: -4,
                      transition: { duration: 0.2 },
                    }
                  : {}
              }
              className="group apple-card p-7 sm:p-8 bg-white border border-black/[0.08] hover:border-black/[0.2] flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-black/[0.06] bg-black/[0.02] text-crimson group-hover:bg-crimson group-hover:text-white transition-colors text-xl shadow-xs">
                    <Icon />
                  </div>
                  <span className="text-xs font-mono text-[#86868b]">
                    0{index + 1}
                  </span>
                </div>

                <h4 className="font-display text-xl font-medium text-[#1d1d1f] mb-2 leading-snug group-hover:text-crimson transition-colors tracking-tight">
                  {skill.title}
                </h4>
                <p className="text-sm text-[#86868b] leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="pt-4 border-t border-black/[0.04] flex items-center justify-between text-xs font-mono text-[#86868b] group-hover:text-[#1d1d1f] transition-colors">
                <span>Discipline // 0{index + 1}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SkillsGrid;
