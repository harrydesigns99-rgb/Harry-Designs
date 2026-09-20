import { motion } from 'framer-motion';

/**
 * Single row of images with parallax effect (Mobile)
 */
const GalleryRow = ({ images, autoXPercent, rotation = '', overlay = 'bg-crimson/10', marginLeft = '-ml-[10%]' }) => {
  return (
    <div className={`relative w-full overflow-hidden ${rotation}`}>
      <motion.div
        className={`flex gap-4 w-max ${marginLeft}`}
        style={{
          x: autoXPercent,
          willChange: 'transform',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      >
        {images.map((src, i) => (
          <div
            key={`row-${i}`}
            className="w-36 h-36 flex-shrink-0 overflow-hidden relative shadow-sm border border-eerie/10"
          >
            <img src={src} alt="Project" className="w-full h-full object-cover" loading="lazy" />
            <div className={`absolute inset-0 ${overlay}`} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default GalleryRow;
