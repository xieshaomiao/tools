import './globals.css';
import type { Metadata } from 'next';
import AdSenseLoader from './components/AdSenseLoader';
import Link from 'next/link';
import { SITE_URL } from './lib/site';

const defaultTitle = 'Toolly 在线工具箱 | PDF 文档转换、图片与开发工具';
const defaultDescription = 'Toolly 提供 PDF、Word、Excel、PPT 文档互转，以及 JSON、CSV、二维码、图片压缩、正则、哈希等真实可用的免费在线工具。';

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: ['在线工具', 'PDF 转 Word', 'Word 转 PDF', '文档转换', '图片转换', 'JSON CSV', '人民币大写', '正则测试', 'UUID 生成', 'Toolly'],
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
