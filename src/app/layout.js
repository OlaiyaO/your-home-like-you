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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Your Home Like You | Property, made personal.',
    template: '%s | Your Home Like You',
  },
  description:
    'Property improvements coordinated from scope to handover, across interiors, care, renovation and property services.',
  openGraph: {
    title: 'Your Home Like You',
    description: 'One accountable team. From first idea to finished space.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
