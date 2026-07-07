import './globals.css';
import type { Metadata } from 'next';
import AdSenseLoader from './components/AdSenseLoader';
import Link from 'next/link';
import { SITE_URL } from './lib/site';

const defaultTitle = 'Toolly 在线工具箱 | 文本、编码、SEO 与开发工具';
const defaultDescription = 'Toolly 提供 JSON 格式化、Base64 编码、字数统计、时间戳转换、SEO 内容优化等在线工具，打开即用。';

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: ['在线工具', 'SEO', '会员免费试用', '关键词提取', '翻译', '文案润色'],
  metadataBase: new URL(SITE_URL),
  applicationName: 'Toolly',
  creator: 'Toolly',
  publisher: 'Toolly',
  category: 'technology',
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

        <footer className="mt-12 border-t border-slate-100 bg-white py-8 text-sm text-slate-600">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Toolly</p>
              <nav aria-label="页脚导航" className="flex flex-wrap items-center gap-4">
                <Link href="/tools" className="text-slate-600 underline">工具目录</Link>
                <Link href="/blog" className="text-slate-600 underline">使用指南</Link>
                <Link href="/download" className="text-slate-600 underline">下载</Link>
                <Link href="/membership" className="text-slate-600 underline">会员</Link>
                <Link href="/privacy" className="text-slate-600 underline">隐私政策</Link>
              </nav>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
