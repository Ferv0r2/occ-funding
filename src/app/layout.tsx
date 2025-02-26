import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { MSWInitializer } from '@/components/logic/providers/MSWInitializer';
import { ReactQueryProvider } from '@/components/logic/providers/ReactQueryProvider';
import { SolanaWalletProvider } from '@/components/logic/providers/SolanaWalletProvider';

import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://occ-funding.wontae.net'),
  title: 'OCC Funding | Transparent Blockchain Crowd-funding Platform',
  description:
    'OCC Funding combines crowd-funding with blockchain technology, featuring DAO governance and Soul Bound Tokens (SBT) for secure and transparent project investments. Backers can vote on milestones and ensure their contributions are protected.',
  keywords: [
    'Crowdfunding',
    'Blockchain',
    'DAO',
    'Soul Bound Tokens',
    'SBT',
    'Decentralized Funding',
    'Transparent Investments',
    'Smart Contracts',
    'Milestone-Based Funding',
    'Escrow Refunds',
    'Blockchain Platform',
    'OCC Funding',
  ],
  authors: [{ name: 'Ferv0r2' }],
  openGraph: {
    title: 'OCC Funding | Transparent Blockchain Crowd-funding Platform',
    description:
      'Combine crowd-funding with blockchain for secure and transparent investments. Utilize DAO governance and SBTs to manage project milestones and ensure fund safety.',
    url: 'https://occ-funding.wontae.net',
    type: 'website',
    locale: 'en_US',
    siteName: 'OCC Funding',
    images: [
      {
        url: '/banners/banner.png',
        width: 1200,
        height: 630,
        alt: 'OCC Funding Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OCC Funding | Transparent Blockchain Crowdfunding Platform',
    description:
      'Secure and transparent crowdfunding using blockchain technology. Back projects with confidence using DAO voting and Soul Bound Tokens (SBT).',
    site: '@Ferv0r2',
    images: ['/banners/banner.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <MSWInitializer />
      <SolanaWalletProvider>{children}</SolanaWalletProvider>
    </ReactQueryProvider>
  );
}
