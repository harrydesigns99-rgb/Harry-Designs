import { useState, useEffect } from 'react';
import { sound } from '@/utils/audio';

const StudioTelemetry = () => {
  const [timeStr, setTimeStr] = useState('');
  const [isMuted, setIsMuted] = useState(() => sound.getMuted());

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(now);
        setTimeStr(formatted);
      } catch {
        setTimeStr(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) {
      sound.playSwitch();
    }
  };

  return (
    <div className="w-full border-b border-eerie/10 bg-cloud-white/80 backdrop-blur-md text-eerie/70 text-[10px] sm:text-[11px] font-mono select-none relative z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Studio Location & Coordinates */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-semibold text-eerie">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
            CHENNAI, IN
          </span>
          <span className="hidden md:inline text-eerie/40 tracking-wider">
            13.0827° N, 80.2707° E
          </span>
          <span className="text-eerie/40">•</span>
          <span className="font-semibold text-eerie tracking-wider">
            {timeStr || '12:00:00 PM'} <span className="text-eerie/50">IST</span>
          </span>
        </div>

        {/* Right: Commission Status & Sound Toggle */}
        <div className="flex items-center gap-5 ml-auto sm:ml-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline uppercase tracking-widest text-[10px] text-eerie/80 font-bold">
              Accepting 2 Select Commissions For Q4
            </span>
            <span className="sm:hidden uppercase tracking-widest text-[10px] text-eerie/80 font-bold">
              Available Q4
            </span>
          </div>

          <div className="h-3 w-px bg-eerie/20" />

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className="flex items-center gap-1.5 px-2 py-0.5 border border-eerie/15 hover:border-eerie text-eerie/80 hover:text-eerie transition-colors cursor-pointer"
            title="Toggle tactile sound effects"
          >
            <span>{isMuted ? '🔇' : '🔊'}</span>
            <span className="uppercase text-[9px] tracking-wider font-semibold">
              {isMuted ? 'Muted' : 'Sound'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudioTelemetry;

