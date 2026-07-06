'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!data.success) {
      setMessage(data.message || '操作失败');
      return;
    }
    document.cookie = `toolly_token=${data.token}; path=/; max-age=2592000`;
    router.push('/membership');
  };

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-10 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold text-slate-900">{mode === 'login' ? '登录' : '注册'}</h1>
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
            {mode === 'login' ? '去注册' : '去登录'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <label className="block text-sm font-medium text-slate-700">
            邮箱
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700" required />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            密码
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700" required />
          </label>
          <button type="submit" className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            {mode === 'login' ? '登录' : '注册'}
          </button>
          {message ? <p className="text-sm text-red-600">{message}</p> : null}
        </form>
      </div>
    </main>
  );
}
