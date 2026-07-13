import adConfig from '@/app/config/ad';

export const dynamic = 'force-dynamic';

export function GET() {
  if (!adConfig.ads.verificationEnabled || !adConfig.ads.sellerId) {
    return new Response('Not found\n', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }

  return new Response(`google.com, ${adConfig.ads.sellerId}, DIRECT, f08c47fec0942fa0\n`, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
