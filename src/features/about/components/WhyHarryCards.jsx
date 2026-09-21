import { motion } from 'framer-motion';
import { WHY_HARRY } from '../data/aboutData';
import { TRANSITIONS } from '@/animations';

const WhyHarryCards = ({ isInView }) => {
  return (
    <div className="mb-20 md:mb-28">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 border-b border-eerie/15 pb-6">
        <div>
          <span className="section-kicker mb-5">Why work together</span>
          <h3 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.06em] text-eerie">Good work, without the noise.</h3>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-eerie/60">A thoughtful partner from first brief to final delivery, with care for the idea and the details.</p>
      </div>

      <div className="divide-y divide-eerie/15 border-y border-eerie/15">
        {WHY_HARRY.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <motion.article
              key={reason.title}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ delay: index * 0.1, ...TRANSITIONS.medium }}
              className="group grid grid-cols-[3.25rem_1fr] md:grid-cols-[5rem_1fr_2rem] items-center gap-4 sm:gap-5 py-6 md:py-8 hover:px-3 transition-all duration-300"
            >
              <div className="flex h-11 w-11 items-center justify-center border border-eerie/20 text-crimson group-hover:bg-crimson group-hover:text-white transition-colors">
                <Icon className="text-lg" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-xl sm:text-2xl text-eerie group-hover:text-crimson-dark transition-colors">
                    {reason.title}
                  </h4>
                  <span className="md:hidden text-lg text-eerie/40 group-hover:text-crimson transition-colors">↗</span>
                </div>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-eerie/60">{reason.description}</p>
              </div>
              <span className="hidden md:inline-block text-xl text-eerie/40 group-hover:text-crimson transition-colors text-right">↗</span>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
};

export default WhyHarryCards;
