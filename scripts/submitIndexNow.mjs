const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.argv[2] || 'https://toolly-ruddy.vercel.app').replace(/\/$/, '');
const key = process.env.INDEXNOW_KEY || '5700fbadf0b11c3e0af41f80d4151c31';
const host = new URL(siteUrl).host;

const sitemapResponse = await fetch(`${siteUrl}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Unable to read sitemap: HTTP ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (!urlList.length) throw new Error('No URLs were found in sitemap.xml');

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `${siteUrl}/${key}.txt`, urlList }),
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(`IndexNow submission failed: HTTP ${response.status} ${body}`);
}

console.log(`IndexNow accepted ${urlList.length} Toolly URLs with HTTP ${response.status}.`);
