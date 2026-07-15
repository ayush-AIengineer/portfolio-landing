import { useEffect, useRef, useState } from 'react';
import { usePortfolioMode } from '../context/PortfolioModeContext';
import { heroContent } from '../data/portfolioData';

export default function HeroSection() {
  const { mode } = usePortfolioMode();
  const content = heroContent[mode];
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);

  // Title character animation on mount
  useEffect(() => {
    const chars = titleRef.current?.querySelectorAll('.char');
    if (!chars) return;
    chars.forEach((char, i) => {
      const el = char as HTMLElement;
      setTimeout(() => {
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
      }, 200 + i * 25); // stagger 25ms
    });
  }, []);

  // Subtitle and tagline entrance
  useEffect(() => {
    const t1 = setTimeout(() => setSubtitleVisible(true), 600);
    const t2 = setTimeout(() => setTaglineVisible(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Scroll indicator
  useEffect(() => {
    const onScroll = () => {
      setScrollIndicatorVisible(window.scrollY < window.innerHeight * 0.2);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const titleChars = 'Ayush Patel'.split('');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-start min-h-screen overflow-hidden"
      style={{ paddingTop: '28vh', zIndex: 1 }}
    >
      {/* Background Video — replacing static image */}
      <video
        className="absolute inset-0 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          filter: 'contrast(0.72) saturate(0.55) brightness(1.05)',
          opacity: 0.4,
          zIndex: -2,
        }}
        src="/videos/can_you_do_one_thing_i_need_to.mp4"
      />
      {/* Dark overlay for readability + blend into page */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 42%, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.1) 55%, rgba(5,5,5,0) 100%), linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0.08) 60%, rgba(5,5,5,1) 100%)',
          zIndex: -1,
        }}
      />

      {/* Eyebrow */}
      <div
        className="text-label text-white mb-8 border border-white/25 rounded-full px-5 py-2"
        style={{
          background: 'rgba(5,5,5,0.35)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          textShadow: '0 1px 8px rgba(0,0,0,0.6)',
        }}
      >
        AI / ML ENGINEER · MULTI-AGENT SYSTEMS
      </div>

      {/* Title */}
      <h1
        ref={titleRef}
        className="font-display text-white text-center leading-none"
        style={{
          fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          textShadow: '0 2px 24px rgba(0,0,0,0.7)',
        }}
      >
        {titleChars.map((char, i) => (
          <span
            key={i}
            className="char inline-block"
            style={{
              transform: 'translateY(100%)',
              opacity: 0,
              transition: 'transform 800ms var(--ease-standard), opacity 800ms var(--ease-standard)',
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <p
        className="font-body font-light text-center mt-6 transition-all"
        style={{
          fontSize: 'clamp(1.125rem, 2.5vw, 1.75rem)',
          color: 'var(--color-foreground)',
          textShadow: '0 1px 12px rgba(0,0,0,0.7)',
          opacity: subtitleVisible ? 1 : 0,
          transform: subtitleVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: `opacity 700ms var(--ease-standard), transform 700ms var(--ease-standard)`,
          transitionDelay: '600ms',
        }}
      >
        {content.subtitle}
      </p>

      {/* Tagline */}
      <p
        className="font-body text-center mt-4 max-w-[520px] px-6 transition-all"
        style={{
          fontSize: '1rem',
          color: 'var(--color-muted-foreground)',
          textShadow: '0 1px 10px rgba(0,0,0,0.75)',
          opacity: taglineVisible ? 1 : 0,
          transform: taglineVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: `opacity 700ms var(--ease-standard), transform 700ms var(--ease-standard)`,
          transitionDelay: '900ms',
        }}
      >
        {content.tagline}
      </p>

      {/* CTA Buttons */}
      <div
        className="flex items-center gap-4 mt-10 transition-all"
        style={{
          opacity: taglineVisible ? 1 : 0,
          transform: taglineVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: `all 700ms 200ms var(--ease-standard)`,
        }}
      >
        <a
          href="#works"
          onClick={(e) => handleNavClick(e, '#works')}
          className="bg-[#0a0a0a] text-white border border-white/20 px-8 py-3.5 rounded-lg font-body font-medium text-sm hover:opacity-90 hover:scale-[1.02] transition-all duration-200 ease-standard"
          data-cursor-hover
        >
          View My Work
        </a>
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="border border-white/30 text-white px-8 py-3.5 rounded-lg font-body font-medium text-sm hover:bg-white/5 transition-all duration-200 ease-standard"
          data-cursor-hover
        >
          Get in Touch
        </a>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute left-1/2 -translate-x-1/2 transition-opacity"
        style={{
          bottom: '2.5rem',
          opacity: scrollIndicatorVisible ? 1 : 0,
          transition: 'opacity 400ms var(--ease-standard)',
        }}
      >
        <div
          className="w-px h-8 bg-white/30"
          style={{
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </div>
    </section>
  );
}