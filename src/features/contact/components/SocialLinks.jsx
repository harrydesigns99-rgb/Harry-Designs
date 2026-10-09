import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../data/contactData';
import { fadeInUp, TRANSITIONS, DELAYS } from '@/animations';

const SocialLinks = ({ isInView }) => {
  return (
    <div className="mt-10">
      <h4 className="text-sm uppercase tracking-wider font-mono text-[#86868b] mb-4">
        Direct Studio Channels
      </h4>
      <div className="flex gap-3">
        {SOCIAL_LINKS.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.url}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ delay: DELAYS.xxl + index * DELAYS.tiny, ...TRANSITIONS.medium }}
              className="relative w-12 h-12 rounded-full border border-black/[0.08] bg-white flex items-center justify-center text-crimson hover:bg-crimson hover:text-white transition-all text-lg shadow-xs hover:shadow-md cursor-pointer"
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;
