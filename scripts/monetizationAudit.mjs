const baseUrl = (process.argv[2] || 'http://127.0.0.1:3000').replace(/\/$/, '');
const auditMode = (process.env.MONETIZATION_AUDIT_MODE || 'off').trim().toLowerCase();
const publisherId = (process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || '').trim();
const sellerId = publisherId.replace(/^ca-/, '');

if (!['off', 'review'].includes(auditMode)) {
  console.error('MONETIZATION_AUDIT_MODE must be off or review. Use npm run ad:validate for live configuration checks.');
  process.exit(1);
}

if (auditMode === 'review' && !/^ca-pub-\d{16}$/.test(publisherId)) {
  console.error('Review mode audit requires NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub- followed by 16 digits.');
  process.exit(1);
}

const requiredPages = [
  '/',
  '/en',
  '/tools',
  '/en/tools',
  '/blog',
  '/blog/what-is-json',
  '/blog/how-tool-pages-work',
  '/blog/pdf-to-word-guide',
  '/en/blog',
  '/en/blog/pdf-to-word-guide',
  '/en/blog/fix-json-errors',
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
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        redirect: 'follow',
        headers: { 'User-Agent': 'Toolly-Monetization-Audit/1.0' },
        signal: AbortSignal.timeout(15000),
      });
      return { response, text: await response.text() };
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1)));
    }
  }
  throw new Error(`${path} could not be fetched after 3 attempts: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

const failures = [];
const expectedVerificationMeta = auditMode === 'review'
  ? `<meta name="google-adsense-account" content="${publisherId}"`
  : '';

for (const path of requiredPages) {
  try {
    const { response, text } = await fetchText(path);
    if (response.status !== 200) failures.push(`${path} returned ${response.status}`);
    if (!text.includes('<main')) failures.push(`${path} has no main content`);
    for (const unsafeCopy of staleOrUnsafeCopy) {
      if (text.toLowerCase().includes(unsafeCopy.toLowerCase())) failures.push(`${path} contains stale or unsafe copy: ${unsafeCopy}`);
    }
    if (/adsbygoogle|pagead2\.googlesyndication\.com/i.test(text)) {
      failures.push(`${path} loads the AdSense advertising script while audit mode is ${auditMode}.`);
    }
    if (auditMode === 'off' && /google-adsense-account|ca-pub-\d{16}/i.test(text)) {
      failures.push(`${path} exposes AdSense verification while audit mode is off.`);
    }
    if (auditMode === 'review' && !text.includes(expectedVerificationMeta)) {
      failures.push(`${path} is missing the expected AdSense ownership meta for ${publisherId}.`);
    }
  } catch (error) {
    failures.push(`${path} could not be fetched: ${error instanceof Error ? error.message : String(error)}`);
  }
}

try {
  const { response, text } = await fetchText('/ads.txt');
  if (auditMode === 'off') {
    if (response.status !== 404) failures.push(`/ads.txt should return 404 in off mode, received ${response.status}`);
    if (/pub-\d{16}/.test(text)) failures.push('/ads.txt exposes a publisher ID in off mode.');
  } else {
    const expectedAdsTxt = `google.com, ${sellerId}, DIRECT, f08c47fec0942fa0`;
    if (response.status !== 200) failures.push(`/ads.txt should return 200 in review mode, received ${response.status}`);
    if (text.trim() !== expectedAdsTxt) failures.push(`/ads.txt does not exactly match the expected review record for ${sellerId}.`);
  }
} catch (error) {
  failures.push(`ads.txt safety check failed: ${error instanceof Error ? error.message : String(error)}`);
}

try {
  const { response, text } = await fetchText('/sitemap.xml');
  if (response.status !== 200) failures.push(`/sitemap.xml returned ${response.status}`);
  for (const path of ['/blog/pdf-to-word-guide', '/en/blog', '/en/blog/pdf-to-word-guide', '/en/blog/fix-json-errors', '/privacy', '/terms', '/about', '/contact']) {
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

console.log(`Monetization readiness audit passed in ${auditMode} mode for ${requiredPages.length} public pages at ${baseUrl}.`);
