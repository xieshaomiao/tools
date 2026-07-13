'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthStatus = {
  serviceAvailable: boolean;
  isAuthenticated: boolean;
  email: string | null;
  loading: boolean;
};

export default function MembershipPanel({ locale = 'zh' }: { locale?: 'zh' | 'en' }) {
  const isEnglish = locale === 'en';
  const deletePhrase = isEnglish ? 'DELETE ACCOUNT' : '删除账号';
  const [status, setStatus] = useState<AuthStatus>({
    serviceAvailable: true,
    isAuthenticated: false,
    email: null,
    loading: true,
  });
  const [reloadKey, setReloadKey] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeoutId = window.setTimeout(() => {
      if (!active) return;
      controller.abort();
      setStatus((current) => ({ ...current, serviceAvailable: false, loading: false }));
    }, 12000);
    async function loadStatus() {
      try {
        const response = await fetch('/api/auth/status', { cache: 'no-store', signal: controller.signal });
        if (!active) return;
        if (!response.ok) {
          setStatus((current) => ({ ...current, serviceAvailable: false, loading: false }));
          return;
        }

        const data = await response.json();
        setStatus({
          serviceAvailable: data.serviceAvailable !== false,
          isAuthenticated: Boolean(data.isAuthenticated),
          email: data.email ?? null,
          loading: false,
        });
      } catch (error) {
        if (active && (error as Error).name !== 'AbortError') {
          setStatus((current) => ({ ...current, serviceAvailable: false, loading: false }));
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    loadStatus();
    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [reloadKey]);

  const handleLogout = async () => {
    setLoggingOut(true);
    setActionMessage('');
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (!response.ok) throw new Error('Logout failed');
      router.push(isEnglish ? '/en' : '/');
      router.refresh();
    } catch {
      setActionMessage(isEnglish ? 'Could not sign out. Check your connection and try again.' : '退出失败，请检查网络后重试。');
      setLoggingOut(false);
    }
  };

  const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordMessage('');
    setPasswordError('');
    if (newPassword.length < 8 || newPassword.length > 128) {
      setPasswordError(isEnglish ? 'The new password must be 8–128 characters.' : '新密码长度需要为 8–128 位。');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError(isEnglish ? 'The new passwords do not match.' : '两次输入的新密码不一致。');
      return;
    }

    setPasswordSubmitting(true);
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        setPasswordError(data?.message || (isEnglish ? 'Could not change the password. Try again later.' : '密码修改失败，请稍后重试。'));
        return;
      }
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordMessage(data.message || (isEnglish ? 'Password changed.' : '密码修改成功。'));
    } catch {
      setPasswordError(isEnglish ? 'Network request failed. Check your connection and try again.' : '网络请求失败，请检查连接后重试。');
    } finally {
      setPasswordSubmitting(false);
    }
  };

  const handleDeleteAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDeleteError('');
    if (deleteConfirmation !== deletePhrase) {
      setDeleteError(isEnglish ? 'Enter “DELETE ACCOUNT” to confirm.' : '请输入“删除账号”确认操作。');
      return;
    }
    setDeletingAccount(true);
    try {
      const response = await fetch('/api/auth/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: deletePassword, confirmation: deleteConfirmation, locale }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        setDeleteError(data?.message || (isEnglish ? 'Could not delete the account. Try again later.' : '账号删除失败，请稍后重试。'));
        return;
      }
      router.push(isEnglish ? '/en' : '/');
      router.refresh();
    } catch {
      setDeleteError(isEnglish ? 'The deletion status could not be confirmed. Try signing in again to check.' : '无法确认删除状态，请尝试重新登录检查。');
    } finally {
      setDeletingAccount(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">{isEnglish ? 'Your account' : '你的账号'}</p>
      <h2 className="mt-3 text-2xl font-black text-slate-950">{isEnglish ? 'Current status' : '当前使用状态'}</h2>
      <div className="mt-5 space-y-4 text-slate-600">
        {status.loading ? (
          <p role="status">{isEnglish ? 'Loading account information…' : '正在加载账号信息，请稍候…'}</p>
        ) : !status.serviceAvailable ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
            <p className="font-black">{isEnglish ? 'Account service is temporarily busy' : '账号服务暂时繁忙'}</p>
            <p className="mt-2 text-sm leading-6">{isEnglish ? 'Other pages remain available. Check the account status again later; do not register twice.' : '页面其他内容仍可浏览。请稍后重试账号状态，不需要重复注册。'}</p>
            <button
              type="button"
              onClick={() => {
                setStatus((current) => ({ ...current, loading: true }));
                setReloadKey((current) => current + 1);
              }}
              className="mt-4 rounded-full bg-amber-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-amber-900"
            >
              {isEnglish ? 'Check again' : '重新检查'}
            </button>
          </div>
        ) : status.isAuthenticated ? (
          <>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-900">
              <p className="font-black">{isEnglish ? 'Signed in — the tool workspace is available' : '已登录，可进入工具操作区'}</p>
              <p className="mt-1 break-all text-sm">{status.email}</p>
            </div>
            <p>
              {isEnglish ? 'Account status: ' : '账号状态：'}<span className="font-semibold text-slate-900">{isEnglish ? 'Active, with access to all current tools' : '正常，可使用全部当前工具'}</span>
            </p>
            <p>{isEnglish ? 'Online translation requires a network connection. Current tools have no separate expiry.' : '在线翻译需要网络连接，当前已上线工具不设置单独的使用期限。'}</p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => router.push(isEnglish ? '/en/tools/text-translate' : '/tools/text-translate')}
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {isEnglish ? 'Use translation tool' : '使用翻译工具'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordForm((current) => !current);
                  setPasswordError('');
                  setPasswordMessage('');
                }}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-300 hover:text-blue-700"
                aria-expanded={showPasswordForm}
                aria-controls="change-password-form"
              >
                {showPasswordForm ? (isEnglish ? 'Hide password form' : '收起密码设置') : (isEnglish ? 'Change password' : '修改密码')}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-100 disabled:cursor-wait disabled:opacity-60"
              >
                {loggingOut ? (isEnglish ? 'Signing out…' : '正在退出…') : (isEnglish ? 'Sign out' : '退出登录')}
              </button>
            </div>
            {actionMessage ? <p role="alert" className="text-sm font-semibold text-red-600">{actionMessage}</p> : null}
            {showPasswordForm ? (
              <form id="change-password-form" onSubmit={handleChangePassword} className="space-y-4 rounded-[1.5rem] border border-blue-100 bg-blue-50/70 p-5" aria-busy={passwordSubmitting}>
                <div>
                  <label htmlFor="current-password" className="text-sm font-bold text-slate-800">{isEnglish ? 'Current password' : '当前密码'}</label>
                  <input id="current-password" type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} maxLength={128} required className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                </div>
                <div>
                  <label htmlFor="new-password" className="text-sm font-bold text-slate-800">{isEnglish ? 'New password' : '新密码'}</label>
                  <input id="new-password" type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} minLength={8} maxLength={128} required aria-describedby="new-password-hint" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                  <p id="new-password-hint" className="mt-2 text-xs leading-5 text-slate-500">{isEnglish ? 'Use 8–128 characters and do not reuse another site password.' : '长度 8–128 位，请勿复用其他网站密码。'}</p>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="text-sm font-bold text-slate-800">{isEnglish ? 'Confirm new password' : '再次输入新密码'}</label>
                  <input id="confirm-password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} minLength={8} maxLength={128} required className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                </div>
                <button type="submit" disabled={passwordSubmitting} className="w-full rounded-full bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800 disabled:cursor-wait disabled:opacity-60">
                  {passwordSubmitting ? (isEnglish ? 'Saving…' : '正在保存…') : (isEnglish ? 'Save new password' : '保存新密码')}
                </button>
                {passwordError ? <p role="alert" className="text-sm font-semibold text-red-600">{passwordError}</p> : null}
                {passwordMessage ? <p role="status" className="text-sm font-semibold text-emerald-700">{passwordMessage}</p> : null}
              </form>
            ) : null}
            <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-5">
              <p className="font-black text-red-950">{isEnglish ? 'Delete account' : '删除账号'}</p>
              <p className="mt-2 text-sm leading-6 text-red-900">{isEnglish ? 'This removes the account record from the active database and signs out every session. It cannot be undone. Files already downloaded to your device are not affected.' : '此操作会从活动账号数据库删除账号记录，并注销全部登录会话，无法撤销。已经下载到设备的文件不受影响。'}</p>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteForm((current) => !current);
                  setDeleteError('');
                  setDeletePassword('');
                  setDeleteConfirmation('');
                }}
                aria-expanded={showDeleteForm}
                aria-controls="delete-account-form"
                className="mt-4 rounded-full border border-red-300 bg-white px-5 py-2.5 text-sm font-black text-red-800 transition hover:bg-red-100"
              >
                {showDeleteForm ? (isEnglish ? 'Cancel' : '取消删除') : (isEnglish ? 'Open deletion confirmation' : '打开删除确认')}
              </button>
              {showDeleteForm ? (
                <form id="delete-account-form" onSubmit={handleDeleteAccount} className="mt-5 space-y-4" aria-busy={deletingAccount}>
                  <div>
                    <label htmlFor="delete-account-password" className="text-sm font-bold text-red-950">{isEnglish ? 'Current password' : '当前密码'}</label>
                    <input id="delete-account-password" type="password" autoComplete="current-password" value={deletePassword} onChange={(event) => setDeletePassword(event.target.value)} maxLength={128} required className="mt-2 w-full rounded-2xl border border-red-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100" />
                  </div>
                  <div>
                    <label htmlFor="delete-account-confirmation" className="text-sm font-bold text-red-950">{isEnglish ? 'Enter “DELETE ACCOUNT” to confirm' : '输入“删除账号”确认'}</label>
                    <input id="delete-account-confirmation" value={deleteConfirmation} onChange={(event) => setDeleteConfirmation(event.target.value)} maxLength={deletePhrase.length} required className="mt-2 w-full rounded-2xl border border-red-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100" />
                  </div>
                  <button type="submit" disabled={deletingAccount || deleteConfirmation !== deletePhrase} className="w-full rounded-full bg-red-700 px-5 py-3 text-sm font-black text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50">
                    {deletingAccount ? (isEnglish ? 'Deleting…' : '正在删除…') : (isEnglish ? 'Delete active account record' : '删除活动账号记录')}
                  </button>
                  {deleteError ? <p role="alert" className="text-sm font-semibold text-red-700">{deleteError}</p> : null}
                </form>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <p>{isEnglish ? 'You are not signed in. Create a free account or sign in to use the tool workspace.' : '尚未登录。请先创建免费账号或登录，再进入工具操作区。'}</p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => router.push(isEnglish ? '/auth?lang=en' : '/auth')}
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {isEnglish ? 'Sign in / Register' : '登录 / 注册'}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 rounded-[1.75rem] bg-slate-50 p-6 text-sm leading-7 text-slate-700">
        <p className="font-semibold text-slate-900">{isEnglish ? 'Free account' : '免费账号说明'}</p>
        <p className="mt-3">{isEnglish ? 'Creating an account does not require payment. After sign-in, every currently available tool is accessible from the directory.' : '创建账号不需要付款。登录后可以从工具目录进入完整操作区，并使用当前已上线的全部工具。'}</p>
        <p className="mt-3">{isEnglish ? 'Keep your password secure. You can change it safely on this page.' : '请妥善保管密码；如需更换，可在当前页面完成安全修改。'}</p>
      </div>
    </div>
  );
}
