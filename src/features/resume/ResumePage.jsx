const skills = [
  'Digital ad & social media creative',
  'Brand identity & visual systems',
  'Web & landing page design',
  'Video editing & motion graphics',
  'AI-assisted design production',
  'Packaging & event/print collateral',
];

const tools = ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe Premiere Pro', 'Canva', 'WordPress', 'HTML', 'CSS', 'Adobe XD'];

const projects = [
  ['Gokul Oils', 'Packaging and label redesign', 'Contributed to a 40% increase in sales'],
  ['Sendra Gold', 'Full brand identity', 'Premium gold jewellery and finance brand launch in Trichy'],
  ['Diyaa Pure', 'Brand identity system', 'Organic cosmetics brand identity and visual direction'],
  ['harrydesigns.in', 'Studio website', 'Self-designed and self-built website with WordPress, HTML, and CSS'],
];

const ResumePage = () => {
  return (
    <main className="min-h-screen bg-cloud-dancer text-eerie">
      <header className="max-w-6xl mx-auto px-6 sm:px-10 py-8 flex items-center justify-between border-b border-eerie/15">
        <a href="/" className="font-display text-xl font-semibold tracking-[-0.04em]">Harry Designs</a>
        <a href="/" className="editorial-link text-sm font-semibold">Back to portfolio <span aria-hidden="true">↗</span></a>
      </header>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 md:py-24">
        <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 pb-16 border-b border-eerie/20">
          <div>
            <span className="section-kicker mb-6">Resume / profile</span>
            <h1 className="font-display text-6xl md:text-8xl font-medium tracking-[-0.08em] leading-[0.85]">Hariharan S</h1>
            <p className="mt-8 text-xl md:text-2xl text-eerie/65 max-w-xl">Graphic Designer <span className="text-crimson">•</span> Brand, Digital &amp; Production Design</p>
          </div>
          <div className="lg:text-right text-sm leading-7 text-eerie/65 lg:pt-12">
            <p>6+ years of experience</p>
            <p>Chennai, Tamil Nadu</p>
            <a className="block hover:text-crimson transition-colors" href="mailto:sivakumarhariharan007@gmail.com">sivakumarhariharan007@gmail.com</a>
            <a className="block hover:text-crimson transition-colors" href="https://harrydesigns.in" target="_blank" rel="noreferrer">harrydesigns.in</a>
            <p>+91 86101 74188</p>
          </div>
        </section>

        <section className="grid lg:grid-cols-[0.35fr_0.65fr] gap-10 py-16 border-b border-eerie/20">
          <h2 className="section-kicker self-start">Summary</h2>
          <p className="text-xl md:text-2xl leading-relaxed max-w-3xl">Graphic designer with 6+ years of experience producing high-volume, on-brand creative across digital ads, social content, web assets, packaging, and print/event materials. Delivered 35+ complete brand identity systems for 60+ clients through an independent design practice, working independently against tight, concurrent deadlines.</p>
        </section>

        <section className="grid lg:grid-cols-[0.35fr_0.65fr] gap-10 py-16 border-b border-eerie/20">
          <h2 className="section-kicker self-start">Core skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => <span key={skill} className="border border-eerie/20 px-3 py-2 text-sm">{skill}</span>)}
          </div>
        </section>

        <section className="grid lg:grid-cols-[0.35fr_0.65fr] gap-10 py-16 border-b border-eerie/20">
          <h2 className="section-kicker self-start">Experience</h2>
          <div className="space-y-12">
            <article>
              <div className="flex flex-wrap justify-between gap-3"><h3 className="font-display text-3xl">Freelance Graphic &amp; Digital Designer</h3><span className="text-sm text-eerie/50">Jan 2020 – Present</span></div>
              <p className="mt-2 text-crimson font-medium">Harry Designs</p>
              <ul className="mt-5 space-y-3 text-eerie/70 leading-relaxed list-disc pl-5">
                <li>Produced high-volume creative across digital ads, social content, packaging, and print/event collateral for 60+ clients.</li>
                <li>Delivered 35+ complete brand identity systems across digital and print touchpoints.</li>
                <li>Designed and built harrydesigns.in independently with WordPress, HTML, and CSS.</li>
                <li>Edited video and motion graphics for client social media campaigns using Adobe Premiere Pro.</li>
                <li>Used Midjourney, Adobe Firefly, and Canva AI to accelerate production workflows.</li>
                <li>Redesigned the Gokul Oils packaging and label system, contributing to a 40% increase in sales.</li>
              </ul>
            </article>
            <article>
              <div className="flex flex-wrap justify-between gap-3"><h3 className="font-display text-3xl">System Engineer</h3><span className="text-sm text-eerie/50">Jan 2024 – Present</span></div>
              <p className="mt-2 text-crimson font-medium">Tata Consultancy Services (TCS)</p>
              <ul className="mt-5 space-y-3 text-eerie/70 leading-relaxed list-disc pl-5">
                <li>Collaborate daily with a US-based retail client team across overlapping time zones.</li>
                <li>Manage multiple concurrent priorities and deadlines in a structured enterprise environment.</li>
                <li>Translate analysis into clear, actionable documentation for stakeholders.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="grid lg:grid-cols-[0.35fr_0.65fr] gap-10 py-16 border-b border-eerie/20">
          <h2 className="section-kicker self-start">Selected projects</h2>
          <div className="divide-y divide-eerie/15 border-y border-eerie/15">
            {projects.map(([name, type, result]) => <div key={name} className="py-5 grid md:grid-cols-[1fr_1fr] gap-2"><h3 className="font-display text-2xl">{name}</h3><p className="text-eerie/65">{type}<br /><span className="text-sm">{result}</span></p></div>)}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-12 py-16">
          <div><h2 className="section-kicker mb-6">Tools &amp; software</h2><p className="text-lg leading-relaxed text-eerie/70">{tools.join(' • ')}</p></div>
          <div><h2 className="section-kicker mb-6">Education</h2><h3 className="font-display text-2xl">Bachelor of Engineering</h3><p className="mt-2 text-eerie/65">Electronics &amp; Communication Engineering</p><p className="mt-1 text-sm text-eerie/50">Ramco Institute of Technology, Rajapalayam / 2019 – 2023</p></div>
        </section>
      </div>
    </main>
  );
};

export default ResumePage;