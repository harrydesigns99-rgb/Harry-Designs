import { motion } from 'framer-motion';
import { fadeInUp, scaleIn, TRANSITIONS } from '@/animations';

const AboutHeader = ({ isInView }) => {
  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ ...TRANSITIONS.slow, ease: [0.22, 1, 0.36, 1] }}
      className="text-left mb-10 lg:mb-0"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={scaleIn}
        transition={TRANSITIONS.medium}
        className="inline-block mb-5"
      >
        <span className="section-kicker">About the designer</span>
      </motion.div>
      <h2 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.06em] leading-[0.95] mb-6 text-eerie">
        Meet <span className="text-gradient">Hariharan,</span><br />
        your creative partner.
      </h2>
      <p className="text-base md:text-lg text-eerie/60 max-w-xl leading-relaxed">
        A visual designer creating identities and packaging with clarity, character, and a little
        bit of unexpectedness.
      </p>
    </motion.div>
  );
};

export default AboutHeader;
