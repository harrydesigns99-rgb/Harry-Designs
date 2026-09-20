import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useScrollEffect } from '../hooks/useScrollEffect';
import { SITE_INFO } from '../data/navData';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import { slideInFromTop, scaleIn, hoverScale, TRANSITIONS, DELAYS } from '@/animations';
import { cn } from '@/utils';
import StudioTelemetry from '@/components/StudioTelemetry';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrollEffect();

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={slideInFromTop}
      transition={{ ...TRANSITIONS.medium, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isOpen
          ? 'bg-cloud-dancer'
          : (scrolled
            ? 'bg-cloud-dancer/95 backdrop-blur-xl border-b border-eerie/10 shadow-lg shadow-eerie/10'
            : 'bg-transparent')
      )}
    >
      <StudioTelemetry />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={hoverScale}
            aria-label={`${SITE_INFO.fullName} - Home`}
            data-cursor="Home"
            className="inline-flex items-center gap-3 text-xl font-display font-semibold text-eerie tracking-[-0.04em]"
          >
            <span className="flex h-8 w-8 items-center justify-center bg-crimson text-sm text-white">H</span>
            {SITE_INFO.name}
          </motion.a>

          {/* Desktop Navigation */}
          <NavLinks />

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <span className="hidden xl:inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.12em] text-eerie/55 whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Available for select projects
            </span>
            <motion.a
              href="#contact"
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              transition={{ delay: DELAYS.xl, ...TRANSITIONS.normal }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(82, 99, 216, 0.25)' }}
              whileTap={{ scale: 0.95 }}
              data-cursor="Contact"
              className="px-5 py-3 bg-crimson text-white font-semibold text-sm hover:bg-crimson-dark transition-colors"
            >
              Let&apos;s Talk
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className="text-eerie hover:text-crimson focus:outline-none p-1 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </motion.nav>
  );
};

export default Navbar;
