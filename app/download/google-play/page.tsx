import Link from 'next/link';

export const metadata = {
  title: 'Google Play 下载 | Toolly',
  description: 'Toolly Android 应用下载落地页，占位展示 Google Play 下载入口与移动优化功能。',
};

export default function GooglePlayPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-10 lg:px-8">
      <header className="mb-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Google Play</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Toolly Android 应用</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          这是 Toolly Android 应用下载落地页，占位展示 Google Play 下载入口和关键移动功能。 
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">App 优势</h2>
            <ul className="mt-5 space-y-3 text-slate-600 leading-7">
              <li>• 更快访问在线工具，提升页面打开速度。</li>
              <li>• 支持生成二维码、图片压缩等移动常用功能。</li>
              <li>• 可扩展为真实 Android App 下载与用户中心。 </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                立即下载
              </button>
              <Link href="/membership" className="rounded-full border border-emerald-500 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100">
                会员半年免费
              </Link>
              <Link href="/download" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-100">
                返回下载页
              </Link>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-slate-600">
            <h2 className="text-lg font-semibold text-slate-900">移动流量入口</h2>
            <p className="mt-4 leading-7">
              通过 Google Play 作为落地页入口，可将广告点击流量引导至移动下载与体验。 
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
