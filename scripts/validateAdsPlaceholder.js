import fs from 'node:fs';
import path from 'node:path';

const adConfigPath = path.join(process.cwd(), 'app', 'config', 'ad.ts');
if (!fs.existsSync(adConfigPath)) {
  console.error('ad config not found');
  process.exit(1);
}

fs.readFileSync(adConfigPath, 'utf8');
const mode = (process.env.NEXT_PUBLIC_ADSENSE_MODE || 'off').trim().toLowerCase();
const publisher = (process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || '').trim();
const slot = (process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT || '').trim();
const complianceReady = process.env.NEXT_PUBLIC_ADSENSE_COMPLIANCE_READY === 'true';
const cmpProvider = (process.env.NEXT_PUBLIC_ADSENSE_CMP_PROVIDER || '').trim().toLowerCase();
const cmpPublished = process.env.NEXT_PUBLIC_ADSENSE_CMP_PUBLISHED === 'true';
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://toolly-ruddy.vercel.app').trim();
const productionHost = (process.env.NEXT_PUBLIC_ADSENSE_PRODUCTION_HOST || '').trim().toLowerCase();

if (!['off', 'review', 'live'].includes(mode)) {
  console.error('NEXT_PUBLIC_ADSENSE_MODE must be off, review, or live.');
  process.exit(1);
}

if (mode === 'off') {
  console.log('AdSense is off: no verification meta, script, ad slot, or ads.txt entry will be served.');
  process.exit(0);
}

if (!/^ca-pub-\d{16}$/.test(publisher)) {
  console.error('A valid 16-digit AdSense publisher ID is required for review or live mode.');
  process.exit(1);
}

if (mode === 'review') {
  console.log('AdSense review mode is valid: ownership meta and ads.txt can be served without loading ads.');
  process.exit(0);
}

if (!complianceReady) {
  console.error('Live ads require NEXT_PUBLIC_ADSENSE_COMPLIANCE_READY=true after CMP and policy setup.');
  process.exit(1);
}

if (!['google-privacy-messaging', 'google-certified-third-party'].includes(cmpProvider)) {
  console.error('Live ads require an explicit Google-certified CMP provider in NEXT_PUBLIC_ADSENSE_CMP_PROVIDER.');
  process.exit(1);
}

if (!cmpPublished) {
  console.error('Live ads require NEXT_PUBLIC_ADSENSE_CMP_PUBLISHED=true only after the consent message is published.');
  process.exit(1);
}

if (!/^\d+$/.test(slot)) {
  console.error('Live ads require a numeric article ad unit ID.');
  process.exit(1);
}

let canonicalHost = '';
try {
  canonicalHost = new URL(siteUrl).hostname.toLowerCase();
} catch {
  console.error('NEXT_PUBLIC_SITE_URL must be a valid absolute URL.');
  process.exit(1);
}

if (!productionHost || productionHost !== canonicalHost) {
  console.error('Live ads require NEXT_PUBLIC_ADSENSE_PRODUCTION_HOST to exactly match NEXT_PUBLIC_SITE_URL.');
  process.exit(1);
}

console.log('AdSense live configuration formats, certified CMP attestation, and compliance gate are valid.');
process.exit(0);
