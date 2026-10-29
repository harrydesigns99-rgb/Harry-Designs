import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar, Footer } from '@/features/navigation';
import { HeroSection } from '@/features/hero';
import { AboutSection } from '@/features/about';
import { PortfolioSection } from '@/features/portfolio';
import { ContactSection } from '@/features/contact';
import TestimonialsSection from '@/features/testimonials/TestimonialsSection';
import KineticTicker from '@/components/KineticTicker';
import WandPreloader from '@/components/WandPreloader';
import { ThemeProvider } from '@/context/ThemeContext';

const AdminDashboard = lazy(() => import('@/features/cms').then((m) => ({ default: m.AdminDashboard })));
const CaseStudyScreen = lazy(() => import('@/features/portfolio/components/CaseStudyScreen'));
const ResumePage = lazy(() => import('@/features/resume/ResumePage'));
const WorkArchiveScreen = lazy(() => import('@/features/portfolio/components/WorkArchiveScreen'));

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

  const navigateToProject = (id) => {
    window.history.pushState({}, '', `/project/${id}`);
    setCurrentPath(`/project/${id}`);
    window.scrollTo(0, 0);
  };

  const navigateToWork = () => {
    window.history.pushState({}, '', '/work');
    setCurrentPath('/work');
    window.scrollTo(0, 0);
  };

  const navigateHome = (targetSectionId = null) => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    if (targetSectionId) {
      setTimeout(() => {
        const el = document.getElementById(targetSectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#f5f4f0] relative selection:bg-[#FC7A69] selection:text-white overflow-x-clip">
        {isLoading && <WandPreloader onComplete={() => setIsLoading(false)} />}

        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center relative z-20">
              <div className="h-6 w-6 rounded-full border-2 border-crimson border-t-transparent animate-spin" />
            </div>
          }
        >
          {currentPath === '/admin' || currentPath === '/cms' ? (
            <div className="relative z-10">
              <AdminDashboard onNavigateHome={() => navigateHome()} />
            </div>
          ) : currentPath === '/work' || currentPath === '/projects' || currentPath === '/archive' ? (
            <div className="relative z-10">
              <WorkArchiveScreen
                onNavigateHome={(targetSectionId) => navigateHome(targetSectionId || 'portfolio')}
                onSelectProject={(project) => navigateToProject(project.id)}
              />
            </div>
          ) : currentPath.startsWith('/project') ? (
            <div className="relative z-10">
              <CaseStudyScreen
                projectId={parseInt(currentPath.split('/')[2], 10) || 1}
                onNavigateHome={() => navigateHome('portfolio')}
                onNavigateProject={(id) => {
                  window.history.pushState({}, '', `/project/${id}`);
                  setCurrentPath(`/project/${id}`);
                  window.scrollTo(0, 0);
                }}
              />
            </div>
          ) : currentPath === '/resume' ? (
            <div className="relative z-10">
              <ResumePage onNavigateHome={() => navigateHome()} />
            </div>
          ) : (
            <div className="relative z-10 bg-[#f5f4f0]">
              <Navbar />
              <HeroSection />
              <AboutSection />
              <PortfolioSection
                onSelectProject={(project) => navigateToProject(project.id)}
                onNavigateWork={navigateToWork}
              />
              <KineticTicker />
              <TestimonialsSection />
              <ContactSection />
              <Footer />
            </div>
          )}
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App
