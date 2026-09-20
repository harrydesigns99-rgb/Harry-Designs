import { useTransform, useMotionValue, useSpring, motion } from 'framer-motion';
import { GALLERY_IMAGES } from '../data/galleryImages';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { useParallaxTransform } from '../hooks/useParallaxTransform';
import { useCMS } from '@/features/cms';
import GalleryColumn from './GalleryColumn';
import GalleryRow from './GalleryRow';

const ParallaxGallery = () => {
  const cms = useCMS();
  const rawImages = cms.galleryImages && cms.galleryImages.length > 0 ? cms.galleryImages : GALLERY_IMAGES;
  const speed = cms.settings?.parallaxSpeed || 0.038;

  // Auto-scroll motion values with dynamic speed
  const { autoY1, autoY2, autoX1, autoX2 } = useAutoScroll(speed);

  // Scroll-based parallax transforms
  const { smoothYLeftRight, smoothYCenter } = useParallaxTransform();

  // Interactive mouse parallax depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Inverted offsets for counter-motion
  const invertSmoothMouseX = useTransform(smoothMouseX, (v) => -v);
  const invertSmoothMouseY = useTransform(smoothMouseY, (v) => -v);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 24);
    mouseY.set((clientY / innerHeight - 0.5) * 24);
  };

  // Convert motion values to percentages
  const autoY1Percent = useTransform(autoY1, (v) => `${v}%`);
  const autoY2Percent = useTransform(autoY2, (v) => `${v}%`);
  const autoX1Percent = useTransform(autoX1, (v) => `${v}%`);
  const autoX2Percent = useTransform(autoX2, (v) => `${v}%`);

  // Image Arrays - Doubled for seamless -50% loop
  const colImages = [...rawImages, ...rawImages];
  const rowImages = [...rawImages, ...rawImages];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="w-full h-full relative z-10"
    >
      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:grid grid-cols-3 gap-8 h-[120vh] -mt-20 overflow-hidden px-12 xl:px-20">
        {/* Column 1 - Auto UP, Scroll UP */}
        <motion.div style={{ x: smoothMouseX, y: smoothMouseY }} className="h-full">
          <GalleryColumn
            images={colImages}
            autoYPercent={autoY1Percent}
            smoothY={smoothYLeftRight}
          />
        </motion.div>

        {/* Column 2 - Auto DOWN, Scroll DOWN (Counter motion) */}
        <motion.div style={{ x: invertSmoothMouseX, y: invertSmoothMouseY }} className="h-full">
          <GalleryColumn
            images={colImages}
            autoYPercent={autoY2Percent}
            smoothY={smoothYCenter}
            offset="pt-20"
          />
        </motion.div>

        {/* Column 3 - Auto UP, Scroll UP */}
        <motion.div style={{ x: smoothMouseX, y: smoothMouseY }} className="h-full">
          <GalleryColumn
            images={colImages}
            autoYPercent={autoY1Percent}
            smoothY={smoothYLeftRight}
            offset="-mt-10"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cloud-dancer to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cloud-dancer to-transparent z-20 pointer-events-none" />
      </div>

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden flex flex-col gap-4 mt-8 pb-10 w-full overflow-hidden">
        {/* Row 1 - Auto LEFT */}
        <GalleryRow
          images={rowImages}
          autoXPercent={autoX1Percent}
          rotation=""
          overlay="bg-crimson/10"
          marginLeft="-ml-[10%]"
        />

        {/* Row 2 - Auto RIGHT */}
        <GalleryRow
          images={rowImages}
          autoXPercent={autoX2Percent}
          rotation=""
          overlay="bg-crimson-dark/10"
          marginLeft="-ml-[10%]"
        />
      </div>
    </div>
  );
};

export default ParallaxGallery;
