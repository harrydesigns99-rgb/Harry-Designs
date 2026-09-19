import { useRef } from 'react';
import { useInView } from 'framer-motion';
import AboutHeader from './AboutHeader';
import AboutProfile from './AboutProfile';
import WhyHarryCards from './WhyHarryCards';
import SkillsGrid from './SkillsGrid';
import ToolsCarousel from './ToolsCarousel';
import StatsGrid from './StatsGrid';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section
      id="about"
      className="relative pt-24 md:pt-36 pb-16 md:pb-24 bg-eerie-light overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-24 items-center mb-24 md:mb-36">
          <AboutHeader isInView={isInView} />
          <AboutProfile isInView={isInView} />
        </div>

        {/* Why Harry Section */}
        <WhyHarryCards isInView={isInView} />

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
