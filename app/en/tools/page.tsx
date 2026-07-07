import Link from 'next/link';
import { toolList } from '@/app/tools/toolConfig';
import { getLocalizedTool } from '@/app/tools/toolContent';
import { absoluteUrl } from '@/app/lib/site';

export const metadata = {
  title: 'Toolly Tool Directory | 28 Free Document, Image and Developer Tools',
  description: 'Search all Toolly utilities, including document conversion, image compression, JSON and CSV conversion, QR codes, regex testing and hashes.',
  alternates: { canonical: '/en/tools', languages: { 'zh-CN': '/tools', en: '/en/tools', 'x-default': '/tools' } },
};

type ToolsPageProps = { searchParams: Promise<{ q?: string }> };

export default async function EnglishToolsPage({ searchParams }: ToolsPageProps) {
  const query = (await searchParams).q?.trim().toLowerCase() ?? '';
  const localizedTools = toolList.map((tool) => getLocalizedTool(tool, 'en'));
  const results = query ? localizedTools.filter((tool) => [tool.title, tool.description, tool.category, tool.badge, ...tool.keywords].join(' ').toLowerCase().includes(query)) : localizedTools;
  const collectionJsonLd = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Toolly Tool Directory', url: absoluteUrl('/en/tools'), inLanguage: 'en',
    mainEntity: { '@type': 'ItemList', numberOfItems: localizedTools.length, itemListElement: localizedTools.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: tool.title, url: absoluteUrl(tool.localHref) })) },
  };

  return (
    <main lang="en" className="mx-auto min-h-screen max-w-7xl px-6 py-10 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd).replace(/</g, '\\u003c') }} />
      <header className="mb-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Tool directory</p>
          <Link href="/tools" hrefLang="zh-CN" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-slate-900">中文</Link>
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{toolList.length} free online tools in one place</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Convert documents, process images, inspect data, prepare content and solve everyday development tasks. Results can be copied or downloaded.</p>
        <form action="/en/tools" method="get" role="search" className="mt-6 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <label htmlFor="tool-search-en" className="sr-only">Search tools</label>
          <input id="tool-search-en" name="q" defaultValue={query} placeholder="Search PDF, image, JSON, QR code…" className="min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-slate-900 outline-none focus:border-slate-900" />
          <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800">Search tools</button>
        </form>
      </header>

      <p className="mb-5 text-sm text-slate-600" aria-live="polite">{query ? `${results.length} tools found for “${query}”` : `Showing all ${results.length} tools`}</p>
      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((tool) => (
            <Link key={tool.toolKey} href={tool.localHref} className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-900 hover:shadow-xl">
              <div className="flex items-center justify-between gap-3"><p className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{tool.badge}</p><span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Open tool</span></div>
              <h2 className="mt-5 text-xl font-semibold text-slate-900 group-hover:text-slate-800">{tool.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      ) : <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-slate-700">No matching tool was found. Try “PDF”, “image”, “JSON” or “text”.</div>}

      <section className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm text-slate-600">
        <h2 className="text-2xl font-semibold text-slate-900">How to use Toolly</h2>
        <ol className="mt-5 space-y-3 leading-7"><li>1. Search by name, format or purpose and open the best matching tool.</li><li>2. Enter text or choose a file by following the page instructions.</li><li>3. Review the real output, then copy the text or download the generated file.</li></ol>
      </section>
    </main>
  );
}
