export const brandTemplates = [
  {
    slug: 'business-card-front',
    title: 'Business card front',
    category: 'Identity',
    description: '90 x 50 mm brand face for professional printing.',
    download: '/brand/yhly-business-card-front.svg',
  },
  {
    slug: 'business-card-back',
    title: 'Business card back',
    category: 'Identity',
    description: 'Editable contact side with canonical business details.',
    download: '/brand/yhly-business-card-back.svg',
  },
  {
    slug: 'letterhead',
    title: 'Letterhead',
    category: 'Documents',
    description: 'A4 correspondence sheet with a restrained branded header and footer.',
  },
  {
    slug: 'invoice',
    title: 'Invoice',
    category: 'Commercial',
    description: 'Itemised A4 invoice with editable payment, tax and legal placeholders.',
  },
  {
    slug: 'quotation',
    title: 'Quotation',
    category: 'Commercial',
    description: 'Clear scope and pricing template for client approval.',
  },
  {
    slug: 'receipt',
    title: 'Receipt',
    category: 'Commercial',
    description: 'Payment acknowledgement with method and reference placeholders.',
  },
  {
    slug: 'purchase-order',
    title: 'Purchase order',
    category: 'Operations',
    description: 'Supplier order sheet for approved goods and services.',
  },
  {
    slug: 'delivery-note',
    title: 'Delivery note',
    category: 'Operations',
    description: 'Delivery record with condition and recipient sign-off.',
  },
  {
    slug: 'project-handover',
    title: 'Project handover',
    category: 'Operations',
    description: 'Completion checklist and client acceptance record.',
  },
  {
    slug: 'email-signature',
    title: 'Email signature',
    category: 'Digital',
    description: 'Compact contact signature for daily client correspondence.',
    download: '/brand/yhly-email-signature.svg',
  },
  {
    slug: 'social-avatar',
    title: 'Social avatar',
    category: 'Digital',
    description: 'Square red brand mark for social profiles.',
    download: '/brand/yhly-social-avatar.svg',
  },
  {
    slug: 'site-board',
    title: 'Site board',
    category: 'Site',
    description: 'Landscape project board with editable project and contact fields.',
    download: '/brand/yhly-site-board.svg',
  },
  {
    slug: 'stamp',
    title: 'Brand stamp',
    category: 'Identity',
    description: 'Non-statutory one-colour brand stamp face for internal approval workflows.',
    download: '/brand/yhly-stamp-red.svg',
  },
];

export function getBrandTemplate(slug) {
  return brandTemplates.find((template) => template.slug === slug);
}
