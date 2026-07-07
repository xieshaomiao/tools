export const SITE_NAME = 'Toolly';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://toolly-ruddy.vercel.app')
).replace(/\/$/, '');

export function absoluteUrl(path = '/') {
  return new URL(path, `${SITE_URL}/`).toString();
}
