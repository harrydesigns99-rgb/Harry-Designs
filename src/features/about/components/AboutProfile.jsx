import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/audio';

const AboutProfile = ({ isInView }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'channels'

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
        <div className="apple-card p-6 sm:p-8 md:p-9 bg-white border border-black/[0.08] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.06)] rounded-3xl space-y-6 relative overflow-hidden transition-all">
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

          {/* Profile Stage */}
          <div className="text-center space-y-3 pt-1">
            {/* Monogram Seal */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/[0.03] border border-black/[0.06] flex items-center justify-center font-display text-2xl sm:text-3xl font-semibold text-[#1d1d1f] shadow-inner mx-auto relative group">
              <span>H</span>
              <span className="text-crimson">.</span>
            </div>

            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#1d1d1f]">
                Hariharan S
              </h3>
              <p className="text-xs uppercase tracking-wider font-mono text-[#86868b] mt-1">
                Principal Brand &amp; Packaging Designer
              </p>
            </div>

            {/* Philosophy Callout */}
            <p className="text-xs sm:text-sm text-[#1d1d1f]/75 italic max-w-sm mx-auto leading-relaxed pt-1">
              &ldquo;Translating founder ambition into shelf standout, tactile substrate finishes, and durable commercial equity.&rdquo;
            </p>
          </div>

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
                    100% Press Ready
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
