'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useSiteLocale } from '@/app/hooks/useSiteLocale';

export default function SiteFooter() {
  const isEnglish = useSiteLocale();
  const pathname = usePathname();
  const footerLinks = isEnglish
    ? [
      { href: '/en/tools', label: 'Tools' },
      { href: '/en/blog', label: 'Guides' },
      { href: '/en/about', label: 'About' },
      { href: '/en/contact', label: 'Contact' },
      { href: '/en/privacy', label: 'Privacy' },
      { href: '/en/terms', label: 'Terms' },
    ]
    : [
      { href: '/tools', label: '工具目录' },
      { href: '/blog', label: '使用指南' },
      { href: '/about', label: '关于' },
      { href: '/contact', label: '联系' },
      { href: '/privacy', label: '隐私政策' },
      { href: '/terms', label: '服务条款' },
    ];

  useEffect(() => {
    document.documentElement.lang = isEnglish ? 'en' : 'zh-CN';
  }, [isEnglish]);

  return (
    <footer lang={isEnglish ? 'en' : 'zh-CN'} className="border-t border-blue-50 bg-[#f7fbff] py-10 text-sm text-slate-600">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-sm backdrop-blur lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Link href={isEnglish ? '/en' : '/'} className="inline-flex items-center gap-3 text-xl font-black text-slate-950">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-base text-white shadow-lg shadow-blue-500/20">T</span>
              Toolly
            </Link>
            <p className="mt-4 max-w-xl leading-7">
              {isEnglish
                ? 'A clean online toolbox for document conversion, images, text and developer utilities.'
                : '一个清爽的在线工具箱，集中处理文档转换、图片、文本和开发者常用任务。'}
            </p>
          </div>
          <nav aria-label={isEnglish ? 'Footer navigation' : '页脚导航'} className="flex flex-wrap items-center gap-3">
            {footerLinks.map((item) => {
              const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? 'page' : undefined}
                  className={`rounded-full border bg-white px-4 py-2 font-semibold transition ${current ? 'border-blue-200 text-blue-700' : 'border-slate-200 text-slate-700 hover:border-blue-200 hover:text-blue-700'}`}
                >
                  {item.label}
                </Link>
              );
            })}
            {isEnglish ? <Link href="/" hrefLang="zh-CN" className="rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">中文</Link> : <Link href="/en" hrefLang="en" className="rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">English</Link>}
            <Link href="https://github.com/xieshaomiao/tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">GitHub</Link>
          </nav>
        </div>
        <div className="mt-6 flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Toolly</p>
          <p>{isEnglish ? 'Result-first tools for everyday work.' : '结果优先，服务日常真实需求。'}</p>
        </div>
      </div>
    </footer>
  );
}
