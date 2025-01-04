'use client';

import { FC, useEffect } from 'react';
import { initMSW } from '@/lib/mocks';

export const MSWInitializer: FC = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MODE === 'msw') {
      initMSW();
    }
  }, []);

  return null;
};
