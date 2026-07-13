import Link from 'next/link';
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

const heroStats = [
  { value: `${toolList.length}+`, label: '在线工具' },
  { value: '复制', label: '文本结果' },
  { value: '下载', label: '文件结果' },
];

const heroShowcase = [
  { title: 'PDF 转 Word', meta: '简历.pdf → 简历.docx', tone: 'from-rose-500 to-orange-400', href: '/tools/pdf-convert' },
  { title: '图片压缩', meta: 'JPG / PNG / WebP', tone: 'from-emerald-400 to-cyan-400', href: '/tools/image-compress' },
  { title: 'JSON 格式化', meta: '校验、缩进、复制', tone: 'from-violet-400 to-fuchsia-400', href: '/tools/json-format' },
  { title: '二维码生成', meta: '文本 / 链接 / PNG', tone: 'from-blue-400 to-indigo-400', href: '/tools/qr-code' },
];

export default function HomePage() {
  return (
    <main className="relative isolate overflow-hidden bg-[#f7fbff] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c') }} />

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[740px] bg-[linear-gradient(180deg,#eaf3ff_0%,#f7fbff_72%)]" />

      <section className="px-4 pb-14 pt-6 sm:px-6 lg:px-8 lg:pb-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-slate-950 px-5 py-10 text-white shadow-[0_40px_120px_rgba(15,23,42,0.28)] sm:px-8 sm:py-14 lg:rounded-[3rem] lg:px-12 lg:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_76%_18%,rgba(129,140,248,0.22),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          <div className="relative mx-auto max-w-5xl text-center">
            <p className="mx-auto inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-blue-100">
              本地处理 · 真实下载 · 免费工具箱
            </p>
            <h1 className="mt-7 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              把文件、图片和文本处理变成
              <span className="block bg-gradient-to-r from-cyan-200 via-blue-300 to-violet-200 bg-clip-text text-transparent">一眼就会用的结果工作台</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-xl sm:leading-9">
              PDF 转 Word、图片压缩、JSON 格式化等常用工具集中到一个高效入口。登录后即可复制、预览和下载真实结果。
            </p>

            <form action="/tools" method="get" role="search" className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 rounded-[2rem] border border-white/15 bg-white p-2 shadow-2xl shadow-blue-950/25 sm:flex-row">
              <label htmlFor="home-tool-search" className="sr-only">搜索工具</label>
              <input
                id="home-tool-search"
                name="q"
                placeholder="搜索 PDF、Word、图片、JSON、二维码、人民币大写..."
                className="min-w-0 flex-1 rounded-[1.5rem] border border-transparent bg-transparent px-5 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-200 focus:bg-blue-50/50"
              />
              <button
                type="submit"
                className="rounded-[1.5rem] bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                直接找工具
              </button>
            </form>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {zhPopularSearches.map((item) => (
                <Link
                  key={item.label}
                  href={`/tools?q=${encodeURIComponent(item.query)}`}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-white/15 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/tools/pdf-convert"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-white/10 transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                开始使用工具 →
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                查看全部工具
              </Link>
            </div>
          </div>

          <div className="relative mt-10 grid gap-4 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div className="rounded-[2rem] border border-white/12 bg-white/10 p-5 shadow-2xl shadow-blue-950/30 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-300">万能文档转换</p>
                  <p className="mt-1 text-2xl font-black text-white">PDF 转 Word</p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-black text-emerald-200">已完成</span>
              </div>

              <div className="mt-6 grid items-center gap-4 rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5 sm:grid-cols-[1fr_auto_1fr]">
                <div className="rounded-[1.35rem] bg-white p-5 text-center text-slate-950">
                  <div className="mx-auto grid h-14 w-12 place-items-center rounded-2xl bg-rose-700 text-sm font-black text-white">PDF</div>
                  <p className="mt-4 text-sm font-black">简历.pdf</p>
                  <p className="mt-1 text-xs text-slate-500">331 KB</p>
                </div>
                <div className="text-center text-3xl font-black text-cyan-300">→</div>
                <div className="rounded-[1.35rem] bg-white p-5 text-center text-slate-950">
                  <div className="mx-auto grid h-14 w-12 place-items-center rounded-2xl bg-blue-600 text-sm font-black text-white">W</div>
                  <p className="mt-4 text-sm font-black">简历.docx</p>
                  <p className="mt-1 text-xs text-slate-500">可下载</p>
                </div>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-200">
                  <span>正在生成可复制预览</span>
                  <span>100%</span>
                </div>
                <div className="mt-3 h-3 rounded-full bg-white/10">
                  <div className="h-3 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500" style={{ width: '100%' }} />
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {heroStats.map((item) => (
                  <div key={item.label} className="rounded-[1.5rem] border border-white/12 bg-white/10 p-4">
                    <p className="text-2xl font-black text-white">{item.value}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-300">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {heroShowcase.map((tool) => (
                  <Link
                    key={tool.title}
                    href={tool.href}
                    className="group rounded-[1.75rem] border border-white/12 bg-white/10 p-5 transition hover:-translate-y-1 hover:bg-white/15"
                  >
                    <div className={`mb-5 h-2 rounded-full bg-gradient-to-r ${tool.tone}`} />
                    <h2 className="text-lg font-black text-white">{tool.title}</h2>
                    <p className="mt-2 text-sm text-slate-300">{tool.meta}</p>
                    <span className="mt-5 inline-flex text-sm font-black text-cyan-200 group-hover:translate-x-1">打开工具 →</span>
                  </Link>
                ))}
              </div>
            </div>
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
                从搜索、分类或热门入口进入工具，登录后即可处理内容，并把文本或文件结果带走。
              </p>
              <Link href="/auth?next=%2Ftools" className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-black text-blue-700 transition hover:-translate-y-0.5">
                登录后使用
              </Link>
            </div>
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
              <Link href="/auth?mode=register&next=%2Ftools" className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                免费创建账号
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
