const baseUrl = (process.argv[2] || 'http://127.0.0.1:3000').replace(/\/$/, '');

const requiredPages = [
  '/',
  '/en',
  '/tools',
  '/en/tools',
  '/blog',
  '/blog/what-is-json',
  '/blog/how-tool-pages-work',
  '/blog/pdf-to-word-guide',
  '/privacy',
  '/terms',
  '/about',
  '/contact',
  '/membership',
  '/en/privacy',
  '/en/terms',
  '/en/about',
  '/en/contact',
  '/en/membership',
];

const staleOrUnsafeCopy = [
  '提升广告点击率',
  '增加广告曝光',
  'App 下载入口',
  '点击广告支持',
  'increase ad clicks',
  'click ads to support',
  'boost ad impressions',
  'ad placement testing',
  'Download app',
];

async function fetchText(path) {
  const response = await fetch(`${baseUrl}${path}`, {
    redirect: 'follow',
    headers: { 'User-Agent': 'Toolly-Monetization-Audit/1.0' },
    signal: AbortSignal.timeout(15000),
  });
  return { response, text: await response.text() };
}

const failures = [];

for (const path of requiredPages) {
  try {
    const { response, text } = await fetchText(path);
    if (response.status !== 200) failures.push(`${path} returned ${response.status}`);
    if (!text.includes('<main')) failures.push(`${path} has no main content`);
    for (const unsafeCopy of staleOrUnsafeCopy) {
      if (text.toLowerCase().includes(unsafeCopy.toLowerCase())) failures.push(`${path} contains stale or unsafe copy: ${unsafeCopy}`);
    }
    if (/adsbygoogle|googlesyndication|ca-pub-\d{16}/i.test(text)) {
      failures.push(`${path} loads AdSense while the default audit expects ads to be off.`);
    }
  } catch (error) {
    failures.push(`${path} could not be fetched: ${error instanceof Error ? error.message : String(error)}`);
  }
}

try {
  const { response, text } = await fetchText('/ads.txt');
  if (response.status !== 404) failures.push(`/ads.txt should return 404 in off mode, received ${response.status}`);
  if (/pub-\d{16}/.test(text)) failures.push('/ads.txt exposes a publisher ID in off mode.');
} catch (error) {
  failures.push(`ads.txt safety check failed: ${error instanceof Error ? error.message : String(error)}`);
}

try {
  const { response, text } = await fetchText('/sitemap.xml');
  if (response.status !== 200) failures.push(`/sitemap.xml returned ${response.status}`);
  for (const path of ['/blog/pdf-to-word-guide', '/privacy', '/terms', '/about', '/contact']) {
    if (!text.includes(path)) failures.push(`sitemap is missing ${path}`);
  }
} catch (error) {
  failures.push(`sitemap check failed: ${error instanceof Error ? error.message : String(error)}`);
}

if (failures.length) {
  console.error(`Monetization readiness audit failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Monetization readiness audit passed for ${requiredPages.length} public pages at ${baseUrl}.`);
