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
    <section className="overflow-hidden rounded-[2.35rem] border border-blue-100 bg-white shadow-sm" aria-labelledby="tool-access-title">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-100">{isEnglish ? 'Free account' : '免费账号'}</p>
        <h2 id="tool-access-title" className="mt-3 text-3xl font-black tracking-tight">
          {state === 'unavailable'
            ? (isEnglish ? 'Sign-in service is temporarily unavailable' : '登录服务暂时不可用')
            : (isEnglish ? `Sign in to use ${tool.title}` : `登录后免费使用 ${tool.title}`)}
        </h2>
        <p className="mt-4 max-w-2xl leading-8 text-blue-50">
          {state === 'unavailable'
            ? (isEnglish ? 'The sign-in service is not responding right now. Refresh the page and try again shortly.' : '登录服务暂时没有响应，请稍后刷新页面重试。')
            : (isEnglish ? 'Create a free account or sign in first. Toolly keeps the result path clear: process, preview, copy or download.' : '请先注册免费账号或登录。Toolly 会把处理、预览、复制和下载路径完整展示出来。')}
        </p>
      </div>

      <div className="p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {(isEnglish
            ? [
              ['Fast start', 'No desktop install is required.'],
              ['Real results', 'Copy text or download generated files.'],
              ['Privacy-aware', 'Local processing first whenever possible.'],
            ]
            : [
              ['快速开始', '无需下载安装桌面软件。'],
              ['真实结果', '文本可复制，文件可下载。'],
              ['隐私优先', '能本地处理的优先在浏览器完成。'],
            ]).map(([title, text]) => (
            <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <p className="font-black text-slate-950">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>

      {state === 'signed-out' ? (
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/auth?mode=register&next=${next}`} className="rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-blue-700">
            {isEnglish ? 'Create free account' : '免费注册'}
          </Link>
          <Link href={`/auth?next=${next}`} className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-900 transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700">
            {isEnglish ? 'I already have an account' : '已有账号登录'}
          </Link>
        </div>
      ) : null}
      </div>
    </section>
  );
}
