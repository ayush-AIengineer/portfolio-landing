import { useEffect, useRef } from 'react';
import { Brain, Layers, Cpu } from 'lucide-react';
import { usePortfolioMode } from '../context/PortfolioModeContext';
import { servicesHeading, servicesContent } from '../data/portfolioData';

const serviceIcons = [Brain, Layers, Cpu];
const serviceTitles = ['Machine Learning & Deep Learning', 'Multi-Agent AI Systems', 'AI Product Engineering'];

export default function ServicesSection() {
  const { mode } = usePortfolioMode();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const chars = headingRef.current?.querySelectorAll('.s-char');
          chars?.forEach((char, i) => {
            setTimeout(() => {
              (char as HTMLElement).style.transform = 'translateY(0)';
              (char as HTMLElement).style.opacity = '1';
            }, i * 20);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const headingWords = servicesHeading[mode].split(' ');

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative"
      style={{
        zIndex: 1,
        marginTop: 'var(--space-section)',
        padding: '0 var(--page-gutter)',
        maxWidth: 'var(--container-max)',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {/* Section Header */}
      <div className="text-label text-[#7f7f7f] mb-3">WHAT I DO</div>
      <h2
        ref={headingRef}
        className="font-display text-white"
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          letterSpacing: '-0.02em',
          lineHeight: 1.0,
        }}
      >
        {headingWords.map((word, wi) => (
          <span key={wi} className="inline-block overflow-hidden mr-[0.3em]">
            {word.split('').map((char, ci) => (
              <span
                key={ci}
                className="s-char inline-block"
                style={{
                  transform: 'translateY(100%)',
                  opacity: 0,
                  transition: 'transform 800ms cubic-bezier(0.19, 1, 0.22, 1), opacity 800ms cubic-bezier(0.19, 1, 0.22, 1)',
                }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </h2>

      {/* Service Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{ marginTop: 'var(--space-subsection)' }}
      >
        {serviceTitles.map((title, i) => {
          const Icon = serviceIcons[i];
          return (
            <div
              key={title}
              className="group rounded-xl p-8 transition-all duration-400 hover:-translate-y-1"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
              data-cursor-hover
            >
              <Icon
                size={28}
                className="text-[#7f7f7f] group-hover:text-[#e5e5e5] transition-colors duration-400 mb-6"
              />
              <h3 className="font-body font-medium text-xl text-white mb-3">
                {title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed transition-opacity duration-300"
                style={{ color: '#e5e5e5' }}
              >
                {servicesContent[mode][i].description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
