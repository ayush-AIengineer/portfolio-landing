import { useState, useEffect } from 'react';
import { PortfolioModeProvider } from './context/PortfolioModeContext';
import VantaFogBackground from './components/VantaFogBackground';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import FeaturedWorksSection from './sections/FeaturedWorksSection';
import ContactSection from './sections/ContactSection';

function App() {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleMouseDown);
    window.addEventListener('touchend', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleMouseDown);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <PortfolioModeProvider>
      <div 
        className="fixed inset-4 z-50 pointer-events-none rounded-3xl transition-all duration-300"
        style={{
          border: isClicked ? '2px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isClicked ? '0 0 30px rgba(255,255,255,0.05) inset, 0 0 30px rgba(255,255,255,0.05)' : 'none'
        }}
      />
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
