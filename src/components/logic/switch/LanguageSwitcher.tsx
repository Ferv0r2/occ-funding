'use client';

import clsx from 'clsx';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export const LanguageSwitcher = () => {
  const params = useParams();

  const languages = [
    { locale: 'ko', name: '한국어', isSelected: params.locale === 'ko' },
    { locale: 'en', name: 'English', isSelected: params.locale === 'en' },
  ];

  return (
    <div className="flex items-center gap-4">
      {languages.map(({ locale, name, isSelected }) => (
        <Link
          key={locale}
          href={`/${locale}`}
          className={clsx(
            'flex items-center gap-2 rounded px-4 py-2 text-white transition',
            isSelected
              ? 'bg-indigo-500 hover:bg-indigo-600'
              : 'bg-slate-500 hover:bg-slate-600',
          )}
        >
          {isSelected && <Check size={16} />}
          {name}
        </Link>
      ))}
    </div>
  );
};
