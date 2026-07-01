import { PortfolioModeProvider } from './context/PortfolioModeContext';
import VantaFogBackground from './components/VantaFogBackground';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import FeaturedWorksSection from './sections/FeaturedWorksSection';
import ContactSection from './sections/ContactSection';

function App() {
  return (
    <PortfolioModeProvider>
      <VantaFogBackground />
      <Navigation />
      <main className="relative" style={{ zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <FeaturedWorksSection />
        <ContactSection />
      </main>
    </PortfolioModeProvider>
  );
}

export default App;
