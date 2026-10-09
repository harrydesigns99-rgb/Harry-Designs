import { motion } from 'framer-motion';
import { useContactForm } from '../hooks/useContactForm';
import { sound } from '@/utils/audio';

const SERVICE_OPTIONS = [
  'Packaging Architecture',
  'Brand Identity',
  'Art Direction',
  'Digital / UI UX',
  'Label Systems',
  'Publication & Print',
];

const TIMELINE_OPTIONS = [
  'Immediate (< 1 mo)',
  'Standard (1-2 mo)',
  'Q4 / Flexible',
];

const BUDGET_OPTIONS = [
  '₹1.5L - ₹3L ($2K - $4K)',
  '₹3L - ₹6L ($4K - $8K)',
  '₹6L+ ($8K+)',
];

const ContactForm = () => {
  const {
    formData,
    selectedServices,
    selectedTimeline,
    selectedBudget,
    toggleService,
    selectTimeline,
    selectBudget,
    getWhatsAppLink,
    isSubmitting,
    showSuccess,
    handleSubmit,
    handleChange,
  } = useContactForm();

  return (
    <div className="w-full text-[#1d1d1f]">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 font-medium text-sm"
          >
            ✓ Thank you! Your inquiry and project scope have been received. Hariharan will get back to you within 24 hours.
          </motion.div>
        )}

        {/* 1. Services Pill Selector */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs uppercase tracking-wider font-mono font-medium text-[#86868b]">
              1. Required Capabilities &amp; Scope
            </label>
            <span className="text-[11px] text-[#86868b] font-mono">
              {selectedServices.length} selected
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SERVICE_OPTIONS.map((service) => {
              const isSelected = selectedServices.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    toggleService(service);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-crimson text-white shadow-xs'
                      : 'bg-black/[0.04] text-[#1d1d1f]/80 hover:bg-black/[0.08] border border-black/[0.05]'
                  }`}
                >
                  <span className="mr-1.5 opacity-80">{isSelected ? '✓' : '+'}</span>
                  {service}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Timeline & Budget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Timeline Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono font-medium text-[#86868b] mb-3">
              2. Target Launch Timeline
            </label>
            <div className="flex flex-wrap gap-2">
              {TIMELINE_OPTIONS.map((timeline) => {
                const isSelected = selectedTimeline === timeline;
                return (
                  <button
                    key={timeline}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      selectTimeline(timeline);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1d1d1f] text-white shadow-xs'
                        : 'bg-black/[0.04] text-[#1d1d1f]/80 hover:bg-black/[0.08] border border-black/[0.05]'
                    }`}
                  >
                    {timeline}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-mono font-medium text-[#86868b] mb-3">
              3. Estimated Budget Allocation
            </label>
            <div className="flex flex-wrap gap-2">
              {BUDGET_OPTIONS.map((budget) => {
                const isSelected = selectedBudget === budget;
                return (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      selectBudget(budget);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1d1d1f] text-white shadow-xs'
                        : 'bg-black/[0.04] text-[#1d1d1f]/80 hover:bg-black/[0.08] border border-black/[0.05]'
                    }`}
                  >
                    {budget}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Client Details */}
        <div className="space-y-6 pt-4 border-t border-black/[0.06]">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              rows="4"
              className="w-full px-4 py-3 rounded-2xl bg-black/[0.03] border border-black/[0.08] focus:border-crimson focus:bg-white transition-all outline-none resize-none text-[#1d1d1f] placeholder-[#86868b]/60 text-sm sm:text-base"
              placeholder="Tell me about your brand, current bottlenecks, key deliverables, and vision..."
            />
          </div>
        </div>

        {/* Submit CTA */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          data-cursor="Send"
          className="w-full px-8 py-4 rounded-full bg-crimson text-white font-medium text-xs sm:text-sm uppercase tracking-wider hover:bg-crimson-dark transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
        >
          <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Commission Inquiry →'}</span>
        </motion.button>

        {/* WhatsApp & Direct Channels */}
        <div className="pt-2 text-center">
          <p className="text-xs text-[#86868b]">
            Prefer direct messaging?{' '}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson font-medium hover:underline inline-flex items-center gap-1"
            >
              <span>Chat on WhatsApp with pre-filled scope</span>
              <span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
