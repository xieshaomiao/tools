import Link from 'next/link';
import { toolList } from '@/app/tools/toolConfig';
import { getLocalizedTool } from '@/app/tools/toolContent';
import { absoluteUrl } from '@/app/lib/site';

export const metadata = {
  title: 'Toolly 工具目录 | 28个免费在线文档、图片与开发工具',
  description: '搜索和浏览 Toolly 全部免费在线工具，包括 PDF 文档互转、JSON CSV、图片压缩、二维码、正则和人民币大写。',
  alternates: { canonical: '/tools', languages: { 'zh-CN': '/tools', en: '/en/tools', 'x-default': '/tools' } },
};

type ToolsPageProps = { searchParams: Promise<{ q?: string }> };

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const query = (await searchParams).q?.trim().toLowerCase() ?? '';
  const localizedTools = toolList.map((tool) => getLocalizedTool(tool, 'zh-CN'));
  const results = query
    ? localizedTools.filter((tool) => [tool.title, tool.description, tool.category, tool.badge, ...tool.keywords].join(' ').toLowerCase().includes(query))
    : localizedTools;
  const collectionJsonLd = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Toolly 工具目录', url: absoluteUrl('/tools'), inLanguage: 'zh-CN',
    mainEntity: { '@type': 'ItemList', numberOfItems: localizedTools.length, itemListElement: localizedTools.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: tool.title, url: absoluteUrl(tool.href) })) },
  };

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd).replace(/</g, '\\u003c') }} />
      <header className="mb-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">工具目录</p>
          <Link href="/en/tools" hrefLang="en" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-slate-900">English</Link>
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{toolList.length} 个免费在线工具，一站式访问</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Toolly 覆盖文档互转、图片处理、中文办公、内容优化和开发辅助。所有工具均可直接使用，结果支持复制或下载。</p>
        <form action="/tools" method="get" role="search" className="mt-6 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <label htmlFor="tool-search" className="sr-only">搜索工具</label>
          <input id="tool-search" name="q" defaultValue={query} placeholder="搜索 PDF、图片、JSON、二维码…" className="min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-slate-900 outline-none focus:border-slate-900" />
          <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800">搜索工具</button>
        </form>
      </header>

      <p className="mb-5 text-sm text-slate-600" aria-live="polite">{query ? `“${query}”找到 ${results.length} 个工具` : `显示全部 ${results.length} 个工具`}</p>
      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((tool) => (
            <Link key={tool.toolKey} href={tool.href} className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-900 hover:shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <p className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{tool.badge}</p>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">访问工具</span>
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-900 group-hover:text-slate-800">{tool.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-slate-700">没有找到匹配工具。可尝试“PDF”“图片”“JSON”或“文本”。</div>
      )}

      <section className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm text-slate-600">
        <h2 className="text-2xl font-semibold text-slate-900">如何使用 Toolly</h2>
        <ol className="mt-5 space-y-3 leading-7">
          <li>1. 搜索名称、格式或用途，进入最适合的工具页面。</li>
          <li>2. 按页面提示输入文本或选择文件；标注本地处理的内容不会上传。</li>
          <li>3. 检查真实结果，然后复制文本或下载生成的文件。</li>
        </ol>
      </section>
    </main>
  );
}
