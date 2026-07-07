import './globals.css';
import type { Metadata } from 'next';
import AdSenseLoader from './components/AdSenseLoader';
import SiteFooter from './components/SiteFooter';
import { SITE_URL } from './lib/site';

const defaultTitle = 'Toolly 在线工具箱 | PDF 文档转换、图片与开发工具';
const defaultDescription = 'Toolly 提供 PDF、Word、Excel、PPT 文档互转，以及 JSON、CSV、二维码、图片压缩、正则、哈希等真实可用的免费在线工具。';

const verificationOther = Object.fromEntries(
  [
    ['msvalidate.01', process.env.BING_SITE_VERIFICATION],
    ['baidu-site-verification', process.env.BAIDU_SITE_VERIFICATION],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]))
);

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: ['在线工具', 'PDF 转 Word', 'Word 转 PDF', '文档转换', '图片转换', 'JSON CSV', '人民币大写', '正则测试', 'UUID 生成', 'Toolly'],
  metadataBase: new URL(SITE_URL),
  applicationName: 'Toolly',
  creator: 'Toolly',
  publisher: 'Toolly',
  category: 'technology',
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(Object.keys(verificationOther).length ? { other: verificationOther } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'Toolly',
    title: defaultTitle,
    description: defaultDescription,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary',
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        {/* Client-side loader will inject AdSense script when publisherId is configured */}
        <AdSenseLoader />
        {children}

        <SiteFooter />
      </body>
    </html>
  );
}
