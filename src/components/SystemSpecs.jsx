import { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '@/utils/audio';

const DEFAULT_SPECS = {
  palette: [
    { code: 'Brand Primary', name: 'Atelier Crimson', hex: '#ba2026', cmyk: '0 / 100 / 81 / 4' },
    { code: 'Deep Surface', name: 'Deep Onyx Noir', hex: '#121212', cmyk: '82 / 71 / 59 / 75' },
    { code: 'Base Tone', name: 'Cloud Alabaster', hex: '#f7f5f0', cmyk: '3 / 4 / 14 / 8' },
    { code: 'Accent Ink', name: 'Warm Ochre Gold', hex: '#84754e', cmyk: '20 / 25 / 60 / 25' },
  ],
  typography: 'Bespoke Display Serif paired with Neue Haas Grotesk',
  grid: '12-Column Baseline Modular Grid (4pt / 8pt Vertical Rhythm)',
  standard: 'Design System & Master Brand Architecture Standard',
};

const SystemSpecs = ({ specs = DEFAULT_SPECS, client, title, category }) => {
  const [copiedHex, setCopiedHex] = useState(null);
  const data = { ...DEFAULT_SPECS, ...specs };

  const handleCopy = (hex, code) => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex);
    }
    setCopiedHex(code);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="w-full space-y-6 text-eerie">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-eerie/15">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-crimson font-bold">
            TECHNICAL DESIGN SYSTEM &amp; SPECIFICATIONS
          </span>
          <h3 className="text-base sm:text-lg font-display font-medium text-eerie">
            {client} — {title || 'System Architecture'}
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 border border-eerie/20 bg-eerie/5 text-eerie/80 uppercase">
          {category || 'Identity'} System Architecture
        </span>
      </div>

      {/* 1. Interactive Color Palette System */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-eerie/60 font-semibold">
            Color Palette &amp; Token Architecture (Click to Copy HEX)
          </span>
          <span className="text-[10px] font-mono text-eerie/40">WCAG COMPLIANT TOKENS</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {data.palette?.map((pt) => {
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
                <div className="text-[11px] font-bold font-mono text-eerie leading-tight truncate">
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

      {/* 2. System Architecture Grid: Typography, Grid, Compliance Standard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 bg-cloud-white border border-eerie/15">
          <div className="text-[10px] font-mono uppercase tracking-wider text-eerie/50 font-bold mb-1">
            Typographic Scale &amp; Pairing
          </div>
          <div className="text-xs font-semibold text-eerie leading-relaxed">
            {data.typography}
          </div>
        </div>

        <div className="p-3.5 bg-cloud-white border border-eerie/15">
          <div className="text-[10px] font-mono uppercase tracking-wider text-eerie/50 font-bold mb-1">
            Grid &amp; Spatial Hierarchy
          </div>
          <div className="text-xs font-semibold text-eerie leading-relaxed">
            {data.grid}
          </div>
        </div>

        <div className="p-3.5 bg-cloud-white border border-eerie/15">
          <div className="text-[10px] font-mono uppercase tracking-wider text-eerie/50 font-bold mb-1">
            Quality &amp; Production Standard
          </div>
          <div className="text-xs font-semibold text-eerie leading-relaxed">
            {data.standard}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSpecs;
