import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const frameRef = useRef(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const isInitialized = useRef(false);

  const [label, setLabel] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const supportsCustomCursor = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!supportsCustomCursor || prefersReducedMotion) return undefined;

    document.body.classList.add('has-custom-cursor');

    const render = () => {
      const current = positionRef.current;
      const target = targetRef.current;
      const easing = 0.18;

      current.x += (target.x - current.x) * easing;
      current.y += (target.y - current.y) * easing;

      // Exact centered translation with zero subpixel rounding or margin offset
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }

      frameRef.current = requestAnimationFrame(render);
    };

    const handlePointerMove = (event) => {
      const { clientX, clientY } = event;

      // Prevent flying in from (0,0) on initial movement
      if (!isInitialized.current) {
        positionRef.current = { x: clientX, y: clientY };
        targetRef.current = { x: clientX, y: clientY };
        isInitialized.current = true;
      } else {
        targetRef.current = { x: clientX, y: clientY };
      }

      setIsVisible(true);

      const targetEl = event.target;
      if (!targetEl) return;

      // 1. Detect text inputs/textareas to yield to native text cursor
      const inputEl = targetEl.closest('input, textarea, select, [contenteditable="true"]');
      setIsInput(!!inputEl);

      // 2. Detect data-cursor custom labels
      const cursorTarget = targetEl.closest('[data-cursor]');
      const customLabel = cursorTarget?.dataset.cursor || '';
      setLabel(customLabel);

      // 3. Detect general interactive elements (links, buttons)
      const interactiveEl = targetEl.closest('a, button, [role="button"], input[type="submit"]');
      setIsHovered(!!interactiveEl && !customLabel);
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    const handlePointerEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    document.documentElement.addEventListener('mouseenter', handlePointerEnter);
    frameRef.current = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      document.documentElement.removeEventListener('mouseenter', handlePointerEnter);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const shouldShow = isVisible && !isInput;

  return (
    <>
      {/* Precision Center Dot */}
      <span
        ref={dotRef}
        className={`custom-cursor-dot ${shouldShow ? 'is-visible' : ''} ${label ? 'is-hidden' : ''}`}
        aria-hidden="true"
      />

      {/* Fluid Interactive Ring */}
      <span
        ref={ringRef}
        className={`custom-cursor-ring ${shouldShow ? 'is-visible' : ''} ${
          label ? 'is-active' : isHovered ? 'is-hovered' : ''
        }`}
        aria-hidden="true"
      >
        {label && <span className="custom-cursor-label">{label}</span>}
      </span>
    </>
  );
};

export default CustomCursor;