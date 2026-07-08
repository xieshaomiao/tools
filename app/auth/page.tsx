'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [nextPath, setNextPath] = useState('/tools');
  const [isEnglish, setIsEnglish] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedNext = params.get('next') || '/tools';
    const safeNext = requestedNext.startsWith('/') && !requestedNext.startsWith('//') ? requestedNext : '/tools';
    setNextPath(safeNext);
    setIsEnglish(safeNext === '/en' || safeNext.startsWith('/en/'));
    if (params.get('mode') === 'register') setMode('register');
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');
    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setMessage(data.message || '操作失败，请稍后重试。');
        return;
      }
      router.push(nextPath);
      router.refresh();
    } catch {
      setMessage('网络请求失败，请检查网络后重试。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main lang={isEnglish ? 'en' : 'zh-CN'} className="mx-auto min-h-screen max-w-2xl px-6 py-10 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Toolly Account</p>
        <div className="flex items-center justify-between gap-4">
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            {isEnglish ? (mode === 'login' ? 'Sign in' : 'Create account') : (mode === 'login' ? '登录' : '注册')}
          </h1>
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
            {isEnglish ? (mode === 'login' ? 'Register' : 'Sign in') : (mode === 'login' ? '去注册' : '去登录')}
          </button>
        </div>
        <p className="mt-4 leading-7 text-slate-600">
          {isEnglish ? 'Sign in before using a tool. Files are processed locally first; PDF compatible conversion is used only when the browser cannot parse the file.' : '使用工具前需要先登录。文件优先在浏览器本地处理；只有浏览器无法解析 PDF 时才启用兼容转换。'}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <label className="block text-sm font-medium text-slate-700">
            {isEnglish ? 'Email' : '邮箱'}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={254} autoComplete="email" className="mt-2 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700" required />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            {isEnglish ? 'Password' : '密码'}
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} maxLength={128} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} className="mt-2 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700" required />
          </label>
          <button type="submit" disabled={submitting} className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? (isEnglish ? 'Processing…' : '处理中...') : isEnglish ? (mode === 'login' ? 'Sign in' : 'Create account') : mode === 'login' ? '登录' : '注册'}
          </button>
          {message ? <p role="status" className="text-sm text-red-600">{message}</p> : null}
        </form>
        <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <Link href={nextPath} className="font-semibold text-slate-900 underline">{isEnglish ? 'Back to the tool' : '返回工具页面'}</Link>
          <p className="mt-3">{isEnglish ? 'By continuing, you agree to the privacy policy. Use a unique password.' : '继续即表示你同意隐私政策。请使用与其他网站不同的密码。'}</p>
        </div>
      </div>
    </main>
  );
}
