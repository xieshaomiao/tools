import Link from 'next/link';
import AdSlot from '@/app/components/AdSlot';
import { categorySummary, enPopularSearches } from '@/app/lib/tool-discovery';
import { SITE_URL } from '@/app/lib/site';
import { getLocalizedTool } from '@/app/tools/toolContent';
import { toolList } from '@/app/tools/toolConfig';

export const metadata = {
  title: 'Toolly Free Online Tools | Document, Image and Developer Utilities',
  description: 'Free browser-based PDF and document conversion, image tools, JSON and CSV conversion, QR codes, regex, UUID, hashes and more.',
  alternates: { canonical: '/en', languages: { 'zh-CN': '/', en: '/en', 'x-default': '/' } },
  openGraph: { locale: 'en_US', title: 'Toolly Free Online Tools', description: 'Free document, image, content and developer utilities that produce copyable or downloadable results.', url: '/en' },
};

const tools = toolList.map((tool) => getLocalizedTool(tool, 'en'));
const categories = categorySummary(toolList, 'en');
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Toolly',
  url: `${SITE_URL}/en`,
  inLanguage: 'en',
  description: 'Free online document, image, text, encoding, office and developer tools.',
  potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/en/tools?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
};

const quickStarts = [
  {
    title: 'Convert files to PDF',
    description: 'Turn Word, Excel, PowerPoint or Markdown into a shareable PDF.',
    href: '/en/tools/pdf-convert',
  },
  {
    title: 'Compress images',
    description: 'Shrink JPG or PNG files locally and download a smaller WebP.',
    href: '/en/tools/image-compress',
  },
  {
    title: 'Copy developer output',
    description: 'Format JSON, test regex, and convert timestamps with copyable output.',
    href: '/en/tools/json-format',
  },
  {
    title: 'Everyday office helpers',
    description: 'Generate QR codes, convert RMB uppercase, and normalize text quickly.',
    href: '/en/tools/rmb-uppercase',
  },
];

export default function EnglishHomePage() {
  return (
    <main lang="en" className="mx-auto min-h-screen max-w-7xl px-6 py-10 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c') }} />
      <header className="mb-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Toolly · Online utilities</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{tools.length} practical tools for documents, images and development</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">Convert PDF, Word, Excel and PowerPoint files, compress images, create QR codes, inspect JSON, test regular expressions and produce results you can copy or download.</p>
            <form action="/en/tools" method="get" role="search" className="mt-6 flex max-w-3xl flex-col gap-3 sm:flex-row">
              <label htmlFor="home-tool-search-en" className="sr-only">Search tools</label>
              <input
                id="home-tool-search-en"
                name="q"
                placeholder="Search PDF, Word, image, JSON, QR code, timestamp..."
                className="min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-slate-900 outline-none transition focus:border-slate-900"
              />
              <button
                type="submit"
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Find a tool
              </button>
            </form>
            <div className="mt-4 flex flex-wrap gap-3">
              {enPopularSearches.map((item) => (
                <Link
                  key={item.label}
                  href={`/en/tools?q=${encodeURIComponent(item.query)}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-slate-900 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 max-w-2xl rounded-[1.75rem] border border-slate-200 bg-white p-6 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Privacy first</p>
              <p className="mt-3">Documents, images and most text utilities run directly in your browser without uploading personal files.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {categories.map((item) => (
                <Link
                  key={item.category}
                  href={`/en/tools#${encodeURIComponent(item.category)}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm transition hover:border-slate-900 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-900">File conversion and exports</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Convert PDFs, Office files, text documents and images for sharing or archiving.</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-900">Developer and content helpers</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Handle JSON, CSV, regex, timestamps, hashes, copy cleanup and other quick browser tasks.</p>
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            <Link href="/en/tools" className="rounded-full bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800">Browse all tools</Link>
            <Link href="/" hrefLang="zh-CN" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-900 hover:border-slate-900">中文</Link>
          </div>
        </div>
      </header>

      <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Start from a real task</h2>
            <p className="mt-3 max-w-3xl text-slate-600 leading-7">
              Most visitors want a fast route to file conversion, image compression, QR code creation, JSON cleanup or other copyable browser results. These shortcuts go straight to those jobs.
            </p>
          </div>
          <Link href="/en/tools" className="text-sm font-semibold text-slate-900 underline underline-offset-4">
            Open the full tool directory
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickStarts.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-900 hover:bg-white"
            >
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

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
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8"><h2 className="text-2xl font-semibold text-slate-900">Why use Toolly</h2><ul className="mt-5 space-y-3 leading-7 text-slate-600"><li>• Search from the homepage instead of browsing the full directory first.</li><li>• Copy text output or download a real generated file.</li><li>• Browse grouped categories and task shortcuts on desktop or mobile.</li></ul></div>
        </div>
        <aside className="space-y-6"><AdSlot /><div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-slate-600"><h2 className="text-lg font-semibold text-slate-900">Find the right utility</h2><p className="mt-4 text-sm leading-7">Search by file format, task or tool name in the complete directory.</p><Link href="/en/tools" className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">Search tools</Link></div></aside>
      </section>
    </main>
  );
}
