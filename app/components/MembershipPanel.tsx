'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthStatus = {
  isAuthenticated: boolean;
  isMember: boolean;
  email: string | null;
  expiresAt: string | null;
  remainingDays: number;
  loading: boolean;
};

export default function MembershipPanel() {
  const [status, setStatus] = useState<AuthStatus>({
    isAuthenticated: false,
    isMember: false,
    email: null,
    expiresAt: null,
    remainingDays: 0,
    loading: true,
  });
  const router = useRouter();

  useEffect(() => {
    async function loadStatus() {
      try {
        const response = await fetch('/api/auth/status');
        if (!response.ok) {
          setStatus((current) => ({ ...current, loading: false }));
          return;
        }

        const data = await response.json();
        setStatus({ ...data, loading: false });
      } catch {
        setStatus((current) => ({ ...current, loading: false }));
      }
    }

    loadStatus();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">你的账号</p>
      <h2 className="mt-3 text-2xl font-black text-slate-950">当前使用状态</h2>
      <div className="mt-5 space-y-4 text-slate-600">
        {status.loading ? (
          <p role="status">正在加载账号信息，请稍候…</p>
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
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-100"
              >
                退出登录
              </button>
            </div>
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
        <p className="mt-3">Toolly 当前未开放真实支付，因此这里不会展示任何“立即续费”或“立即付款”的按钮。</p>
        <p className="mt-3">创建免费账号不需要付款。登录后可以从工具目录进入完整操作区。</p>
      </div>
    </div>
  );
}
