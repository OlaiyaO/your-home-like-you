import { Building2, Hammer, Sparkles, SwatchBook } from 'lucide-react';

export const site = {
  name: 'Your Home Like You',
  shortName: 'YHLY',
  tagline: 'Property, made personal.',
  promise: 'One accountable team. From first idea to finished space.',
  description:
    'Construction and property delivery coordinated from scope to handover, across new builds, interiors, care, renovation and property services.',
  contactName: 'Ajoke Ola',
  primaryEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '[PRIMARY BUSINESS EMAIL]',
  primaryEmailConfigured: Boolean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '[PRIMARY BUSINESS EMAIL]',
  phone: '+234 704 006 3000',
  whatsappNumber: '2347040063000',
  whatsappConfigured: true,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '/',
  instagramConfigured: Boolean(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '/',
  facebookConfigured: Boolean(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '/',
  linkedinConfigured: Boolean(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  addressLines: [
    'Shop 3, B10 Plaza',
    'B10 Street, Citec Mbora Estate',
    'Along Jabi Airport Road',
    'Abuja, Nigeria',
  ],
  location:
    'Shop 3, B10 Plaza, B10 Street, Citec Mbora Estate, Along Jabi Airport Road, Abuja, Nigeria',
};

export const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  'Hello Your Home Like You, I would like to discuss a project.',
)}`;

export const whatsappContactHref = site.whatsappConfigured ? whatsappHref : '/contact#quote';

export const serviceGroups = [
  {
    id: 'construction',
    number: '01',
    eyebrow: 'Build from the ground up',
    title: 'Full construction & building delivery',
    description:
      'End-to-end delivery for new residential and commercial buildings, coordinated from approved scope and site preparation through structure, services, finishes and final handover.',
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
      'Made-to-measure window treatments and considered interiors that make a room feel complete, not merely decorated.',
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
      'Detailed cleaning for occupied homes, new builds, offices and handovers, with standards you can inspect before we leave.',
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
      'A practical path from scope and costing to trades, finishes and handover, coordinated around the result you approved.',
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
      'Support for owners and buyers who need a property sourced, prepared, improved, presented or moved to its next chapter.',
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
    detail:
      'Send photos, dimensions, a location and the outcome you want. Rough ideas are welcome.',
  },
  {
    step: '02',
    title: 'We inspect and define the work',
    detail:
      'Where necessary, we visit the property, confirm scope, materials, timing and responsibilities.',
  },
  {
    step: '03',
    title: 'You approve a clear proposal',
    detail:
      'You see what is included, what it costs and how delivery will be checked before work begins.',
  },
  {
    step: '04',
    title: 'We deliver and hand over',
    detail:
      'One team coordinates the moving pieces and closes with a walkthrough, not an unexplained exit.',
  },
];

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Shop', href: '/shop' },
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
