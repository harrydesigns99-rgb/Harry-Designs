import { motion } from 'framer-motion';

const AnimatedBackdrop = ({ tone = 'light' }) => {
  const isDark = tone === 'dark';
  const foreground = isDark ? 'rgba(132, 144, 239, 0.12)' : 'rgba(82, 99, 216, 0.10)';
  const secondary = isDark ? 'rgba(212, 119, 92, 0.09)' : 'rgba(212, 119, 92, 0.12)';
  const line = isDark ? 'rgba(247, 245, 240, 0.07)' : 'rgba(18, 18, 18, 0.07)';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute -left-24 top-1/4 h-72 w-72 rounded-full blur-3xl"
        style={{ background: foreground }}
        animate={{ x: [0, 70, 0], y: [0, -35, 0], scale: [1, 1.14, 1], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full blur-3xl"
        style={{ background: secondary }}
        animate={{ x: [0, -55, 0], y: [0, 40, 0], scale: [1, 1.2, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute left-1/2 top-0 h-full w-px origin-top"
        style={{ background: line }}
        animate={{ scaleY: [0.7, 1, 0.7], opacity: [0.35, 0.8, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-x-0 top-1/2 h-px"
        style={{ background: line }}
        animate={{ x: ['-4%', '4%', '-4%'], opacity: [0.25, 0.65, 0.25] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
};

export default AnimatedBackdrop;