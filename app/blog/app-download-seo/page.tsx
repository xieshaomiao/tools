import Link from 'next/link';

export const metadata = {
  title: '移动 App 下载页优化技巧 | Toolly 博客',
  description: '为 iOS 和 Android 下载页面设计高转化结构，增加移动端用户留存和广告收益。',
};

export default function AppDownloadSeo() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-10 lg:px-8">
      <header className="mb-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">博客</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">移动 App 下载页优化技巧</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          提升 iOS 和 Android 下载页的转化率，打造更具吸引力的移动端落地页。 
        </p>
      </header>

      <article className="space-y-8 text-slate-600">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">优化要点</h2>
          <ul className="mt-5 space-y-3 leading-7">
            <li>• 保持页面干净，突出下载按钮与扫码入口。</li>
            <li>• 强调 App 优势，如快速访问、功能集成、工具覆盖面广。</li>
            <li>• 添加用户信任信息，提升点击下载的信心。</li>
          </ul>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">广告流量转化</h2>
          <p className="mt-5 leading-7">
            在下载页加入明显 CTA 和扫码区域，可将广告流量引导至移动端下载入口，提升用户转化与留存率。
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Toolly 推荐</h2>
          <p className="mt-5 leading-7">
            继续完善下载页按钮，并在 App Store / Google Play 链接准备好后，立即替换占位按钮，使访问者直接跳转下载。 
          </p>
          <Link
            href="/download"
            className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            返回下载页
          </Link>
        </section>
      </article>
    </main>
  );
}
