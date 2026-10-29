import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/audio';

const CAPABILITIES = [
  {
    step: '01',
    title: 'Brand Identity Architecture',
    desc: 'Bespoke insignia, typographic systems, brand tokens, and comprehensive master brand guidelines built for enduring commercial authority.',
  },
  {
    step: '02',
    title: 'Packaging & Dieline Engineering',
    desc: 'CAD dielines, structural folding geometry, pouch margins, and 8-color CI-Flexo press supervision calibrated for high-velocity grocery aisles.',
  },
  {
    step: '03',
    title: 'Tactile Finishes & Materiality',
    desc: 'Multi-level brass die debossing, Kurz hot-foil stamping, selective UV gloss curing, and FSC-certified cotton paperboard curation.',
  },
  {
    step: '04',
    title: 'Retail Standout & Velocity',
    desc: 'Supermarket aisle standout diagnostics that eliminate visual noise and convert shoppers in under two seconds.',
  },
];

const AboutSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    sound.playPop();
    setIsExpanded(!isExpanded);
  };

  return (
    <section
      id="about"
      className="relative w-full bg-[#3f9157] text-[#f5f4f0] bg-dot-grid-cream py-24 sm:py-32 md:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Manifesto Statement */}
        <div className="max-w-5xl">
          <p className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4.6rem] font-medium tracking-tight leading-[1.08] text-[#f5f4f0]">
            Good design doesn&apos;t ask people to adapt to the brand. It understands how they already live, then{' '}
            <span className="font-serif italic font-light text-white underline decoration-[#FC7A69] underline-offset-8">
              finds its place
            </span>{' '}
            on the shelf.
          </p>

          {/* Toggle Button matching shriyap.com */}
          <div className="mt-10 sm:mt-14">
            <button
              type="button"
              onClick={toggleExpanded}
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-[#1e1e20] hover:bg-black text-[#f5f4f0] font-sans text-sm sm:text-base font-medium tracking-wide transition-all shadow-xl hover:shadow-2xl cursor-pointer group"
            >
              <span>{isExpanded ? 'close studio details' : 'more about me'}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${
                  isExpanded ? 'rotate-90' : 'group-hover:translate-x-1.5'
                }`}
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Expandable Studio Detail Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 sm:mt-20 pt-12 border-t border-white/20 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                {/* Left: Bio & Practice */}
                <div className="lg:col-span-5 space-y-5">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FC7A69] font-semibold">
                    Studio Philosophy
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Translating founder ambition into tangible shelf velocity.
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                    Based in Chennai and partnering with forward-looking brands across India and globally, Hariharan S operates as an independent brand and packaging architect.
                  </p>
                  <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                    Every project bridges raw brand strategy with tactile industrial printing — mastering CAD dielines, barrier substrates, and Pantone spot formulations so your identity dominates competitive aisles.
                  </p>
                </div>

                {/* Right: 4 Capabilities Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {CAPABILITIES.map((cap) => (
                    <div
                      key={cap.step}
                      className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2"
                    >
                      <span className="font-mono text-xs text-[#FC7A69] font-bold">
                        {cap.step}
                      </span>
                      <h4 className="font-display text-base sm:text-lg font-bold text-white">
                        {cap.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-white/75 leading-relaxed font-normal">
                        {cap.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AboutSection;
