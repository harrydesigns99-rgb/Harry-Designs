import { motion } from 'framer-motion';
import { useContactForm } from '../hooks/useContactForm';
import { TRANSITIONS } from '@/animations';

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
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 font-medium text-sm"
          >
            ✓ Thank you! Your inquiry and project scope have been received. Hariharan will get back to you within 24 hours.
          </motion.div>
        )}

        {/* 1. Services Pill Selector */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs uppercase tracking-[0.14em] font-semibold text-eerie/65">
              1. Required Capabilities &amp; Scope
            </label>
            <span className="text-[11px] text-eerie/45 font-mono">
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
                  onClick={() => toggleService(service)}
                  className={`px-3.5 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-crimson text-white border border-crimson shadow-sm'
                      : 'bg-transparent text-eerie/70 border border-eerie/20 hover:border-eerie hover:text-eerie'
                  }`}
                >
                  <span className="mr-1.5 opacity-70">{isSelected ? '✓' : '+'}</span>
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
            <label className="block text-xs uppercase tracking-[0.14em] font-semibold text-eerie/65 mb-3">
              2. Target Launch Timeline
            </label>
            <div className="flex flex-wrap gap-2">
              {TIMELINE_OPTIONS.map((timeline) => {
                const isSelected = selectedTimeline === timeline;
                return (
                  <button
                    key={timeline}
                    type="button"
                    onClick={() => selectTimeline(timeline)}
                    className={`px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-eerie text-white border border-eerie shadow-sm'
                        : 'bg-transparent text-eerie/70 border border-eerie/20 hover:border-eerie hover:text-eerie'
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
            <label className="block text-xs uppercase tracking-[0.14em] font-semibold text-eerie/65 mb-3">
              3. Estimated Budget Allocation
            </label>
            <div className="flex flex-wrap gap-2">
              {BUDGET_OPTIONS.map((budget) => {
                const isSelected = selectedBudget === budget;
                return (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => selectBudget(budget)}
                    className={`px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-eerie text-white border border-eerie shadow-sm'
                        : 'bg-transparent text-eerie/70 border border-eerie/20 hover:border-eerie hover:text-eerie'
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
        <div className="space-y-6 pt-4 border-t border-eerie/10">
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-[0.14em] font-semibold text-eerie/55 mb-2">
              Your Name *
            </label>
            <motion.input
              whileFocus={{ scale: 1.005 }}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-[0.14em] font-semibold text-eerie/55 mb-2">
                Your Email *
              </label>
              <motion.input
                whileFocus={{ scale: 1.005 }}
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
              <label htmlFor="phone" className="block text-xs uppercase tracking-[0.14em] font-semibold text-eerie/55 mb-2">
                Phone / WhatsApp (Optional)
              </label>
              <motion.input
                whileFocus={{ scale: 1.005 }}
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-0 py-3 bg-transparent border-b border-eerie/20 focus:border-crimson transition-all outline-none text-eerie placeholder-eerie/40 text-base"
                placeholder="+91 86101 74188"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-[0.14em] font-semibold text-eerie/55 mb-2">
              Brief Description &amp; Objectives *
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.005 }}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-0 py-3 bg-transparent border-b border-eerie/20 focus:border-crimson transition-all outline-none resize-none text-eerie placeholder-eerie/40 text-base"
              placeholder="Tell me about your brand, current bottlenecks, key deliverables, and vision..."
            />
          </div>
        </div>

        {/* Submit CTA */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{
            scale: 1.01,
            boxShadow: '0 12px 36px rgba(82, 99, 216, 0.25)',
          }}
          whileTap={{ scale: 0.99 }}
          data-cursor="Send"
          className="group relative w-full px-8 py-4 bg-crimson text-white font-semibold overflow-hidden hover:bg-crimson-dark transition-colors cursor-pointer flex items-center justify-center gap-3 disabled:opacity-75"
        >
          <span className="relative z-10 font-display tracking-wider uppercase text-sm">
            {isSubmitting ? 'Submitting Inquiry...' : 'Submit Commission Inquiry →'}
          </span>
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={TRANSITIONS.fast}
          />
        </motion.button>

        {/* WhatsApp & Direct Channels */}
        <div className="pt-2 text-center">
          <p className="text-xs text-eerie/60">
            Prefer direct messaging?{' '}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson font-semibold hover:underline inline-flex items-center gap-1"
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
