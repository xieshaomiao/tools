import Link from 'next/link';

export const metadata = {
  title: '网络暂时不可用 | Toolly',
  description: 'Toolly 网络连接暂时不可用时的恢复说明。',
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main className="min-h-[70vh] bg-[#f7fbff] px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border border-blue-100 bg-white shadow-xl shadow-blue-950/5">
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-8 text-white sm:p-12">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-200">连接提醒</p>
          <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">网络暂时不可用，已为你保留网站入口。</h1>
          <p className="mt-5 max-w-2xl leading-8 text-blue-100">检查网络或稍后重试。已经加载过的部分页面仍可继续查看；登录、注册和在线服务需要恢复网络连接。</p>
        </div>
        <div className="p-8 sm:p-12">
          <h2 className="text-2xl font-black text-slate-950">可以尝试</h2>
          <ol className="mt-6 space-y-4 text-slate-600">
            <li className="rounded-2xl bg-slate-50 p-5"><strong className="text-slate-950">1. 重新连接网络：</strong>切换 Wi-Fi 或移动网络后刷新页面。</li>
            <li className="rounded-2xl bg-slate-50 p-5"><strong className="text-slate-950">2. 使用备用入口：</strong>主域名暂时异常时，可尝试 Toolly 的备用网址。</li>
            <li className="rounded-2xl bg-slate-50 p-5"><strong className="text-slate-950">3. 不要重复注册：</strong>网络错误不会删除已有账号，恢复连接后直接登录即可。</li>
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700">重试官网</Link>
            <a href="https://toolly-one-zero2.vercel.app" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-900 transition hover:border-blue-300 hover:text-blue-700">打开备用入口</a>
          </div>
        </div>
      </section>
    </main>
  );
}
