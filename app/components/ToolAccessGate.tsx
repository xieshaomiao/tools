'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ToolPanel from '@/app/components/ToolPanel';
import { ToolMeta } from '@/app/tools/toolConfig';
import { SiteLocale } from '@/app/tools/toolContent';

type AccessState = 'loading' | 'authenticated' | 'signed-out' | 'unavailable';

export default function ToolAccessGate({ tool, locale }: { tool: ToolMeta; locale: SiteLocale }) {
  const [state, setState] = useState<AccessState>('loading');
  const isEnglish = locale === 'en';

  useEffect(() => {
    const controller = new AbortController();
    async function checkAccess() {
      try {
        const response = await fetch('/api/auth/status', { cache: 'no-store', signal: controller.signal });
        if (!response.ok) {
          setState('unavailable');
          return;
        }
        const data = await response.json() as { isAuthenticated?: boolean };
        setState(data.isAuthenticated ? 'authenticated' : 'signed-out');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') setState('unavailable');
      }
    }
    checkAccess();
    return () => controller.abort();
  }, []);

  if (state === 'authenticated') return <ToolPanel tool={tool} locale={locale} />;

  if (state === 'loading') {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" aria-live="polite">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-5 h-4 max-w-xl animate-pulse rounded bg-slate-100" />
        <p className="mt-5 text-sm text-slate-500">{isEnglish ? 'Checking sign-in status…' : '正在检查登录状态…'}</p>
      </div>
    );
  }

  const next = encodeURIComponent('localHref' in tool ? String(tool.localHref) : tool.href);
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" aria-labelledby="tool-access-title">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">{isEnglish ? 'Account required' : '需要账号'}</p>
      <h2 id="tool-access-title" className="mt-3 text-2xl font-semibold text-slate-950">
        {state === 'unavailable'
          ? (isEnglish ? 'Sign-in service is temporarily unavailable' : '登录服务暂时不可用')
          : (isEnglish ? `Sign in to use ${tool.title}` : `登录后免费使用${tool.title}`)}
      </h2>
      <p className="mt-4 max-w-2xl leading-7 text-slate-600">
        {state === 'unavailable'
          ? (isEnglish ? 'The sign-in service is not responding right now. Refresh the page and try again shortly.' : '登录服务暂时没有响应，请稍后刷新页面重试。')
          : (isEnglish ? 'Create a free account or sign in first. Files continue to be processed locally in your browser.' : '请先注册免费账号或登录。登录后文件仍然只在你的浏览器本地处理，不会上传服务器。')}
      </p>
      {state === 'signed-out' ? (
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/auth?next=${next}`} className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            {isEnglish ? 'Sign in' : '登录'}
          </Link>
          <Link href={`/auth?mode=register&next=${next}`} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900">
            {isEnglish ? 'Create free account' : '免费注册'}
          </Link>
        </div>
      ) : null}
    </section>
  );
}
