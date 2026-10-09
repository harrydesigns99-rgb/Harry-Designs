import { motion } from 'framer-motion';
import { NAV_LINKS } from '../data/navData';
import { TRANSITIONS, DELAYS, fadeInDown } from '@/animations';
import { sound } from '@/utils/audio';

const NavLinks = () => {
  return (
    <div className="hidden md:flex items-center gap-1">
      {NAV_LINKS.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.href}
          onClick={() => sound.playClick()}
          initial="hidden"
          animate="visible"
          variants={fadeInDown}
          transition={{ delay: DELAYS.tiny * index, ...TRANSITIONS.normal }}
          className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium text-[#1d1d1f]/75 hover:text-[#1d1d1f] hover:bg-black/[0.04] transition-all cursor-pointer"
        >
          {link.name}
        </motion.a>
      ))}
    </div>
  );
};

export default NavLinks;
