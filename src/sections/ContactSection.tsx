import { useEffect, useRef } from 'react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const chars = headingRef.current?.querySelectorAll('.c-char');
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

  const headingWords = "Let's build something remarkable.".split(' ');

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative text-center"
      style={{
        zIndex: 1,
        marginTop: 'var(--space-section)',
        padding: '0 var(--page-gutter)',
        paddingBottom: 'var(--space-section)',
        maxWidth: 'var(--container-narrow)',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <h2
        ref={headingRef}
        className="font-display text-white"
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          letterSpacing: '-0.02em',
          lineHeight: 1.0,
        }}
      >
        {headingWords.map((word, wi) => (
          <span key={wi} className="inline-block overflow-hidden mr-[0.3em]">
            {word.split('').map((char, ci) => (
              <span
                key={ci}
                className="c-char inline-block"
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

      <p
        className="font-body mt-6 mx-auto max-w-[560px]"
        style={{
          fontSize: '1.125rem',
          color: '#e5e5e5',
          lineHeight: 1.65,
        }}
      >
        Have an AI project in mind? I'm always open to discussing new opportunities, research collaborations, or ways to apply machine learning to real-world problems.
      </p>

      {/* CTA Button */}
      <a
        href="mailto:ayushpatel.work@outlook.com"
        className="inline-block mt-10 bg-white text-[#0a0a0a] px-10 py-4 rounded-lg font-body font-medium text-base hover:scale-[1.03] hover:shadow-[0_4px_24px_rgba(255,255,255,0.15)] transition-all duration-200"
        data-cursor-hover
      >
        Start a Conversation
      </a>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-8 mt-8">
        {[{ label: 'Email', href: 'mailto:ayushpatel.work@outlook.com' }, { label: 'GitHub', href: 'https://github.com/ayushpatel7787' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayush-patel-846793279' }].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-[#7f7f7f] hover:text-white transition-colors duration-200"
            data-cursor-hover
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Footer */}
      <div
        className="mt-16 pt-8 border-t text-center"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <p className="font-body text-xs text-[#7f7f7f]">
          © 2025 Ayush Patel. AI/ML Engineer.
        </p>
      </div>
    </section>
  );
}
