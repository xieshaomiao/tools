'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type HeaderStatus = { loaded: boolean; isAuthenticated: boolean; email: string | null };

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isEnglish = pathname === '/en' || pathname.startsWith('/en/');
  const [status, setStatus] = useState<HeaderStatus>({ loaded: false, isAuthenticated: false, email: null });

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/auth/status', { cache: 'no-store', signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setStatus({ loaded: true, isAuthenticated: Boolean(data?.isAuthenticated), email: data?.email ?? null }))
      .catch((error) => {
        if ((error as Error).name !== 'AbortError') setStatus((current) => ({ ...current, loaded: true }));
      });
    return () => controller.abort();
  }, [pathname]);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setStatus({ loaded: true, isAuthenticated: false, email: null });
    router.push(isEnglish ? '/en' : '/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href={isEnglish ? '/en' : '/'} className="group inline-flex items-center gap-3 text-xl font-black tracking-tight text-slate-950">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-base text-white shadow-lg shadow-blue-500/20 transition group-hover:-translate-y-0.5">T</span>
          <span>
            Toolly
            <span className="ml-2 hidden text-xs font-bold text-slate-400 sm:inline">{isEnglish ? 'Online tools' : '在线工具箱'}</span>
          </span>
        </Link>
        <nav aria-label={isEnglish ? 'Primary navigation' : '主导航'} className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link href={isEnglish ? '/en/tools' : '/tools'} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">{isEnglish ? 'Tools' : '工具目录'}</Link>
          {status.isAuthenticated ? (
            <>
              <Link href="/membership" className="hidden max-w-52 truncate rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm sm:block" title={status.email ?? ''}>{status.email}</Link>
              <button type="button" onClick={logout} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm transition hover:border-blue-200 hover:text-blue-700">{isEnglish ? 'Sign out' : '退出'}</button>
            </>
          ) : (
            <Link href={`/auth?next=${encodeURIComponent(pathname)}`} className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-blue-700">{isEnglish ? 'Sign in / Register' : '登录 / 注册'}</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
