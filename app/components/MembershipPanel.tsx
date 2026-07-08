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
      <h2 className="text-2xl font-semibold text-slate-900">当前账号状态</h2>
      <div className="mt-5 space-y-4 text-slate-600">
        {status.loading ? (
          <p>正在加载会员信息，请稍候...</p>
        ) : status.isAuthenticated ? (
          <>
            <p>登录邮箱：{status.email}</p>
            <p>
              当前翻译体验状态：
              <span className="font-semibold text-slate-900">
                {status.isMember ? `有效，剩余 ${status.remainingDays} 天` : '未激活'}
              </span>
            </p>
            {status.isMember && status.expiresAt ? (
              <p>体验有效期至：{new Date(status.expiresAt).toLocaleDateString()}</p>
            ) : (
              <p>真实续费尚未开放，到期后请等待正式支付上线。</p>
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
            <p>尚未登录。免费本地工具可以直接使用；若需要在线翻译，请先注册或登录。</p>
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
        <p className="font-semibold text-slate-900">真实支付状态</p>
        <p className="mt-3">Toolly 当前未开放真实支付，因此这里不会展示任何“立即续费”或“立即付款”的按钮。</p>
        <p className="mt-3">如果你只需要关键词提取、SEO 标题、文案润色或摘要生成，可直接回到工具目录免费使用。</p>
      </div>
    </div>
  );
}
