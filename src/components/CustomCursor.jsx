import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const frameRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [label, setLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const supportsCustomCursor = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!supportsCustomCursor || prefersReducedMotion) return undefined;

    document.body.classList.add('has-custom-cursor');

    const render = () => {
      const current = positionRef.current;
      const target = targetRef.current;
      const easing = 0.16;

      current.x += (target.x - current.x) * easing;
      current.y += (target.y - current.y) * easing;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }

      frameRef.current = requestAnimationFrame(render);
    };

    const handlePointerMove = (event) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      setIsVisible(true);

      const cursorTarget = event.target.closest('[data-cursor]');
      setLabel(cursorTarget?.dataset.cursor || '');
    };

    const handlePointerLeave = () => setIsVisible(false);

    window.addEventListener('pointermove', handlePointerMove);
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    frameRef.current = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      <span ref={dotRef} className={`custom-cursor-dot ${isVisible ? 'is-visible' : ''}`} />
      <span
        ref={ringRef}
        className={`custom-cursor-ring ${label ? 'is-active' : ''} ${isVisible ? 'is-visible' : ''}`}
      >
        {label && <span>{label}</span>}
      </span>
    </>
  );
};

export default CustomCursor;