import { motion } from 'framer-motion';
import { CONTACT_INFO } from '../data/contactData';
import { fadeInLeft, TRANSITIONS, DELAYS } from '@/animations';

const ContactInfo = ({ isInView }) => {
  return (
    <div className="space-y-6 mb-12">
      {CONTACT_INFO.map((info, index) => {
        const Icon = info.icon;
        return (
          <motion.div
            key={info.label}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInLeft}
            transition={{ delay: DELAYS.medium + index * DELAYS.tiny, ...TRANSITIONS.medium }}
            whileHover={{ x: 6, transition: { duration: 0.2 } }}
            className="flex items-center space-x-5 p-5 bg-cloud-white border border-eerie/15 transition-all duration-300 hover:border-crimson/50 hover:shadow-sm group"
          >
            <div className="w-12 h-12 flex items-center justify-center border border-eerie/15 bg-cloud-dancer text-crimson group-hover:bg-crimson group-hover:text-white transition-colors text-2xl flex-shrink-0">
              <Icon />
            </div>
            <div>
              <p className="text-xs text-eerie/50 uppercase tracking-[0.14em] font-semibold">{info.label}</p>
              {info.label === 'Email' ? (
                <a href={`mailto:${info.value}`} className="text-eerie text-base font-medium hover:text-crimson transition-colors block mt-0.5">
                  {info.value}
                </a>
              ) : info.label.includes('Phone') ? (
                <a href={`tel:${info.value.replace(/[^+\d]/g, '')}`} className="text-eerie text-base font-medium hover:text-crimson transition-colors block mt-0.5">
                  {info.value}
                </a>
              ) : (
                <p className="text-eerie text-base font-medium mt-0.5">{info.value}</p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ContactInfo;
