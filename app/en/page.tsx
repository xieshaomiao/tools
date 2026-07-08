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

export default function EnglishHomePage() {
  return (
    <main lang="en" className="relative isolate overflow-hidden bg-[#f7fbff] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c') }} />

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(124,58,237,0.2),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#ffffff_72%)]" />
      <div className="toolly-orb pointer-events-none absolute right-[-10rem] top-24 -z-10 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="toolly-orb-delay pointer-events-none absolute left-[-8rem] top-[38rem] -z-10 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-12 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:pb-24 lg:pt-16">
        <div>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Make everyday files, images and text feel{' '}
            <span className="inline-block whitespace-nowrap bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">effortless</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-600 sm:text-xl">
            Convert PDFs, compress images, format JSON, count words, create QR codes and finish common browser tasks with copyable or downloadable results after signing in.
          </p>

          <form action="/en/tools" method="get" role="search" className="mt-8 flex max-w-3xl flex-col gap-3 rounded-[2rem] border border-white/80 bg-white/80 p-2 shadow-[0_24px_80px_rgba(30,64,175,0.12)] backdrop-blur sm:flex-row">
            <label htmlFor="home-tool-search-en" className="sr-only">Search tools</label>
            <input
              id="home-tool-search-en"
              name="q"
              placeholder="Search PDF, Word, images, JSON, QR code, timestamp..."
              className="min-w-0 flex-1 rounded-[1.5rem] border border-transparent bg-transparent px-5 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-200 focus:bg-white"
            />
            <button type="submit" className="rounded-[1.5rem] bg-slate-950 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
              Find a tool
            </button>
          </form>

          <div className="mt-5 flex flex-wrap gap-3">
            {enPopularSearches.map((item) => (
              <Link key={item.label} href={`/en/tools?q=${encodeURIComponent(item.query)}`} className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/en/tools/pdf-convert" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700">
              Start with a tool →
            </Link>
            <Link href="/en/tools" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700">
              View all tools
            </Link>
          </div>

          <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3 text-center">
            <div className="rounded-[1.25rem] border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
              <p className="text-2xl font-black text-slate-950">{toolList.length}+</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">tools</p>
            </div>
            <div className="rounded-[1.25rem] border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
              <p className="text-2xl font-black text-slate-950">Copy</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">text output</p>
            </div>
            <div className="rounded-[1.25rem] border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
              <p className="text-2xl font-black text-slate-950">Download</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">file output</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[520px]">
          <div className="toolly-float absolute right-0 top-4 w-full max-w-[560px] rounded-[2.5rem] border border-white/80 bg-white/90 p-6 shadow-[0_40px_120px_rgba(37,99,235,0.2)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-500/30">T</div>
                <div>
                  <p className="text-sm font-bold text-slate-500">Universal document converter</p>
                  <p className="text-xl font-black text-slate-950">PDF to Word</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">Done</span>
            </div>

            <div className="mt-8 grid items-center gap-4 rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 sm:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-[1.5rem] bg-white p-5 text-center shadow-sm">
                <div className="mx-auto grid h-16 w-14 place-items-center rounded-2xl bg-rose-500 text-sm font-black text-white">PDF</div>
                <p className="mt-4 text-sm font-bold text-slate-900">resume.pdf</p>
                <p className="mt-1 text-xs text-slate-500">331 KB</p>
              </div>
              <div className="text-3xl font-black text-blue-400">→</div>
              <div className="rounded-[1.5rem] bg-white p-5 text-center shadow-sm">
                <div className="mx-auto grid h-16 w-14 place-items-center rounded-2xl bg-blue-600 text-sm font-black text-white">W</div>
                <p className="mt-4 text-sm font-bold text-slate-900">resume.docx</p>
                <p className="mt-1 text-xs text-slate-500">downloadable</p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-slate-100 bg-white p-5">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                <span>Generating preview</span>
                <span>100%</span>
              </div>
              <div className="mt-3 h-3 rounded-full bg-slate-100">
                <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href="/en/tools/pdf-convert" className="rounded-[1.25rem] border border-blue-100 bg-blue-50 px-5 py-4 text-center text-sm font-bold text-blue-700 transition hover:bg-blue-100">Preview result</Link>
              <Link href="/en/tools/pdf-convert" className="rounded-[1.25rem] bg-blue-600 px-5 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700">Download file</Link>
            </div>
          </div>

          <div className="toolly-float-delay pointer-events-none absolute left-0 top-28 hidden rounded-3xl border border-white/80 bg-white/90 p-4 shadow-2xl shadow-cyan-500/10 backdrop-blur md:block">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Image</p>
            <p className="mt-2 text-sm font-black text-slate-950">Compressed -68%</p>
          </div>
          <div className="toolly-float-slow pointer-events-none absolute bottom-10 left-12 hidden rounded-3xl border border-white/80 bg-white/90 p-4 shadow-2xl shadow-violet-500/10 backdrop-blur lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">JSON</p>
            <p className="mt-2 text-sm font-black text-slate-950">Formatted</p>
          </div>
          <div className="toolly-float pointer-events-none absolute bottom-4 right-10 hidden rounded-[2rem] bg-gradient-to-br from-violet-600 to-blue-600 p-5 text-white shadow-2xl shadow-blue-500/20 sm:block">
            <p className="text-3xl font-black">{'{ }'}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
        <div className="rounded-[2.5rem] border border-white/80 bg-white/80 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur">
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
