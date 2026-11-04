import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
  { id: 1, text: 'All', highlight: false },
  { id: 2, text: 'the', highlight: false },
  { id: 3, text: 'designs', highlight: false },
  { id: 4, text: 'you', highlight: false },
  { id: 5, text: 'are', highlight: false },
  { id: 6, text: 'about', highlight: false },
  { id: 7, text: 'to', highlight: false },
  { id: 8, text: 'see', highlight: false },
  { id: 9, text: 'are', highlight: false },
  { id: 10, text: 'purely', highlight: true },
  { id: 11, text: 'created', highlight: true },
  { id: 12, text: 'by', highlight: true },
  { id: 13, text: 'humans.', highlight: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.18,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const HumanCraftPreloader = ({ onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Total display time: word stagger (~1.6s) + hold (~0.9s) = 2.5s
    // Always runs on every website launch and page refresh
    const timer = setTimeout(() => {
      setIsFinished(true);
      setTimeout(() => {
        onComplete?.();
      }, 650);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleDismiss = () => {
    if (isFinished) return;
    setIsFinished(true);
    setTimeout(() => {
      onComplete?.();
    }, 450);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: 'blur(14px)',
            scale: 1.02,
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={handleDismiss}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0d0f] text-[#f5f4f0] select-none px-6 sm:px-12 md:px-16 cursor-default overflow-hidden"
          style={{ willChange: 'opacity, transform, filter' }}
        >
          {/* Subtle Ambient Radial Warmth */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none blur-[140px] opacity-20"
            style={{
              background:
                'radial-gradient(circle, rgba(252,122,105,0.3) 0%, rgba(139,21,27,0.15) 45%, transparent 70%)',
            }}
          />

          {/* Centered Word-by-Word Sentence */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-4xl text-center font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-normal tracking-tight leading-[1.28] sm:leading-[1.22] text-[#f5f4f0] flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1.5"
          >
            {WORDS.map((item) => (
              <motion.span
                key={item.id}
                variants={wordVariants}
                className={
                  item.highlight
                    ? 'italic font-light text-white underline decoration-[#FC7A69] underline-offset-8'
                    : 'text-[#f5f4f0]/90'
                }
              >
                {item.text}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HumanCraftPreloader;
