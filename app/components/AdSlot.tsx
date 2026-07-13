'use client';

import { useEffect, useRef } from 'react';
import adConfig from '@/app/config/ad';
import AdSenseLoader from '@/app/components/AdSenseLoader';

export default function AdSlot({ locale = 'zh' }: { locale?: 'zh' | 'en' }) {
  const adElementRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (!adConfig.ads.enabled) return;
    const element = adElementRef.current;
    if (!element || element.dataset.adRequested === 'true') return;
    element.dataset.adRequested = 'true';
    try {
      const adsWindow = window as typeof window & { adsbygoogle?: unknown[] };
      (adsWindow.adsbygoogle = adsWindow.adsbygoogle || []).push({});
    } catch {
      // Ad blockers and delayed scripts must not affect page content.
    }
  }, []);

  if (!adConfig.ads.enabled) return null;

  return (
    <aside aria-label={locale === 'en' ? 'Advertisement' : '广告'} className="min-h-[280px] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
      <AdSenseLoader />
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {locale === 'en' ? 'Advertisement' : '广告'}
      </p>
      <ins
        ref={adElementRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adConfig.ads.publisherId}
        data-ad-slot={adConfig.ads.articleSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
