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
    <div className="w-full space-y-6 text-eerie">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-eerie/15">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-crimson font-bold">
            TECHNICAL PRINT ANATOMY &amp; SPECIFICATIONS
          </span>
          <h3 className="text-base sm:text-lg font-display font-medium text-eerie">
            {client} — {title || 'Packaging Engineering'}
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 border border-eerie/20 bg-eerie/5 text-eerie/80">
          ISO 12647-2 PRINT READY
        </span>
      </div>

      {/* 1. Interactive Pantone & Ink System */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-eerie/60 font-semibold">
            Color Separation &amp; Spot Inks (Click to Copy HEX)
          </span>
          <span className="text-[10px] font-mono text-eerie/40">100% OPACITY MATCH</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {data.pantones.map((pt) => {
            const isCopied = copiedHex === pt.code;
            return (
              <button
                key={pt.code}
                type="button"
                onClick={() => handleCopy(pt.hex, pt.code)}
                className="group relative text-left p-2.5 border border-eerie/15 hover:border-crimson bg-cloud-white transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                <div
                  className="h-10 w-full mb-2 border border-black/10 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: pt.hex }}
                />
                <div className="text-[11px] font-bold font-mono text-eerie leading-tight">
                  {pt.code}
                </div>
                <div className="text-[10px] text-eerie/70 truncate">{pt.name}</div>
                <div className="text-[9px] font-mono text-eerie/50 mt-1 flex justify-between">
                  <span>{pt.hex}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-crimson font-bold">
                    COPY
                  </span>
                </div>

                {/* Copied notification toast */}
                {isCopied && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-crimson text-white flex items-center justify-center text-xs font-mono font-bold tracking-wider uppercase z-20"
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
      <div className="border border-eerie/15 p-3.5 bg-cloud-white">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-crimson animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-eerie font-bold">
              CAD Vector Dieline Simulation
            </span>
          </div>

          {/* Dieline View Toggles */}
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <button
              type="button"
              onClick={() => setShowBleed(!showBleed)}
              className={`px-2 py-0.5 border transition-colors cursor-pointer ${
                showBleed ? 'bg-red-500/10 border-red-500 text-red-600 font-bold' : 'border-eerie/20 text-eerie/40'
              }`}
            >
              [••• Bleed 3mm]
            </button>
            <button
              type="button"
              onClick={() => setShowCrease(!showCrease)}
              className={`px-2 py-0.5 border transition-colors cursor-pointer ${
                showCrease ? 'bg-fuchsia-500/10 border-fuchsia-500 text-fuchsia-600 font-bold' : 'border-eerie/20 text-eerie/40'
              }`}
            >
              [--- Crease]
            </button>
            <button
              type="button"
              onClick={() => setShowCut(!showCut)}
              className={`px-2 py-0.5 border transition-colors cursor-pointer ${
                showCut ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 font-bold' : 'border-eerie/20 text-eerie/40'
              }`}
            >
              [─── Cut]
            </button>
          </div>
        </div>

        {/* SVG Dieline Blueprint */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-neutral-900 overflow-hidden border border-neutral-800 p-4 flex items-center justify-center">
          {/* Subtle millimeter graph grid */}
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
            className="w-full h-full max-h-48 z-10"
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
          <div className="absolute bottom-2 right-2 text-[9px] font-mono text-cyan-400/90 bg-neutral-950/80 px-2 py-0.5 border border-cyan-500/30">
            {data.dimensions}
          </div>
        </div>
      </div>

      {/* 3. Substrate & Technical Finishes Specifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 border border-eerie/15 bg-cloud-white">
          <div className="text-[10px] font-mono uppercase text-eerie/50 font-bold mb-1">
            Substrate &amp; Grammage
          </div>
          <div className="font-semibold text-eerie">{data.substrate}</div>
        </div>

        <div className="p-3 border border-eerie/15 bg-cloud-white">
          <div className="text-[10px] font-mono uppercase text-eerie/50 font-bold mb-1">
            Tactile Finishes &amp; Foils
          </div>
          <div className="font-semibold text-eerie">{data.finish}</div>
        </div>

        <div className="p-3 border border-eerie/15 bg-cloud-white">
          <div className="text-[10px] font-mono uppercase text-eerie/50 font-bold mb-1">
            Press Printing Process
          </div>
          <div className="font-semibold text-eerie">{data.printProcess}</div>
        </div>

        <div className="p-3 border border-eerie/15 bg-cloud-white">
          <div className="text-[10px] font-mono uppercase text-eerie/50 font-bold mb-1">
            Carton Geometry / Die Type
          </div>
          <div className="font-semibold text-eerie">{data.dielineType}</div>
        </div>
      </div>

      {/* 4. 10-Foot Retail Shelf Standout Simulator */}
      {image && (
        <div className="border border-eerie/15 p-3.5 bg-cloud-white">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-eerie font-bold flex items-center gap-1.5">
                <span>🛒</span> 10-Foot Retail Shelf Standout Simulator
              </span>
              <p className="text-[11px] text-eerie/65 mt-0.5">
                Simulates eye distance and visual noise to test shelf contrast, brandmark hierarchy, and silhouette pop in grocery aisles.
              </p>
            </div>
            <div className="text-right font-mono text-[11px] font-bold text-crimson">
              Distance: {shelfDistance} ft ({blurPx}px blur)
            </div>
          </div>

          {/* Slider */}
          <div className="my-3">
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
            <div className="flex justify-between text-[9px] font-mono text-eerie/50 mt-1">
              <span>1 ft (Close Inspect)</span>
              <span>5 ft (Shopper Aisle Scan)</span>
              <span>10 ft (Aisle Standout Test)</span>
            </div>
          </div>

          {/* Simulated Shelf Preview */}
          <div className="relative w-full h-48 sm:h-56 bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden flex items-center justify-center p-4 rounded-xs border border-eerie/10">
            {/* Shelf backdrop shelf line */}
            <div className="absolute bottom-4 inset-x-0 h-2 bg-gradient-to-r from-amber-900/60 via-amber-800/80 to-amber-900/60 border-t border-amber-500/30" />

            <motion.div
              style={{ filter: `blur(${blurPx}px)` }}
              className="relative z-10 max-h-full flex items-center justify-center transition-all duration-150"
            >
              <img
                src={image}
                alt={`${client} Retail Simulation`}
                className="max-h-40 sm:max-h-48 object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Standout Rating Badge */}
            <div className="absolute top-2.5 right-2.5 z-20 bg-neutral-900/90 backdrop-blur-md px-2.5 py-1 border border-white/10 font-mono text-[10px] text-white/90">
              Silhouette Pop:{' '}
              <span className="text-emerald-400 font-bold">
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
