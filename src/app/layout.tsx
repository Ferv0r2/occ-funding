import type { Metadata } from 'next';
import { Geist_Mono, Geist } from 'next/font/google';
import '@/styles/globals.css';
import { ReactNode } from 'react';
import { MSWInitializer } from '@/components/logic/providers/MSWInitializer';
import { ReactQueryProvider } from '@/components/logic/providers/ReactQueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <MSWInitializer />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
