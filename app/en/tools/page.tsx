import Link from 'next/link';
import { absoluteUrl } from '@/app/lib/site';
import { enPopularSearches, groupLocalizedTools } from '@/app/lib/tool-discovery';
import { getLocalizedTool, type LocalizedTool } from '@/app/tools/toolContent';
import { toolList } from '@/app/tools/toolConfig';

export const metadata = {
  title: 'Toolly Tool Directory | 28 Free Document, Image and Developer Tools',
  description: 'Search all Toolly utilities, including document conversion, image compression, JSON and CSV conversion, QR codes, regex testing and hashes. Sign in to process real results.',
  alternates: { canonical: '/en/tools', languages: { 'zh-CN': '/tools', en: '/en/tools', 'x-default': '/tools' } },
};

type ToolsPageProps = { searchParams: Promise<{ q?: string }> };

const categoryCount = new Set(toolList.map((tool) => tool.category)).size;
const directoryStats = [
  { value: `${toolList.length}+`, label: 'real tools' },
  { value: String(categoryCount), label: 'task groups' },
  { value: 'Copy/Save', label: 'result exits' },
];

const popularTaskLinks = [
  { title: 'PDF to Word', text: 'Turn resumes, contracts and source PDFs into editable Word files.', href: '/en/tools/pdf-convert', tag: 'Office' },
  { title: 'Word to PDF', text: 'Export Word, Markdown, HTML and other documents to PDF.', href: '/en/tools/pdf-convert', tag: 'Documents' },
  { title: 'Compress images', text: 'Compress JPG and PNG files, then download smaller WebP output.', href: '/en/tools/image-compress', tag: 'Images' },
  { title: 'Convert images', text: 'Convert JPG, PNG and WebP formats locally in the browser.', href: '/en/tools/image-convert', tag: 'Formats' },
  { title: 'Format JSON', text: 'Validate, indent and copy API responses or config snippets.', href: '/en/tools/json-format', tag: 'Developer' },
  { title: 'Generate QR codes', text: 'Create downloadable PNG QR codes from links or text.', href: '/en/tools/qr-code', tag: 'Webmaster' },
  { title: 'RMB uppercase', text: 'Convert numbers into formal Chinese RMB wording.', href: '/en/tools/rmb-uppercase', tag: 'China office' },
  { title: 'Test regex', text: 'Check matches, capture groups and indexes online.', href: '/en/tools/regex-tester', tag: 'Developer' },
];

const directoryFaqs = [
  { question: 'Which high-demand tools are in the Toolly directory?', answer: 'Toolly currently includes document conversion, image compression, image format conversion, JSON CSV conversion, QR code generation, regex testing, timestamps and Chinese RMB uppercase conversion.' },
  { question: 'Where are PDF to Word and Word to PDF?', answer: 'Search for PDF in the tool directory or open Universal Document Converter. It supports PDF, Word, Excel, PowerPoint, TXT, Markdown, HTML and common image formats.' },
  { question: 'Is Toolly free to use?', answer: 'The directory and tool pages can be accessed for free. Users register or sign in to enter the real processing area and keep a clear task path.' },
  { question: 'Can I download converted files?', answer: 'Yes. Toolly focuses on real copyable or downloadable output. Text tools support copying, and file tools provide downloads after processing.' },
];

