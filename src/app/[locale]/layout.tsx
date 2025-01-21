import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import { Footer } from '@/components/footers/Footer';
import { MainHeader } from '@/components/headers/MainHeader';
import { Toaster } from '@/components/ui/toaster';
import { routing } from '@/i18n/routing';

type Params = Promise<{ locale: never }>;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { locale } = await params;
  // https://nextjs.org/docs/messages/sync-dynamic-apis

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className="grid min-h-screen grid-rows-[auto,1fr,auto]">
          <MainHeader />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
