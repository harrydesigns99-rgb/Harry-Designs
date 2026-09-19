import { motion } from 'framer-motion';

const experience = [
  { period: 'Now', title: 'Independent designer', detail: 'Brand identity, packaging, and visual direction for growing brands.' },
  { period: 'Selected', title: 'Creative collaborations', detail: 'Logos, posters, brochures, and digital experiences across industries.' },
];

const capabilities = ['Brand strategy', 'Visual identity', 'Packaging systems', 'Editorial design', 'UI/UX direction', 'Art direction'];

const ResumeSection = () => {
  return (
    <section id="resume" className="bg-eerie text-white py-24 md:py-36 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <span className="section-kicker mb-5">Resume / profile</span>
            <h2 className="font-display text-4xl md:text-7xl font-medium tracking-[-0.06em] leading-none">The short version.</h2>
          </div>
          <a href="mailto:harrydesigns99@gmail.com?subject=Portfolio%20and%20resume%20request" className="editorial-link text-sm font-semibold text-stone-300" data-cursor="Email">
            Request full resume <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-28">
          <div>
            <p className="text-stone-400 leading-relaxed max-w-sm">Hariharan is a multidisciplinary designer focused on making brands feel clear, considered, and memorable.</p>
            <div className="mt-10 flex flex-wrap gap-2 max-w-sm">
              {capabilities.map((capability) => <span key={capability} className="border border-white/15 px-3 py-2 text-xs uppercase tracking-[0.12em] text-stone-300">{capability}</span>)}
            </div>
          </div>

          <div className="border-t border-white/15">
            {experience.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: index * 0.12 }} className="grid sm:grid-cols-[7rem_1fr] gap-5 py-7 border-b border-white/15">
                <span className="text-xs uppercase tracking-[0.16em] text-stone-500">{item.period}</span>
                <div><h3 className="font-display text-2xl">{item.title}</h3><p className="mt-2 text-stone-400 leading-relaxed">{item.detail}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;