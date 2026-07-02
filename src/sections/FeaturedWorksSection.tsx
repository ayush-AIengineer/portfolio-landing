import { useEffect, useRef, useState, useCallback } from 'react';
import { usePortfolioMode } from '../context/PortfolioModeContext';
import { worksHeading, worksContent, type WorkItem } from '../data/portfolioData';

export default function FeaturedWorksSection() {
  const { mode } = usePortfolioMode();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [works, setWorks] = useState<WorkItem[]>(worksContent[mode]);
  const [flyoverImage, setFlyoverImage] = useState<string | null>(null);
  const [flyoverPos, setFlyoverPos] = useState({ x: 0, y: 0 });
  const [flyoverVisible, setFlyoverVisible] = useState(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const flyoverPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Heading reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const chars = headingRef.current?.querySelectorAll('.w-char');
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

  // Mode change animation
  useEffect(() => {
    setWorks(worksContent[mode]);
  }, [mode]);

  // Flyover image tracking
  const onMouseMove = useCallback((e: MouseEvent) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      flyoverPosRef.current.x += (mousePosRef.current.x - flyoverPosRef.current.x) * 0.2;
      flyoverPosRef.current.y += (mousePosRef.current.y - flyoverPosRef.current.y) * 0.2;
      setFlyoverPos({ ...flyoverPosRef.current });
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onMouseMove]);

  const handleItemEnter = (image: string) => {
    setFlyoverImage(image);
    setFlyoverVisible(true);
  };

  const handleItemLeave = () => {
    setFlyoverVisible(false);
  };

  const headingWords = worksHeading[mode].split(' ');

  return (
    <section
      ref={sectionRef}
      id="works"
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
      <div className="text-label text-[#7f7f7f] mb-3">SELECTED WORKS</div>
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
                className="w-char inline-block"
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

      {/* Work List */}
      <div style={{ marginTop: 'var(--space-subsection)' }}>
        {works.map((work, i) => (
          <div
            key={`${mode}-${work.name}`}
            className="group flex flex-col sm:flex-row sm:items-center sm:justify-between py-8 border-b border-white/8 cursor-pointer"
            style={{
              animation: `workFadeIn 400ms ease ${i * 80}ms both`,
            }}
            onMouseEnter={() => handleItemEnter(work.flyover)}
            onMouseLeave={handleItemLeave}
            data-cursor-hover
          >
            <span
              className="font-body text-white group-hover:translate-x-2 group-hover:text-[#e5e5e5] transition-all duration-300 inline-block"
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)' }}
            >
              {work.name}
            </span>

            <div className="flex items-center gap-4 mt-3 sm:mt-0">
              {work.role && (
                <span className="text-sm font-body text-[#7f7f7f] hidden md:inline text-right">
                  {work.role}
                </span>
              )}
              <span className="text-sm font-body text-[#7f7f7f] ml-2">{work.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Explore the work section commented out */}

      {/* Flyover Image */}
      {flyoverImage && (
        <div
          className="fixed pointer-events-none z-40"
          style={{
            left: flyoverPos.x + 20,
            top: flyoverPos.y - 100,
            width: '320px',
            opacity: flyoverVisible ? 1 : 0,
            transform: `scale(${flyoverVisible ? 1 : 0.9})`,
            transition: 'opacity 300ms ease, transform 300ms ease',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <img
            src={flyoverImage}
            alt=""
            className="w-full aspect-[16/10] object-cover"
          />
        </div>
      )}

      <style>{`
        @keyframes workFadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes galleryFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
