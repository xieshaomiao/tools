import Link from 'next/link';
import { absoluteUrl } from '@/app/lib/site';

export const metadata = {
  title: 'Toolly Guides | PDF, JSON and Safer Online Tool Workflows',
  description: 'Read practical Toolly guides for PDF to Word conversion, fixing invalid JSON, checking output quality, and using browser-based tools safely.',
  alternates: {
    canonical: '/en/blog',
    languages: { 'zh-CN': '/blog', en: '/en/blog' },
  },
};

const guides = [
  {
    title: 'PDF to Word: Get Editable Text Without Losing the Important Parts',
    description: 'Identify text, scanned, protected and complex-layout PDFs before choosing the right conversion path.',
    href: '/en/blog/pdf-to-word-guide',
    tag: 'Document conversion',
    readingTime: '8 min read',
    outcome: 'Choose between editable text, OCR and layout preservation.',
  },
  {
    title: 'How to Fix Invalid JSON: Six Errors and a Reliable Debugging Order',
    description: 'Find broken quotes, trailing commas, unmatched brackets, invalid escapes, comments and non-JSON values.',
    href: '/en/blog/fix-json-errors',
    tag: 'Developer workflow',
    readingTime: '7 min read',
    outcome: 'Move from a parser error to valid, reviewable JSON.',
  },
];

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Toolly Guides',
  description: 'Practical guides for document conversion, data formatting and safe online tool workflows.',
  url: absoluteUrl('/en/blog'),
  inLanguage: 'en',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: guides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.title,
      url: absoluteUrl(guide.href),
    })),
  },
};

export default function EnglishBlogPage() {
  return (
    <main lang="en" className="relative isolate overflow-hidden bg-[#f7fbff] px-6 py-10 text-slate-950 lg:px-8 lg:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd).replace(/</g, '\\u003c') }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_18%_8%,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_86%_8%,rgba(124,58,237,0.14),transparent_30%),linear-gradient(180deg,#f8fbff_0%,transparent_90%)]" />

      <div className="mx-auto max-w-6xl">
        <header className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-8 text-white shadow-[0_32px_100px_rgba(30,64,175,0.2)] sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-200">Toolly guides</p>
            <Link href="/blog" hrefLang="zh-CN" className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/15">中文指南</Link>
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">Finish the task, then verify the result</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">
            Practical, original guides for the moments when a file will not convert, a parser rejects valid-looking data, or an online workflow needs a safer decision before the first upload.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold">
            {['Clear diagnosis', 'Reproducible steps', 'Output checks', 'Privacy boundaries'].map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-blue-50">{item}</span>
            ))}
          </div>
        </header>

        <section aria-labelledby="english-guide-list" className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-700">High-intent answers</p>
              <h2 id="english-guide-list" className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Start with the problem in front of you</h2>
            </div>
            <Link href="/en/tools" className="text-sm font-black text-blue-700 underline underline-offset-4">Browse all tools</Link>
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            {guides.map((guide) => (
              <article key={guide.href} className="flex min-h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_70px_rgba(37,99,235,0.12)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{guide.tag}</span>
                  <span className="text-xs font-bold text-slate-500">{guide.readingTime}</span>
                </div>
                <h3 className="mt-6 text-2xl font-black leading-9 text-slate-950">{guide.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{guide.description}</p>
                <div className="mt-6 rounded-[1.35rem] border border-blue-100 bg-blue-50/70 p-4 text-sm font-semibold leading-6 text-blue-950">
                  Outcome: {guide.outcome}
                </div>
                <Link href={guide.href} className="mt-7 inline-flex w-fit rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700">Read the guide</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Already know what you need?</h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-600">Open the matching tool, use a non-sensitive sample first, and check the result before replacing an important source file.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/en/tools/pdf-convert" className="rounded-full bg-blue-600 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-blue-700">Convert a document</Link>
              <Link href="/en/tools/json-format" className="rounded-full border border-slate-200 px-6 py-3 text-center text-sm font-black text-slate-900 transition hover:border-blue-200 hover:text-blue-700">Format JSON</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
