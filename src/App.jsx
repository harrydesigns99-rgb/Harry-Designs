import { useState, useEffect } from 'react';
import { Navbar, Footer } from '@/features/navigation';
import { HeroSection } from '@/features/hero';
import { AboutSection } from '@/features/about';
import { PortfolioSection } from '@/features/portfolio';
import { ContactSection } from '@/features/contact';
import CustomCursor from '@/components/CustomCursor';
import StudioApproach from '@/features/studio/StudioApproach';
import ResumePage from '@/features/resume/ResumePage';

function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentPath === '/resume') {
    return (
      <div className="min-h-screen bg-cloud-dancer">
        <CustomCursor />
        <ResumePage
          onNavigateHome={() => {
            window.history.pushState({}, '', '/');
            setCurrentPath('/');
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cloud-dancer">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <PortfolioSection />
      <StudioApproach />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App
