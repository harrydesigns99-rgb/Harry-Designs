import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/audio';

const IMAGE_THEMES = [
  { id: 'natural', label: '✦ Natural', filter: 'brightness(1.02) contrast(1.02)', src: '/image/hariharan.jpg' },
  { id: 'monochrome', label: '◐ Leica Mono', filter: 'grayscale(1) contrast(1.18) brightness(0.96)', src: '/image/hariharan-bw.jpg' },
  { id: 'warm', label: '☀ Warm Film', filter: 'sepia(0.24) contrast(1.06) brightness(1.02) saturate(1.12)', src: '/image/hariharan.jpg' },
  { id: 'noir', label: '◆ Studio Noir', filter: 'contrast(1.2) brightness(0.92) saturate(0.85)', src: '/image/hariharan-bw.jpg' },
];

const AboutProfile = ({ isInView }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('natural');
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'channels'

  const currentTheme = IMAGE_THEMES.find((t) => t.id === selectedTheme) || IMAGE_THEMES[0];

  const handleCopyEmail = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText('harrydesigns99@gmail.com');
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDownloadVCard = (e) => {
    e.stopPropagation();
    sound.playClick();
    const vcardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:S;Hariharan;;;',
      'FN:Hariharan S',
      'ORG:Harry Designs Studio',
      'TITLE:Principal Brand & Packaging Designer',
      'EMAIL;type=INTERNET;type=WORK;type=pref:harrydesigns99@gmail.com',
      'URL:https://harry-portfolio-2.vercel.app',
      'NOTE:Creative Direction, Packaging Architecture & Visual Identity',
      'ADR;type=WORK:;;Chennai;Tamil Nadu;;India',
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Hariharan_S_Studio.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg"
      >
        {/* Apple Executive Atelier Card */}
        <div className="apple-card p-6 sm:p-8 bg-white border border-black/[0.08] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.06)] rounded-3xl space-y-6 relative overflow-hidden transition-all">
          {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] pb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-mono font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Commissions
            </span>

            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#86868b]">
              <span>Chennai, IN</span>
              <span className="text-black/20">•</span>
              <span>13.08° N</span>
            </div>
          </div>

          {/* Real Founder Portrait Stage */}
          <div className="space-y-3">
            <div className="relative w-full aspect-[4/5] max-h-[380px] sm:max-h-[400px] rounded-2xl overflow-hidden bg-neutral-100 border border-black/[0.08] shadow-sm group">
              {/* Portrait Image with Dynamic Theme Grading */}
              <img
                src={currentTheme.src}
                alt="Hariharan S - Principal Brand &amp; Packaging Designer"
                style={{ filter: currentTheme.filter }}
                className="w-full h-full object-cover object-[center_18%] transition-transform duration-700 ease-out group-hover:scale-103"
              />

              {/* Top Floating Badge */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                <span className="apple-glass px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full text-[#1d1d1f] font-semibold border border-black/[0.08] shadow-xs">
                  Studio Founder
                </span>
                <span className="apple-glass px-2.5 py-1 text-[10px] font-mono text-[#1d1d1f]/80 rounded-full border border-black/[0.08] shadow-xs">
                  6+ Yrs Exp
                </span>
              </div>

              {/* Bottom Subtle Vignette Gradient with Name Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-4 text-white">
                <div className="font-display text-xl sm:text-2xl font-medium tracking-tight">
                  Hariharan S
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/80">
                  Principal Brand &amp; Packaging Architect
                </div>
              </div>
            </div>

            {/* Interactive Portrait Theme Grader Pills */}
            <div className="flex items-center justify-between gap-1 pt-1 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] hidden sm:inline">
                Theme:
              </span>
              <div className="inline-flex items-center gap-1 p-1 rounded-full bg-black/[0.04] border border-black/[0.05] text-[11px] w-full sm:w-auto justify-between sm:justify-start">
                {IMAGE_THEMES.map((theme) => {
                  const isActive = selectedTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedTheme(theme.id);
                      }}
                      className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold'
                          : 'text-[#86868b] hover:text-[#1d1d1f]'
                      }`}
                    >
                      {theme.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Philosophy Statement */}
          <p className="text-xs sm:text-sm text-[#1d1d1f]/80 italic text-center leading-relaxed px-2">
            &ldquo;Translating founder ambition into shelf standout, tactile substrate finishes, and durable commercial equity.&rdquo;
          </p>

          {/* Segmented View Toggle (Specs vs Direct Channels) */}
          <div className="flex justify-center">
            <div className="inline-flex items-center p-1 rounded-full bg-black/[0.04] border border-black/[0.05] text-xs">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTab('profile');
                }}
                className={`px-3.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-white text-[#1d1d1f] shadow-xs'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                Studio Specs
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTab('channels');
                }}
                className={`px-3.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  activeTab === 'channels'
                    ? 'bg-white text-[#1d1d1f] shadow-xs'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                Direct Channels
              </button>
            </div>
          </div>

          {/* Dynamic Content: Specs Matrix OR Direct Channels */}
          <AnimatePresence mode="wait">
            {activeTab === 'profile' ? (
              <motion.div
                key="specs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 gap-3 pt-1"
              >
                <div className="p-3.5 rounded-2xl bg-black/[0.02] border border-black/[0.05] space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#86868b]">
                    Experience
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">
                    6+ Years Practice
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/[0.02] border border-black/[0.05] space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#86868b]">
                    Specialization
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">
                    Packaging &amp; Identity
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/[0.02] border border-black/[0.05] space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#86868b]">
                    Production Rigor
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">
                    ISO 12647-2 Ready
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/[0.02] border border-black/[0.05] space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#86868b]">
                    Operations
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">
                    Chennai • Global Remote
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="channels"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 pt-1"
              >
                <div className="p-3.5 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#86868b]">
                      Studio Inquiries
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-medium text-[#1d1d1f]">
                      harrydesigns99@gmail.com
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1 rounded-full bg-white border border-black/[0.08] text-xs font-mono font-medium text-[#1d1d1f] hover:bg-black/[0.04] transition-all cursor-pointer shadow-xs"
                  >
                    {copiedEmail ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#86868b]">
                      Primary Deliverables
                    </div>
                    <div className="text-xs text-[#1d1d1f] font-medium">
                      Custom Dielines • FMCG Identity • Print Supervision
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Row: Save Contact (.vcf) & Copy Email */}
          <div className="pt-2 border-t border-black/[0.06] flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="button"
              onClick={handleDownloadVCard}
              className="w-full sm:flex-1 py-2.5 px-4 rounded-full bg-crimson hover:bg-crimson-dark text-white font-medium text-xs tracking-wider uppercase transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>📇</span>
              <span>Save Studio Contact (.vcf)</span>
            </button>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full sm:w-auto py-2.5 px-4 rounded-full bg-black/[0.04] hover:bg-black/[0.08] border border-black/[0.06] text-[#1d1d1f] text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{copiedEmail ? '✓ Copied' : 'Copy Email'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutProfile;
