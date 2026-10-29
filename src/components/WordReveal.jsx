import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const WordReveal = ({
  text,
  className = '',
  highlightWords = [],
  highlightClassName = 'text-[#FC7A69] italic font-serif font-light',
}) => {
  if (!text) return null;
  const words = text.split(' ');

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`inline-block ${className}`}
    >
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9$%+]/g, '').toLowerCase();
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord
        );

        return (
          <span key={`word-${idx}`} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
            <motion.span
              variants={wordVariants}
              className={`inline-block ${isHighlight ? highlightClassName : ''}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
};

export default WordReveal;
