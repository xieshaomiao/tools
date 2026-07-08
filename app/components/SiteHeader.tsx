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
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href={isEnglish ? '/en' : '/'} className="text-xl font-bold tracking-tight text-slate-950">Toolly</Link>
        <nav aria-label={isEnglish ? 'Primary navigation' : '主导航'} className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link href={isEnglish ? '/en/tools' : '/tools'} className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">{isEnglish ? 'Tools' : '工具目录'}</Link>
          {status.isAuthenticated ? (
            <>
              <Link href="/membership" className="hidden max-w-52 truncate rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 sm:block" title={status.email ?? ''}>{status.email}</Link>
              <button type="button" onClick={logout} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-slate-900">{isEnglish ? 'Sign out' : '退出'}</button>
            </>
          ) : (
            <Link href={`/auth?next=${encodeURIComponent(pathname)}`} className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">{isEnglish ? 'Sign in / Register' : '登录 / 注册'}</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
