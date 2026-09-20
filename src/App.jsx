import { useState, useEffect } from 'react';
import { Navbar, Footer } from '@/features/navigation';
import { HeroSection } from '@/features/hero';
import { AboutSection } from '@/features/about';
import { PortfolioSection } from '@/features/portfolio';
import { ContactSection } from '@/features/contact';
import CustomCursor from '@/components/CustomCursor';
import StudioApproach from '@/features/studio/StudioApproach';
import ResumePage from '@/features/resume/ResumePage';
import { AdminDashboard } from '@/features/cms';
import KineticTicker from '@/components/KineticTicker';
import LivingBackground from '@/components/LivingBackground';
import WandPreloader from '@/components/WandPreloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    // Keyboard shortcut to open Studio CMS (Cmd+K or Ctrl+Shift+A)
    const handleKeyDown = (e) => {
      if ((e.metaKey && e.key === 'k') || (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        window.history.pushState({}, '', '/admin');
        setCurrentPath('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (currentPath === '/admin' || currentPath === '/cms') {
    return (
      <AdminDashboard
        onNavigateHome={() => {
          window.history.pushState({}, '', '/');
          setCurrentPath('/');
        }}
      />
    );
  }

  if (currentPath === '/resume') {
    return (
      <div className="min-h-screen bg-cloud-dancer relative overflow-hidden">
        {isLoading && <WandPreloader onComplete={() => setIsLoading(false)} />}
        <LivingBackground />
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
    <div className="min-h-screen bg-transparent relative selection:bg-crimson selection:text-white">
      {isLoading && <WandPreloader onComplete={() => setIsLoading(false)} />}
      <LivingBackground />
      <CustomCursor />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <KineticTicker />
        <PortfolioSection />
        <StudioApproach />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

export default App
