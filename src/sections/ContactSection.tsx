import { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, X } from 'lucide-react';
import { usePortfolioMode } from '../context/PortfolioModeContext';

export default function ContactSection() {
  usePortfolioMode();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:ayushpatel.work@outlook.com?subject=Project Inquiry from ${formData.name}&body=${encodeURIComponent(formData.message)}%0D%0A%0D%0AContact:%20${formData.email}`;
    window.location.href = mailto;
    setIsModalOpen(false);
    setFormData({ name: '', email: '', message: '' });
  };

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
        className="font-body mt-6 mx-auto max-w-[560px]"
        style={{
          fontSize: '1.125rem',
          color: 'var(--color-foreground)',
          lineHeight: 1.65,
        }}
      >
        Have an AI project in mind? I'm always open to discussing new opportunities, research collaborations, or ways to apply machine learning to real-world problems.
      </p>

      {/* CTA Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-block mt-10 bg-white text-black px-10 py-4 rounded-lg font-body font-semibold text-base hover:scale-[1.03] hover:shadow-[0_4px_24px_rgba(255,255,255,0.15)] transition-all duration-200 ease-standard"
        data-cursor-hover
      >
        Start a Conversation
      </button>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-8 mt-8">
        {[
          { label: 'Email', href: 'mailto:ayushpatel.work@outlook.com', icon: <Mail size={18} /> }, 
          { label: 'GitHub', href: 'https://github.com/ayush-AIengineer', icon: <Github size={18} /> }, 
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayush-patel-846793279/', icon: <Linkedin size={18} /> }
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-body text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-200"
            data-cursor-hover
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-32 pb-8 flex flex-col items-center gap-2">
        <p className="text-xs font-body text-[var(--color-muted-foreground)]">
          © {new Date().getFullYear()} Ayush Patel. Designed for the AI era.
        </p>
      </footer>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div 
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg p-8 relative"
            style={{ animation: 'workFadeIn 300ms ease both' }}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-3xl font-display text-white mb-2">Let's build something.</h3>
            <p className="text-[var(--color-muted)] mb-8 text-sm">Tell me a bit about your project or idea.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
              <div>
                <label className="text-sm font-medium text-white/70 mb-2 block">Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white/70 mb-2 block">Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white/70 mb-2 block">Project Details</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                  placeholder="I'm looking to build..."
                />
              </div>
              <button 
                type="submit"
                className="mt-4 bg-[var(--color-primary)] text-white font-semibold py-4 rounded-lg hover:scale-[1.02] transition-transform duration-200"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}