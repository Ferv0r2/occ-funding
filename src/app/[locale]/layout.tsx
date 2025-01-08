import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import { MainHeader } from '@/components/headers/MainHeader';
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
        <body>
          <MainHeader />
          <main className="flex-1">{children}</main>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
