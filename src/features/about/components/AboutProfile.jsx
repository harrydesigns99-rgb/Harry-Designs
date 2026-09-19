import { motion } from 'framer-motion';

const AboutProfile = ({ isInView }) => {
  return (
    <div className="order-1 lg:order-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md mx-auto lg:max-w-none flex justify-center"
      >
        <div className="relative p-0 md:p-4 group w-full max-w-md">
          {/* Subtle warm ambient halo */}
          <div className="absolute inset-8 bg-gradient-to-br from-crimson/15 to-[#d4775c]/15 blur-3xl pointer-events-none" />

          {/* Master Atelier Visual Presentation */}
          <div className="relative overflow-hidden bg-eerie aspect-[4/5] border border-eerie/20 shadow-2xl flex flex-col justify-between p-8 sm:p-10 text-white">
            {/* Top Bar: Coordinates & Craft Seal */}
            <div className="flex items-center justify-between border-b border-white/15 pb-5">
              <div>
                <span className="text-[0.62rem] uppercase tracking-[0.2em] text-white/50 block">Studio Coordinates</span>
                <span className="text-xs font-mono text-white/80 tracking-wider">Chennai, TN • 13.08° N</span>
              </div>
              <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-serif italic text-crimson-light">
                H
              </div>
            </div>

            {/* Center: Bespoke Monogram & Typographic Art Direction */}
            <div className="my-auto py-8 text-center relative">
              <div className="inline-block relative mb-4">
                <span className="font-display text-7xl sm:text-8xl md:text-9xl font-semibold tracking-tighter text-white/90">
                  H<span className="text-crimson">.</span>
                </span>
                <div className="absolute -bottom-2 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-crimson to-transparent" />
              </div>
              <p className="font-display text-xl sm:text-2xl font-medium tracking-tight text-white mt-2">
                Hariharan S
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-white/55 mt-1 font-sans">
                Brand &amp; Packaging Designer
              </p>
            </div>

            {/* Bottom Meta & Availability Badge */}
            <div className="border-t border-white/15 pt-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="uppercase tracking-[0.14em] text-[0.65rem] text-white/45">Experience</span>
                <span className="font-medium text-white">6+ Years Practice</span>
              </div>
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="uppercase tracking-[0.14em] text-[0.65rem] text-white/45">Specialization</span>
                <span className="font-medium text-white">Packaging &amp; Identity</span>
              </div>
              <div className="pt-2 flex items-center gap-2 text-[0.68rem] text-emerald-400 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Select Client Projects</span>
              </div>
            </div>

            {/* Fine framing border */}
            <div className="absolute inset-2 border border-white/10 pointer-events-none" />
          </div>

          {/* Floating Editorial Label Tag */}
          <div className="relative z-20 -mt-8 ml-6 md:ml-8 max-w-[17rem] bg-cloud-white p-4 border border-eerie/15 shadow-xl">
            <p className="font-display text-base font-semibold text-eerie">Creative Direction</p>
            <p className="mt-0.5 text-[0.68rem] uppercase tracking-[0.14em] text-eerie/55">
              Crafting identities with commercial lift
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutProfile;
