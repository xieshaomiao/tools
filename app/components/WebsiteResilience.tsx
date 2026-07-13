'use client';

import { useEffect } from 'react';

export default function WebsiteResilience() {
  useEffect(() => {
    if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') return;
    navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' }).catch(() => {
      // The website remains fully usable when service-worker registration is unavailable.
    });
  }, []);

  return null;
}
