import { useMotionValue, useAnimationFrame } from 'framer-motion';
import { PARALLAX_SPEED, CAROUSEL_SETTINGS } from '@/constants';

/**
 * Hook to manage auto-scrolling behavior with pause/resume
 * @param {boolean} isPaused - Whether auto-scroll is paused
 * @returns {object} - Motion values for auto-scroll offsets
 */
export function useAutoScroll(customSpeed) {
  const currentSpeed = typeof customSpeed === 'number' ? customSpeed : PARALLAX_SPEED;

  // MotionValues for Auto-Scroll offsets
  const autoY1 = useMotionValue(0); // Col 1 & 3 (Up)
  const autoY2 = useMotionValue(0); // Col 2 (Down)
  const autoX1 = useMotionValue(0); // Row 1 (Left)
  const autoX2 = useMotionValue(0); // Row 2 (Right)

  // Animation Loop
  useAnimationFrame((t, delta) => {
    // Desktop and mobile autoplay remain independent from pointer and page-scroll input.
    const moveUp = autoY1.get() - currentSpeed * delta * 0.05;
    const moveDown = autoY2.get() + currentSpeed * delta * 0.05;

    const moveLeft = autoX1.get() - currentSpeed * delta * 0.05;
    const moveRight = autoX2.get() + currentSpeed * delta * 0.05;

    let newUp = moveUp;
    if (newUp <= -50) newUp = 0;
    autoY1.set(newUp);

    let newDown = moveDown;
    if (newDown >= 0) newDown = -50;
    autoY2.set(newDown);

    let newLeft = moveLeft;
    if (newLeft <= -50) newLeft = 0;
    autoX1.set(newLeft);

    let newRight = moveRight;
    if (newRight >= 0) newRight = -50;
    autoX2.set(newRight);
  });

  return { autoY1, autoY2, autoX1, autoX2 };
}