function ToolCard({ tool }: { tool: LocalizedTool }) {
  return (
    <Link
      href={tool.localHref}
      className="group flex min-h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_70px_rgba(37,99,235,0.12)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{tool.badge}</span>
        <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500 transition group-hover:text-blue-700">Open</span>
      </div>
      <h3 className="mt-5 text-xl font-black text-slate-950">{tool.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{tool.description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold">
        <span className="text-slate-500">Sign in to use</span>
        <span className="text-blue-700 transition group-hover:translate-x-1">Open tool →</span>
      </div>
    </Link>
  );
}

export default async function EnglishToolsPage({ searchParams }: ToolsPageProps) {
  const query = (await searchParams).q?.trim().toLowerCase() ?? '';
  const localizedTools = toolList.map((tool) => getLocalizedTool(tool, 'en'));
  const results = query
    ? localizedTools.filter((tool) => [tool.title, tool.description, tool.category, tool.badge, ...tool.keywords].join(' ').toLowerCase().includes(query))
    : localizedTools;
  const groupedTools = groupLocalizedTools(results);
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Toolly Tool Directory',
    url: absoluteUrl('/en/tools'),
    inLanguage: 'en',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: localizedTools.length,
      itemListElement: localizedTools.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: tool.title, url: absoluteUrl(tool.localHref) })),
    },
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'en',
    mainEntity: directoryFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <main lang="en" className="relative isolate overflow-hidden bg-[#f7fbff] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[540px] bg-[radial-gradient(circle_at_18%_12%,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_88%_4%,rgba(124,58,237,0.16),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#ffffff_78%)]" />

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-10 lg:px-8">
        <header className="rounded-[2.5rem] border border-white/80 bg-white/80 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">Tool directory</p>
            <Link href="/tools" hrefLang="zh-CN" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700">中文</Link>
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Search once, land on the tool that finishes the job</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Toolly groups document conversion, image work, office helpers, content utilities and developer tasks. Sign in to process real output, copy text or download generated files.
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

          <form action="/en/tools" method="get" role="search" className="mt-8 flex max-w-3xl flex-col gap-3 rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm sm:flex-row">
            <label htmlFor="tool-search-en" className="sr-only">Search tools</label>
            <input
              id="tool-search-en"
              name="q"
              defaultValue={query}
              placeholder="Search PDF, image, JSON, QR code, timestamp..."
              className="min-w-0 flex-1 rounded-[1.5rem] border border-transparent bg-transparent px-5 py-4 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-200 focus:bg-blue-50/40"
            />
            <button type="submit" className="rounded-[1.5rem] bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-blue-700">Search tools</button>
          </form>
          <div className="mt-4 flex flex-wrap gap-3">
            {enPopularSearches.map((item) => (
              <Link key={item.label} href={`/en/tools?q=${encodeURIComponent(item.query)}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                {item.label}
              </Link>
            ))}
          </div>
        </header>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        {!query ? (
          <section aria-labelledby="popular-task-heading-en" className="mb-8 rounded-[2.35rem] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur lg:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">Popular tasks</p>
                <h2 id="popular-task-heading-en" className="mt-3 text-3xl font-black tracking-tight text-slate-950">Jump straight into high-intent tools</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">The most searched document, image, China-office and developer tasks sit at the top so new visitors do not need to understand every category first.</p>
              </div>
              <Link href="/en/tools/pdf-convert" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700">Try PDF conversion</Link>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {popularTaskLinks.map((item) => (
                <Link key={item.title} href={item.href} className="group rounded-[1.6rem] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{item.tag}</span>
                  <h3 className="mt-5 text-lg font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                  <span className="mt-5 inline-flex text-sm font-black text-blue-700 group-hover:translate-x-1">Open →</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-slate-600" aria-live="polite">
            {query ? `${results.length} tools found for “${query}”` : `Showing all ${results.length} tools`}
          </p>
          {query ? (
            <Link href="/en/tools" className="text-sm font-black text-blue-700 underline underline-offset-4">Clear search and view all tools</Link>
          ) : null}
        </div>

        {results.length ? (
          query ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((tool) => <ToolCard key={tool.toolKey} tool={tool} />)}
            </div>
          ) : (
            <div className="space-y-8">
              <nav aria-label="Category navigation" className="flex flex-wrap gap-3 rounded-[2rem] border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
                {groupedTools.map(([category, items]) => (
                  <Link key={category} href={`#${encodeURIComponent(category)}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                    {category} ({items.length})
                  </Link>
                ))}
              </nav>
              {groupedTools.map(([category, items]) => (
                <section key={category} id={encodeURIComponent(category)} className="scroll-mt-28 rounded-[2.35rem] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur lg:p-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-3xl font-black tracking-tight text-slate-950">{category}</h2>
                      <p className="mt-3 text-sm leading-7 text-slate-600">Tools grouped around real tasks. Open one, sign in, then copy a preview or download a file.</p>
                    </div>
                    <p className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">{items.length} tools</p>
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
            <h2 className="text-2xl font-black text-slate-950">No matching tool found</h2>
            <p className="mt-4 leading-7 text-slate-600">Try a more common file format or task word such as PDF, image, JSON, text, QR code or timestamp.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/en/tools" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700">View all tools</Link>
              {enPopularSearches.slice(0, 4).map((item) => (
                <Link key={item.label} href={`/en/tools?q=${encodeURIComponent(item.query)}`} className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <section className="mt-10 rounded-[2.35rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
          <h2 className="text-3xl font-black tracking-tight">How to use Toolly</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            <li className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 leading-7 text-slate-200"><span className="font-black text-white">1. </span>Search by name, format or purpose and open the best matching tool.</li>
            <li className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 leading-7 text-slate-200"><span className="font-black text-white">2. </span>Register or sign in, then enter text or choose a file by following the page instructions.</li>
            <li className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 leading-7 text-slate-200"><span className="font-black text-white">3. </span>Review the real output, then copy text or download the generated file.</li>
          </ol>
        </section>

        <section aria-labelledby="directory-faq-heading-en" className="mt-8 rounded-[2.35rem] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
          <h2 id="directory-faq-heading-en" className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {directoryFaqs.map((item) => (
              <article key={item.question} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-black text-slate-950">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
