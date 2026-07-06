import Link from 'next/link';

export const metadata = {
  title: 'App Store 下载 | Toolly',
  description: 'Toolly iOS 应用下载落地页，占位展示 App Store 下载入口与功能优势。',
};

export default function AppStorePage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-10 lg:px-8">
      <header className="mb-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">App Store</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Toolly iOS 应用</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          这里是 Toolly iOS 应用下载落地页，占位展示 App Store 下载入口和关键功能。 
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">App 功能</h2>
            <ul className="mt-5 space-y-3 text-slate-600 leading-7">
              <li>• 一键访问 Toolly 在线工具，快速打开常用页面。</li>
              <li>• 支持 PDF 转换、JSON 格式化、字数统计等工具入口。</li>
              <li>• 专为移动用户优化的轻量应用体验。</li>
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
            <h2 className="text-lg font-semibold text-slate-900">为什么选择 iOS App</h2>
            <p className="mt-4 leading-7">
              通过 App 首页快速启动工具页，降低浏览器访问成本，提升移动用户转化。 
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
