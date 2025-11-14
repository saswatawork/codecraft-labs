import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Saswata Pal – Portfolio',
  description: 'Staff Software Engineer crafting scalable systems & developer experiences.',
  keywords: [
    'saswata pal',
    'staff engineer',
    'software engineer',
    'full stack',
    'portfolio',
    'react',
    'nextjs',
  ],
  authors: [{ name: 'Saswata Pal' }],
  creator: 'Saswata Pal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com',
    title: 'Saswata Pal – Portfolio',
    description: 'Staff Software Engineer crafting scalable systems & developer experiences.',
    siteName: 'Saswata Pal – Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saswata Pal – Portfolio',
    description: 'Staff Software Engineer crafting scalable systems & developer experiences.',
    creator: '@saswatawork',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
