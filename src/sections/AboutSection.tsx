import { useEffect, useRef, useState } from 'react';
import { usePortfolioMode } from '../context/PortfolioModeContext';
import { aboutBody } from '../data/portfolioData';

interface StatProps {
  target: string;
  label: string;
  inView: boolean;
}

function StatCounter({ target, label, inView }: StatProps) {
  const [display, setDisplay] = useState('0');
  const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
  const suffix = target.replace(/[0-9.]/g, '');

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * numericValue;
      setDisplay(Math.floor(current) + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, numericValue, suffix]);

  return (
    <div>
      <div
        className="font-body font-light text-white"
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          letterSpacing: '-0.03em',
        }}
      >
        {display}
      </div>
      <div className="text-xs uppercase tracking-wider text-[var(--color-muted)] font-body mt-2">
        {label}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { mode } = usePortfolioMode();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Trigger heading animation
          const chars = headingRef.current?.querySelectorAll('.h-char');
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

  const headingWords = 'Turning data into intelligence.'.split(' ');

  const stats = [
    { target: '2+', label: 'Years Experience' },
    { target: '20+', label: 'Projects Built' },
    { target: '5+', label: 'Happy Clients' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative"
      style={{
        zIndex: 1,
        marginTop: 'clamp(2rem, 6vh, 4rem)',
        padding: '0 var(--page-gutter)',
        maxWidth: 'var(--container-max)',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
        {/* Left Column */}
        <div className="md:sticky md:top-[120px] md:self-start">
          <div className="text-label text-[var(--color-muted)] mb-4">ABOUT</div>
          <div
            className="font-display text-white select-none pointer-events-none absolute -z-10 hidden md:block"
            style={{
              fontSize: 'clamp(6rem, 12vw, 10rem)',
              color: 'rgba(255,255,255,0.04)',
              top: '2rem',
              left: '-1rem',
            }}
          >
            01
          </div>

          {/* Profile Image */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10" style={{ maxWidth: '300px' }}>
            <img
              src="/images/me.png"
              alt="Ayush Patel"
              className="w-full object-cover object-top hover:scale-[1.02] transition-transform duration-600 ease-standard"
              style={{ aspectRatio: '3/4' }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2">
          <h2
            ref={headingRef}
            className="font-display text-white"
            style={{
              fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            {headingWords.map((word, wi) => (
              <span key={wi} className="inline-block overflow-hidden mr-[0.3em]">
                {word.split('').map((char, ci) => (
                  <span
                    key={ci}
                    className="h-char inline-block"
                    style={{
                      transform: 'translateY(100%)',
                      opacity: 0,
                      transition: 'transform 800ms var(--ease-standard), opacity 800ms var(--ease-standard)',
                      transitionDelay: `${ci * 20}ms`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <p
            className="font-body mt-6 max-w-[600px] leading-relaxed"
            style={{
              fontSize: 'clamp(0.875rem, 1vw, 0.975rem)',
              color: 'var(--color-foreground)',
              lineHeight: 1.6,
            }}
          >
            {aboutBody[mode]}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 md:gap-12 mt-12">
            {stats.map((stat) => (
              <StatCounter
                key={stat.label}
                target={stat.target}
                label={stat.label}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}