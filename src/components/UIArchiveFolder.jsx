import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/audio';

const ARCHIVE_ITEMS = [
  {
    id: 'aurora',
    title: 'Aurora Finance Mobile',
    category: 'Fintech UI',
    tag: 'iOS / Swift',
    year: '2025',
    color: '#0f172a',
    accent: '#38bdf8',
    description: 'Neomorphic dark-mode wealth management app with haptic ledger controls and real-time biometric authorization.',
    previewType: 'ui-dark',
    metrics: '+34% D1 Retention',
    image: '/image/samples/1.webp',
  },
  {
    id: 'cloudpass',
    title: 'Cloudpass Identity Chip',
    category: 'Design System',
    tag: 'Web / React',
    year: '2024',
    color: '#1e3a8a',
    accent: '#60a5fa',
    description: 'Floating contextual credential badge with dynamic blur and encrypted SSO token verification.',
    previewType: 'ui-sky',
    metrics: '99.98% Auth Flow',
    image: '/image/samples/3.webp',
  },
  {
    id: 'chat-flow',
    title: 'Atelier Direct Messenger',
    category: 'Mobile Messaging',
    tag: 'Product Design',
    year: '2024',
    color: '#18181b',
    accent: '#f43f5e',
    description: 'Ultra-minimal tactile conversation interface with thread nesting, audio waveform scrubbers, and live press updates.',
    previewType: 'ui-chat',
    metrics: '0.4s Send Latency',
    image: '/image/samples/5.webp',
  },
  {
    id: 'diyaa-pure',
    title: 'Diyaa Pure Clean Cartons',
    category: 'Botanical Packaging',
    tag: 'CAD Dielines',
    year: '2024',
    color: '#3f2b4c',
    accent: '#c084fc',
    description: 'FSC-certified cotton paperboard unit cartons with blind debossing and plastic-free water-based barrier coatings.',
    previewType: 'ui-packaging',
    metrics: '100% Plastic-Free',
    image: '/image/Image Gallery/Artboard 4.webp',
  },
  {
    id: 'gokul-velocity',
    title: 'Aisle Standout Dashboard',
    category: 'Retail Analytics',
    tag: 'Telemetry UI',
    year: '2024',
    color: '#1c1917',
    accent: '#f59e0b',
    description: 'Grocery shelf velocity radar calculating contrast coefficients, scan zones, and 2-second shopper conversion ratios.',
    previewType: 'ui-analytics',
    metrics: '+40% Verified Lift',
    image: '/image/Image Gallery/Artboard 2.webp',
  },
  {
    id: 'neeri-bilingual',
    title: 'CSIR Bilingual Type System',
    category: 'Design Engineering',
    tag: 'Typography',
    year: '2024',
    color: '#14213d',
    accent: '#e63946',
    description: 'Uncompromising dual-script optical hierarchy unifying Devanagari Hindi and Latin letterforms across national research publications.',
    previewType: 'ui-type',
    metrics: 'ISO 12647 Calibrated',
    image: '/image/Image Gallery/Artboard 3.webp',
  },
];

