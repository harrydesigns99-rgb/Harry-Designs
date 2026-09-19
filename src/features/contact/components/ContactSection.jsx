import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, TRANSITIONS, DELAYS } from '@/animations';
import AnimatedBackdrop from '@/components/AnimatedBackdrop';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      className="relative pt-24 md:pt-36 pb-24 md:pb-36 bg-cloud-dancer text-eerie overflow-hidden"
      ref={ref}
    >
      <AnimatedBackdrop tone="light" />
      <div className="absolute top-0 right-[12%] h-full w-px bg-eerie/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ ...TRANSITIONS.slow, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={scaleIn}
            transition={TRANSITIONS.medium}
            className="inline-block mb-4"
          >
              <span className="section-kicker mb-5">Contact</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-7xl font-medium tracking-[-0.06em] leading-[0.95] mb-6">
            Have a brand <span className="text-gradient">worth remembering?</span>
          </h2>
          <p className="text-base md:text-lg text-eerie/60 max-w-xl mx-auto px-4">
            Tell me what you&apos;re building, where it&apos;s going, and what it needs to become.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInRight}
            transition={{ delay: DELAYS.small, ...TRANSITIONS.medium }}
          >
            <ContactForm />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            id="contact"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInLeft}
            transition={{ delay: DELAYS.large, ...TRANSITIONS.medium }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-eerie">Get In Touch</h3>

            <ContactInfo isInView={isInView} />

            {/* Social Links */}
            <SocialLinks isInView={isInView} />

        {/* Empty placeholder removed */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
