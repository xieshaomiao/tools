import fs from 'node:fs';
import path from 'node:path';

const adConfigPath = path.join(process.cwd(), 'app', 'config', 'ad.ts');
if (!fs.existsSync(adConfigPath)) {
  console.error('ad config not found');
  process.exit(1);
}

const content = fs.readFileSync(adConfigPath, 'utf8');
if (content.includes('XXXXXXXX')) {
  console.warn('Ad config contains placeholder publisherId (ca-pub-XXXXXXXXXXXXXXXX). Replace with real publisherId after AdSense approval.');
  process.exit(0);
}

console.log('Ad config looks OK');
process.exit(0);
