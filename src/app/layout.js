import { DM_Serif_Display, Manrope } from 'next/font/google';

import './globals.css';

const display = DM_Serif_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: '400',
});

const body = Manrope({
  variable: '--font-body',
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourhomelikeyou.com'),
  title: {
    default: 'Your Home Like You | Property, made personal.',
    template: '%s | Your Home Like You',
  },
  description:
    'Construction and renovation for Nigerian homes, coordinated by one accountable property team from first conversation to final handover.',
  openGraph: {
    title: 'Your Home Like You',
    description:
      'Come home to what you imagined. Construction and renovation coordinated from first conversation to final handover.',
    type: 'website',
    url: '/',
    siteName: 'Your Home Like You',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Your Home Like You' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Home Like You',
    description: 'Your home. Like you. Construction and renovation coordinated end to end.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
