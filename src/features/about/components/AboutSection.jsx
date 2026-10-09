import { useRef } from 'react';
import { useInView } from 'framer-motion';
import AboutHeader from './AboutHeader';
import AboutProfile from './AboutProfile';
import SkillsGrid from './SkillsGrid';
import ToolsCarousel from './ToolsCarousel';
import StatsGrid from './StatsGrid';
import AnimatedBackdrop from '@/components/AnimatedBackdrop';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section
      id="about"
      className="relative pt-24 md:pt-36 pb-16 md:pb-24 bg-transparent text-[#1d1d1f] overflow-hidden"
      ref={ref}
    >
      <AnimatedBackdrop tone="light" />
      <div className="absolute inset-x-0 top-0 h-px bg-black/[0.06]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24 sm:space-y-32">
        {/* Leadership & Executive Atelier Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <AboutHeader isInView={isInView} />
          </div>
          <div className="lg:col-span-5">
            <AboutProfile isInView={isInView} />
          </div>
        </div>

        {/* Skills Section */}
        <SkillsGrid isInView={isInView} />

        {/* Tools Section */}
        <ToolsCarousel isInView={isInView} />

        {/* Stats Section */}
        <StatsGrid isInView={isInView} />
      </div>
    </section>
  );
};

export default AboutSection;
