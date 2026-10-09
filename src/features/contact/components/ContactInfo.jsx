import { motion } from 'framer-motion';
import { CONTACT_INFO } from '../data/contactData';
import { fadeInLeft, TRANSITIONS, DELAYS } from '@/animations';

const ContactInfo = ({ isInView }) => {
  return (
    <div className="space-y-4 mb-12">
      {CONTACT_INFO.map((info, index) => {
        const Icon = info.icon;
        return (
          <motion.div
            key={info.label}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInLeft}
            transition={{ delay: DELAYS.medium + index * DELAYS.tiny, ...TRANSITIONS.medium }}
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
            className="flex items-center space-x-5 p-5 sm:p-6 apple-card bg-white border border-black/[0.08] hover:border-black/[0.2] group transition-all"
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-black/[0.06] bg-black/[0.02] text-crimson group-hover:bg-crimson group-hover:text-white transition-colors text-xl flex-shrink-0 shadow-xs">
              <Icon />
            </div>
            <div>
              <p className="text-xs text-[#86868b] uppercase tracking-wider font-mono font-medium">{info.label}</p>
              {info.label === 'Email' ? (
                <a href={`mailto:${info.value}`} className="text-[#1d1d1f] text-base font-medium hover:text-crimson transition-colors block mt-0.5">
                  {info.value}
                </a>
              ) : info.label.includes('Phone') ? (
                <a href={`tel:${info.value.replace(/[^+\d]/g, '')}`} className="text-[#1d1d1f] text-base font-medium hover:text-crimson transition-colors block mt-0.5">
                  {info.value}
                </a>
              ) : (
                <p className="text-[#1d1d1f] text-base font-medium mt-0.5">{info.value}</p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ContactInfo;
