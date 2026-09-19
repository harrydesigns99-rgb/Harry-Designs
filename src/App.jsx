import { Navbar, Footer } from '@/features/navigation'
import { HeroSection } from '@/features/hero'
import { AboutSection } from '@/features/about'
import { PortfolioSection } from '@/features/portfolio'
import { ContactSection } from '@/features/contact'
import CustomCursor from '@/components/CustomCursor'
import StudioApproach from '@/features/studio/StudioApproach'
import ResumeSection from '@/features/resume/ResumeSection'

function App() {
  return (
    <div className="min-h-screen bg-eerie">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <PortfolioSection />
      <StudioApproach />
      <AboutSection />
      <ResumeSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
