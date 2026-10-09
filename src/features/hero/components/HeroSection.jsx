import { ParallaxGallery } from '@/features/parallax-gallery';
import HeroContent from './HeroContent';
import ScrollIndicator from './ScrollIndicator';
import AnimatedBackdrop from '@/components/AnimatedBackdrop';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-transparent text-[#1d1d1f] overflow-hidden border-b border-black/[0.06]"
    >
      <AnimatedBackdrop tone="light" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(186,32,38,0.06),transparent_32%)] pointer-events-none" />

      <div className="w-full relative z-10 pt-36 sm:pt-40 lg:pt-36 xl:pt-40 pb-16 lg:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[calc(100vh-12rem)] lg:min-h-[calc(100vh-13rem)] gap-10 lg:gap-8">
            {/* LEFT COLUMN: Text Content - 7 Cols */}
            <div className="order-1 lg:order-1 lg:col-span-7 flex flex-col justify-center">
              <HeroContent />
            </div>

            {/* RIGHT COLUMN: Parallax Gallery - 5 Cols */}
            <div className="order-2 lg:order-2 lg:col-span-5 h-auto lg:h-[82vh] w-full flex items-center justify-center relative overflow-hidden rounded-3xl">
              <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#fbfbfd] to-transparent z-20 pointer-events-none" />
              <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fbfbfd] to-transparent z-20 pointer-events-none" />
              <ParallaxGallery />
            </div>
          </div>

          {/* Scroll indicator - desktop */}
          <div className="hidden lg:block pt-8 pb-4">
            <ScrollIndicator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
