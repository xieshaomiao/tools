import Link from 'next/link';
import AdSlot from '@/app/components/AdSlot';
import { toolList } from '@/app/tools/toolConfig';
import { getLocalizedTool } from '@/app/tools/toolContent';
import { SITE_URL } from '@/app/lib/site';

export const metadata = {
  title: 'Toolly Free Online Tools | Document, Image and Developer Utilities',
  description: 'Free browser-based PDF and document conversion, image tools, JSON and CSV conversion, QR codes, regex, UUID, hashes and more.',
  alternates: { canonical: '/en', languages: { 'zh-CN': '/', en: '/en', 'x-default': '/' } },
  openGraph: { locale: 'en_US', title: 'Toolly Free Online Tools', description: 'Free document, image, content and developer utilities that produce copyable or downloadable results.', url: '/en' },
};

const tools = toolList.map((tool) => getLocalizedTool(tool, 'en'));
const categories = Array.from(new Set(tools.map((tool) => tool.category)));
const websiteJsonLd = {
  '@context': 'https://schema.org', '@type': 'WebSite', name: 'Toolly', url: `${SITE_URL}/en`, inLanguage: 'en',
  description: 'Free online document, image, text, encoding, office and developer tools.',
  potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/en/tools?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
};

export default function EnglishHomePage() {
  return (
    <main lang="en" className="mx-auto min-h-screen max-w-7xl px-6 py-10 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c') }} />
      <header className="mb-12 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Toolly · Online utilities</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{tools.length} practical tools for documents, images and development</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">Convert PDF, Word, Excel and PowerPoint files, compress images, create QR codes, inspect JSON, test regular expressions and produce results you can copy or download.</p>
            <div className="mt-6 max-w-2xl rounded-[1.75rem] border border-slate-200 bg-white p-6 text-sm text-slate-700"><p className="font-medium text-slate-900">Privacy first</p><p className="mt-3">Documents, images and most text utilities run directly in your browser without uploading personal files.</p></div>
            <div className="mt-6 flex flex-wrap gap-3">{categories.map((item) => <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">{item}</span>)}</div>
          </div>
          <div className="grid gap-3">
            <Link href="/en/tools" className="rounded-full bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800">Browse all tools</Link>
            <Link href="/" hrefLang="zh-CN" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-900 hover:border-slate-900">中文</Link>
          </div>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"><h2 className="text-2xl font-semibold text-slate-900">Popular tools</h2><p className="mt-4 leading-7 text-slate-600">Start with the universal document converter, image format converter, JSON and CSV converter or any utility below.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tools.slice(0, 9).map((tool) => (
              <Link key={tool.toolKey} href={tool.localHref} className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-900 hover:shadow-xl">
                <div className="flex items-center justify-between gap-3"><p className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{tool.badge}</p><span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Open tool</span></div>
                <h2 className="mt-5 text-xl font-semibold text-slate-900">{tool.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{tool.description}</p>
              </Link>
            ))}
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8"><h2 className="text-2xl font-semibold text-slate-900">Why use Toolly</h2><ul className="mt-5 space-y-3 leading-7 text-slate-600"><li>• Search and open focused utilities without installing software.</li><li>• Copy text output or download a real generated file.</li><li>• Use responsive pages on desktop and mobile browsers.</li></ul></div>
        </div>
        <aside className="space-y-6"><AdSlot /><div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-slate-600"><h2 className="text-lg font-semibold text-slate-900">Find the right utility</h2><p className="mt-4 text-sm leading-7">Search by file format, task or tool name in the complete directory.</p><Link href="/en/tools" className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">Search tools</Link></div></aside>
      </section>
    </main>
  );
}
