'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useSiteLocale() {
  const pathname = usePathname();
  const pathIsEnglish = pathname === '/en' || pathname.startsWith('/en/');
  const [authIsEnglish, setAuthIsEnglish] = useState(false);

  useEffect(() => {
    if (pathname !== '/auth') {
      setAuthIsEnglish(false);
      return;
    }
    const nextPath = new URLSearchParams(window.location.search).get('next') || '';
    setAuthIsEnglish(nextPath === '/en' || nextPath.startsWith('/en/'));
  }, [pathname]);

  return pathIsEnglish || authIsEnglish;
}
