const AnimatedBackdrop = () => {
  // Global living background is now handled at root by LivingBackground.jsx
  // Removing redundant overlapping blur-3xl layers that caused mobile GPU flickering
  return null;
};

export default AnimatedBackdrop;