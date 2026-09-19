import {
  FaPalette,
  FaBox,
  FaAward,
  FaFigma,
  FaRocket,
  FaBolt,
  FaCompass,
  FaLayerGroup,
} from 'react-icons/fa';
import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiWordpress,
} from 'react-icons/si';

/**
 * About section data - skills, tools, value propositions
 */

export const WHY_HARRY = [
  {
    icon: FaCompass,
    title: 'Strategy & Purpose',
    description: 'Every visual decision is rooted in commercial strategy, distinct positioning, and long-term brand equity.',
  },
  {
    icon: FaRocket,
    title: 'Proven Commercial Lift',
    description: 'Design engineered to convert. Track record of delivering measurable revenue growth, including a 40% sales increase for packaging clients.',
  },
  {
    icon: FaBolt,
    title: 'Precision in Every Detail',
    description: 'Exacting grid systems, refined typographic hierarchies, and production-ready manufacturing dielines with zero guesswork.',
  },
  {
    icon: FaAward,
    title: 'Direct Partner Model',
    description: 'No account managers or agency overhead. Work directly with an experienced designer through rapid, collaborative sprints.',
  },
];

export const TOOLS = [
  {
    name: 'Illustrator',
    icon: SiAdobeillustrator,
    color: 'from-orange-600 to-amber-600',
  },
  {
    name: 'Photoshop',
    icon: SiAdobephotoshop,
    color: 'from-blue-600 to-cyan-600',
  },
  {
    name: 'Premiere Pro',
    icon: SiAdobepremierepro,
    color: 'from-purple-600 to-indigo-600',
  },
  {
    name: 'Figma',
    icon: FaFigma,
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'After Effects',
    icon: SiAdobeaftereffects,
    color: 'from-indigo-600 to-violet-600',
  },
  {
    name: 'WordPress & Web',
    icon: SiWordpress,
    color: 'from-blue-500 to-teal-500',
  },
];

export const SKILLS = [
  {
    icon: FaPalette,
    title: 'Brand Identity Systems',
    description: 'Comprehensive visual frameworks, custom marks, typographic hierarchy, and style guidelines built for long-term scalability.',
  },
  {
    icon: FaBox,
    title: 'Packaging Architecture',
    description: 'Shelf-ready packaging, dieline engineering, print substrate selection, and multi-SKU retail line architecture.',
  },
  {
    icon: FaLayerGroup,
    title: 'Digital & UI Direction',
    description: 'Responsive web design, digital design tokens, landing pages, and interactive brand touchpoints.',
  },
  {
    icon: FaAward,
    title: 'Editorial & Print Systems',
    description: 'Publications, symposium reports, annual reviews, and tactile print collateral with rigorous typographic discipline.',
  },
];
