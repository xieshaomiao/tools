import fs from 'node:fs';
import path from 'node:path';

const adConfigPath = path.join(process.cwd(), 'app', 'config', 'ad.ts');
if (!fs.existsSync(adConfigPath)) {
  console.error('ad config not found');
  process.exit(1);
}

fs.readFileSync(adConfigPath, 'utf8');
const publisher = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || '';
const slot = process.env.NEXT_PUBLIC_ADSENSE_DEFAULT_SLOT || '';
if (!/^ca-pub-\d+$/.test(publisher) || !/^\d+$/.test(slot)) {
  console.log('Ads are safely disabled until valid AdSense environment variables are configured.');
  process.exit(0);
}

console.log('AdSense publisher and default slot formats are valid.');
process.exit(0);
