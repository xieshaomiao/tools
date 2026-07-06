'use client';

import { useEffect } from 'react';
import adConfig from '@/app/config/ad';

export default function AdSenseLoader() {
  useEffect(() => {
    if (!adConfig.ads.enabled) return;
    const publisher = adConfig.ads.publisherId;
    if (!publisher || publisher.includes('XXXXXXXX')) return;

    const existing = document.querySelector(`script[src*="adsbygoogle"]`);
    if (existing) return;

    const s = document.createElement('script');
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisher}`;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);

    return () => {
      try {
        document.head.removeChild(s);
      } catch {
        /* ignore */
      }
    };
  }, []);

  return null;
}
