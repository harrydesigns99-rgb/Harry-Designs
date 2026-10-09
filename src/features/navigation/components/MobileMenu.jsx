import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../data/navData';
import { TRANSITIONS, DELAYS, fadeInLeft, menuSlide } from '@/animations';
import { sound } from '@/utils/audio';

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
        className="md:hidden mt-2 p-3 rounded-3xl apple-glass shadow-2xl border border-black/[0.08] backdrop-blur-2xl"
      >
        <div className="space-y-1">
          {NAV_LINKS.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              transition={{ delay: DELAYS.tiny * index, ...TRANSITIONS.fast }}
              className="block px-4 py-2.5 rounded-2xl text-sm font-medium text-[#1d1d1f] hover:bg-black/[0.04] transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <div className="pt-2">
            <motion.a
              href="#contact"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              transition={{ delay: DELAYS.large, ...TRANSITIONS.fast }}
              className="block w-full py-3 rounded-full bg-crimson text-white text-xs font-semibold uppercase tracking-wider text-center hover:bg-crimson-dark transition-colors shadow-sm"
            >
              Let&apos;s Talk ↗
            </motion.a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileMenu;
