import { memo } from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#1e1e20] text-[#f5f4f0] py-12 px-4 sm:px-6 lg:px-8 border-t border-black/20 select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FC7A69] animate-pulse" />
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Hariharan S
          </span>
          <span className="text-white/40 text-xs">•</span>
          <span className="font-sans text-xs text-white/60">
            Principal Brand &amp; Packaging Architect
          </span>
        </div>

        <div className="flex items-center gap-6 font-sans text-xs text-white/60">
          <a
            href="#introduction"
            className="hover:text-white transition-colors"
          >
            Back to Top ↑
          </a>
          <span>•</span>
          <a
            href="/resume"
            className="hover:text-white transition-colors"
          >
            Resume
          </a>
          <span>•</span>
          <a
            href="/work"
            className="hover:text-white transition-colors"
          >
            12-Project Archive
          </a>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
