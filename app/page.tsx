import Link from 'next/link';
import AdSlot from './components/AdSlot';
import { categorySummary, zhPopularSearches } from './lib/tool-discovery';
import { SITE_URL } from './lib/site';
import { toolList, type ToolMeta } from './tools/toolConfig';

export const metadata = {
  title: 'Toolly 免费在线工具箱 | PDF 文档互转、图片与开发工具',
  description:
    'Toolly 提供 PDF、Word、Excel、PPT 文档互转，以及图片压缩、JSON CSV、二维码、正则、UUID、哈希等免费在线工具。',
  alternates: {
    canonical: '/',
    languages: { 'zh-CN': '/', en: '/en', 'x-default': '/' },
  },
};

const categories = categorySummary(toolList, 'zh-CN');
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Toolly',
  url: SITE_URL,
  inLanguage: 'zh-CN',
  description: '提供文档格式互转、图片处理、文本、编码、SEO 和开发者常用工具的在线工具箱。',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/tools?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const featuredKeys = [
  'pdf-convert',
  'image-compress',
  'json-format',
  'word-count',
  'qr-code',
  'rmb-uppercase',
  'image-convert',
  'regex-tester',
];

const featuredTools = featuredKeys
  .map((key) => toolList.find((tool) => tool.toolKey === key))
  .filter((tool): tool is ToolMeta => Boolean(tool));

const categoryCards = [
  {
    title: 'PDF 与办公文件',
    href: '/tools/pdf-convert',
    icon: 'PDF',
    accent: 'from-rose-500 to-orange-400',
    items: ['PDF 转 Word', 'Word 转 PDF', 'Markdown 转 PDF', '图片转 PDF'],
  },
  {
    title: '图片处理',
    href: '/tools/image-compress',
    icon: 'IMG',
    accent: 'from-emerald-500 to-teal-400',
    items: ['图片压缩', '格式转换', 'WebP 下载', '本地处理'],
  },
  {
    title: '文本与内容',
    href: '/tools/word-count',
    icon: 'TXT',
    accent: 'from-violet-500 to-fuchsia-500',
    items: ['字数统计', '文案润色', '关键词提取', '摘要生成'],
  },
  {
    title: '开发者工具',
    href: '/tools/json-format',
    icon: 'DEV',
    accent: 'from-blue-500 to-cyan-400',
    items: ['JSON 格式化', 'Base64', '正则测试', '时间戳转换'],
  },
];

const trustItems = [
  { title: '优先本地处理', text: '图片、文本和大多数文件在当前浏览器内完成，减少敏感资料外传。' },
  { title: '真实可下载', text: '转换完成后提供预览、复制和下载，不再停留在“演示结果”。' },
  { title: '登录后可用', text: '账号体系已接入，用户可以注册、登录并开始使用工具。' },
  { title: '兼容兜底', text: 'PDF 本地解析失败时启用兼容转换，提升 Word 导出成功率。' },
];

const workflowSteps = [
  {
    step: '01',
    title: '选择任务',
    text: '从首页搜索、热门入口或分类卡片进入目标工具。',
  },
  {
    step: '02',
    title: '处理文件或文本',
    text: '按页面提示上传文件、粘贴内容或选择输出格式。',
  },
  {
    step: '03',
    title: '复制或下载结果',
    text: '生成后的文本可复制，文件可直接下载到本机。',
  },
];

