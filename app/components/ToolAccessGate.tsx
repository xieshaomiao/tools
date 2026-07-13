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
    let active = true;
    const timeoutId = window.setTimeout(() => {
      if (active) {
        controller.abort();
        setState('unavailable');
      }
    }, 12000);
    async function checkAccess() {
      try {
        const response = await fetch('/api/auth/status', { cache: 'no-store', signal: controller.signal });
        if (!response.ok) {
          setState('unavailable');
          return;
        }
        const data = await response.json() as { serviceAvailable?: boolean; isAuthenticated?: boolean };
        if (data.serviceAvailable === false) {
          setState('unavailable');
          return;
        }
        setState(data.isAuthenticated ? 'authenticated' : 'signed-out');
      } catch (error) {
        if (active && (error as Error).name !== 'AbortError') setState('unavailable');
      } finally {
        window.clearTimeout(timeoutId);
      }
    }
    checkAccess();
    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  if (state === 'authenticated') return <ToolPanel tool={tool} locale={locale} />;

  if (state === 'loading') {
    return (
      <div className="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-sm" aria-busy="true" aria-live="polite">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-600">{isEnglish ? 'Tool workspace' : '工具工作区'}</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
          {isEnglish ? 'Preparing your tool entry' : '正在准备工具入口'}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          {isEnglish
            ? 'Signed-in users will enter the workspace automatically. New visitors will see the free account options in a moment.'
            : '已登录用户会自动进入工作区；未登录用户稍后会看到免费注册和登录入口。'}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {(isEnglish
            ? ['Checking account', 'Real output', 'Privacy-aware']
            : ['检查账号', '真实输出', '隐私优先']).map((item) => (
            <span key={item} className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-blue-50">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-blue-600" />
        </div>
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
