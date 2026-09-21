import { motion } from 'framer-motion';
import AnimatedBackdrop from '@/components/AnimatedBackdrop';

const services = [
  { number: '01', title: 'Brand identity', description: 'Names, marks, type, color, and the visual rules that make a brand feel like itself.' },
  { number: '02', title: 'Packaging design', description: 'Shelf-ready systems that turn a good product into the one people reach for.' },
  { number: '03', title: 'Art direction', description: 'A clear visual point of view across campaigns, launches, and digital touchpoints.' },
];

const process = ['Discover', 'Define', 'Design', 'Deliver'];
const testimonial = {
  quote:
    'Hariharan understood the exact visual gravity and heritage we needed for our launch before we even had the words for it. The identity system directly influenced our retail traction and customer trust.',
  name: 'Sendra Gold',
  role: 'Brand Identity & Launch Partner, Trichy',
};

const StudioApproach = () => {
  return (
    <section id="services" className="relative overflow-hidden bg-transparent text-eerie py-24 md:py-36">
      <AnimatedBackdrop tone="light" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-kicker mb-6">What I do</span>
            <h2 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.06em] leading-[0.95]">
              Good design has a point of view.
            </h2>
            <p className="mt-8 max-w-sm text-eerie/65 leading-relaxed">
              I work with founders and teams to make useful ideas feel clear, distinct, and ready for the world.
            </p>
          </motion.div>

          <div className="divide-y divide-eerie/15 border-y border-eerie/15">
            {services.map((service, index) => (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 10 }}
                className="grid sm:grid-cols-[4rem_1fr] gap-4 py-8 group cursor-pointer transition-colors"
              >
                <span className="text-xs font-mono tracking-[0.16em] text-eerie/45 group-hover:text-crimson transition-colors">
                  {service.number}
                </span>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-medium tracking-[-0.04em] group-hover:text-crimson transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-eerie/60 leading-relaxed">{service.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div id="process" className="mt-28 pt-8 border-t border-eerie/15">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div>
              <span className="section-kicker mb-5">How it works</span>
              <h2 className="font-display text-3xl md:text-5xl font-medium tracking-[-0.05em]">A thoughtful process, start to finish.</h2>
            </div>
            <span className="text-sm text-eerie/55 font-mono">Clear thinking / good energy / no theatre</span>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {process.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-cloud-white border border-eerie/15 p-6 md:p-8 min-h-36 flex flex-col justify-between hover:border-crimson/50 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-crimson font-bold">0{index + 1}</span>
                  <span className="text-xs text-eerie/30 group-hover:text-crimson transition-colors">✦</span>
                </div>
                <span className="font-display text-xl md:text-2xl font-medium text-eerie group-hover:text-crimson transition-colors">
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-24 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border-t border-eerie/20 pt-6"
          >
            <span className="text-xs uppercase tracking-[0.16em] text-eerie/45 font-mono">A small manifesto</span>
            <p className="font-display text-3xl md:text-5xl leading-[1.02] tracking-[-0.05em] mt-6 max-w-3xl">
              Make it clear. Make it felt. Make it last longer than the scroll.
            </p>
          </motion.div>
          <motion.blockquote
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="border-l-2 border-crimson pl-6"
          >
            <p className="text-lg leading-relaxed text-eerie/75">“{testimonial.quote}”</p>
            <footer className="mt-5 text-xs uppercase tracking-[0.14em] text-eerie/45 font-mono">{testimonial.name} / {testimonial.role}</footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
};

export default StudioApproach;