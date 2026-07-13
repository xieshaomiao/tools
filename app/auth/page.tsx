'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthMode = 'login' | 'register';
type FieldErrors = { email?: string; password?: string };

const benefits = {
  'zh-CN': [
    ['01', '回到刚才的任务', '成功后自动返回你准备使用的工具，不必重新查找。'],
    ['02', '拿到真实结果', '处理完成后可直接复制文本，或把生成的文件下载到本机。'],
    ['03', '隐私优先处理', '能在浏览器完成的任务优先留在本地，减少不必要的上传。'],
  ],
  en: [
    ['01', 'Return to your task', 'After signing in, you go straight back to the tool you selected.'],
    ['02', 'Get a usable result', 'Copy generated text or download the finished file directly to your device.'],
    ['03', 'Privacy-aware by default', 'Tasks that can run in your browser stay local whenever possible.'],
  ],
};

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [nextPath, setNextPath] = useState('/tools');
  const [isEnglish, setIsEnglish] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
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

    const controller = new AbortController();
    fetch('/api/auth/status', { cache: 'no-store', signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((status) => {
        if (status?.isAuthenticated) router.replace(safeNext);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, [router]);

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setMessage('');
    setFieldErrors({});
    setShowPassword(false);
    const params = new URLSearchParams(window.location.search);
    if (nextMode === 'register') params.set('mode', 'register');
    else params.delete('mode');
    const query = params.toString();
    window.history.replaceState({}, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
  };

  const validate = () => {
    const errors: FieldErrors = {};
    const normalizedEmail = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      errors.email = isEnglish ? 'Enter a valid email address.' : '请输入有效的邮箱地址。';
    }
    if (password.length < 8) {
      errors.password = isEnglish ? 'Use at least 8 characters.' : '密码至少需要 8 位。';
    } else if (password.length > 128) {
      errors.password = isEnglish ? 'Use no more than 128 characters.' : '密码不能超过 128 位。';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    if (!validate()) return;
    setSubmitting(true);
    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password, locale: isEnglish ? 'en' : 'zh-CN' }),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data.success) {
        setMessage(data?.message || (isEnglish ? 'Something went wrong. Try again.' : '操作失败，请稍后重试。'));
        return;
      }
      router.push(nextPath);
      router.refresh();
    } catch (error) {
      const timedOut = error instanceof DOMException && error.name === 'AbortError';
      setMessage(timedOut
        ? (isEnglish ? 'The request took too long. Please try again.' : '请求等待时间过长，请重新尝试。')
        : (isEnglish ? 'The network request failed. Check your connection and try again.' : '网络请求失败，请检查网络后重试。'));
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };

  const copy = isEnglish ? {
    eyebrow: 'Your Toolly account',
    heroTitle: 'One quick sign-in. Back to the task you came to finish.',
    heroBody: 'A free account keeps the tool flow consistent across document, image, text and developer utilities.',
    privacyBadge: 'Local processing first',
    resultBadge: 'Copy and download ready',
    login: 'Sign in',
    register: 'Create account',
    loginTitle: 'Welcome back',
    registerTitle: 'Create your free account',
    loginBody: 'Sign in and continue with the tool you already selected.',
    registerBody: 'No desktop installation. Create an account and start in less than a minute.',
    email: 'Email address',
    emailPlaceholder: 'you@example.com',
    password: 'Password',
    passwordHint: '8–128 characters. Use a password you do not reuse elsewhere.',
    show: 'Show',
    hide: 'Hide',
    submitLogin: 'Continue to sign in',
    submitRegister: 'Create account and continue',
    processing: 'Please wait…',
    returnNote: 'After completion, you will return to the tool you selected.',
    back: 'Return without signing in',
    agreement: 'By continuing, you agree to the',
    privacy: 'privacy policy',
    terms: 'terms of service',
    accountPrompt: 'New to Toolly?',
    loginPrompt: 'Already have an account?',
  } : {
    eyebrow: '你的 Toolly 账号',
    heroTitle: '登录一次，继续完成刚才的任务。',
    heroBody: '免费账号让文档、图片、文本和开发工具保持统一、清晰的处理流程。',
    privacyBadge: '优先本地处理',
    resultBadge: '支持复制与下载',
    login: '登录',
    register: '注册',
    loginTitle: '欢迎回来',
    registerTitle: '创建免费账号',
    loginBody: '登录后直接返回你刚才选择的工具，继续处理。',
    registerBody: '无需安装桌面软件，创建账号后即可开始使用。',
    email: '邮箱地址',
    emailPlaceholder: 'you@example.com',
    password: '密码',
    passwordHint: '长度 8–128 位，请勿使用与其他网站相同的密码。',
    show: '显示',
    hide: '隐藏',
    submitLogin: '继续登录',
    submitRegister: '注册并继续',
    processing: '处理中…',
    returnNote: '完成后将自动返回刚才选择的工具。',
    back: '暂不登录，返回工具页',
    agreement: '继续即表示你同意',
    privacy: '隐私政策',
    terms: '服务条款',
    accountPrompt: '还没有账号？',
    loginPrompt: '已经有账号？',
  };

  return (
    <main lang={isEnglish ? 'en' : 'zh-CN'} className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_16%,rgba(59,130,246,0.2),transparent_30%),radial-gradient(circle_at_86%_22%,rgba(124,58,237,0.16),transparent_28%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_52%,#f8fbff_100%)]" />
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 shadow-[0_32px_90px_rgba(30,64,175,0.14)] backdrop-blur-xl sm:rounded-[2.75rem] lg:grid-cols-[1.08fr_0.92fr]">
        <section className="order-2 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-7 text-white sm:p-10 lg:order-1 lg:p-16" aria-labelledby="auth-benefits-title">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-200">{copy.eyebrow}</p>
            <h1 id="auth-benefits-title" className="mt-6 max-w-xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
              {copy.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">{copy.heroBody}</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2.5">{copy.privacyBadge}</span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2.5">{copy.resultBadge}</span>
            </div>

            <ol className="mt-10 space-y-4 lg:mt-12 lg:space-y-5">
              {benefits[isEnglish ? 'en' : 'zh-CN'].map(([number, title, text]) => (
                <li key={number} className="flex gap-4 rounded-[1.6rem] border border-white/10 bg-white/[0.07] p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-sm font-black text-blue-700">{number}</span>
                  <div>
                    <p className="font-black text-white">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-blue-100">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="order-1 flex items-center bg-white/75 p-6 sm:p-10 lg:order-2 lg:bg-transparent lg:p-14" aria-labelledby="auth-form-title">
          <div className="w-full">
            <div className="grid grid-cols-2 rounded-full border border-slate-200 bg-slate-100 p-1" role="tablist" aria-label={isEnglish ? 'Account action' : '账号操作'}>
              <button type="button" role="tab" aria-selected={mode === 'login'} onClick={() => switchMode('login')} className={`rounded-full px-5 py-3 text-sm font-black transition ${mode === 'login' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
                {copy.login}
              </button>
              <button type="button" role="tab" aria-selected={mode === 'register'} onClick={() => switchMode('register')} className={`rounded-full px-5 py-3 text-sm font-black transition ${mode === 'register' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
                {copy.register}
              </button>
            </div>

            <h2 id="auth-form-title" className="mt-9 text-3xl font-black tracking-tight text-slate-950">
              {mode === 'login' ? copy.loginTitle : copy.registerTitle}
            </h2>
            <p className="mt-3 leading-7 text-slate-600">{mode === 'login' ? copy.loginBody : copy.registerBody}</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate aria-busy={submitting}>
              <div>
                <label htmlFor="auth-email" className="block text-sm font-bold text-slate-800">{copy.email}</label>
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(event) => { setEmail(event.target.value); if (fieldErrors.email) setFieldErrors((current) => ({ ...current, email: undefined })); }}
                  maxLength={254}
                  autoComplete="email"
                  inputMode="email"
                  placeholder={copy.emailPlaceholder}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'auth-email-error' : undefined}
                  className="mt-2 w-full rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-red-50"
                />
                {fieldErrors.email ? <p id="auth-email-error" className="mt-2 text-sm font-semibold text-red-600">{fieldErrors.email}</p> : null}
              </div>

              <div>
                <label htmlFor="auth-password" className="block text-sm font-bold text-slate-800">{copy.password}</label>
                <div className="relative mt-2">
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => { setPassword(event.target.value); if (fieldErrors.password) setFieldErrors((current) => ({ ...current, password: undefined })); }}
                    minLength={8}
                    maxLength={128}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    aria-invalid={Boolean(fieldErrors.password)}
                    aria-describedby={fieldErrors.password ? 'auth-password-hint auth-password-error' : 'auth-password-hint'}
                    className="w-full rounded-[1.25rem] border border-slate-200 bg-white py-4 pl-4 pr-20 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-red-50"
                  />
                  <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-pressed={showPassword} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-sm font-black text-blue-700 hover:bg-blue-50">
                    {showPassword ? copy.hide : copy.show}
                  </button>
                </div>
                <p id="auth-password-hint" className="mt-2 text-sm leading-6 text-slate-500">{copy.passwordHint}</p>
                {fieldErrors.password ? <p id="auth-password-error" className="mt-2 text-sm font-semibold text-red-600">{fieldErrors.password}</p> : null}
              </div>

              <button type="submit" disabled={submitting} className="w-full rounded-full bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-wait disabled:translate-y-0 disabled:opacity-60">
                {submitting ? copy.processing : mode === 'login' ? copy.submitLogin : copy.submitRegister}
              </button>
              {message ? <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">{message}</p> : null}
            </form>

            <div className="mt-6 rounded-[1.25rem] border border-blue-100 bg-blue-50/70 p-4 text-sm leading-6 text-blue-950">
              <p className="font-bold">{copy.returnNote}</p>
            </div>

            <div className="mt-7 border-t border-slate-200 pt-6 text-sm leading-6 text-slate-600">
              <p>
                {mode === 'login' ? copy.accountPrompt : copy.loginPrompt}{' '}
                <button type="button" onClick={() => switchMode(mode === 'login' ? 'register' : 'login')} className="font-black text-blue-700 underline decoration-blue-200 underline-offset-4 hover:text-blue-900">
                  {mode === 'login' ? copy.register : copy.login}
                </button>
              </p>
              <p className="mt-3">
                {copy.agreement}{' '}
                <Link href={isEnglish ? '/en/privacy' : '/privacy'} className="font-bold text-slate-900 underline underline-offset-4">{copy.privacy}</Link>
                {isEnglish ? ' and the ' : '和'}
                <Link href={isEnglish ? '/en/terms' : '/terms'} className="font-bold text-slate-900 underline underline-offset-4">{copy.terms}</Link>
                {isEnglish ? '.' : '。'}
              </p>
              <Link href={nextPath} className="mt-4 inline-flex font-black text-slate-900 underline decoration-slate-300 underline-offset-4 hover:text-blue-700">{copy.back}</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
