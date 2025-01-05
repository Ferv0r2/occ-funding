import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { MSWInitializer } from '@/components/logic/providers/MSWInitializer';
import { ReactQueryProvider } from '@/components/logic/providers/ReactQueryProvider';
import '@/styles/globals.css';

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
    <ReactQueryProvider>
      <MSWInitializer />
      {children}
    </ReactQueryProvider>
  );
}
