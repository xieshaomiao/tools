'use client';

import { useEffect } from 'react';
import adConfig from '@/app/config/ad';

export default function AdSlot({ slot = adConfig.ads.sampleAdUnit }: { slot?: string }) {
  useEffect(() => {
    if (!adConfig.ads.enabled) return;
    try {
      const adsWindow = window as typeof window & { adsbygoogle?: unknown[] };
      (adsWindow.adsbygoogle = adsWindow.adsbygoogle || []).push({});
    } catch {
      // Ad blockers and delayed scripts must not affect the tool page.
    }
  }, [slot]);

  if (!adConfig.ads.enabled) return null;

  return (
    <aside aria-label="Advertisement" className="min-h-24 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 p-3">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adConfig.ads.publisherId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
