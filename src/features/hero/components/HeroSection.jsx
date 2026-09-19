import { ParallaxGallery } from '@/features/parallax-gallery';
import HeroContent from './HeroContent';
import ScrollIndicator from './ScrollIndicator';
import AnimatedBackdrop from '@/components/AnimatedBackdrop';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-cloud-dancer text-eerie overflow-hidden border-b border-eerie/15"
    >
      <AnimatedBackdrop tone="light" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(82,99,216,0.16),transparent_28%)] pointer-events-none" />

      <div className="w-full relative z-10 pt-20 lg:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center h-full">
          {/* LEFT COLUMN: Text Content - 50% Width */}
          <HeroContent />

          {/* RIGHT COLUMN: Parallax Gallery - 50% Width */}
          <div className="order-2 lg:order-2 h-auto lg:h-screen w-full flex items-center justify-center relative overflow-hidden -mt-8 lg:mt-0">
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-cloud-dancer to-transparent z-20 pointer-events-none" />
            <ParallaxGallery />
          </div>
        </div>

        {/* Scroll indicator - Only visible on desktop */}
        <ScrollIndicator />
      </div>

      <div className="absolute inset-y-0 right-[8%] w-px bg-eerie/15 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
