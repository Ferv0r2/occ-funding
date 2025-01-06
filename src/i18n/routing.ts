import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'en',
});

/**
 * If you want i18n routing, use this instead of `next/link`.
 * ❌ import Link from 'next/link';
 * ✅ import { Link, redirect, usePathname, useRouter } from '@/i18n/routing';
 */
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
