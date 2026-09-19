import { motion } from 'framer-motion';

const services = [
  { number: '01', title: 'Brand identity', description: 'Names, marks, type, color, and the visual rules that make a brand feel like itself.' },
  { number: '02', title: 'Packaging design', description: 'Shelf-ready systems that turn a good product into the one people reach for.' },
  { number: '03', title: 'Art direction', description: 'A clear visual point of view across campaigns, launches, and digital touchpoints.' },
];

const process = ['Discover', 'Define', 'Design', 'Deliver'];
const testimonial = {
  quote: 'Harry understood the feeling we wanted before we had the words for it. The result feels unmistakably ours.',
  name: 'Client note',
  role: 'Brand identity project',
};

const StudioApproach = () => {
  return (
    <section id="services" className="bg-cloud-dancer text-eerie py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-28">
          <div>
            <span className="section-kicker mb-6">What I do</span>
            <h2 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.06em] leading-[0.95]">
              Good design has a point of view.
            </h2>
            <p className="mt-8 max-w-sm text-eerie/65 leading-relaxed">
              I work with founders and teams to make useful ideas feel clear, distinct, and ready for the world.
            </p>
          </div>

          <div className="divide-y divide-eerie/15 border-y border-eerie/15">
            {services.map((service) => (
              <motion.article
                key={service.number}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.25 }}
                className="grid sm:grid-cols-[4rem_1fr] gap-4 py-7 group"
              >
                <span className="text-xs tracking-[0.16em] text-eerie/45">{service.number}</span>
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
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="section-kicker mb-5">How it works</span>
              <h2 className="font-display text-3xl md:text-5xl font-medium tracking-[-0.05em]">A thoughtful process, start to finish.</h2>
            </div>
            <span className="text-sm text-eerie/55">Clear thinking / good energy / no theatre</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-eerie/15 border border-eerie/15">
            {process.map((step, index) => (
              <div key={step} className="bg-cloud-dancer p-5 md:p-7 min-h-32 flex flex-col justify-between">
                <span className="text-xs text-eerie/45">0{index + 1}</span>
                <span className="font-display text-xl md:text-2xl">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-end">
          <div className="border-t border-eerie/20 pt-6">
            <span className="text-xs uppercase tracking-[0.16em] text-eerie/45">A small manifesto</span>
            <p className="font-display text-3xl md:text-5xl leading-[1.02] tracking-[-0.05em] mt-6 max-w-3xl">
              Make it clear. Make it felt. Make it last longer than the scroll.
            </p>
          </div>
          <blockquote className="border-l-2 border-crimson pl-6">
            <p className="text-lg leading-relaxed text-eerie/75">“{testimonial.quote}”</p>
            <footer className="mt-5 text-xs uppercase tracking-[0.14em] text-eerie/45">{testimonial.name} / {testimonial.role}</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default StudioApproach;