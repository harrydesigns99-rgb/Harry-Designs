import { motion } from 'framer-motion';
import { fadeInUp, TRANSITIONS } from '@/animations';

const AboutHeader = ({ isInView }) => {
  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ ...TRANSITIONS.slow, ease: [0.22, 1, 0.36, 1] }}
      className="text-left space-y-6"
    >
      {/* Eyebrow Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-mono text-[#86868b]">
        <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
        <span>STUDIO LEADERSHIP &amp; CRAFT DIRECTION</span>
      </div>

      {/* Main Headline */}
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#1d1d1f] leading-[1.05]">
        Crafting brands that demand shelf space.
      </h2>

      {/* Narrative Bio */}
      <p className="text-base sm:text-lg text-[#1d1d1f]/75 max-w-xl leading-relaxed font-normal">
        Hariharan S is an independent brand identity and packaging designer based in Chennai, partnering with ambitious founders globally to build distinct visual systems, shelf-dominant packaging, and ISO-calibrated print architectures.
      </p>

      {/* 3 Core Studio Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-black/[0.06]">
        <div className="space-y-1">
          <div className="text-[11px] font-mono text-crimson font-semibold">01 / DISCIPLINE</div>
          <div className="text-sm font-semibold text-[#1d1d1f]">Packaging &amp; Identity</div>
          <p className="text-xs text-[#86868b] leading-relaxed">Structural dielines &amp; brand systems.</p>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] font-mono text-crimson font-semibold">02 / RIGOR</div>
          <div className="text-sm font-semibold text-[#1d1d1f]">ISO 12647-2 Ready</div>
          <p className="text-xs text-[#86868b] leading-relaxed">Pre-press tolerance &amp; substrate craft.</p>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] font-mono text-crimson font-semibold">03 / VELOCITY</div>
          <div className="text-sm font-semibold text-[#1d1d1f]">Commercial Lift</div>
          <p className="text-xs text-[#86868b] leading-relaxed">Engineered for instant shelf standout.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutHeader;
