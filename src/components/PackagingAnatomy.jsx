import { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '@/utils/audio';

const DEFAULT_ANATOMY = {
  substrate: '350 GSM Arctic Silk Pure Board',
  finish: 'Soft-Touch Matte Lamination + Spot Gloss UV (70µ)',
  printProcess: '6-Color Offset UV Lithography + Spot Pantone',
  dielineType: 'Reverse Tuck End (RTE) with Dust Flaps',
  dimensions: '185 × 92 × 54 mm (+3mm Bleed)',
  pantones: [
    { code: 'PANTONE 186 C', name: 'Atelier Crimson', hex: '#ba2026', cmyk: '0 / 100 / 81 / 4' },
    { code: 'PANTONE Black 6 C', name: 'Deep Onyx Ink', hex: '#121212', cmyk: '82 / 71 / 59 / 75' },
    { code: 'PANTONE 7527 C', name: 'Cloud Alabaster', hex: '#d6d2c4', cmyk: '3 / 4 / 14 / 8' },
    { code: 'PANTONE 871 C', name: 'Metallic Antique Gold', hex: '#84754e', cmyk: '20 / 25 / 60 / 25' },
  ],
};

const PackagingAnatomy = ({ anatomy = DEFAULT_ANATOMY, image, client, title }) => {
  const [copiedHex, setCopiedHex] = useState(null);
  const [shelfDistance, setShelfDistance] = useState(0); // 0 to 10
  const [showBleed, setShowBleed] = useState(true);
  const [showCrease, setShowCrease] = useState(true);
  const [showCut, setShowCut] = useState(true);

  const data = { ...DEFAULT_ANATOMY, ...anatomy };

  const handleCopy = (hex, code) => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex);
    }
    setCopiedHex(code);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // Blur computation for 10-foot retail shelf standout simulator
  const blurPx = (shelfDistance * 0.85).toFixed(1);

  return (
    <div className="w-full space-y-10 text-[#1d1d1f]">
      {/* Header Banner */}
      <div className="text-center sm:text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 text-crimson text-xs font-mono font-semibold">
          <span>●</span> 04 / TECHNICAL PRINT ANATOMY &amp; DIELINE SPECS
        </div>
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1d1d1f]">
          Print Anatomy &amp; Engineering Specifications
        </h3>
        <p className="text-sm sm:text-base text-[#86868b] max-w-2xl leading-relaxed">
          Production-grade substrate selections, spot ink color separations, CAD dieline geometries, and retail shelf standoff simulation for {client}{title ? ` — ${title}` : ''}.
        </p>
      </div>

      {/* 1. Interactive Pantone & Ink System (Apple Color Chips) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[#86868b] font-medium">
            Color Separation &amp; Spot Inks (Tap to Copy HEX)
          </span>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-black/[0.04] text-[#86868b]">
            100% OPACITY MATCH
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {data.pantones.map((pt) => {
            const isCopied = copiedHex === pt.code;
            return (
              <button
                key={pt.code}
                type="button"
                onClick={() => handleCopy(pt.hex, pt.code)}
                className="group relative text-left p-3.5 rounded-2xl border border-black/[0.08] hover:border-black/[0.2] bg-white transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                <div
                  className="h-12 w-full mb-3 rounded-xl border border-black/10 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: pt.hex }}
                />
                <div className="text-xs font-bold font-mono text-[#1d1d1f] leading-tight">
                  {pt.code}
                </div>
                <div className="text-[11px] text-[#86868b] truncate mt-0.5">{pt.name}</div>
                <div className="text-[10px] font-mono text-[#86868b] mt-2 flex justify-between items-center">
                  <span>{pt.hex}</span>
                  <span className="text-crimson font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    COPY
                  </span>
                </div>

                {/* Copied notification toast */}
                {isCopied && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-2xl bg-crimson text-white flex items-center justify-center text-xs font-mono font-bold tracking-wider uppercase z-20"
                  >
                    ✓ Copied Hex
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Technical Dieline CAD Blueprint Visualizer */}
      <div className="apple-card p-6 sm:p-8 space-y-5 bg-white border border-black/[0.08]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-crimson animate-pulse" />
            <span className="text-sm font-display font-medium text-[#1d1d1f]">
              CAD Vector Dieline Simulation
            </span>
          </div>

          {/* Dieline View Toggles */}
          <div className="inline-flex items-center p-1 rounded-full bg-black/[0.04] border border-black/[0.05] text-xs">
            <button
              type="button"
              onClick={() => setShowBleed(!showBleed)}
              className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                showBleed ? 'bg-red-500/10 text-red-600 font-semibold shadow-xs' : 'text-[#86868b]'
              }`}
            >
              • Bleed 3mm
            </button>
            <button
              type="button"
              onClick={() => setShowCrease(!showCrease)}
              className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                showCrease ? 'bg-fuchsia-500/10 text-fuchsia-600 font-semibold shadow-xs' : 'text-[#86868b]'
              }`}
            >
              — Crease
            </button>
            <button
              type="button"
              onClick={() => setShowCut(!showCut)}
              className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                showCut ? 'bg-emerald-500/10 text-emerald-600 font-semibold shadow-xs' : 'text-[#86868b]'
              }`}
            >
              ― Cut
            </button>
          </div>
        </div>

        {/* SVG Dieline Blueprint */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 p-4 flex items-center justify-center">
          {/* Millimeter graph grid */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dieline-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dieline-grid)" />
          </svg>

          {/* Dieline Carton Geometry */}
          <svg
            viewBox="0 0 500 240"
            className="w-full h-full max-h-52 z-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bleed outline (red dotted) */}
            {showBleed && (
              <rect
                x="50"
                y="20"
                width="400"
                height="200"
                fill="none"
                stroke="#ef4444"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                opacity="0.8"
              />
            )}

            {/* Cut outline (cyan solid) */}
            {showCut && (
              <path
                d="M 60,30 L 440,30 L 440,210 L 60,210 Z 
                   M 60,30 L 60,70 L 40,85 L 40,155 L 60,170 Z 
                   M 150,30 L 150,15 L 230,15 L 230,30 Z
                   M 310,30 L 310,15 L 390,15 L 390,30 Z
                   M 150,210 L 150,225 L 230,225 L 230,210 Z
                   M 310,210 L 310,225 L 390,225 L 390,210 Z"
                fill="rgba(56, 189, 248, 0.05)"
                stroke="#38bdf8"
                strokeWidth="1.5"
              />
            )}

            {/* Crease fold lines (fuchsia dashed) */}
            {showCrease && (
              <>
                <line x1="60" y1="30" x2="60" y2="210" stroke="#d946ef" strokeWidth="1.5" strokeDasharray="5 4" />
                <line x1="150" y1="30" x2="150" y2="210" stroke="#d946ef" strokeWidth="1.5" strokeDasharray="5 4" />
                <line x1="240" y1="30" x2="240" y2="210" stroke="#d946ef" strokeWidth="1.5" strokeDasharray="5 4" />
                <line x1="330" y1="30" x2="330" y2="210" stroke="#d946ef" strokeWidth="1.5" strokeDasharray="5 4" />
                <line x1="420" y1="30" x2="420" y2="210" stroke="#d946ef" strokeWidth="1.5" strokeDasharray="5 4" />
                <line x1="60" y1="30" x2="440" y2="30" stroke="#d946ef" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
                <line x1="60" y1="210" x2="440" y2="210" stroke="#d946ef" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
              </>
            )}

            {/* Dimension Callouts & Text */}
            <text x="75" y="125" fill="#94a3b8" fontSize="10" fontFamily="monospace">Glue Flap</text>
            <text x="180" y="125" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">Front Panel</text>
            <text x="270" y="125" fill="#94a3b8" fontSize="10" fontFamily="monospace">Side Left</text>
            <text x="360" y="125" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">Back Panel</text>

            <text x="160" y="25" fill="#f43f5e" fontSize="9" fontFamily="monospace">Top Tuck Flap</text>
            <text x="160" y="238" fill="#f43f5e" fontSize="9" fontFamily="monospace">Bottom Seal Flap</text>

            {/* Dimension arrows */}
            <line x1="60" y1="230" x2="150" y2="230" stroke="#64748b" strokeWidth="1" />
            <text x="95" y="226" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">54 mm</text>

            <line x1="150" y1="230" x2="240" y2="230" stroke="#64748b" strokeWidth="1" />
            <text x="195" y="226" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">92 mm</text>
          </svg>

          {/* Dimension Tag */}
          <div className="absolute bottom-3 right-3 text-[10px] font-mono text-cyan-400 bg-black/80 px-2.5 py-1 rounded-md border border-cyan-500/30">
            {data.dimensions}
          </div>
        </div>
      </div>

      {/* 3. Substrate & Technical Finishes Specifications (Apple Tech Specs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="apple-card p-5 sm:p-6 bg-white border border-black/[0.08] space-y-1">
          <div className="text-[11px] font-mono uppercase text-[#86868b] font-medium">
            Substrate &amp; Grammage
          </div>
          <div className="text-sm sm:text-base font-semibold text-[#1d1d1f]">{data.substrate}</div>
        </div>

        <div className="apple-card p-5 sm:p-6 bg-white border border-black/[0.08] space-y-1">
          <div className="text-[11px] font-mono uppercase text-[#86868b] font-medium">
            Tactile Finishes &amp; Foils
          </div>
          <div className="text-sm sm:text-base font-semibold text-[#1d1d1f]">{data.finish}</div>
        </div>

        <div className="apple-card p-5 sm:p-6 bg-white border border-black/[0.08] space-y-1">
          <div className="text-[11px] font-mono uppercase text-[#86868b] font-medium">
            Press Printing Process
          </div>
          <div className="text-sm sm:text-base font-semibold text-[#1d1d1f]">{data.printProcess}</div>
        </div>

        <div className="apple-card p-5 sm:p-6 bg-white border border-black/[0.08] space-y-1">
          <div className="text-[11px] font-mono uppercase text-[#86868b] font-medium">
            Carton Geometry / Die Type
          </div>
          <div className="text-sm sm:text-base font-semibold text-[#1d1d1f]">{data.dielineType}</div>
        </div>
      </div>

      {/* 4. 10-Foot Retail Shelf Standout Simulator */}
      {image && (
        <div className="apple-card p-6 sm:p-8 space-y-5 bg-white border border-black/[0.08]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-crimson font-semibold flex items-center gap-2">
                <span>🛒</span> 10-FOOT RETAIL SHELF STANDOUT SIMULATOR
              </span>
              <p className="text-xs sm:text-sm text-[#86868b] mt-1 max-w-xl">
                Simulates shopper distance and aisle optical noise to verify brand silhouette pop and shelf hierarchy.
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-crimson/10 font-mono text-xs font-semibold text-crimson">
              Distance: {shelfDistance} ft ({blurPx}px blur)
            </div>
          </div>

          {/* Slider */}
          <div className="py-2">
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={shelfDistance}
              onChange={(e) => {
                setShelfDistance(parseFloat(e.target.value));
              }}
              className="w-full accent-crimson cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-[#86868b] mt-1.5">
              <span>1 ft (Close Inspect)</span>
              <span>5 ft (Shopper Aisle Scan)</span>
              <span>10 ft (Aisle Standout Test)</span>
            </div>
          </div>

          {/* Simulated Shelf Preview */}
          <div className="relative w-full h-52 sm:h-64 bg-neutral-950 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-neutral-800">
            {/* Shelf line */}
            <div className="absolute bottom-5 inset-x-0 h-2 bg-gradient-to-r from-amber-900/60 via-amber-800/80 to-amber-900/60 border-t border-amber-500/30" />

            <motion.div
              style={{ filter: `blur(${blurPx}px)` }}
              className="relative z-10 max-h-full flex items-center justify-center transition-all duration-150"
            >
              <img
                src={image}
                alt={`${client} Retail Simulation`}
                className="max-h-44 sm:max-h-52 object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Standout Rating Badge */}
            <div className="absolute top-3 right-3 z-20 rounded-full bg-black/80 backdrop-blur-md px-3 py-1 border border-white/10 font-mono text-[11px] text-white">
              Silhouette Pop:{' '}
              <span className="text-emerald-400 font-semibold">
                {shelfDistance > 6 ? '96% High Impact' : '100% Crisp'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagingAnatomy;
