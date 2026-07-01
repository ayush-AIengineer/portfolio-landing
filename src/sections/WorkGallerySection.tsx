import { useEffect, useRef } from 'react';
import { usePortfolioMode } from '../context/PortfolioModeContext';
import { galleryContent } from '../data/portfolioData';

export function GalleryCard({ title, category, image, video }: { title: string; category: string; image: string; video?: string }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl cursor-pointer"
      style={{ aspectRatio: '4/3' }}
      data-cursor-hover
    >
      {/* Background Media */}
      {video ? (
        <video
          src={video}
          poster={image}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          style={{
            filter: 'brightness(0.7)',
            transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'brightness(0.9)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'brightness(0.7)';
          }}
        />
      ) : (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          style={{
            filter: 'brightness(0.5)',
            transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
          }}
          loading="lazy"
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'brightness(0.7)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'brightness(0.5)';
          }}
        />
      )}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="text-label text-white/60 mb-1">{category}</div>
        <h3 className="font-body font-medium text-lg text-white">{title}</h3>
      </div>
    </div>
  );
}

export default function WorkGallerySection() {
  const { mode } = usePortfolioMode();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const chars = headingRef.current?.querySelectorAll('.g-char');
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

  const gallery = galleryContent[mode];
  const headingWords = 'Dive deeper.'.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        zIndex: 1,
        marginTop: 'var(--space-section)',
        padding: '0 var(--page-gutter)',
        maxWidth: 'var(--container-wide)',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
        }}
      >
        <div className="text-label text-[#7f7f7f] mb-3">EXPLORE</div>
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
                  className="g-char inline-block"
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
      </div>

      {/* Gallery Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{ marginTop: 'var(--space-subsection)' }}
      >
        {gallery.map((item, i) => (
          <div
            key={`${mode}-${item.title}`}
            style={{
              animation: `galleryFadeIn 500ms ease ${i * 100}ms both`,
            }}
          >
            <GalleryCard {...item} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes galleryFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
