'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSiteLocale } from '@/app/hooks/useSiteLocale';

type HeaderStatus = { loaded: boolean; isAuthenticated: boolean; email: string | null };

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isEnglish = useSiteLocale();
  const [status, setStatus] = useState<HeaderStatus>({ loaded: false, isAuthenticated: false, email: null });
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const primaryLinks = isEnglish
    ? [
      { href: '/en/tools', label: 'Tools' },
      { href: '/en/blog', label: 'Guides' },
      { href: '/en/about', label: 'About' },
      { href: '/en/contact', label: 'Contact' },
    ]
    : [
      { href: '/tools', label: '工具目录' },
      { href: '/blog', label: '使用指南' },
      { href: '/about', label: '关于' },
      { href: '/contact', label: '联系' },
    ];
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeoutId = window.setTimeout(() => {
      if (!active) return;
      controller.abort();
      setStatus({ loaded: true, isAuthenticated: false, email: null });
    }, 8000);
    fetch('/api/auth/status', { cache: 'no-store', signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!active) return;
        setStatus({ loaded: true, isAuthenticated: Boolean(data?.serviceAvailable !== false && data?.isAuthenticated), email: data?.email ?? null });
      })
      .catch((error) => {
        if (active && (error as Error).name !== 'AbortError') setStatus({ loaded: true, isAuthenticated: false, email: null });
      })
      .finally(() => window.clearTimeout(timeoutId));
    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [pathname]);

  const logout = async () => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);
    setLoggingOut(true);
    setLogoutError('');
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST', signal: controller.signal });
      if (!response.ok) throw new Error('Logout failed');
      setStatus({ loaded: true, isAuthenticated: false, email: null });
      router.push(isEnglish ? '/en' : '/');
      router.refresh();
    } catch {
      setLogoutError(isEnglish ? 'Could not sign out. Check your connection and try again.' : '退出失败，请检查网络后重试。');
    } finally {
      window.clearTimeout(timeoutId);
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href={isEnglish ? '/en' : '/'} className="group order-1 inline-flex items-center gap-3 text-xl font-black tracking-tight text-slate-950">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-base text-white shadow-lg shadow-blue-500/20 transition group-hover:-translate-y-0.5">T</span>
          <span>
            Toolly
            <span className="ml-2 hidden text-xs font-bold text-slate-500 sm:inline">{isEnglish ? 'Online tools' : '在线工具箱'}</span>
          </span>
        </Link>
        <nav aria-label={isEnglish ? 'Primary navigation' : '主导航'} className="order-3 flex min-h-10 w-full items-center gap-1 overflow-x-auto pt-1 sm:gap-2 md:order-2 md:w-auto md:flex-1 md:justify-center md:overflow-visible md:pt-0">
          {primaryLinks.map((item) => {
            const current = isCurrent(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? 'page' : undefined}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${current ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="order-2 flex min-h-10 items-center justify-end gap-2 md:order-3">
          {!status.loaded && pathname !== '/auth' ? (
            <span className="inline-flex h-10 items-center rounded-full bg-slate-100 px-4 text-xs font-bold text-slate-500" role="status">{isEnglish ? 'Checking account…' : '检查账号中…'}</span>
          ) : status.isAuthenticated ? (
            <>
              <Link href={isEnglish ? '/en/membership' : '/membership'} className="hidden max-w-52 truncate rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm sm:block" title={status.email ?? ''}>{status.email}</Link>
              <button type="button" onClick={logout} disabled={loggingOut} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-wait disabled:opacity-60">{loggingOut ? (isEnglish ? 'Signing out…' : '正在退出…') : (isEnglish ? 'Sign out' : '退出')}</button>
            </>
          ) : pathname !== '/auth' ? (
            <Link href={`/auth?${isEnglish ? 'lang=en&' : ''}next=${encodeURIComponent(pathname)}`} className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-blue-700">{isEnglish ? 'Sign in / Register' : '登录 / 注册'}</Link>
          ) : null}
        </div>
        {logoutError ? <p role="alert" className="order-4 basis-full text-right text-xs font-semibold text-red-600">{logoutError}</p> : null}
      </div>
    </header>
  );
}
