import { useState, useEffect, useRef } from 'react';
import { sound } from '@/utils/audio';
import { useTheme } from '@/context/useTheme';

const StudioTelemetry = () => {
  const [timeStr, setTimeStr] = useState('');
  const [isMuted, setIsMuted] = useState(() => sound.getMuted());
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();
  const themeMenuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setIsThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) {
      sound.playSwitch();
    }
  };

  const currentThemeObj = themes.find((t) => t.id === theme) || themes[0];

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

        {/* Right: Commission Status, Theme Switcher & Sound Toggle */}
        <div className="flex items-center gap-4 sm:gap-5 ml-auto sm:ml-0">
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

          {/* Theme Switcher Dropdown */}
          <div className="relative" ref={themeMenuRef}>
            <button
              type="button"
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="flex items-center gap-1.5 px-2 py-0.5 border border-eerie/15 hover:border-eerie text-eerie/80 hover:text-eerie transition-colors cursor-pointer bg-cloud-white"
              title="Change studio aesthetic theme"
            >
              <span
                className="h-2 w-2 rounded-full border border-eerie/30"
                style={{ backgroundColor: currentThemeObj.previewAccent }}
              />
              <span className="uppercase text-[9px] tracking-wider font-semibold">
                {currentThemeObj.badge}
              </span>
              <span className="text-[8px] opacity-60">▾</span>
            </button>

            {isThemeOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-cloud-white border border-eerie/20 shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-3 py-1.5 border-b border-eerie/10 text-[9px] uppercase tracking-wider text-eerie/45 font-bold">
                  Studio Atmosphere
                </div>
                {themes.map((t) => {
                  const isActive = t.id === theme;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setTheme(t.id);
                        setIsThemeOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-crimson text-white font-bold'
                          : 'text-eerie hover:bg-eerie/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full border border-white/20"
                          style={{ backgroundColor: t.previewAccent }}
                        />
                        <span className="text-[11px] font-medium">{t.name}</span>
                      </div>
                      {isActive && <span className="text-[10px]">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

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
