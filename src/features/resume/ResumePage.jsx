import { useCMS } from '@/features/cms';
import { sound } from '@/utils/audio';

const RESUME_DATA = {
  name: 'HARIHARAN S',
  subtitle:
    'Graphic Designer • Business Development & Marketing Collateral • Brand, Digital & Presentation Design • 6+ Years',
  contact: {
    phone: '+91 86101 74188',
    phoneHref: 'tel:+918610174188',
    email: 'sivakumarhariharan007@gmail.com',
    emailHref: 'mailto:sivakumarhariharan007@gmail.com',
    website: 'harrydesigns.in',
    websiteHref: 'https://harrydesigns.in',
    location: 'Chennai, Tamil Nadu',
  },
  summary:
    'Graphic designer with 6+ years of experience turning business ideas into clear, on-brand visual stories across brochures, presentations, campaign creative, posters, packaging, social content and web assets. Delivered 35+ complete brand identity systems for 60+ clients and, at TCS, partners daily with a US-based enterprise retail client (JCPenney) across time zones. Strong command of branding, typography, layout and visual hierarchy, with a track record of simplifying complex business and technical content into engaging visuals for B2B and enterprise audiences. Proficient in Adobe Illustrator, Photoshop, Figma and Canva, plus AI-assisted design tools, and used to managing multiple concurrent projects against tight deadlines.',
  coreSkills: [
    'Brand Identity & Visual Systems',
    'Marketing & Business Collateral (Brochures, Presentations, Campaign Creative, Posters, Packaging)',
    'Visual Storytelling & Information Design',
    'Typography, Layout & Visual Hierarchy',
    'Brand Guideline Adherence',
    'Digital Ad & Social Media Creative',
    'UI/UX & Web Design (Figma, WordPress, HTML/CSS)',
    'Video Editing & Motion Graphics',
    'AI-Assisted Design Production',
    'Stakeholder Collaboration & Feedback Iteration',
  ],
  toolsAndSoftware: [
    'Adobe Illustrator',
    'Adobe Photoshop',
    'Figma',
    'Canva',
    'Adobe Premiere Pro',
    'Adobe XD',
    'WordPress',
    'HTML',
    'CSS',
    'Midjourney',
    'Adobe Firefly',
    'Canva AI',
  ],
  experiences: [
    {
      role: 'Visual Designer',
      company: 'Tata Consultancy Services (TCS)',
      period: 'Jan 2024 – Present',
      bullets: [
        'Partner daily with a US-based retail client (JCPenney) team, managing communication and deliverables across overlapping time zones.',
        'Designed business brochures, campaign creative and posters for internal and client-facing communications, applying visual design, branding and layout principles to keep every asset clear, engaging and visually consistent.',
        'Translate complex supply chain management (SCM) workflows into simpler, more user-friendly screen layouts by analysing existing screens and proposing UX improvements.',
        'Created presentations that turn complex enterprise workflows and structured analysis into clear, visually engaging stories and actionable documentation for business stakeholders.',
        'Collaborate with cross-functional stakeholders to understand business objectives, manage multiple concurrent design projects against tight deadlines, and refine work through continuous feedback.',
      ],
    },
    {
      role: 'Freelance Graphic & Digital Designer',
      company: 'Harry Designs',
      period: 'Jan 2020 – Present',
      bullets: [
        'Delivered 35+ complete brand identity systems, turning brand strategy into consistent visual systems applied across digital and print touchpoints.',
        'Produced on-brand creative for 60+ clients across digital ads, social media, packaging, and print/event collateral, working independently against tight, concurrent deadlines.',
        'Redesigned the packaging and label system for Gokul Oils, contributing to a 40% increase in sales.',
        'Managed end-to-end client relationships — briefing, objectives, revisions and final delivery — adapting quickly to fast, iterative feedback cycles.',
        'Designed and built harrydesigns.in on WordPress with custom HTML/CSS, owning both visual design and site publishing.',
        'Edited and produced video and motion graphics for client social media campaigns using Adobe Premiere Pro.',
        'Integrated AI-assisted tools (Midjourney, Adobe Firefly, Canva AI) into production workflows to speed up turnaround without compromising quality.',
      ],
    },
  ],
  projectHighlights: [
    {
      title: 'Gokul Oils',
      highlight: 'Packaging and label system redesign; contributed to a 40% increase in sales.',
    },
    {
      title: 'Sendra Gold',
      highlight: 'Full brand identity for the launch of a premium gold jewellery and finance brand, Trichy.',
    },
    {
      title: 'Diyaa Pure',
      highlight: 'UI/UX design for a cosmetics e-commerce site.',
    },
  ],
  education: {
    degree: 'Bachelor of Engineering — Electronics & Communication Engineering',
    institution: 'Ramco Institute of Technology, Rajapalayam',
    period: '2019 – 2023',
  },
};

