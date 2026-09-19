import { motion } from 'framer-motion';
import { useState } from 'react';

const AboutProfile = ({ isInView }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="order-1 lg:order-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md mx-auto lg:max-w-none flex justify-center"
      >
        <div className="relative p-0 md:p-5 group w-full">
          {/* Enhanced gradient background with animation */}
          <motion.div
            className="absolute inset-8 bg-crimson/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Designer Photo */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="relative"
            >
              {/* Photo container */}
              <div className="w-full aspect-[4/5] max-w-sm overflow-hidden bg-gradient-to-br from-crimson to-crimson-dark flex items-center justify-center shadow-2xl relative z-10">
                {imageError ? (
                  <div className="font-display text-6xl md:text-8xl text-white">H</div>
                ) : (
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Harry&backgroundColor=transparent&style=circle"
                    alt="Hariharan - Creative Designer"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>

              {/* Decorative floating elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-16 h-16 md:w-24 md:h-24 border border-crimson/70"
              />
              <motion.div
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-14 h-14 md:w-20 md:h-20 border border-[#d4775c]/70"
              />
            </motion.div>
          </div>

          <div className="relative z-20 -mt-16 ml-6 md:ml-12 max-w-[16rem] bg-eerie p-5 border border-white/15">
            <p className="font-display text-xl text-white">Hariharan</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-500">Designer / Art director</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutProfile;
