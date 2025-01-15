'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { UserProfile } from '../items/UserProfile';

const fetchUser = async () => {
  const res = await fetch('/api/user');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export const MainHeader = () => {
  const t = useTranslations('Header');
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  const navigation = [
    {
      path: '/projects',
      label: 'project',
    },
  ];

  return (
    <header className="sticky top-0 z-10 bg-background shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex w-full justify-between gap-6 md:gap-10">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <Image
                className="mb-0.5"
                src="/icons/icon-48x48.png"
                width={20}
                height={20}
                alt="Logo"
              />
              <span className="-ml-1 inline-block font-black italic">
                CC Funding
              </span>
            </Link>
            <nav className="flex gap-6">
              {navigation.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button variant="ghost">{t(item.label)}</Button>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/create">
              <Button>{t('create_project')}</Button>
            </Link>
            <UserProfile loading={isLoading} {...user} />
          </div>
        </div>
      </div>
    </header>
  );
};
