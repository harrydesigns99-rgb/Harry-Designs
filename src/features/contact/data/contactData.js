import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaInstagram, FaLinkedin, FaBehance, FaWhatsapp } from 'react-icons/fa';

/**
 * Contact section data - verified communications & active portfolios
 */

export const CONTACT_INFO = [
  { icon: HiMail, label: 'Email', value: 'sivakumarhariharan007@gmail.com' },
  { icon: HiPhone, label: 'Phone & WhatsApp', value: '+91 86101 74188' },
  { icon: HiLocationMarker, label: 'Studio Base', value: 'Chennai, Tamil Nadu, India' },
];

export const SOCIAL_LINKS = [
  {
    icon: FaInstagram,
    url: 'https://www.instagram.com/harry_designs__?igsh=MnQxMzFidTQ1eXB0',
    name: 'Instagram',
  },
  {
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/hariharans',
    name: 'LinkedIn',
  },
  {
    icon: FaBehance,
    url: 'https://www.behance.net/harrydesigns',
    name: 'Behance',
  },
  {
    icon: FaWhatsapp,
    url: 'https://wa.me/918610174188?text=Hi%20Hariharan,%20I%20would%20like%20to%20discuss%20a%20design%20project.',
    name: 'WhatsApp',
  },
];
