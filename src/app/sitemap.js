const routes = [
  '',
  '/about',
  '/services',
  '/contact',
  '/brand-kit',
  '/privacy',
  '/terms',
  '/service-cancellation',
];

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
