const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim() ?? '';
const defaultSlot = process.env.NEXT_PUBLIC_ADSENSE_DEFAULT_SLOT?.trim() ?? '';

const adConfig = {
  ads: {
    enabled: /^ca-pub-\d+$/.test(publisherId) && /^\d+$/.test(defaultSlot),
    publisherId,
    sampleAdUnit: defaultSlot,
  },
};

export default adConfig;
