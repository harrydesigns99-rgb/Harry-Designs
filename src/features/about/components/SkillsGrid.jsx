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
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 border-b border-eerie/15 pb-6">
        <div>
          <span className="section-kicker mb-4">Core competencies</span>
          <h3 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-eerie">
            Crafted for <span className="text-gradient">longevity.</span>
          </h3>
        </div>
        <p className="max-w-xs text-sm text-eerie/60 leading-relaxed">
          Disciplines developed across 6+ years of independent practice and enterprise collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                delay: index * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                !isMobile
                  ? {
                      y: -6,
                      transition: { duration: 0.25 },
                    }
                  : {}
              }
              className="group relative p-7 bg-cloud-white border border-eerie/15 transition-all duration-300 hover:border-crimson/50 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 flex items-center justify-center border border-eerie/15 bg-cloud-dancer text-crimson group-hover:bg-crimson group-hover:text-white transition-colors text-xl">
                    <Icon />
                  </div>
                  <span className="text-xs font-mono text-eerie/40 tracking-widest">
                    0{index + 1}
                  </span>
                </div>

                <h4 className="font-display text-xl font-medium text-eerie mb-3 leading-snug group-hover:text-crimson transition-colors">
                  {skill.title}
                </h4>
                <p className="text-sm text-eerie/70 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-eerie/10 flex items-center justify-between text-xs text-eerie/40 group-hover:text-crimson transition-colors">
                <span className="uppercase tracking-[0.14em]">Explore Discipline</span>
                <span className="text-base transition-transform group-hover:translate-x-1">→</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SkillsGrid;
