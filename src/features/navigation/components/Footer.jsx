import { motion } from 'framer-motion';
import { SITE_INFO, FOOTER_LINKS } from '../data/navData';
import { TRANSITIONS, DELAYS } from '@/animations';

const Footer = () => {
  return (
    <footer className="relative bg-eerie text-white py-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="flex flex-wrap md:justify-end gap-x-6 gap-y-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {FOOTER_LINKS.map((link, index) => (
              <motion.a
                key={link}
                href={link === 'Resume' ? '/resume' : `#${link.toLowerCase()}`}
                whileHover={{ y: -2, color: '#D72638' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * DELAYS.tiny, ...TRANSITIONS.fast }}
                  data-cursor="Navigate"
                  className="text-stone-400 hover:text-crimson transition-colors text-sm"
              >
                {link}
              </motion.a>
            ))}
          </motion.div>

          <div className="border-t border-white/10 pt-6 mt-2 w-full md:absolute md:left-0 md:right-0 md:bottom-0 md:translate-y-full">
            <p className="text-stone-500 text-xs">
              © {SITE_INFO.currentYear} {SITE_INFO.fullName}. All rights reserved.
              <span className="block mt-2">
                Designed and developed by{' '}
                  <a href="https://jaywebstudio.in" target="_blank" rel="noopener noreferrer" className="text-crimson hover:text-crimson-light transition-colors font-medium">
                  Jaywebstudio
                </a>
              </span>
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