const ResumePage = ({ onNavigateHome }) => {
  const cms = useCMS();
  const profileImage = cms?.profile?.image || '/image/hariharan.jpg';

  const handleBack = () => {
    sound.playClick();
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-[#1e1e20] selection:bg-[#FC7A69] selection:text-white">
      {/* Top Floating Glass Header */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-[#f5f4f0]/85 border-b border-black/[0.06] transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 py-3.5 sm:py-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 font-display text-base sm:text-lg font-bold tracking-tight text-[#1e1e20] hover:text-[#8b151b] transition-colors cursor-pointer group"
          >
            <span className="text-sm transition-transform group-hover:-translate-x-0.5">←</span>
            <span>Harry Designs</span>
          </button>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <a
              href="/Hariharan_Design_Resume.pdf"
              download="Hariharan_S_Resume.pdf"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#1e1e20] hover:bg-[#8b151b] text-[#f5f4f0] text-xs font-sans font-medium tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer hover:scale-105"
            >
              <span>Download PDF</span>
              <span className="text-[13px] font-mono leading-none">↓</span>
            </a>

            <button
              type="button"
              onClick={handleBack}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-sans font-semibold text-[#1e1e20]/75 hover:text-[#1e1e20] transition-colors cursor-pointer py-1.5"
            >
              Back to Portfolio <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-16 space-y-12 sm:space-y-16">
        {/* Header / Identity Block */}
        <section className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6 sm:gap-10 pb-10 sm:pb-12 border-b border-black/[0.08] items-start">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            <img
              src={profileImage}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/image/hariharan.jpg';
              }}
              alt={RESUME_DATA.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-[center_18%] border border-black/[0.08] shadow-md flex-shrink-0"
            />
            <div>
              <span className="section-kicker mb-2">OFFICIAL RESUME // 2026</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#18181b] leading-[1.1]">
                {RESUME_DATA.name}
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-sans font-medium text-[#1e1e20]/75 leading-relaxed">
                {RESUME_DATA.subtitle}
              </p>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-5 border border-black/[0.06] shadow-xs text-xs sm:text-sm space-y-2.5 font-sans">
            <div className="flex items-center justify-between gap-2 border-b border-black/[0.05] pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-black/50 font-semibold">Location</span>
              <span className="text-[#1e1e20] font-medium">{RESUME_DATA.contact.location}</span>
            </div>

            <div className="flex items-center justify-between gap-2 border-b border-black/[0.05] pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-black/50 font-semibold">Phone</span>
              <a
                href={RESUME_DATA.contact.phoneHref}
                className="text-[#1e1e20] font-medium hover:text-[#8b151b] transition-colors"
              >
                {RESUME_DATA.contact.phone}
              </a>
            </div>

            <div className="flex items-center justify-between gap-2 border-b border-black/[0.05] pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-black/50 font-semibold">Email</span>
              <a
                href={RESUME_DATA.contact.emailHref}
                className="text-[#1e1e20] font-medium hover:text-[#8b151b] transition-colors truncate max-w-[210px]"
                title={RESUME_DATA.contact.email}
              >
                {RESUME_DATA.contact.email}
              </a>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-black/50 font-semibold">Portfolio</span>
              <a
                href={RESUME_DATA.contact.websiteHref}
                target="_blank"
                rel="noreferrer"
                className="text-[#8b151b] font-medium hover:underline inline-flex items-center gap-1"
              >
                {RESUME_DATA.contact.website} <span className="text-[10px]">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* Professional Summary */}
        <section className="grid lg:grid-cols-[0.3fr_0.7fr] gap-6 sm:gap-10 pb-12 sm:pb-16 border-b border-black/[0.08]">
          <h2 className="section-kicker self-start">PROFESSIONAL SUMMARY</h2>
          <div className="space-y-4">
            <p className="font-serif text-lg sm:text-xl text-[#1e1e20]/90 leading-relaxed">
              {RESUME_DATA.summary}
            </p>
          </div>
        </section>

        {/* Core Skills */}
        <section className="grid lg:grid-cols-[0.3fr_0.7fr] gap-6 sm:gap-10 pb-12 sm:pb-16 border-b border-black/[0.08]">
          <h2 className="section-kicker self-start">CORE SKILLS</h2>
          <div className="flex flex-wrap gap-2.5">
            {RESUME_DATA.coreSkills.map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-2 rounded-xl bg-white/80 border border-black/[0.07] text-xs sm:text-sm font-sans font-medium text-[#1e1e20] shadow-2xs hover:border-[#8b151b]/40 hover:bg-white transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Tools & Software */}
        <section className="grid lg:grid-cols-[0.3fr_0.7fr] gap-6 sm:gap-10 pb-12 sm:pb-16 border-b border-black/[0.08]">
          <h2 className="section-kicker self-start">TOOLS &amp; SOFTWARE</h2>
          <div className="flex flex-wrap gap-2.5">
            {RESUME_DATA.toolsAndSoftware.map((tool) => (
              <span
                key={tool}
                className="px-3.5 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs sm:text-sm font-sans font-medium text-[#1e1e20]/85 hover:bg-black/[0.07] transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="grid lg:grid-cols-[0.3fr_0.7fr] gap-6 sm:gap-10 pb-12 sm:pb-16 border-b border-black/[0.08]">
          <h2 className="section-kicker self-start">PROFESSIONAL EXPERIENCE</h2>
          <div className="space-y-12">
            {RESUME_DATA.experiences.map((exp, idx) => (
              <article key={idx} className="relative">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 pb-2 border-b border-black/[0.05]">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18181b]">
                      {exp.role}
                    </h3>
                    <p className="mt-1 font-sans text-sm font-semibold text-[#8b151b]">
                      {exp.company}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-black/55 font-medium whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <ul className="mt-4 space-y-2.5 text-xs sm:text-sm font-sans text-[#1e1e20]/80 leading-relaxed list-disc pl-5 marker:text-[#8b151b]">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="pl-1">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Selected Project Highlights */}
        <section className="grid lg:grid-cols-[0.3fr_0.7fr] gap-6 sm:gap-10 pb-12 sm:pb-16 border-b border-black/[0.08]">
          <h2 className="section-kicker self-start">SELECTED PROJECT HIGHLIGHTS</h2>
          <div className="divide-y divide-black/[0.06] border-y border-black/[0.06]">
            {RESUME_DATA.projectHighlights.map((project, idx) => (
              <div key={idx} className="py-4.5 grid sm:grid-cols-[0.4fr_0.6fr] gap-2 items-baseline">
                <h3 className="font-serif text-xl sm:text-2xl text-[#18181b] font-normal">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#1e1e20]/80 leading-relaxed">
                  {project.highlight}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="grid lg:grid-cols-[0.3fr_0.7fr] gap-6 sm:gap-10 pb-16">
          <h2 className="section-kicker self-start">EDUCATION</h2>
          <div className="bg-white/70 rounded-2xl p-6 border border-black/[0.06] shadow-xs">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#18181b]">
              {RESUME_DATA.education.degree}
            </h3>
            <p className="mt-1.5 font-sans text-sm font-medium text-[#8b151b]">
              {RESUME_DATA.education.institution}
            </p>
            <p className="mt-1 font-mono text-xs text-black/50">
              {RESUME_DATA.education.period}
            </p>
          </div>
        </section>
      </div>

      {/* Footer Return Band */}
      <div className="relative z-10 border-t border-black/[0.06] bg-[#f5f4f0]/60 backdrop-blur-xs py-8 text-center">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 font-display text-sm font-semibold text-[#1e1e20] hover:text-[#8b151b] transition-colors cursor-pointer"
        >
          <span>← Return to Home Portfolio</span>
        </button>
      </div>
    </main>
  );
};

export default ResumePage;
