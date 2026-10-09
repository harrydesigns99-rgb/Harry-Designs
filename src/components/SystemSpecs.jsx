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
    <div className="w-full space-y-10 text-[#1d1d1f]">
      {/* Header Banner */}
      <div className="text-center sm:text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 text-crimson text-xs font-mono font-semibold">
          <span>●</span> 04 / TECHNICAL {category ? `${category.toUpperCase()} SYSTEM` : 'DESIGN SYSTEM'} &amp; SPECIFICATIONS
        </div>
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1d1d1f]">
          Design System &amp; Production Architecture
        </h3>
        <p className="text-sm sm:text-base text-[#86868b] max-w-2xl leading-relaxed">
          Mathematical grid alignments, optical typographic hierarchies, accessible color token separations, and production specifications for {client}{title ? ` — ${title}` : ''}.
        </p>
      </div>

      {/* 1. Interactive Color Palette System (Apple Swatches) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[#86868b] font-medium">
            Color Palette &amp; Token Architecture (Tap to Copy HEX)
          </span>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-black/[0.04] text-[#86868b]">
            WCAG COMPLIANT TOKENS
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {data.palette?.map((pt) => {
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
                <div className="text-xs font-bold font-mono text-[#1d1d1f] leading-tight truncate">
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

      {/* 2. System Architecture Bento: Typography, Grid, Compliance Standard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="apple-card p-6 bg-white border border-black/[0.08] space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] font-medium">
            Typographic Hierarchy
          </div>
          <div className="text-sm sm:text-base font-semibold text-[#1d1d1f] leading-snug">
            {data.typography}
          </div>
          <p className="text-xs text-[#86868b] pt-1">
            Optical kerning and proportional tabular figures for executive readability.
          </p>
        </div>

        <div className="apple-card p-6 bg-white border border-black/[0.08] space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] font-medium">
            Spatial Baseline Rhythm
          </div>
          <div className="text-sm sm:text-base font-semibold text-[#1d1d1f] leading-snug">
            {data.grid}
          </div>
          <p className="text-xs text-[#86868b] pt-1">
            Predictable layout flow guaranteeing harmonic spacing across screen viewports.
          </p>
        </div>

        <div className="apple-card p-6 bg-white border border-black/[0.08] space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] font-medium">
            Production Standard
          </div>
          <div className="text-sm sm:text-base font-semibold text-[#1d1d1f] leading-snug">
            {data.standard}
          </div>
          <p className="text-xs text-[#86868b] pt-1">
            Full brand guidelines governance with cross-medium asset vector exports.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemSpecs;
