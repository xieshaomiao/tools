import './globals.css';
import type { Metadata } from 'next';
import AdSenseLoader from './components/AdSenseLoader';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Toolly — 免费试用半年会员 | 在线工具、SEO 服务 与 App 下载',
  description: 'Toolly 提供真实可用的在线工具、SEO 标题生成、关键词提取和翻译服务。所有付费工具用户前半年免费体验，适合流量变现与会员推广。',
  keywords: ['在线工具', 'SEO', '会员免费试用', '关键词提取', '翻译', '文案润色'],
  metadataBase: new URL('https://example.com'),
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
            <div className="flex items-center justify-between">
              <p>© {new Date().getFullYear()} Toolly</p>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="text-slate-600 underline">隐私政策</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
