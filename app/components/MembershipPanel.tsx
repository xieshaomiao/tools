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

type UpgradeResult = {
  success: boolean;
  message: string;
  expiresAt?: string | null;
  remainingDays?: number;
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
  const [message, setMessage] = useState('');
  const [upgradeLoading, setUpgradeLoading] = useState(false);
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

  const handleUpgrade = async (plan: 'monthly' | 'yearly') => {
    setUpgradeLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const result: UpgradeResult = await response.json();

      if (!response.ok || !result.success) {
        setMessage(result.message || '升级失败，请稍后重试。');
        return;
      }

      setStatus((current) => ({
        ...current,
        isAuthenticated: true,
        isMember: true,
        expiresAt: result.expiresAt ?? current.expiresAt,
        remainingDays: result.remainingDays ?? current.remainingDays,
      }));
      setMessage('会员升级成功，可立即使用所有高级工具。');
    } catch {
      setMessage('升级请求失败，请检查网络后重试。');
    } finally {
      setUpgradeLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">会员状态</h2>
      <div className="mt-5 space-y-4 text-slate-600">
        {status.loading ? (
          <p>正在加载会员信息，请稍候...</p>
        ) : status.isAuthenticated ? (
          <>
            <p>登录邮箱：{status.email}</p>
            <p>
              当前会员状态：
              <span className="font-semibold text-slate-900">
                {status.isMember ? `有效，剩余 ${status.remainingDays} 天` : '未激活会员'}
              </span>
            </p>
            {status.isMember && status.expiresAt ? (
              <p>有效期至：{new Date(status.expiresAt).toLocaleDateString()}</p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => router.push('/tools')}
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                访问工具目录
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
            <p>尚未登录，注册后可获得前半年免费会员体验。</p>
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

      <div className="mt-8 rounded-[1.75rem] bg-slate-50 p-6 text-slate-700">
        <p className="font-semibold text-slate-900">付费升级方案</p>
        <div className="mt-4 space-y-4 text-sm leading-7">
          <p>试用期结束后，可通过以下方案升级会员，继续使用所有付费工具。</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleUpgrade('monthly')}
              disabled={upgradeLoading || status.loading}
              className="rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              30 天续费
            </button>
            <button
              type="button"
              onClick={() => handleUpgrade('yearly')}
              disabled={upgradeLoading || status.loading}
              className="rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              365 天续费
            </button>
          </div>
          <p className="text-slate-500">付费方案当前为本地演示流程，后续可接入真实支付网关。</p>
        </div>
      </div>

      {message ? <p className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">{message}</p> : null}
    </div>
  );
}
