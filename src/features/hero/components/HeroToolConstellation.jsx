import { motion } from 'framer-motion';
import { sound } from '@/utils/audio';

const CONSTELLATION_TOOLS = [
  {
    id: 'figma',
    name: 'Figma',
    type: 'figma',
    position: 'top-[12%] left-[4%] sm:left-[6%] md:left-[8%]',
    duration: 17,
    delay: 0,
    accentGlow: 'rgba(162, 89, 255, 0.25)',
    accentColor: '#a259ff',
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    type: 'adobe',
    code: 'Ps',
    position: 'top-[12%] right-[4%] sm:right-[6%] md:right-[8%]',
    duration: 19,
    delay: 1.2,
    accentGlow: 'rgba(2, 132, 199, 0.25)',
    accentColor: '#0284c7',
  },
  {
    id: 'illustrator',
    name: 'Illustrator',
    type: 'adobe',
    code: 'Ai',
    position: 'top-[47%] left-[2%] sm:left-[3%] md:left-[5%]',
    duration: 21,
    delay: 2.5,
    accentGlow: 'rgba(234, 88, 12, 0.25)',
    accentColor: '#ea580c',
    mobileHidden: true,
  },
  {
    id: 'indesign',
    name: 'InDesign',
    type: 'adobe',
    code: 'Id',
    position: 'top-[47%] right-[2%] sm:right-[3%] md:right-[5%]',
    duration: 18,
    delay: 1.8,
    accentGlow: 'rgba(225, 29, 72, 0.25)',
    accentColor: '#e11d48',
    mobileHidden: true,
  },
  {
    id: 'premiere',
    name: 'Premiere Pro',
    type: 'adobe',
    code: 'Pr',
    position: 'bottom-[15%] left-[5%] sm:left-[7%] md:left-[9%]',
    duration: 22,
    delay: 3.2,
    accentGlow: 'rgba(124, 58, 237, 0.25)',
    accentColor: '#7c3aed',
  },
  {
    id: 'xd',
    name: 'Adobe XD',
    type: 'adobe',
    code: 'Xd',
    position: 'bottom-[15%] right-[5%] sm:right-[7%] md:right-[9%]',
    duration: 20,
    delay: 2.2,
    accentGlow: 'rgba(219, 39, 119, 0.25)',
    accentColor: '#db2777',
  },
];

const HeroToolConstellation = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden"
      style={{ perspective: 1000 }}
    >
      <div className="relative w-full max-w-6xl h-full mx-auto">
        {CONSTELLATION_TOOLS.map((tool) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: tool.delay * 0.3 }}
            className={`absolute ${tool.position} ${
              tool.mobileHidden ? 'hidden sm:block' : ''
            } pointer-events-auto cursor-pointer group`}
            onClick={() => sound.playPop()}
          >
            <motion.div
              animate={{
                y: [-7, 9, -7],
                rotateZ: [-3, 3, -3],
                rotateY: [-8, 8, -8],
                rotateX: [-5, 5, -5],
              }}
              transition={{
                duration: tool.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: tool.delay,
              }}
              whileHover={{
                scale: 1.14,
                rotateZ: 0,
                rotateY: 0,
                rotateX: 0,
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-2xl flex items-center justify-center bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_12px_26px_-6px_rgba(0,0,0,0.06),0_4px_10px_-2px_rgba(0,0,0,0.03),inset_0_1.5px_1px_rgba(255,255,255,0.95),inset_0_-1.5px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.1),0_0_16px_var(--glow)] transition-shadow"
            >
              {/* Glossy Specular Glass Reflection */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/70 via-white/10 to-transparent pointer-events-none" />

              {/* Ambient Frosted Glow Accent */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  boxShadow: `0 0 20px ${tool.accentGlow}`,
                }}
              />

              {tool.type === 'figma' ? (
                /* Minimal Frosted Glass Figma Glyph */
                <svg
                  viewBox="0 0 38 57"
                  className="w-4 h-6 sm:w-5 sm:h-7 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.12)] relative z-10"
                  fill="none"
                >
                  <path
                    d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
                    fill="#1ABCFE"
                  />
                  <path
                    d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
                    fill="#0ACF83"
                  />
                  <path
                    d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
                    fill="#FF7262"
                  />
                  <path
                    d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
                    fill="#F24E1E"
                  />
                  <path
                    d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
                    fill="#A259FF"
                  />
                </svg>
              ) : (
                /* Minimal Frosted Glass Adobe Glyph (Ps, Ai, Id, Pr, Xd) */
                <span
                  className="font-sans font-black text-xs sm:text-sm md:text-[15px] tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)] relative z-10"
                  style={{ color: tool.accentColor }}
                >
                  {tool.code}
                </span>
              )}

              {/* Minimal Hover Tooltip Pill */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none px-2 py-0.5 rounded-full bg-[#1e1e20] text-white text-[10px] font-mono whitespace-nowrap shadow-md">
                {tool.name}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroToolConstellation;

