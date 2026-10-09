import { motion } from 'framer-motion';
import AnimatedBackdrop from '@/components/AnimatedBackdrop';

const services = [
  {
    number: '01',
    title: 'Brand Identity',
    description: 'Bespoke marks, typographic scale systems, color token architectures, and comprehensive brand guidelines that build enduring brand equity.',
    tag: 'Core Discipline',
  },
  {
    number: '02',
    title: 'Packaging Design',
    description: 'Shelf-ready structural systems, CAD dielines, tactile substrate finishes, and retail aisle standout engineering that convert shoppers.',
    tag: 'Industrial Craft',
  },
  {
    number: '03',
    title: 'Art Direction',
    description: 'A disciplined visual point of view across campaigns, product launches, print collateral, and digital flagship touchpoints.',
    tag: 'Brand Worlds',
  },
];

const process = [
  { step: '01', name: 'Discover', description: 'Auditing category landscape, competitor noise, and retail standout opportunities.' },
  { step: '02', name: 'Define', description: 'Establishing strategic brief, typographic hierarchy, and material parameters.' },
  { step: '03', name: 'Design', description: 'Rapid adversarial prototyping, CAD dieline testing, and optical refinement.' },
  { step: '04', name: 'Deliver', description: 'ISO 12647-2 press-ready asset calibration, substrate sign-offs, and rollout.' },
];

const testimonial = {
  quote:
    'Hariharan understood the exact visual gravity and heritage we needed for our launch before we even had the words for it. The identity and packaging systems directly influenced our retail traction and customer trust.',
  name: 'Sendra Gold',
  role: 'Brand Identity & Launch Partner, Trichy',
};

const StudioApproach = () => {
  return (
    <section id="services" className="relative overflow-hidden bg-transparent text-[#1d1d1f] py-24 md:py-36">
      <AnimatedBackdrop tone="light" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
        {/* ==================== 1. CAPABILITIES BENTO ==================== */}
        <div className="space-y-12">
          <div className="text-center sm:text-left space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-mono text-[#86868b]">
              <span>●</span>
              <span>STUDIO CAPABILITIES</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight text-[#1d1d1f]">
              Good design has a point of view.
            </h2>
            <p className="text-base md:text-lg text-[#86868b] leading-relaxed">
              Partnering with founders and ambitious teams to make ambitious ideas feel clear, distinct, and ready for commercial scale.
            </p>
          </div>

          {/* 3-Card Apple Capabilities Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="apple-card p-8 sm:p-10 space-y-6 flex flex-col justify-between bg-white border border-black/[0.08]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-crimson">
                      {service.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/[0.04] text-[#86868b]">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#1d1d1f]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#1d1d1f]/75 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.04] flex items-center justify-between text-xs font-mono text-[#86868b]">
                  <span>Studio Protocol</span>
                  <span>Inquire ↗</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ==================== 2. PROCESS METHODOLOGY ==================== */}
        <div id="process" className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-mono text-[#86868b]">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                <span>OPERATING METHODOLOGY</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-[#1d1d1f]">
                A disciplined process, start to finish.
              </h2>
            </div>
            <span className="text-xs sm:text-sm text-[#86868b] font-mono">
              Clear thinking • Good energy • Zero theatre
            </span>
          </div>

          {/* 4-Step Process Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="apple-card p-6 sm:p-7 space-y-4 bg-white border border-black/[0.08] hover:border-black/[0.2] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-crimson">{step.step}</span>
                  <span className="text-xs text-black/20">✦</span>
                </div>
                <h4 className="font-display text-xl font-medium text-[#1d1d1f]">
                  {step.name}
                </h4>
                <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ==================== 3. MANIFESTO & TESTIMONIAL ==================== */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 apple-card p-8 sm:p-12 space-y-4 flex flex-col justify-between bg-white border border-black/[0.08]"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-wider text-[#86868b]">
                A Small Studio Manifesto
              </span>
              <p className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#1d1d1f] tracking-tight leading-[1.08]">
                Make it clear. Make it felt. Make it last longer than the scroll.
              </p>
            </div>
            <div className="text-xs font-mono text-[#86868b] pt-4 border-t border-black/[0.04]">
              Design Principles // Harry Designs Studio
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="lg:col-span-5 apple-card p-8 sm:p-12 border-l-4 border-crimson space-y-4 flex flex-col justify-between bg-white border border-black/[0.08]"
          >
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-crimson font-semibold flex items-center gap-2">
                <span>✦</span> CLIENT PERSPECTIVE
              </div>
              <p className="text-sm sm:text-base text-[#1d1d1f]/85 leading-relaxed italic font-normal">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
            <div className="text-xs font-mono text-[#86868b] pt-4 border-t border-black/[0.04]">
              <span className="font-semibold text-[#1d1d1f] block">{testimonial.name}</span>
              <span>{testimonial.role}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudioApproach;