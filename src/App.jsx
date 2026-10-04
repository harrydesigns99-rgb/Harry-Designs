import { useState, useEffect } from 'react';
import { Navbar, Footer } from '@/features/navigation';
import { HeroSection } from '@/features/hero';
import { AboutSection } from '@/features/about';
import { PortfolioSection } from '@/features/portfolio';
import { ContactSection } from '@/features/contact';
import StudioApproach from '@/features/studio/StudioApproach';
import ResumePage from '@/features/resume/ResumePage';
import { AdminDashboard } from '@/features/cms';
import CaseStudyScreen from '@/features/portfolio/components/CaseStudyScreen';
import KineticTicker from '@/components/KineticTicker';
import LivingBackground from '@/components/LivingBackground';
import WandPreloader from '@/components/WandPreloader';
import { ThemeProvider } from '@/context/ThemeContext';

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

  if (currentPath.startsWith('/project')) {
    const parts = currentPath.split('/');
    const projectId = parseInt(parts[2], 10) || 1;
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-cloud-dancer relative">
          {isLoading && <WandPreloader onComplete={() => setIsLoading(false)} />}
          <LivingBackground />
          <div className="relative z-10">
            <CaseStudyScreen
              projectId={projectId}
              onNavigateHome={() => {
                window.history.pushState({}, '', '/');
                setCurrentPath('/');
                setTimeout(() => {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              onNavigateProject={(id) => {
                window.history.pushState({}, '', `/project/${id}`);
                setCurrentPath(`/project/${id}`);
              }}
            />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (currentPath === '/resume') {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-cloud-dancer relative">
          {isLoading && <WandPreloader onComplete={() => setIsLoading(false)} />}
          <LivingBackground />
          <div className="relative z-10">
            <ResumePage
              onNavigateHome={() => {
                window.history.pushState({}, '', '/');
                setCurrentPath('/');
              }}
            />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const navigateToProject = (id) => {
    window.history.pushState({}, '', `/project/${id}`);
    setCurrentPath(`/project/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-transparent relative selection:bg-crimson selection:text-white">
        {isLoading && <WandPreloader onComplete={() => setIsLoading(false)} />}
        <LivingBackground />
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <KineticTicker />
          <PortfolioSection onSelectProject={(project) => navigateToProject(project.id)} />
          <StudioApproach />
          <AboutSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App
