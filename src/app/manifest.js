export default function manifest() {
  return {
    name: 'Your Home Like You',
    short_name: 'YHLY',
    description: 'Property, made personal.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFDFC',
    theme_color: '#C81522',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
