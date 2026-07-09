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
  .map((key) => tools.find((tool) => tool.toolKey === key))
  .filter((tool): tool is (typeof tools)[number] => Boolean(tool));

const categoryCards = [
  {
    title: 'PDF and office files',
    href: '/en/tools/pdf-convert',
    icon: 'PDF',
    accent: 'from-rose-500 to-orange-400',
    items: ['PDF to Word', 'Word to PDF', 'Markdown to PDF', 'Images to PDF'],
  },
  {
    title: 'Image utilities',
    href: '/en/tools/image-compress',
    icon: 'IMG',
    accent: 'from-emerald-500 to-teal-400',
    items: ['Compress images', 'Convert formats', 'Download WebP', 'Local processing'],
  },
  {
    title: 'Text and content',
    href: '/en/tools/word-count',
    icon: 'TXT',
    accent: 'from-violet-500 to-fuchsia-500',
    items: ['Word count', 'Copy polishing', 'Keyword extraction', 'Summaries'],
  },
  {
    title: 'Developer tools',
    href: '/en/tools/json-format',
    icon: 'DEV',
    accent: 'from-blue-500 to-cyan-400',
    items: ['Format JSON', 'Base64', 'Regex tester', 'Timestamp converter'],
  },
];

const trustItems = [
  { title: 'Local first', text: 'Images, text and most file tasks run inside the current browser whenever possible.' },
  { title: 'Real outputs', text: 'Finished results can be previewed, copied or downloaded instead of stopping at a mock result.' },
  { title: 'Sign in ready', text: 'Users can register, sign in and access the actual tool workflow.' },
  { title: 'Fallback conversion', text: 'If browser PDF parsing fails, Toolly uses a compatible conversion path to improve DOCX export.' },
];

const workflowSteps = [
  { step: '01', title: 'Choose a task', text: 'Search from the homepage, use a featured entry or browse by category.' },
  { step: '02', title: 'Process input', text: 'Upload a file, paste content or select the output format requested by the tool.' },
  { step: '03', title: 'Copy or download', text: 'Copy generated text or download the converted file to your device.' },
];

const heroStats = [
  { value: `${toolList.length}+`, label: 'online tools' },
  { value: 'Copy', label: 'text output' },
  { value: 'Download', label: 'file output' },
];

const heroShowcase = [
  { title: 'PDF to Word', meta: 'resume.pdf → resume.docx', tone: 'from-rose-500 to-orange-400', href: '/en/tools/pdf-convert' },
  { title: 'Image compression', meta: 'JPG / PNG / WebP', tone: 'from-emerald-400 to-cyan-400', href: '/en/tools/image-compress' },
  { title: 'JSON formatter', meta: 'validate, indent, copy', tone: 'from-violet-400 to-fuchsia-400', href: '/en/tools/json-format' },
  { title: 'QR generator', meta: 'text / links / PNG', tone: 'from-blue-400 to-indigo-400', href: '/en/tools/qr-code' },
];

