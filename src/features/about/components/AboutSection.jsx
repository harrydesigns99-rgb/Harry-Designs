import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/audio';
import { useCMS } from '@/features/cms';

const CAPABILITIES = [
  {
    step: '01',
    title: 'Brand Identity Systems',
    desc: 'Bespoke marks, tailored typography, and scalable brand architecture engineered for recognition across physical and digital worlds.',
  },
  {
    step: '02',
    title: 'Creative UI/UX & Product Design',
    desc: 'Fluid mobile and web interfaces, intuitive user journeys, and tactile micro-interactions that make complex software feel effortless.',
  },
  {
    step: '03',
    title: 'Packaging & Physical Craft',
    desc: 'Distinctive box, label, and container dielines engineered for tactile unboxing rituals and high-contrast retail shelf standout.',
  },
  {
    step: '04',
    title: 'Design Systems & Conversion',
    desc: 'Modular Figma component libraries, tokenized design systems, and uncluttered visual hierarchy driving measurable commercial velocity.',
  },
];

const AboutSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cms = useCMS();
  const profile = cms.profile || {};

  const toggleExpanded = () => {
    sound.playPop();
    setIsExpanded(!isExpanded);
  };

  return (
    <section
      id="about"
      className="relative w-full bg-[#7a161c] text-[#f5f4f0] bg-dot-grid-cream py-16 sm:py-32 md:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Manifesto Statement */}
        <div className="max-w-5xl">
          <p className="font-serif text-xl xs:text-2xl sm:text-5xl md:text-6xl lg:text-[4.4rem] font-normal tracking-tight leading-[1.25] sm:leading-[1.1] text-[#f5f4f0]">
            Good design doesn&apos;t ask people to adapt to the brand. It understands how they already live, then{' '}
            <span className="italic font-light text-white underline decoration-[#FC7A69] underline-offset-8">
              finds its place
            </span>{' '}
            on the shelf and on their screens.
          </p>

          {/* Toggle Button matching shriyap.com */}
          <div className="mt-8 sm:mt-14">
            <button
              type="button"
              onClick={toggleExpanded}
              className="inline-flex items-center gap-3 px-6 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#1e1e20] hover:bg-black text-[#f5f4f0] font-sans text-xs sm:text-base font-medium tracking-wide transition-all shadow-xl hover:shadow-2xl cursor-pointer group"
            >
              <span>{isExpanded ? 'Close Studio Details' : 'More About Me'}</span>
              <svg
                width="18"
                height="18"
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
              className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-white/20 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
                {/* Left: Bio & Practice */}
                <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                  <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#FC7A69] font-bold">
                    ✦ STUDIO PHILOSOPHY
                  </span>
                  <h3 className="font-serif text-xl sm:text-3xl font-normal tracking-tight text-white leading-tight">
                    {profile.specialization ? `${profile.specialization}.` : 'Design engineered to convert.'}
                  </h3>
                  <p className="font-sans text-xs sm:text-base text-white/80 leading-relaxed font-normal">
                    Based in {profile.location ? profile.location.split('•')[0].trim() : 'Chennai'} and partnering with founders globally, {profile.name ? `${profile.name} (Harry Designs)` : 'Harry Designs'} practices equally across brand strategy (50%) and creative UI/UX product design (50%) — building distinctive visual identities and living digital interfaces.
                  </p>
                  <p className="font-sans text-xs sm:text-base text-white/80 leading-relaxed font-normal">
                    {profile.philosophy || 'From early concept to print-ready delivery, every design is built to be simple, memorable, and commercially effective.'}
                  </p>
                </div>

                {/* Right: 4 Capabilities Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-8">
                  {CAPABILITIES.map((cap) => (
                    <div
                      key={cap.step}
                      className="p-4 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1.5 sm:space-y-2"
                    >
                      <span className="font-mono text-xs text-[#FC7A69] font-bold">
                        {cap.step}
                      </span>
                      <h4 className="font-sans text-base sm:text-lg font-semibold text-white">
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
