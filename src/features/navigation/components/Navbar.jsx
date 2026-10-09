import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { SITE_INFO } from '../data/navData';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import { slideInFromTop, scaleIn, hoverScale, TRANSITIONS, DELAYS } from '@/animations';
import { sound } from '@/utils/audio';
import StudioTelemetry from '@/components/StudioTelemetry';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={slideInFromTop}
      transition={{ ...TRANSITIONS.medium, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 pointer-events-none flex flex-col items-center"
    >
      {/* Studio Telemetry Bar at top */}
      <div className="w-full pointer-events-auto">
        <StudioTelemetry />
      </div>

      {/* Floating Apple Frosted Glass Pill Navbar */}
      <div className="w-full max-w-5xl px-4 sm:px-6 pt-2.5 sm:pt-3 pointer-events-auto">
        <div className="apple-glass rounded-full px-4 sm:px-6 py-2 sm:py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/[0.08] flex items-center justify-between">
          {/* Logo Mark */}
          <motion.a
            href="#home"
            whileHover={hoverScale}
            onClick={() => sound.playClick()}
            aria-label={`${SITE_INFO.fullName} - Home`}
            data-cursor="Home"
            className="inline-flex items-center gap-2.5 text-base font-display font-medium text-[#1d1d1f] tracking-tight"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-crimson text-xs font-bold text-white shadow-xs">
              H
            </span>
            <span className="font-semibold">{SITE_INFO.name}</span>
          </motion.a>

          {/* Desktop Navigation Links */}
          <NavLinks />

          {/* Right Action: Availability & Let's Talk CTA */}
          <div className="flex items-center gap-3">
            <span className="hidden xl:inline-flex items-center gap-1.5 text-[11px] font-mono text-[#86868b]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Q3/Q4
            </span>

            <motion.a
              href="#contact"
              onClick={() => sound.playClick()}
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              transition={{ delay: DELAYS.xl, ...TRANSITIONS.normal }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-cursor="Contact"
              className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full bg-crimson text-white text-xs font-medium tracking-wide hover:bg-crimson-dark transition-all shadow-xs cursor-pointer"
            >
              Let&apos;s Talk ↗
            </motion.a>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <motion.button
                onClick={() => {
                  sound.playClick();
                  setIsOpen(!isOpen);
                }}
                whileTap={{ scale: 0.9 }}
                className="text-[#1d1d1f] p-1.5 rounded-full hover:bg-black/[0.05] transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <HiX size={22} /> : <HiMenu size={22} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Sheet */}
        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </motion.nav>
  );
};

export default Navbar;