export default function EnglishHomePage() {
  return (
    <main lang="en" className="relative isolate overflow-hidden bg-[#f7fbff] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c') }} />

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[740px] bg-[linear-gradient(180deg,#eaf3ff_0%,#f7fbff_72%)]" />

      <section className="px-4 pb-14 pt-6 sm:px-6 lg:px-8 lg:pb-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-slate-950 px-5 py-10 text-white shadow-[0_40px_120px_rgba(15,23,42,0.28)] sm:px-8 sm:py-14 lg:rounded-[3rem] lg:px-12 lg:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_76%_18%,rgba(129,140,248,0.22),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          <div className="relative mx-auto max-w-5xl text-center">
            <p className="mx-auto inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-blue-100">
              Local-first · Real downloads · Free toolbox
            </p>
            <h1 className="mt-7 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Turn files, images and text into
              <span className="block bg-gradient-to-r from-cyan-200 via-blue-300 to-violet-200 bg-clip-text text-transparent">a result workspace anyone can use</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-xl sm:leading-9">
              Convert PDFs, compress images and format JSON from one fast entry point. Sign in to preview, copy and download real outputs.
            </p>

            <form action="/en/tools" method="get" role="search" className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 rounded-[2rem] border border-white/15 bg-white p-2 shadow-2xl shadow-blue-950/25 sm:flex-row">
              <label htmlFor="home-tool-search-en" className="sr-only">Search tools</label>
              <input
                id="home-tool-search-en"
                name="q"
                placeholder="Search PDF, Word, images, JSON, QR code, timestamp..."
                className="min-w-0 flex-1 rounded-[1.5rem] border border-transparent bg-transparent px-5 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-200 focus:bg-blue-50/50"
              />
              <button type="submit" className="rounded-[1.5rem] bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-500">
                Find a tool
              </button>
            </form>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {enPopularSearches.map((item) => (
                <Link key={item.label} href={`/en/tools?q=${encodeURIComponent(item.query)}`} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-white/15 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/en/tools/pdf-convert" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-white/10 transition hover:-translate-y-0.5 hover:bg-blue-50">
                Start with a tool →
              </Link>
              <Link href="/en/tools" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15">
                View all tools
              </Link>
            </div>
          </div>

          <div className="relative mt-10 grid gap-4 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div className="rounded-[2rem] border border-white/12 bg-white/10 p-5 shadow-2xl shadow-blue-950/30 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-300">Universal document converter</p>
                  <p className="mt-1 text-2xl font-black text-white">PDF to Word</p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-black text-emerald-200">Done</span>
              </div>

              <div className="mt-6 grid items-center gap-4 rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5 sm:grid-cols-[1fr_auto_1fr]">
                <div className="rounded-[1.35rem] bg-white p-5 text-center text-slate-950">
                  <div className="mx-auto grid h-14 w-12 place-items-center rounded-2xl bg-rose-700 text-sm font-black text-white">PDF</div>
                  <p className="mt-4 text-sm font-black">resume.pdf</p>
                  <p className="mt-1 text-xs text-slate-500">331 KB</p>
                </div>
                <div className="text-center text-3xl font-black text-cyan-300">→</div>
                <div className="rounded-[1.35rem] bg-white p-5 text-center text-slate-950">
                  <div className="mx-auto grid h-14 w-12 place-items-center rounded-2xl bg-blue-600 text-sm font-black text-white">W</div>
                  <p className="mt-4 text-sm font-black">resume.docx</p>
                  <p className="mt-1 text-xs text-slate-500">downloadable</p>
                </div>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-200">
                  <span>Generating copyable preview</span>
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
                  <Link key={tool.title} href={tool.href} className="group rounded-[1.75rem] border border-white/12 bg-white/10 p-5 transition hover:-translate-y-1 hover:bg-white/15">
                    <div className={`mb-5 h-2 rounded-full bg-gradient-to-r ${tool.tone}`} />
                    <h2 className="text-lg font-black text-white">{tool.title}</h2>
                    <p className="mt-2 text-sm text-slate-300">{tool.meta}</p>
                    <span className="mt-5 inline-flex text-sm font-black text-cyan-200 group-hover:translate-x-1">Open tool →</span>
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
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Popular tools, one click away</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            The highest-intent document, image, text and developer utilities are surfaced first so visitors reach the result faster.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categoryCards.map((card) => (
            <Link key={card.title} href={card.href} className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_30px_90px_rgba(37,99,235,0.14)]">
              <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${card.accent} text-sm font-black text-white shadow-lg`}>{card.icon}</div>
              <h2 className="mt-7 text-xl font-black text-slate-950">{card.title}</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" />{item}</li>
                ))}
              </ul>
              <p className="mt-7 inline-flex text-sm font-bold text-blue-700 group-hover:translate-x-1">View all →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.2)] lg:p-10">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Convert in three steps</h2>
            <p className="mt-5 max-w-md text-base leading-8 text-slate-300">
              Motion exists to clarify the path. The result is still the main product: choose, process, download.
            </p>
            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-300"><span>Conversion experience</span><span>Live</span></div>
              <div className="mt-4 h-3 rounded-full bg-white/10"><div className="h-3 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500" style={{ width: '92%' }} /></div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {workflowSteps.map((item) => (
              <div key={item.step} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-black text-blue-600">{item.step}</p>
                <h2 className="mt-5 text-xl font-black text-slate-950">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
                <div className="mt-8 rounded-[1.5rem] border border-dashed border-blue-200 bg-blue-50/60 p-5 text-center text-sm font-bold text-blue-700">
                  {item.step === '01' ? 'Search tools' : item.step === '02' ? 'Process locally' : 'Download'}
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
                <h2 className="text-3xl font-black tracking-tight text-slate-950">Featured high-frequency tools</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  Office, content, image and developer tasks are grouped around search demand and repeat use.
                </p>
              </div>
              <Link href="/en/tools" className="text-sm font-black text-blue-700 underline underline-offset-4">Browse directory</Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {featuredTools.map((tool) => (
                <Link key={tool.toolKey} href={tool.localHref} className="group rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 shadow-sm">{tool.badge}</span>
                    <span className="text-sm font-black text-blue-600 opacity-0 transition group-hover:opacity-100">Open →</span>
                  </div>
                  <h2 className="mt-5 text-xl font-black text-slate-950">{tool.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2.5rem] border border-blue-100 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-[0_30px_90px_rgba(37,99,235,0.24)]">
              <h2 className="text-3xl font-black tracking-tight">Help visitors reach the result faster</h2>
              <p className="mt-5 text-sm leading-7 text-blue-50">
                Search, categories, popular tools and the sign-in path now sit near the top, ready for SEO content pages and ad placement testing.
              </p>
              <Link href="/auth?next=%2Fen%2Ftools" className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-black text-blue-700 transition hover:-translate-y-0.5">Sign in to use</Link>
            </div>
            <AdSlot />
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">Browse by category</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {categories.map((item) => (
                  <Link key={item.category} href={`/en/tools#${encodeURIComponent(item.category)}`} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
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
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Try Toolly online tools now</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                Free, clean and result-first. Start with one file or one block of text and finish the task in seconds.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/en/tools" className="rounded-full bg-white px-7 py-4 text-center text-sm font-black text-slate-950 transition hover:-translate-y-0.5">View all tools</Link>
              <Link href="/download" className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10">Download app</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
