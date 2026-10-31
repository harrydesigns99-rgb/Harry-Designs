import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { sound } from '@/utils/audio';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? 'bg-[#f5f4f0]/85 backdrop-blur-md shadow-xs border-b border-black/[0.05]'
            : 'bg-transparent'
        }`}
      >
        {/* Left: Brand Wordmark in Clash Display */}
        <a
          href="#introduction"
          onClick={() => sound.playClick()}
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#1e1e20] hover:opacity-80 transition-opacity"
        >
          Hariharan S
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#work"
            onClick={() => sound.playClick()}
            className="font-sans text-sm font-medium text-[#1e1e20]/80 hover:text-[#1e1e20] transition-colors"
          >
            Work
          </a>
          <a
            href="#about"
            onClick={() => sound.playClick()}
            className="font-sans text-sm font-medium text-[#1e1e20]/80 hover:text-[#1e1e20] transition-colors"
          >
            About Me
          </a>
          <a
            href="/resume"
            onClick={() => sound.playClick()}
            className="font-sans text-sm font-medium text-[#1e1e20]/80 hover:text-[#1e1e20] transition-colors"
          >
            Resume
          </a>

          {/* Pill CTA Button */}
          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="px-5 py-2.5 rounded-full bg-[#1e1e20] hover:bg-[#8b151b] text-[#f5f4f0] font-sans text-xs sm:text-sm font-medium tracking-wide transition-all shadow-xs hover:shadow-md hover:scale-105 cursor-pointer"
          >
            Get in Touch ↗
          </a>
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <button
            onClick={() => {
              sound.playClick();
              setIsOpen(!isOpen);
            }}
            className="p-2 rounded-full text-[#1e1e20] hover:bg-black/[0.05] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#f5f4f0] border-b border-black/[0.08] px-6 py-6 shadow-xl space-y-4"
          >
            <a
              href="#work"
              onClick={() => {
                sound.playClick();
                setIsOpen(false);
              }}
              className="block font-display text-xl font-bold text-[#1e1e20]"
            >
              Work
            </a>
            <a
              href="#about"
              onClick={() => {
                sound.playClick();
                setIsOpen(false);
              }}
              className="block font-display text-xl font-bold text-[#1e1e20]"
            >
              About Me
            </a>
            <a
              href="/resume"
              onClick={() => {
                sound.playClick();
                setIsOpen(false);
              }}
              className="block font-display text-xl font-bold text-[#1e1e20]"
            >
              Resume
            </a>
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => {
                  sound.playClick();
                  setIsOpen(false);
                }}
                className="inline-block px-6 py-3 rounded-full bg-[#1e1e20] text-[#f5f4f0] text-sm font-medium tracking-wide shadow-md"
              >
                Get in Touch ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
