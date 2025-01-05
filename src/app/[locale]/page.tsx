'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/logic/switch/LanguageSwitcher';

const fetchUser = async (): Promise<{ id: string }> => {
  const res = await fetch('/api/user');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const CODE_PATH = 'src/app/[locale]/page.tsx';

export default function Home() {
  const t = useTranslations('Home');
  const { data: user, isLoading } = useQuery<{ id: string }, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <section className="flex w-full max-w-md flex-col items-center gap-6 rounded-lg bg-slate-200 p-6 shadow-md">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800">TEST AREA</h1>

        {/* MSW Test Section */}
        <div className="w-full rounded-md bg-white p-4 shadow-inner">
          <h2 className="mb-2 text-xl font-semibold text-gray-700">
            MSW Test:
          </h2>
          <pre className="overflow-auto rounded bg-gray-100 p-3 text-sm text-gray-600">
            {isLoading ? 'loading...' : JSON.stringify(user, null, 2)}
          </pre>
        </div>

        {/* Intl Test Section */}
        <div className="w-full rounded-md bg-white p-4 shadow-inner">
          <h2 className="mb-2 text-xl font-semibold text-gray-700">
            Intl Test:
          </h2>
          <LanguageSwitcher />
        </div>
      </section>

      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm sm:text-left">
          <li className="mb-2">
            {t.rich('get_start', {
              link: () => (
                <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
                  {CODE_PATH}
                </code>
              ),
            })}
          </li>
          <li>{t('hot_reload')}</li>
        </ol>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-foreground px-4 text-sm text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:h-12 sm:px-5 sm:text-base"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            {t('deploy')}
          </a>
          <a
            className="flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('docs')}
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          {t('learn')}
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          {t('examples')}
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          {t('go_to_nextjs')}
        </a>
      </footer>
    </div>
  );
}