export default function HomePage() {
  return (
    <main className="relative isolate overflow-hidden bg-[#f7fbff] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c') }} />

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[660px] bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_74%)]" />
      <div className="pointer-events-none absolute right-[-8rem] top-28 -z-10 h-72 w-72 rounded-full bg-blue-200/45 blur-2xl" />
      <div className="pointer-events-none absolute left-[-7rem] top-[36rem] -z-10 h-64 w-64 rounded-full bg-cyan-100/70 blur-2xl" />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-12 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:pb-24 lg:pt-16">
        <div>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            把日常文件、图片和文本处理变得
            <span className="inline-block whitespace-nowrap text-blue-700">轻松漂亮</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-600 sm:text-xl">
            PDF 转 Word、图片压缩、JSON 格式化、字数统计、二维码生成等常用工具集中在一个清爽入口。登录后即可获得可复制、可下载的真实结果。
          </p>

          <form action="/tools" method="get" role="search" className="mt-8 flex max-w-3xl flex-col gap-3 rounded-[2rem] border border-blue-100 bg-white p-2 shadow-xl shadow-blue-950/5 sm:flex-row">
            <label htmlFor="home-tool-search" className="sr-only">搜索工具</label>
            <input
              id="home-tool-search"
              name="q"
              placeholder="搜索 PDF、Word、图片、JSON、二维码、人民币大写..."
              className="min-w-0 flex-1 rounded-[1.5rem] border border-transparent bg-transparent px-5 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-200 focus:bg-white"
            />
            <button
              type="submit"
              className="rounded-[1.5rem] bg-slate-950 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              直接找工具
            </button>
          </form>

          <div className="mt-5 flex flex-wrap gap-3">
            {zhPopularSearches.map((item) => (
              <Link
                key={item.label}
                href={`/tools?q=${encodeURIComponent(item.query)}`}
                className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tools/pdf-convert"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              开始使用工具 →
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
            >
              查看全部工具
            </Link>
          </div>

          <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3 text-center">
            <div className="rounded-[1.25rem] border border-blue-100 bg-white p-4 shadow-sm">
              <p className="text-2xl font-black text-slate-950">{toolList.length}+</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">在线工具</p>
            </div>
            <div className="rounded-[1.25rem] border border-blue-100 bg-white p-4 shadow-sm">
              <p className="text-2xl font-black text-slate-950">复制</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">文本结果</p>
            </div>
            <div className="rounded-[1.25rem] border border-blue-100 bg-white p-4 shadow-sm">
              <p className="text-2xl font-black text-slate-950">下载</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">文件结果</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[460px]">
          <div className="absolute right-0 top-4 w-full max-w-[560px] rounded-[2.5rem] border border-blue-100 bg-white p-6 shadow-2xl shadow-blue-950/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-500/30">T</div>
                <div>
                  <p className="text-sm font-bold text-slate-500">万能文档转换</p>
                  <p className="text-xl font-black text-slate-950">PDF 转 Word</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">已完成</span>
            </div>

            <div className="mt-8 grid items-center gap-4 rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 sm:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-[1.5rem] bg-white p-5 text-center shadow-sm">
                <div className="mx-auto grid h-16 w-14 place-items-center rounded-2xl bg-rose-700 text-sm font-black text-white">PDF</div>
                <p className="mt-4 text-sm font-bold text-slate-900">简历.pdf</p>
                <p className="mt-1 text-xs text-slate-500">331 KB</p>
              </div>
              <div className="text-3xl font-black text-blue-400">→</div>
              <div className="rounded-[1.5rem] bg-white p-5 text-center shadow-sm">
                <div className="mx-auto grid h-16 w-14 place-items-center rounded-2xl bg-blue-600 text-sm font-black text-white">W</div>
                <p className="mt-4 text-sm font-bold text-slate-900">简历.docx</p>
                <p className="mt-1 text-xs text-slate-500">可下载</p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-slate-100 bg-white p-5">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                <span>正在生成可复制预览</span>
                <span>100%</span>
              </div>
              <div className="mt-3 h-3 rounded-full bg-slate-100">
                <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href="/tools/pdf-convert" className="rounded-[1.25rem] border border-blue-100 bg-blue-50 px-5 py-4 text-center text-sm font-bold text-blue-700 transition hover:bg-blue-100">
                预览结果
              </Link>
              <Link href="/tools/pdf-convert" className="rounded-[1.25rem] bg-blue-600 px-5 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700">
                下载文件
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute left-0 top-28 hidden rounded-3xl border border-blue-100 bg-white p-4 shadow-xl shadow-cyan-500/10 md:block">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Image</p>
            <p className="mt-2 text-sm font-black text-slate-950">图片压缩 -68%</p>
          </div>
          <div className="pointer-events-none absolute bottom-10 left-12 hidden rounded-3xl border border-blue-100 bg-white p-4 shadow-xl shadow-violet-500/10 lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">JSON</p>
            <p className="mt-2 text-sm font-black text-slate-950">格式化完成</p>
          </div>
          <div className="pointer-events-none absolute bottom-4 right-10 hidden rounded-[2rem] bg-gradient-to-br from-violet-600 to-blue-600 p-5 text-white shadow-xl shadow-blue-500/20 sm:block">
            <p className="text-3xl font-black">{'{ }'}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
        <div className="rounded-[2.5rem] border border-blue-100 bg-white p-6 shadow-xl shadow-slate-950/5">
          <div className="grid gap-4 md:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-6">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600">✦</div>
                <h2 className="text-lg font-black text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">热门工具，一键直达</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            把访问量最高、需求最强的文件、图片、文本和开发工具放在首页，让用户少找一步。
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categoryCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_30px_90px_rgba(37,99,235,0.14)]"
            >
              <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${card.accent} text-sm font-black text-white shadow-lg`}>
                {card.icon}
              </div>
              <h3 className="mt-7 text-xl font-black text-slate-950">{card.title}</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-7 inline-flex text-sm font-bold text-blue-700 group-hover:translate-x-1">查看全部 →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.2)] lg:p-10">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">三步完成转换</h2>
            <p className="mt-5 max-w-md text-base leading-8 text-slate-300">
              页面动效只负责让体验更清晰，真正重要的是结果：选文件、处理、下载，路径越短越好。
            </p>
            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-300">
                <span>转换体验优化</span>
                <span>已上线</span>
              </div>
              <div className="mt-4 h-3 rounded-full bg-white/10">
                <div className="h-3 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500" style={{ width: '92%' }} />
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {workflowSteps.map((item) => (
              <div key={item.step} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-black text-blue-600">{item.step}</p>
                <h3 className="mt-5 text-xl font-black text-slate-950">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
                <div className="mt-8 rounded-[1.5rem] border border-dashed border-blue-200 bg-blue-50/60 p-5 text-center text-sm font-bold text-blue-700">
                  {item.step === '01' ? '搜索工具' : item.step === '02' ? '实时处理' : '下载结果'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-950">高频工具精选</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  从办公、内容、图片到开发调试，先把最容易带来搜索流量和复访的工具摆到用户眼前。
                </p>
              </div>
              <Link href="/tools" className="text-sm font-black text-blue-700 underline underline-offset-4">
                浏览完整目录
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {featuredTools.map((tool) => (
                <Link
                  key={tool.toolKey}
                  href={tool.href}
                  className="group rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 shadow-sm">{tool.badge}</span>
                    <span className="text-sm font-black text-blue-600 opacity-0 transition group-hover:opacity-100">打开 →</span>
                  </div>
                  <h3 className="mt-5 text-xl font-black text-slate-950">{tool.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2.5rem] border border-blue-100 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-[0_30px_90px_rgba(37,99,235,0.24)]">
              <h2 className="text-3xl font-black tracking-tight">让用户更快到达结果</h2>
              <p className="mt-5 text-sm leading-7 text-blue-50">
                首页已经把搜索、分类、热门入口和登录后可用的结果路径放到最前面，适合继续做 SEO 内容页和广告位测试。
              </p>
              <Link href="/auth?next=%2Ftools" className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-black text-blue-700 transition hover:-translate-y-0.5">
                登录后使用
              </Link>
            </div>
            <AdSlot />
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">按分类浏览</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {categories.map((item) => (
                  <Link
                    key={item.category}
                    href={`/tools#${encodeURIComponent(item.category)}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-8 lg:pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-[0_35px_110px_rgba(15,23,42,0.26)] lg:p-12">
          <div className="absolute right-[-7rem] top-[-8rem] h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
          <div className="absolute bottom-[-8rem] left-1/3 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">立即体验 Toolly 在线工具箱</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                免费、清爽、结果真实。先从一个文件或一段文本开始，把日常处理任务压缩到几秒钟。
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/tools" className="rounded-full bg-white px-7 py-4 text-center text-sm font-black text-slate-950 transition hover:-translate-y-0.5">
                查看全部工具
              </Link>
              <Link href="/download" className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                下载 App
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
