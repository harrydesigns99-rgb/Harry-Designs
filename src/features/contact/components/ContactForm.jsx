import { motion } from 'framer-motion';
import { useContactForm } from '../hooks/useContactForm';
import { TRANSITIONS } from '@/animations';

const ContactForm = () => {
  const { formData, isSubmitting, showSuccess, handleSubmit, handleChange } = useContactForm();

  return (
    <div className="border-t border-eerie/15 pt-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 font-medium"
          >
            ✓ Thank you! Your message has been sent. Hariharan will get back to you within 24 hours.
          </motion.div>
        )}

        <div>
          <label htmlFor="name" className="block text-xs uppercase tracking-[0.14em] font-semibold text-eerie/55 mb-3">
            Your Name *
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-0 py-3 bg-transparent border-b border-eerie/20 focus:border-crimson transition-all outline-none text-eerie placeholder-eerie/40 text-base"
            placeholder="e.g. Alex Morgan"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-[0.14em] font-semibold text-eerie/55 mb-3">
            Your Email *
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-0 py-3 bg-transparent border-b border-eerie/20 focus:border-crimson transition-all outline-none text-eerie placeholder-eerie/40 text-base"
            placeholder="alex@brand.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs uppercase tracking-[0.14em] font-semibold text-eerie/55 mb-3">
            Phone / WhatsApp (Optional)
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-0 py-3 bg-transparent border-b border-eerie/20 focus:border-crimson transition-all outline-none text-eerie placeholder-eerie/40 text-base"
            placeholder="+91 86101 74188"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs uppercase tracking-[0.14em] font-semibold text-eerie/55 mb-3">
            Project Scope &amp; Timeline *
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-0 py-3 bg-transparent border-b border-eerie/20 focus:border-crimson transition-all outline-none resize-none text-eerie placeholder-eerie/40 text-base"
            placeholder="Tell me about your brand, goals, deliverables needed, and timeline..."
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 12px 36px rgba(82, 99, 216, 0.25)',
          }}
          whileTap={{ scale: 0.98 }}
          data-cursor="Send"
          className="group relative w-full px-8 py-4 bg-crimson text-white font-semibold overflow-hidden hover:bg-crimson-dark transition-colors cursor-pointer flex items-center justify-center gap-3 disabled:opacity-75"
        >
          <span className="relative z-10 font-display tracking-wider uppercase text-sm">
            {isSubmitting ? 'Sending Message...' : 'Send Inquiry →'}
          </span>
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={TRANSITIONS.fast}
          />
        </motion.button>

        <div className="pt-3 text-center">
          <p className="text-xs text-eerie/50">
            Prefer direct messaging?{' '}
            <a
              href="https://wa.me/918610174188?text=Hi%20Hariharan,%20I'm%20interested%20in%20discussing%20a%20design%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson font-semibold hover:underline"
            >
              Chat on WhatsApp ↗
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
