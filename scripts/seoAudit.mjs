const baseUrl = (process.argv[2] || process.env.SEO_BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');

function assert(condition, message, failures) {
  if (!condition) failures.push(message);
}

function tagContent(html, name) {
  const match = html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i'))
    || html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, 'i'));
  return match?.[1] || '';
}

async function getText(url) {
  const response = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Toolly-SEO-Audit/1.0' } });
  return { response, text: await response.text() };
}

const failures = [];
const { response: robotsResponse, text: robots } = await getText(`${baseUrl}/robots.txt`);
assert(robotsResponse.ok, `robots.txt returned ${robotsResponse.status}`, failures);
assert(/Allow:\s*\//i.test(robots), 'robots.txt does not allow public crawling', failures);
assert(/Disallow:\s*\/api\//i.test(robots), 'robots.txt does not protect /api/', failures);
assert(/Sitemap:/i.test(robots), 'robots.txt has no sitemap declaration', failures);

const { response: sitemapResponse, text: sitemap } = await getText(`${baseUrl}/sitemap.xml`);
assert(sitemapResponse.ok, `sitemap.xml returned ${sitemapResponse.status}`, failures);
const discovered = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert(discovered.length === 65, `expected 65 sitemap URLs, found ${discovered.length}`, failures);
assert(new Set(discovered).size === discovered.length, 'sitemap contains duplicate URLs', failures);
assert(sitemap.includes('hreflang="en"'), 'sitemap has no English hreflang entries', failures);
assert(sitemap.includes('hreflang="zh-CN"'), 'sitemap has no Chinese hreflang entries', failures);

const pagePaths = discovered.map((url) => {
  const parsed = new URL(url);
  return `${parsed.pathname}${parsed.search}`;
});

for (const path of pagePaths) {
  const { response, text: html } = await getText(`${baseUrl}${path}`);
  const pageFailures = [];
  assert(response.ok, `HTTP ${response.status}`, pageFailures);
  assert(/<title>[^<]{8,}<\/title>/i.test(html), 'missing or short title', pageFailures);
  assert(tagContent(html, 'description').length >= 50, 'missing or short meta description', pageFailures);
  assert((html.match(/<h1(?:\s|>)/gi) || []).length === 1, 'page must contain exactly one H1', pageFailures);
  assert(/rel=["']canonical["']/i.test(html), 'missing canonical link', pageFailures);
  assert(!/noindex/i.test(tagContent(html, 'robots')), 'page is marked noindex', pageFailures);

  if (path === '/' || path === '/tools' || path.startsWith('/tools/')) {
    assert(/hreflang=["']en["']/i.test(html), 'missing English alternate', pageFailures);
  }
  if (path === '/en' || path.startsWith('/en/')) {
    assert(/hreflang=["']zh-CN["']/i.test(html), 'missing Chinese alternate', pageFailures);
    assert(/lang=["']en["']/i.test(html), 'missing English language scope', pageFailures);
  }
  if (path.startsWith('/tools/') || path.startsWith('/en/tools/')) {
    const jsonBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
    assert(jsonBlocks.length >= 3, `expected at least 3 JSON-LD blocks, found ${jsonBlocks.length}`, pageFailures);
    jsonBlocks.forEach((block, index) => {
      try { JSON.parse(block.replaceAll('&quot;', '"')); } catch { pageFailures.push(`JSON-LD block ${index + 1} is invalid`); }
    });
    assert(html.includes('FAQPage'), 'missing FAQPage structured data', pageFailures);
    assert(html.includes('BreadcrumbList'), 'missing BreadcrumbList structured data', pageFailures);
    assert(html.length >= 12000, 'tool page HTML is unexpectedly thin', pageFailures);
  }

  pageFailures.forEach((failure) => failures.push(`${path}: ${failure}`));
}

if (failures.length) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`SEO audit passed: ${pagePaths.length} public pages, bilingual alternates, metadata, structured data, robots and sitemap verified.`);
