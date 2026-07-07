import Link from 'next/link';
import AdSlot from './components/AdSlot';
import { toolList } from './tools/toolConfig';
import { SITE_URL } from './lib/site';

export const metadata = {
  title: 'Toolly - 免费体验半年会员的在线工具平台 | SEO、翻译、内容优化',
  description:
    'Toolly 提供真实可用的在线工具、SEO 内容优化、翻译服务和会员半年免费体验，适合流量转化与付费升级。',
  alternates: {
    canonical: '/',
  },
};

const categories = Array.from(new Set(toolList.map((tool) => tool.category)));
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Toolly',
  url: SITE_URL,
  inLanguage: 'zh-CN',
  description: '提供文本处理、编码转换、SEO 内容优化和开发者常用工具的在线工具箱。',
};

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <header className="mb-12 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Toolly • 在线工具聚合</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              一键访问 15+ 实用工具，快速提升广告与流量收益
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Toolly 聚合多种工具页面，覆盖文件转换、SEO 优化、翻译与内容增强功能，支持会员半年免费体验和后续付费升级。 
            </p>
            <div className="mt-6 max-w-2xl rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
              <p className="font-medium text-slate-900">新用户福利</p>
              <p className="mt-3">所有付费工具用户前半年免费体验，适合快速吸引注册与留存。</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {categories.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:auto-cols-fr sm:grid-flow-col">
            <Link
              href="/tools"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              查看全部工具
            </Link>
            <Link
              href="/download"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-100"
            >
              下载 App
            </Link>
          </div>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">热门工具</h2>
            <p className="mt-4 text-slate-600 leading-7">
              你可以直接进入任一工具页，体验 SEO 内容优化、文件处理或移动扫码功能。每个工具页面都适合增加广告位与提高用户停留时间。
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {toolList.slice(0, 6).map((tool) => (
              <Link
                key={tool.toolKey}
                href={tool.href}
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-900 hover:shadow-xl"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {tool.badge}
                  </p>
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">访问工具</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900 group-hover:text-slate-800">{tool.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{tool.description}</p>
              </Link>
            ))}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">为什么选择 Toolly</h2>
            <ul className="mt-5 space-y-3 text-slate-600 leading-7">
              <li>• 首页简洁导航，可快速引导用户进入工具和下载页。</li>
              <li>• 工具页支持功能占位与广告布局，适合流量变现。</li>
              <li>• 博客与下载页联动，可提升移动端访问与留存。 </li>
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <AdSlot />
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-slate-600">
            <h3 className="text-lg font-semibold text-slate-900">移动端下载</h3>
            <p className="mt-4 text-sm leading-7">
              App 下载页已准备，就绪接入 App Store 与 Google Play 链接，让移动端访问成为转化入口。 
            </p>
            <Link
              href="/download"
              className="mt-5 inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              前往下载页
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
