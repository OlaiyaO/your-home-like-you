import { Building2, Hammer, Sparkles, SwatchBook } from 'lucide-react';

const serviceArea = process.env.NEXT_PUBLIC_SERVICE_AREA || '';

export const site = {
  name: 'Your Home Like You',
  shortName: 'YHLY',
  tagline: 'Property, made personal.',
  promise: 'One accountable team. From first idea to finished space.',
  description:
    'Construction and property delivery coordinated from scope to handover, across new builds, interiors, care, renovation and property services.',
  contactName: 'Your Home Like You team',
  foundedYear: 2019,
  verifiedCustomerCount: 50,
  primaryEmail: 'jummyholar@yahoo.com',
  primaryEmailConfigured: true,
  email: 'jummyholar@yahoo.com',
  phone: '+234 802 309 2781',
  whatsappNumber: '2348023092781',
  whatsappConfigured: true,
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/ur_home_like_u_interiors/',
  instagramConfigured: true,
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '/',
  facebookConfigured: Boolean(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '/',
  linkedinConfigured: Boolean(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  addressLines: serviceArea ? [serviceArea] : [],
  location: serviceArea,
};

export function buildWhatsAppHref(message) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappHref = buildWhatsAppHref(
  "Hi Your Home Like You, I'd love some help with a property project. Can I tell you what I have in mind?",
);

export const whatsappContactHref = site.whatsappConfigured ? whatsappHref : '/contact#quote';

export const serviceGroups = [
  {
    id: 'construction',
    number: '01',
    eyebrow: 'Build from the ground up',
    title: 'Full construction & building delivery',
    description:
      'We turn your building idea into a clear plan. Then we coordinate the work from site preparation to handover.',
    icon: Building2,
    image: '/services/construction.jpg',
    imageAlt: 'Construction professionals coordinating work on a reinforced concrete building site',
    services: [
      'New residential and commercial construction',
      'Site preparation, foundation and structural works',
      'Building services and finishing coordination',
      'Procurement, trades and site supervision',
      'Quality checks, completion and handover',
    ],
  },
  {
    id: 'dress',
    number: '02',
    eyebrow: 'Dress the space',
    title: 'Curtains, blinds & interiors',
    description:
      'We use curtains, blinds and interior details to make your room feel private, complete and personal.',
    icon: SwatchBook,
    image: '/services/interiors.jpg',
    imageAlt: 'A warm finished living room with full-length curtains and considered furnishings',
    services: [
      'Curtains and sheers',
      'Roller, Venetian and day-night blinds',
      'Measurements and installation',
      'Soft furnishings and styling',
      'Interior finishing and space refreshes',
    ],
  },
  {
    id: 'care',
    number: '03',
    eyebrow: 'Care for the space',
    title: 'Cleaning & property care',
    description:
      'We clean and prepare your property so it is ready to use, move into or hand over.',
    icon: Sparkles,
    image: '/services/property-care.jpg',
    imageAlt: 'A professional cleaner carefully polishing a glass partition in a finished interior',
    services: [
      'Post-construction cleaning',
      'Move-in and move-out cleaning',
      'Deep residential cleaning',
      'Office and short-let cleaning',
      'Property preparation and handover',
    ],
  },
  {
    id: 'transform',
    number: '04',
    eyebrow: 'Transform the space',
    title: 'Renovation & project delivery',
    description:
      'We plan the changes, coordinate the workers and keep the project focused on the result you approved.',
    icon: Hammer,
    image: '/services/renovation.jpg',
    imageAlt:
      'A project professional reviewing plans inside a contemporary building under construction',
    services: [
      'Renovations and remodelling',
      'Painting, tiling and finishing',
      'Kitchen and bathroom upgrades',
      'Site supervision and procurement',
      'Extensions and space reconfiguration',
    ],
  },
  {
    id: 'property',
    number: '05',
    eyebrow: 'Move the property forward',
    title: 'Property & real-estate services',
    description:
      'We help you find, prepare or improve a property without making you manage every detail alone.',
    icon: Building2,
    image: '/services/property.jpg',
    imageAlt: 'A contemporary tropical residence with landscaped grounds and a swimming pool',
    services: [
      'Land and property sourcing',
      'Buying and selling support',
      'Property improvement for resale',
      'Rental and short-let preparation',
      'Inspection and project coordination',
    ],
  },
];

export const projectProcess = [
  {
    step: '01',
    title: 'Tell us what must change',
    detail: 'Send photos, the location and a short note about the problem.',
  },
  {
    step: '02',
    title: 'We inspect and define the work',
    detail: 'We ask questions, inspect the property if needed and define the work.',
  },
  {
    step: '03',
    title: 'You approve a clear proposal',
    detail: 'You see the work, cost and checks before the project begins.',
  },
  {
    step: '04',
    title: 'We deliver and hand over',
    detail: 'We manage the work, then walk through the finished space with you.',
  },
];

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Shop', href: '/shop' },
  { label: 'Our work', href: '/portfolio' },
  { label: 'How it works', href: '/#process' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const brandAssets = {
  primary: '#C81522',
  primaryDark: '#98101A',
  ink: '#181512',
  ivory: '#F6F0E8',
  paper: '#FFFDFC',
  stone: '#D8CEC2',
  displayTypeface: 'DM Serif Display',
  bodyTypeface: 'Manrope',
  markMeaning:
    'An open architectural frame with a Y-shaped threshold: a home shaped around the person entering it.',
};
