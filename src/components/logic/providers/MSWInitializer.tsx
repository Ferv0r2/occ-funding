'use client';

import { useEffect } from 'react';
import { initMSW } from '@/lib/mocks';

const MSWInitializer: React.FC = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MODE === 'msw') {
      initMSW();
    }
  }, []);

  return null;
};

export default MSWInitializer;
