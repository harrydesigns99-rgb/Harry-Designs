import { motion } from 'framer-motion';
import { SITE_INFO, FOOTER_LINKS } from '../data/navData';
import { TRANSITIONS, DELAYS } from '@/animations';
import AnimatedBackdrop from '@/components/AnimatedBackdrop';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-eerie text-white py-10 border-t border-white/10">
      <AnimatedBackdrop tone="dark" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            data-cursor="Home"
            className="inline-block text-2xl font-display font-semibold text-white tracking-[-0.04em] mb-4"
          >
            {SITE_INFO.name}
          </motion.a>

          <p className="text-stone-500 mb-6 max-w-xs">{SITE_INFO.tagline}</p>

          {/* Quick Links */}
          <motion.div
            className="flex flex-wrap md:justify-end gap-x-8 gap-y-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {FOOTER_LINKS.map((link, index) => (
              <motion.a
                key={link}
                href={link === 'Resume' ? '/resume' : `#${link.toLowerCase()}`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * DELAYS.tiny, ...TRANSITIONS.fast }}
                data-cursor="Navigate"
                className="text-stone-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {SITE_INFO.currentYear} {SITE_INFO.fullName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/admin');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-stone-500 hover:text-crimson font-mono transition-colors text-[11px] uppercase tracking-wider flex items-center gap-1.5"
              title="Open Studio Content Management System (⌘K)"
            >
              <span>⚙</span> Studio CMS
            </a>
            <p>
              Designed &amp; Crafted by{' '}
              <span className="text-white font-medium">Hariharan S</span> • Independent Designer
            </p>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-crimson" />
    </footer>
  );
};

export default Footer;
