import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    document.body.style.cursor = 'none';

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const onMouseEnter = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-cursor-hover], a, button, [role="button"]');
      if (target) {
        isHoveringRef.current = true;
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-cursor-hover], a, button, [role="button"]');
      if (target) {
        isHoveringRef.current = false;
      }
    };

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      const cursor = cursorRef.current;
      if (!cursor) return;

      const size = isHoveringRef.current ? 40 : 10;
      const offset = size / 2;

      cursor.style.transform = `translate(${posRef.current.x - offset}px, ${posRef.current.y - offset}px)`;
      cursor.style.width = `${size}px`;
      cursor.style.height = `${size}px`;
      cursor.style.background = isHoveringRef.current ? 'transparent' : '#ffffff';
      cursor.style.border = isHoveringRef.current ? '1px solid #ffffff' : 'none';
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter, true);
    document.addEventListener('mouseleave', onMouseLeave, true);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter, true);
      document.removeEventListener('mouseleave', onMouseLeave, true);
      document.body.style.cursor = '';
    };
  }, []);

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '10px',
        height: '10px',
        background: '#ffffff',
        borderRadius: '50%',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 100,
        transition: 'width 300ms, height 300ms, background 300ms, border 300ms',
        willChange: 'transform',
      }}
    />
  );
}
