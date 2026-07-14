const requestedMode = process.env.NEXT_PUBLIC_ADSENSE_MODE?.trim().toLowerCase() ?? 'off';
const mode = requestedMode === 'review' || requestedMode === 'live' ? requestedMode : 'off';
const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim() ?? '';
const articleSlot = process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT?.trim() ?? '';
const complianceReady = process.env.NEXT_PUBLIC_ADSENSE_COMPLIANCE_READY === 'true';
const cmpProvider = process.env.NEXT_PUBLIC_ADSENSE_CMP_PROVIDER?.trim().toLowerCase() ?? '';
const cmpPublished = process.env.NEXT_PUBLIC_ADSENSE_CMP_PUBLISHED === 'true';
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://toolly-ruddy.vercel.app';
const productionHost = process.env.NEXT_PUBLIC_ADSENSE_PRODUCTION_HOST?.trim().toLowerCase() ?? '';
const publisherIsValid = /^ca-pub-\d{16}$/.test(publisherId);
const articleSlotIsValid = /^\d+$/.test(articleSlot);
const cmpProviderIsValid = cmpProvider === 'google-privacy-messaging' || cmpProvider === 'google-certified-third-party';
const cmpReady = cmpProviderIsValid && cmpPublished;
let canonicalHost = '';
try {
  canonicalHost = new URL(configuredSiteUrl).hostname.toLowerCase();
} catch {
  canonicalHost = '';
}
const productionHostIsValid = Boolean(productionHost && productionHost === canonicalHost);

const adConfig = {
  ads: {
    mode,
    verificationEnabled: mode !== 'off' && publisherIsValid,
    enabled: mode === 'live' && complianceReady && cmpReady && publisherIsValid && articleSlotIsValid && productionHostIsValid,
    publisherId,
    sellerId: publisherIsValid ? publisherId.replace(/^ca-/, '') : '',
    articleSlot,
    complianceReady,
    cmpProvider,
    cmpPublished,
    cmpReady,
    productionHost,
    productionHostIsValid,
  },
};

export default adConfig;
