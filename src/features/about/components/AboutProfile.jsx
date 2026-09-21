import { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '@/utils/audio';

const AboutProfile = ({ isInView }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    sound.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleDownloadVCard = (e) => {
    e.stopPropagation();
    sound.playClick();
    const vcardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:S;Hariharan;;;',
      'FN:Hariharan S',
      'ORG:Harry Designs Studio',
      'TITLE:Brand & Packaging Designer',
      'EMAIL;type=INTERNET;type=WORK;type=pref:harrydesigns99@gmail.com',
      'URL:https://harry-portfolio-2.vercel.app',
      'NOTE:Creative Direction, Packaging Architecture & Visual Identity',
      'ADR;type=WORK:;;Chennai;Tamil Nadu;;India',
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Hariharan_S_Studio.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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

          {/* 3D Flippable Card Container */}
          <div
            className="relative [perspective:1200px] cursor-pointer"
            onClick={handleFlip}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFlip();
              }
            }}
            title="Click to flip atelier pass"
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-full aspect-[4/5] shadow-2xl select-none"
            >
              {/* ================= FRONT SIDE: Atelier Card ================= */}
              <div
                style={{ backfaceVisibility: 'hidden' }}
                className="absolute inset-0 bg-eerie border border-eerie/20 flex flex-col justify-between p-8 sm:p-10 text-white overflow-hidden"
              >
                {/* Top Bar: Coordinates & Craft Seal */}
                <div className="flex items-center justify-between border-b border-white/15 pb-5">
                  <div>
                    <span className="text-[0.62rem] uppercase tracking-[0.2em] text-white/50 block">
                      Studio Coordinates
                    </span>
                    <span className="text-xs font-mono text-white/80 tracking-wider">
                      Chennai, TN • 13.08° N
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-serif italic text-crimson-light">
                    H
                  </div>
                </div>

                {/* Center: Bespoke Monogram & Typographic Art Direction */}
                <div className="my-auto py-6 text-center relative">
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
                    <span className="uppercase tracking-[0.14em] text-[0.65rem] text-white/45">
                      Experience
                    </span>
                    <span className="font-medium text-white">6+ Years Practice</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span className="uppercase tracking-[0.14em] text-[0.65rem] text-white/45">
                      Specialization
                    </span>
                    <span className="font-medium text-white">Packaging &amp; Identity</span>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[0.68rem] text-emerald-400 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Available for Select Commissions</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/50 border border-white/15 px-2 py-0.5 group-hover:border-crimson group-hover:text-crimson transition-colors">
                      ⟳ Tap to Flip
                    </span>
                  </div>
                </div>

                {/* Fine framing border */}
                <div className="absolute inset-2 border border-white/10 pointer-events-none" />
              </div>

              {/* ================= BACK SIDE: Digital Atelier Pass & Direct vCard ================= */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
                className="absolute inset-0 bg-neutral-900 border border-eerie/30 flex flex-col justify-between p-8 sm:p-10 text-white overflow-hidden"
              >
                {/* Header: Atelier Pass Token */}
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div>
                    <span className="text-[0.62rem] uppercase tracking-[0.2em] text-crimson font-mono font-bold block">
                      OFFICIAL ATELIER PASS
                    </span>
                    <span className="text-[11px] font-mono text-white/60 tracking-wider">
                      PASS NO: HS-2024-CH
                    </span>
                  </div>
                  <span className="text-[9px] font-mono bg-white/10 text-white/80 px-2 py-0.5 border border-white/20">
                    VERIFIED
                  </span>
                </div>

                {/* Direct Contact & Credentials */}
                <div className="space-y-4 my-auto py-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                      Direct Inquiries
                    </span>
                    <a
                      href="mailto:harrydesigns99@gmail.com"
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm sm:text-base font-mono font-semibold text-white hover:text-crimson transition-colors"
                    >
                      harrydesigns99@gmail.com
                    </a>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                      Primary Disciplines
                    </span>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Custom Packaging Dielines • FMCG &amp; Retail Brand Systems • Print Production
                      Supervision • Editorial Design
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                      Base of Operations
                    </span>
                    <p className="text-xs text-white/80">Chennai, Tamil Nadu, India (UTC +05:30)</p>
                  </div>

                  {/* 1-Click vCard Contact Download Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleDownloadVCard}
                      className="w-full py-2.5 px-4 bg-crimson hover:bg-crimson-dark text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>📇</span>
                      <span>Save Studio Contact (.vcf)</span>
                    </button>
                  </div>
                </div>

                {/* Back Footer */}
                <div className="border-t border-white/15 pt-3 flex items-center justify-between text-[10px] font-mono text-white/50">
                  <span>HARRY DESIGNS ATELIER</span>
                  <span className="text-crimson font-bold">⟳ Flip to Front</span>
                </div>

                {/* Fine framing border */}
                <div className="absolute inset-2 border border-white/10 pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* Floating Editorial Label Tag */}
          <div className="relative z-20 mt-4 sm:-mt-8 mx-auto sm:ml-6 md:ml-8 max-w-[17rem] bg-cloud-white p-4 border border-eerie/15 shadow-xl transition-colors">
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
