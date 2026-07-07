'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function SiteFooter() {
  const pathname = usePathname();
  const isEnglish = pathname === '/en' || pathname.startsWith('/en/');

  useEffect(() => {
    document.documentElement.lang = isEnglish ? 'en' : 'zh-CN';
  }, [isEnglish]);

  return (
    <footer lang={isEnglish ? 'en' : 'zh-CN'} className="mt-12 border-t border-slate-100 bg-white py-8 text-sm text-slate-600">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Toolly</p>
          <nav aria-label={isEnglish ? 'Footer navigation' : '页脚导航'} className="flex flex-wrap items-center gap-4">
            <Link href={isEnglish ? '/en/tools' : '/tools'} className="text-slate-600 underline">{isEnglish ? 'Tools' : '工具目录'}</Link>
            {isEnglish ? <Link href="/" hrefLang="zh-CN" className="text-slate-600 underline">中文</Link> : <Link href="/en" hrefLang="en" className="text-slate-600 underline">English</Link>}
            <Link href="/privacy" className="text-slate-600 underline">{isEnglish ? 'Privacy' : '隐私政策'}</Link>
            <Link href="https://github.com/xieshaomiao/tools" className="text-slate-600 underline">GitHub</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