const UIArchiveFolder = ({ onSelectProject: _onSelectProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const constraintsRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeItem) {
          setActiveItem(null);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeItem]);

  const handleOpenFolder = () => {
    sound.playPop();
    setIsOpen(true);
  };

  const handleCloseFolder = () => {
    sound.playClick();
    setIsOpen(false);
    setActiveItem(null);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-12 sm:my-16 select-none">
      {/* ======================================================== */}
      {/* TACTILE FROSTED GLASS FOLDER COMPONENT (CLOSED STATE) */}
      {/* ======================================================== */}
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleOpenFolder}
        data-cursor="OPEN ARCHIVE 📂"
        className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* The Folder Wrapper (280px wide on mobile, 320px wide on desktop) */}
        <div className="relative w-[280px] sm:w-[320px] h-[200px] sm:h-[220px] flex items-end justify-center">
          {/* Back Folder Flap with Tab */}
          <div className="absolute inset-x-0 bottom-0 top-3 bg-gradient-to-br from-[#2f7344] to-[#245934] rounded-3xl shadow-[0_16px_36px_-10px_rgba(36,89,52,0.35)] transition-all duration-500 group-hover:shadow-[0_22px_45px_-10px_rgba(36,89,52,0.45)]">
            {/* Folder Tab at Top Left */}
            <div className="absolute -top-3.5 left-4 w-28 h-6 bg-[#2f7344] rounded-t-xl" />
          </div>

          {/* ======================================================== */}
          {/* PEEKING CARDS LAYER (Fanned out behind frosted front pocket) */}
          {/* ======================================================== */}
          <div className="absolute inset-x-4 bottom-7 h-44 flex items-end justify-center pointer-events-none">
            {/* Card 1: Left tilted card (Aurora UI) */}
            <motion.div
              animate={
                isHovered
                  ? { y: -38, x: -35, rotate: -14, scale: 1.02 }
                  : { y: -16, x: -24, rotate: -8, scale: 0.95 }
              }
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="absolute w-[120px] sm:w-[135px] aspect-[4/5] rounded-2xl bg-[#0f172a] border border-white/20 p-2.5 shadow-xl overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[7px] font-mono text-white/50">
                  <span>aurora</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </div>
                <div className="text-[10px] font-bold text-white leading-tight font-display">
                  Private Wealth
                </div>
              </div>
              <div className="w-full h-12 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center p-1">
                <div className="w-full h-1.5 rounded-full bg-cyan-400/40" />
              </div>
            </motion.div>

            {/* Card 3: Right tilted card (Messenger UI) */}
            <motion.div
              animate={
                isHovered
                  ? { y: -36, x: 35, rotate: 14, scale: 1.02 }
                  : { y: -14, x: 24, rotate: 8, scale: 0.95 }
              }
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="absolute w-[120px] sm:w-[135px] aspect-[4/5] rounded-2xl bg-[#18181b] border border-white/20 p-2.5 shadow-xl overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[7px] font-mono text-white/50">
                  <span>live chat</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] font-bold text-white leading-tight font-display">
                  Press Check
                </div>
              </div>
              <div className="space-y-1">
                <div className="w-3/4 h-2 rounded bg-white/20" />
                <div className="w-1/2 h-2 rounded bg-white/10" />
              </div>
            </motion.div>

            {/* Card 2: Center elevated card (Cloudpass Sky UI) */}
            <motion.div
              animate={
                isHovered
                  ? { y: -52, rotate: 0, scale: 1.06 }
                  : { y: -24, rotate: 0, scale: 1.0 }
              }
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="absolute w-[128px] sm:w-[145px] aspect-[4/5] rounded-2xl bg-gradient-to-b from-[#60a5fa] to-[#2563eb] border border-white/40 p-2.5 shadow-2xl overflow-hidden flex flex-col justify-between z-10"
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-mono text-white/90 uppercase font-semibold">
                  Identity Chip
                </span>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>

              {/* Sky Cloud Center Graphic */}
              <div className="w-full h-14 rounded-xl bg-white/25 backdrop-blur-xs flex items-center justify-center p-2">
                <div className="text-center">
                  <div className="text-xs text-white font-display font-bold">Cloudpass</div>
                  <div className="text-[7px] font-mono text-white/80">SSO // 2025</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[8px] font-mono text-white/90">
                <span>VERIFIED</span>
                <span>✦</span>
              </div>
            </motion.div>
          </div>

          {/* ======================================================== */}
          {/* FROSTED GLASS FRONT POCKET */}
          {/* ======================================================== */}
          <div className="relative w-full h-[140px] sm:h-[150px] rounded-3xl bg-gradient-to-b from-white/45 via-[#2f7344]/35 to-[#245934]/60 backdrop-blur-xl border border-white/60 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.22)] overflow-hidden z-20 flex flex-col justify-between p-4 sm:p-5">
            {/* Top Gloss Highlight Line */}
            <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            {/* Specular Diagonal Reflection */}
            <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none transform rotate-12" />

            {/* Folder Header */}
            <div className="flex items-center justify-between z-10">
              <span className="px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest font-semibold bg-white/20 backdrop-blur-md text-white border border-white/25">
                INDEX
              </span>
              <span className="w-2 h-2 rounded-full bg-white/90 shadow-xs" />
            </div>

            {/* Bottom Inner Specular Edge */}
            <div className="flex items-center justify-between z-10 text-white/90">
              <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">
                Tap to explore
              </span>
              <span className="text-sm font-bold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                ↗
              </span>
            </div>
          </div>
        </div>

        {/* Text Details Beneath Folder matching screenshot */}
        <div className="text-center mt-5 space-y-1">
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#1e1e20] group-hover:text-black transition-colors">
            UI archive
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#1e1e20]/60 font-medium">
            {ARCHIVE_ITEMS.length} items
          </p>
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* REVEALED WORK STAGE (MODAL / INTERACTIVE DRAGGABLE DECK) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1e1e20]/80 backdrop-blur-md overflow-hidden"
            onClick={handleCloseFolder}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[90vh] sm:h-[86vh] rounded-3xl bg-[#f5f4f0] border border-black/10 shadow-[0_32px_90px_-20px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden bg-dot-grid"
            >
              {/* Modal Top Bar */}
              <div className="px-6 sm:px-8 py-5 border-b border-black/[0.08] flex items-center justify-between bg-white/70 backdrop-blur-md z-30">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2f7344] animate-pulse" />
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1e1e20] tracking-tight">
                      UI &amp; Design Archive
                    </h2>
                    <p className="text-xs text-[#1e1e20]/60 font-sans">
                      {ARCHIVE_ITEMS.length} curated design artifacts. Drag items around or tap to inspect.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCloseFolder}
                    className="px-4 py-2 rounded-full border border-black/15 bg-white hover:bg-black hover:text-white text-xs font-sans font-semibold uppercase tracking-wider text-[#1e1e20] transition-all cursor-pointer shadow-2xs hover:scale-105"
                  >
                    ✕ Close Archive
                  </button>
                </div>
              </div>

              {/* Draggable Playground Stage */}
              <div
                ref={constraintsRef}
                className="relative flex-1 p-4 sm:p-8 overflow-y-auto overflow-x-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
                  {ARCHIVE_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.id}
                      drag
                      dragConstraints={constraintsRef}
                      dragElastic={0.15}
                      whileDrag={{ scale: 1.05, zIndex: 40 }}
                      onClick={() => {
                        sound.playClick();
                        setActiveItem(item);
                      }}
                      className="group relative bg-white rounded-3xl border border-black/[0.08] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.16)] p-5 flex flex-col justify-between transition-all cursor-grab active:cursor-grabbing hover:-translate-y-1.5"
                    >
                      {/* Top Spec Sheet Tag */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#f5f4f0] border border-black/10 text-[#1e1e20]/70">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#1e1e20]/50 font-bold">
                          #{index + 1}
                        </span>
                      </div>

                      {/* Visual Mockup Container */}
                      <div className="w-full aspect-[4/3] rounded-2xl bg-neutral-900 overflow-hidden mb-4 relative shadow-inner flex items-center justify-center p-3">
                        {item.previewType === 'ui-dark' && (
                          <div className="w-full h-full bg-[#0f172a] rounded-xl p-3 flex flex-col justify-between border border-white/10 text-white">
                            <div className="flex items-center justify-between text-[8px] font-mono text-white/50">
                              <span>AURORA OS</span>
                              <span className="text-cyan-400 font-bold">LIVE</span>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs font-mono text-white/60">Portfolio Balance</div>
                              <div className="text-xl font-bold font-display text-white">$142,850.00</div>
                            </div>
                            <div className="w-full h-2 rounded-full bg-cyan-400/20 overflow-hidden">
                              <div className="w-3/4 h-full bg-cyan-400" />
                            </div>
                          </div>
                        )}

                        {item.previewType === 'ui-sky' && (
                          <div className="w-full h-full bg-gradient-to-b from-[#60a5fa] to-[#1d4ed8] rounded-xl p-3 flex flex-col justify-between border border-white/20 text-white">
                            <div className="flex items-center justify-between text-[8px] font-mono text-white/80">
                              <span>CLOUDPASS</span>
                              <span>FIDO2 / PASSKEY</span>
                            </div>
                            <div className="text-center py-2">
                              <div className="text-base font-bold font-display">Biometric Sync</div>
                              <div className="text-[9px] font-mono text-white/80">Encrypted HSM Token</div>
                            </div>
                            <div className="text-[9px] font-mono text-center bg-white/20 py-1 rounded-md">
                              TAP TO AUTHENTICATE
                            </div>
                          </div>
                        )}

                        {item.previewType === 'ui-chat' && (
                          <div className="w-full h-full bg-[#18181b] rounded-xl p-3 flex flex-col justify-between border border-white/10 text-white">
                            <div className="flex items-center justify-between text-[8px] font-mono text-white/50">
                              <span>ATELIER MESSENGER</span>
                              <span className="text-rose-400 font-bold">PRESS READY</span>
                            </div>
                            <div className="space-y-1.5 text-[9px] font-sans">
                              <div className="bg-white/10 p-2 rounded-lg max-w-[85%] text-white/90">
                                Dielines approved for 8-color CI-Flexo run.
                              </div>
                              <div className="bg-rose-500/20 border border-rose-400/30 p-1.5 rounded-lg max-w-[70%] ml-auto text-rose-200">
                                Press supervision on site 9 AM.
                              </div>
                            </div>
                            <div className="text-[8px] font-mono text-white/40">Encrypted Studio Thread</div>
                          </div>
                        )}

                        {item.previewType === 'ui-packaging' && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        )}

                        {item.previewType === 'ui-analytics' && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        )}

                        {item.previewType === 'ui-type' && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        )}
                      </div>

                      {/* Title & Description */}
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-display font-bold text-base text-[#1e1e20] group-hover:text-black">
                            {item.title}
                          </h4>
                          <span className="text-[10px] font-mono text-[#FC7A69] font-bold">
                            {item.metrics}
                          </span>
                        </div>
                        <p className="text-xs text-[#1e1e20]/65 mt-1 line-clamp-2 font-sans">
                          {item.description}
                        </p>
                      </div>

                      {/* Card Footer Bar */}
                      <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-mono text-[#1e1e20]/50">
                        <span>{item.tag}</span>
                        <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#1e1e20] font-bold">
                          Inspect ↗
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ======================================================== */}
            {/* FULL DETAIL INSPECTION DIALOG (WHEN A CARD IS TAPPED) */}
            {/* ======================================================== */}
            <AnimatePresence>
              {activeItem && (
                <div
                  className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  onClick={() => setActiveItem(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-lg bg-white rounded-3xl border border-black/15 shadow-2xl p-6 sm:p-8 space-y-5"
                  >
                    <div className="flex items-center justify-between border-b border-black/[0.08] pb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#2f7344] font-bold">
                          {activeItem.category} &bull; {activeItem.year}
                        </span>
                        <h3 className="font-display text-2xl font-bold text-[#1e1e20] mt-0.5">
                          {activeItem.title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveItem(null)}
                        className="w-8 h-8 rounded-full bg-[#f5f4f0] hover:bg-black/10 flex items-center justify-center text-xs text-[#1e1e20] cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <p className="text-sm text-[#1e1e20]/80 leading-relaxed font-sans">
                      {activeItem.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 p-4 bg-[#f5f4f0] rounded-2xl border border-black/[0.08]">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#1e1e20]/50 block">Stack &amp; Spec</span>
                        <span className="text-xs font-mono font-bold text-[#1e1e20]">{activeItem.tag}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#1e1e20]/50 block">Key Result</span>
                        <span className="text-xs font-mono font-bold text-[#2f7344]">{activeItem.metrics}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveItem(null)}
                        className="px-6 py-2.5 rounded-full bg-[#1e1e20] text-white text-xs font-sans font-semibold uppercase tracking-wider hover:bg-black cursor-pointer shadow-sm"
                      >
                        Back to Archive Deck
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UIArchiveFolder;
