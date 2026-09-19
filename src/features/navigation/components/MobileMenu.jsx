import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../data/navData';
import { TRANSITIONS, DELAYS, fadeInLeft, menuSlide } from '@/animations';

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={menuSlide}
        transition={TRANSITIONS.fast}
        className="md:hidden relative z-[100] bg-cloud-dancer/98 backdrop-blur-xl border-t border-eerie/10 shadow-xl"
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {NAV_LINKS.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={onClose}
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              transition={{ delay: DELAYS.tiny * index, ...TRANSITIONS.fast }}
              className="block px-4 py-3 text-base font-display font-medium text-eerie hover:text-crimson hover:bg-eerie/5 transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            onClick={onClose}
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            transition={{ delay: DELAYS.large, ...TRANSITIONS.fast }}
            className="block mt-4 px-4 py-3.5 bg-crimson text-white font-semibold text-center hover:bg-crimson-dark transition-colors"
          >
            Let&apos;s Talk ↗
          </motion.a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileMenu;
