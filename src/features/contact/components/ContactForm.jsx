import { motion } from 'framer-motion';
import { useContactForm } from '../hooks/useContactForm';
import { sound } from '@/utils/audio';

const ContactForm = () => {
  const {
    formData,
    getWhatsAppLink,
    isSubmitting,
    showSuccess,
    handleSubmit,
    handleChange,
  } = useContactForm();

  return (
    <div className="w-full text-[#1d1d1f]">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 font-medium text-sm"
          >
            ✓ Thank you! Your inquiry has been received. Hariharan will get back to you within 24 hours.
          </motion.div>
        )}

        {/* Client Details */}
        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-wider font-mono font-medium text-[#86868b] mb-2">
              Your Name *
            </label>
            <motion.input
              whileFocus={{ scale: 1.002 }}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-black/[0.03] border border-black/[0.08] focus:border-crimson focus:bg-white transition-all outline-none text-[#1d1d1f] placeholder-[#86868b]/60 text-sm sm:text-base"
              placeholder="e.g. Alex Morgan"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-wider font-mono font-medium text-[#86868b] mb-2">
                Your Email *
              </label>
              <motion.input
                whileFocus={{ scale: 1.002 }}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl bg-black/[0.03] border border-black/[0.08] focus:border-crimson focus:bg-white transition-all outline-none text-[#1d1d1f] placeholder-[#86868b]/60 text-sm sm:text-base"
                placeholder="alex@brand.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-wider font-mono font-medium text-[#86868b] mb-2">
                Phone / WhatsApp (Optional)
              </label>
              <motion.input
                whileFocus={{ scale: 1.002 }}
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl bg-black/[0.03] border border-black/[0.08] focus:border-crimson focus:bg-white transition-all outline-none text-[#1d1d1f] placeholder-[#86868b]/60 text-sm sm:text-base"
                placeholder="+91 86101 74188"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-wider font-mono font-medium text-[#86868b] mb-2">
              Brief Description &amp; Objectives *
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.002 }}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 rounded-2xl bg-black/[0.03] border border-black/[0.08] focus:border-crimson focus:bg-white transition-all outline-none resize-none text-[#1d1d1f] placeholder-[#86868b]/60 text-sm sm:text-base"
              placeholder="Tell me about your brand, key deliverables, and vision..."
            />
          </div>
        </div>

        {/* Action CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            data-cursor="Send"
            className="w-full px-6 py-4 rounded-full bg-crimson text-white font-medium text-xs sm:text-sm uppercase tracking-wider hover:bg-crimson-dark transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 text-center"
          >
            <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Commission Inquiry →'}</span>
          </motion.button>

          <motion.a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => sound.playPop()}
            className="w-full px-6 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-center"
          >
            <span>💬 Chat on WhatsApp</span>
            <span aria-hidden="true">↗</span>
          </motion.a>
        </div>

        {/* Studio Response Guarantee */}
        <div className="pt-1 text-center">
          <p className="text-xs text-[#86868b] flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
            <span>Direct studio access • All NDA &amp; commercial rights guaranteed • 24-hr response</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
