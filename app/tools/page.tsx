import Link from 'next/link';
import { absoluteUrl } from '@/app/lib/site';
import { groupLocalizedTools, zhPopularSearches } from '@/app/lib/tool-discovery';
import { getLocalizedTool, type LocalizedTool } from '@/app/tools/toolContent';
import { toolList } from '@/app/tools/toolConfig';

export const metadata = {
  title: 'Toolly 工具目录 | 28个免费在线文档、图片与开发工具',
  description: '搜索和浏览 Toolly 全部免费在线工具，包括 PDF 文档互转、JSON CSV、图片压缩、二维码、正则和人民币大写。注册或登录后即可处理真实结果。',
  alternates: { canonical: '/tools', languages: { 'zh-CN': '/tools', en: '/en/tools', 'x-default': '/tools' } },
};

type ToolsPageProps = { searchParams: Promise<{ q?: string }> };

const directoryStats = [
  { value: `${toolList.length}+`, label: '真实工具' },
  { value: '7', label: '高频分类' },
  { value: '复制/下载', label: '结果出口' },
];

function ToolCard({ tool }: { tool: LocalizedTool }) {
  return (
    <Link
      href={tool.href}
      className="group flex min-h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_70px_rgba(37,99,235,0.12)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{tool.badge}</span>
        <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500 transition group-hover:text-blue-700">进入</span>
      </div>
      <h3 className="mt-5 text-xl font-black text-slate-950">{tool.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{tool.description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold">
        <span className="text-slate-500">登录后使用</span>
        <span className="text-blue-700 transition group-hover:translate-x-1">打开工具 →</span>
      </div>
    </Link>
  );
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const query = (await searchParams).q?.trim().toLowerCase() ?? '';
  const localizedTools = toolList.map((tool) => getLocalizedTool(tool, 'zh-CN'));
  const results = query
    ? localizedTools.filter((tool) => [tool.title, tool.description, tool.category, tool.badge, ...tool.keywords].join(' ').toLowerCase().includes(query))
    : localizedTools;
  const groupedTools = groupLocalizedTools(results);
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Toolly 工具目录',
    url: absoluteUrl('/tools'),
    inLanguage: 'zh-CN',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: localizedTools.length,
      itemListElement: localizedTools.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: tool.title, url: absoluteUrl(tool.href) })),
    },
  };

  return (
    <main className="relative isolate overflow-hidden bg-[#f7fbff] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd).replace(/</g, '\\u003c') }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[540px] bg-[radial-gradient(circle_at_18%_12%,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_88%_4%,rgba(124,58,237,0.16),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#ffffff_78%)]" />

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-10 lg:px-8">
        <header className="rounded-[2.5rem] border border-white/80 bg-white/80 p-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">工具目录</p>
            <Link href="/en/tools" hrefLang="en" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700">English</Link>
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">搜索工具，直接到达可处理结果</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Toolly 覆盖文档互转、图片处理、中文办公、内容优化和开发辅助。注册或登录后即可处理真实结果，文本可复制，文件可下载。
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {directoryStats.map((item) => (
                <div key={item.label} className="rounded-[1.35rem] border border-slate-100 bg-slate-50 p-4 text-center">
                  <p className="text-xl font-black text-slate-950">{item.value}</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <form action="/tools" method="get" role="search" className="mt-8 flex max-w-3xl flex-col gap-3 rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm sm:flex-row">
            <label htmlFor="tool-search" className="sr-only">搜索工具</label>
            <input
              id="tool-search"
              name="q"
              defaultValue={query}
              placeholder="搜索 PDF、图片、JSON、二维码、人民币大写..."
              className="min-w-0 flex-1 rounded-[1.5rem] border border-transparent bg-transparent px-5 py-4 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-200 focus:bg-blue-50/40"
            />
            <button type="submit" className="rounded-[1.5rem] bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-blue-700">搜索工具</button>
          </form>
          <div className="mt-4 flex flex-wrap gap-3">
            {zhPopularSearches.map((item) => (
              <Link key={item.label} href={`/tools?q=${encodeURIComponent(item.query)}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                {item.label}
              </Link>
            ))}
          </div>
        </header>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-slate-600" aria-live="polite">
            {query ? `“${query}” 找到 ${results.length} 个工具` : `显示全部 ${results.length} 个工具`}
          </p>
          {query ? (
            <Link href="/tools" className="text-sm font-black text-blue-700 underline underline-offset-4">清除搜索，查看全部工具</Link>
          ) : null}
        </div>

        {results.length ? (
          query ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((tool) => <ToolCard key={tool.toolKey} tool={tool} />)}
            </div>
          ) : (
            <div className="space-y-8">
              <nav aria-label="分类导航" className="flex flex-wrap gap-3 rounded-[2rem] border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
                {groupedTools.map(([category, items]) => (
                  <Link key={category} href={`#${encodeURIComponent(category)}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                    {category}（{items.length}）
                  </Link>
                ))}
              </nav>
              {groupedTools.map(([category, items]) => (
                <section key={category} id={encodeURIComponent(category)} className="scroll-mt-28 rounded-[2.35rem] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur lg:p-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-3xl font-black tracking-tight text-slate-950">{category}</h2>
                      <p className="mt-3 text-sm leading-7 text-slate-600">按真实任务组织的工具分组，打开后可登录处理、复制预览或下载文件。</p>
                    </div>
                    <p className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">{items.length} 个工具</p>
                  </div>
                  <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((tool) => <ToolCard key={tool.toolKey} tool={tool} />)}
                  </div>
                </section>
              ))}
            </div>
          )
        ) : (
          <div className="rounded-[2.35rem] border border-blue-100 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">没有找到匹配工具</h2>
            <p className="mt-4 leading-7 text-slate-600">换个更常见的格式或任务词试试，例如 PDF、图片、JSON、文本、二维码、金额。</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/tools" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700">查看全部工具</Link>
              {zhPopularSearches.slice(0, 4).map((item) => (
                <Link key={item.label} href={`/tools?q=${encodeURIComponent(item.query)}`} className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <section className="mt-10 rounded-[2.35rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
          <h2 className="text-3xl font-black tracking-tight">如何使用 Toolly</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            <li className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 leading-7 text-slate-200"><span className="font-black text-white">1. </span>搜索名称、格式或用途，进入最适合的工具页面。</li>
            <li className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 leading-7 text-slate-200"><span className="font-black text-white">2. </span>注册或登录后输入文本、选择文件，按页面提示处理。</li>
            <li className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 leading-7 text-slate-200"><span className="font-black text-white">3. </span>检查真实结果，然后复制文本或下载生成的文件。</li>
          </ol>
        </section>
      </section>
    </main>
  );
}
