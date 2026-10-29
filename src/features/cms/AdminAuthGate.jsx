import { useState } from 'react';
import { motion } from 'framer-motion';

const AdminAuthGate = ({ onLogin, onCancel }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(pin);
    if (!success) {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1e20]/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-[#f5f4f0] rounded-3xl border border-black/10 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.35)] p-8 text-[#1e1e20] bg-dot-grid relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-black/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8b151b] animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8b151b] font-mono font-bold">
              Studio Access
            </span>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-white hover:bg-black/5 flex items-center justify-center text-xs text-[#1e1e20]/60 hover:text-[#1e1e20] transition-colors border border-black/10 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#1e1e20]">
            Harry Designs CMS
          </h2>
          <p className="text-xs sm:text-sm text-[#1e1e20]/70 mt-1 leading-relaxed">
            Enter the studio passcode to edit projects, dieline specs, artwork, and client logos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-2 font-medium">
              Studio Passcode
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              autoFocus
              placeholder="Enter passcode (default: harry2026)"
              className={`w-full px-4 py-3 bg-white rounded-2xl border ${
                error
                  ? 'border-[#8b151b] focus:ring-2 focus:ring-[#8b151b]/30'
                  : 'border-black/15 focus:border-[#8b151b] focus:ring-2 focus:ring-[#8b151b]/20'
              } text-sm font-mono text-[#1e1e20] outline-none transition-all shadow-2xs`}
            />
            {error && (
              <p className="mt-2 text-xs text-[#8b151b] font-sans">
                Incorrect passcode. Default is <span className="font-mono font-bold">harry2026</span>.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-3">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-sans font-medium text-[#1e1e20]/60 hover:text-[#1e1e20] transition-colors cursor-pointer"
            >
              ← Back to Live Site
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#1e1e20] hover:bg-[#8b151b] text-[#f5f4f0] font-sans font-semibold text-xs tracking-wide uppercase transition-all shadow-md cursor-pointer hover:shadow-lg"
            >
              Enter Studio →
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminAuthGate;
