'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthStatus = {
  serviceAvailable: boolean;
  isAuthenticated: boolean;
  isMember: boolean;
  email: string | null;
  expiresAt: string | null;
  remainingDays: number;
  loading: boolean;
};

export default function MembershipPanel() {
  const [status, setStatus] = useState<AuthStatus>({
    serviceAvailable: true,
    isAuthenticated: false,
    isMember: false,
    email: null,
    expiresAt: null,
    remainingDays: 0,
    loading: true,
  });
  const [reloadKey, setReloadKey] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    async function loadStatus() {
      try {
        const response = await fetch('/api/auth/status', { cache: 'no-store', signal: controller.signal });
        if (!response.ok) {
          setStatus((current) => ({ ...current, serviceAvailable: false, loading: false }));
          return;
        }

        const data = await response.json();
        setStatus({ ...data, serviceAvailable: data.serviceAvailable !== false, loading: false });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setStatus((current) => ({ ...current, serviceAvailable: false, loading: false }));
        }
      }
    }

    loadStatus();
    return () => controller.abort();
  }, [reloadKey]);

  const handleLogout = async () => {
    setLoggingOut(true);
    setActionMessage('');
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (!response.ok) throw new Error('Logout failed');
      router.push('/');
      router.refresh();
    } catch {
      setActionMessage('退出失败，请检查网络后重试。');
      setLoggingOut(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">你的账号</p>
      <h2 className="mt-3 text-2xl font-black text-slate-950">当前使用状态</h2>
      <div className="mt-5 space-y-4 text-slate-600">
        {status.loading ? (
          <p role="status">正在加载账号信息，请稍候…</p>
        ) : !status.serviceAvailable ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
            <p className="font-black">账号服务暂时繁忙</p>
            <p className="mt-2 text-sm leading-6">页面其他内容仍可浏览。请稍后重试账号状态，不需要重复注册。</p>
            <button
              type="button"
              onClick={() => {
                setStatus((current) => ({ ...current, loading: true }));
                setReloadKey((current) => current + 1);
              }}
              className="mt-4 rounded-full bg-amber-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-amber-900"
            >
              重新检查
            </button>
          </div>
        ) : status.isAuthenticated ? (
          <>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-900">
              <p className="font-black">已登录，可进入工具操作区</p>
              <p className="mt-1 break-all text-sm">{status.email}</p>
            </div>
            <p>
              在线翻译体验：
              <span className="font-semibold text-slate-900">
                {status.isMember ? `有效，剩余 ${status.remainingDays} 天` : '当前未激活'}
              </span>
            </p>
            {status.isMember && status.expiresAt ? (
              <p>体验有效期至：{new Date(status.expiresAt).toLocaleDateString()}</p>
            ) : (
              <p>翻译体验到期不影响其他工具；真实续费尚未开放。</p>
            )}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => router.push('/tools/text-translate')}
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                使用翻译工具
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-100 disabled:cursor-wait disabled:opacity-60"
              >
                {loggingOut ? '正在退出…' : '退出登录'}
              </button>
            </div>
            {actionMessage ? <p role="alert" className="text-sm font-semibold text-red-600">{actionMessage}</p> : null}
          </>
        ) : (
          <>
            <p>尚未登录。请先创建免费账号或登录，再进入工具操作区。</p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => router.push('/auth')}
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                登录 / 注册
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 rounded-[1.75rem] bg-slate-50 p-6 text-sm leading-7 text-slate-700">
        <p className="font-semibold text-slate-900">支付状态说明</p>
        <p className="mt-3">Toolly 当前未开放真实支付，续费接口也已关闭，因此不会出现无法兑现的“立即续费”或“立即付款”。</p>
        <p className="mt-3">创建免费账号不需要付款。登录后可以从工具目录进入完整操作区。</p>
      </div>
    </div>
  );
}
