import { memo } from 'react';

const TESTIMONIALS = [
  {
    quote:
      'Hariharan understood the exact visual gravity and heritage we needed for our launch before we even had the words for it. The identity and packaging systems directly influenced our retail traction and customer trust.',
    name: 'Sendra Gold',
    role: 'Managing Director',
    company: 'Trichy Bullion Flagship',
    highlight: 'Gold Monogram & Dielines',
  },
  {
    quote:
      'The packaging redesign transformed our counter rush hours. Assembly dropped from 15 seconds to 2 seconds with the crash-bottom boxes, and gift box purchases surged across all 12 SKUs.',
    name: 'Thomas Bakers',
    role: 'Operations & Brand Lead',
    company: 'Artisanal Bakery Chain',
    highlight: '12+ SKU Structural Packaging',
  },
  {
    quote:
      'The modern heritage botanical illustrations and clean nutritional scan zones achieved immediate distance standout in tier-1 supermarket aisles, driving a verified 40% sales increase.',
    name: 'Gokul Oils',
    role: 'Head of Marketing',
    company: 'FMCG Edible Oils',
    highlight: '+40% Verified Retail Lift',
  },
  {
    quote:
      'Confronted with decentralized publications across national laboratories, Hariharan engineered an uncompromising bilingual typographic grid uniting Hindi Devanagari and Latin letterforms.',
    name: 'CSIR India',
    role: 'Editorial Communications Lead',
    company: 'National Scientific Council',
    highlight: 'Bilingual Identity Standards',
  },
];

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#f5f4f0] text-[#1e1e20] bg-dot-grid py-16 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-black/[0.08] select-none"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 sm:mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#FC7A69] font-semibold block mb-2">
            Endorsements &amp; Impact
          </span>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1e1e20]">
            What partners say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-white border border-black/[0.08] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.06)] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#1e1e20]/[0.05] text-[#1e1e20]/70">
                  {item.highlight}
                </span>
                <p className="font-sans text-base sm:text-lg text-[#1e1e20] leading-relaxed font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/[0.06] flex items-center justify-between">
                <div>
                  <h4 className="font-display text-base font-bold text-[#1e1e20]">
                    {item.name}
                  </h4>
                  <p className="font-sans text-xs text-[#1e1e20]/60">
                    {item.role} • {item.company}
                  </p>
                </div>
                <span className="text-[#FC7A69] text-xl font-serif italic">”</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(TestimonialsSection);

