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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-eerie/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-cloud-dancer border border-eerie/20 shadow-2xl p-8 text-eerie"
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-eerie/10">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-crimson font-mono font-bold">
              Studio Access
            </span>
            <h2 className="font-display text-2xl font-bold mt-1">Harry Designs CMS</h2>
          </div>
          <button
            onClick={onCancel}
            className="text-xs uppercase tracking-wider text-eerie/40 hover:text-eerie transition-colors px-2 py-1"
          >
            Esc
          </button>
        </div>

        <p className="text-sm text-eerie/70 mb-6 leading-relaxed">
          Enter the studio passcode to manage projects, artwork, and carousel media.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-eerie/60 mb-2">
              Passcode
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
              className={`w-full px-4 py-3 bg-white border ${
                error ? 'border-crimson focus:ring-crimson' : 'border-eerie/20 focus:border-eerie'
              } text-sm font-mono text-eerie outline-none transition-all`}
            />
            {error && (
              <p className="mt-2 text-xs text-crimson">
                Incorrect passcode. Default is <span className="font-mono font-bold">harry2026</span>.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-semibold uppercase tracking-wider text-eerie/60 hover:text-eerie transition-colors"
            >
              ← Back to Site
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-eerie text-white font-semibold text-xs tracking-wider uppercase hover:bg-crimson transition-colors"
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
