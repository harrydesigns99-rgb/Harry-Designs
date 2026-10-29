import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/audio';
import WordReveal from '@/components/WordReveal';

const ContactSection = () => {
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyEmail = () => {
    sound.playPop();
    navigator.clipboard.writeText('harrydesigns99@gmail.com');
    showToast('copied to clipboard: harrydesigns99@gmail.com');
    setTimeout(() => {
      window.location.href = 'mailto:harrydesigns99@gmail.com';
    }, 600);
  };

  const handleWhatsApp = () => {
    sound.playClick();
    window.open('https://wa.me/918610174188?text=Hi%20Hariharan,%20I%20would%20like%20to%20discuss%20a%20design%20project.', '_blank');
  };

  const handleLinkedIn = () => {
    sound.playClick();
    window.open('https://www.linkedin.com/in/hariharan-s-design/', '_blank');
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#7a161c] text-[#f5f4f0] bg-dot-grid-cream py-24 sm:py-32 md:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f4f0]/75 font-semibold block mb-2">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f5f4f0]">
            <WordReveal text="Let's build something durable." />
          </h2>
        </div>

        {/* Contact Table Rows matching shriyap.com */}
        <div className="divide-y divide-white/20 border-y border-white/20">
          {/* Row 1: Email */}
          <div
            onClick={handleCopyEmail}
            data-cursor="COPY EMAIL 📋"
            className="group py-8 sm:py-10 flex items-center justify-between cursor-pointer transition-all duration-300 hover:px-4"
          >
            <span className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#f5f4f0] group-hover:text-white transition-colors">
              drop me a direct <strong className="font-bold underline decoration-[#FC7A69] underline-offset-8">email</strong>
            </span>
            <span className="flex items-center gap-2 text-sm sm:text-base font-mono uppercase tracking-wider text-[#f5f4f0]/75 group-hover:text-white">
              <span className="hidden sm:inline">copy &amp; write</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </div>

          {/* Row 2: WhatsApp / Call */}
          <div
            onClick={handleWhatsApp}
            data-cursor="CHAT ON WHATSAPP ↗"
            className="group py-8 sm:py-10 flex items-center justify-between cursor-pointer transition-all duration-300 hover:px-4"
          >
            <span className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#f5f4f0] group-hover:text-white transition-colors">
              direct <strong className="font-bold underline decoration-[#FC7A69] underline-offset-8">WhatsApp / call</strong>
            </span>
            <span className="flex items-center gap-2 text-sm sm:text-base font-mono uppercase tracking-wider text-[#f5f4f0]/75 group-hover:text-white">
              <span className="hidden sm:inline">+91 86101 74188</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </div>

          {/* Row 3: LinkedIn */}
          <div
            onClick={handleLinkedIn}
            data-cursor="OPEN LINKEDIN ↗"
            className="group py-8 sm:py-10 flex items-center justify-between cursor-pointer transition-all duration-300 hover:px-4"
          >
            <span className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#f5f4f0] group-hover:text-white transition-colors">
              connect on <strong className="font-bold underline decoration-[#FC7A69] underline-offset-8">LinkedIn</strong>
            </span>
            <span className="flex items-center gap-2 text-sm sm:text-base font-mono uppercase tracking-wider text-[#f5f4f0]/75 group-hover:text-white">
              <span className="hidden sm:inline">professional profile</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </div>
        </div>

        {/* Studio Location & Availability Footer */}
        <div className="mt-14 sm:mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#f5f4f0]/70">
          <p>© {new Date().getFullYear()} Hariharan S • Harry Designs. All rights reserved.</p>
          <p>Based in Chennai, India • Practicing Globally</p>
        </div>
      </div>

      {/* Floating Copy Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-8 inset-x-0 mx-auto w-max px-6 py-3 rounded-full bg-[#1e1e20] text-white font-mono text-xs shadow-2xl z-50 border border-white/20 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#FC7A69] animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactSection;
