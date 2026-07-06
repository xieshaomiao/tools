import Link from 'next/link';

export const metadata = {
  title: 'Toolly App 下载与会员计划 | 前半年免费体验',
  description: 'Toolly 移动 App 提供在线工具、SEO 与翻译功能，付费工具用户前半年免费体验。',
};

const stores = [
  {
    name: 'App Store',
    label: 'iOS 版本',
    note: '即将上线，后续可接入 App Store 真正下载链接。',
    button: '访问 App Store',
    href: '/download/app-store',
  },
  {
    name: 'Google Play',
    label: 'Android 版本',
    note: '正在准备 Android 下载入口，后续可支持一键安装。',
    button: '访问 Google Play',
    href: '/download/google-play',
  },
];

export default function DownloadPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10 lg:px-8">
      <header className="mb-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">下载</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Toolly App 下载</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          通过移动 App 在手机上快速访问 Toolly 工具集合。我们已为 iOS 和 Android 流量准备下载入口，助力用户转化与广告收益。 
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {stores.map((store) => (
          <div key={store.name} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{store.label}</h2>
                <p className="mt-3 text-sm text-slate-500">新用户前半年免费会员体验</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">半年免费</span>
            </div>
            <p className="mt-4 text-slate-600 leading-7">{store.note}</p>
            <Link
              href={store.href}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {store.button}
            </Link>
          </div>
        ))}
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm text-slate-600">
          <h2 className="text-2xl font-semibold text-slate-900">为什么要下载 App</h2>
          <ul className="mt-5 space-y-3 leading-7">
            <li>• 通过 App 为用户提供更快的访问入口，提升移动端留存。</li>
            <li>• 将网站流量引导至移动端推广页面，提高广告转化概率。</li>
            <li>• 未来 App 可承载更多工具与会员服务，拓展变现空间。</li>
          </ul>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">扫码体验</h2>
          <div className="mt-6 flex items-center justify-center rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-8">
            <div className="text-center">
              <div className="mx-auto mb-4 h-36 w-36 rounded-[1rem] bg-slate-200" />
              <p className="text-sm text-slate-600">扫码后可快速访问下载页或 App 落地页占位。</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
          返回首页
        </Link>
        <Link href="/tools" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-100">
          查看工具目录
        </Link>
      </div>
    </main>
  );
}
