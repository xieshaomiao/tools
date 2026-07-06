import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.xieshaomiao.toolly',
  appName: 'Toolly',
  webDir: 'mobile-dist',
  loggingBehavior: 'none',
  server: {
    url: 'https://toolly-ruddy.vercel.app',
    cleartext: false,
    errorPath: 'offline.html',
  },
};

export default config;
