'use client';

import Script from 'next/script';
import adConfig from '@/app/config/ad';

export default function AdSenseLoader() {
  if (!adConfig.ads.enabled) return null;

  return (
    <Script
      id="toolly-adsense"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adConfig.ads.publisherId}`}
    />
  );
}
