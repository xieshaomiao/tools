import Link from 'next/link';
import { absoluteUrl } from '@/app/lib/site';

export const metadata = {
  title: 'PDF to Word Guide: Editable Text, OCR and Layout Problems | Toolly',
  description: 'Learn how to convert PDF to editable Word by identifying text, scanned, protected and complex-layout PDFs before choosing extraction, OCR or layout preservation.',
  alternates: {
    canonical: '/en/blog/pdf-to-word-guide',
    languages: { 'zh-CN': '/blog/pdf-to-word-guide', en: '/en/blog/pdf-to-word-guide' },
  },
};

const faqs = [
  {
    question: 'Why is the text in my converted Word file not editable?',
    answer: 'The source PDF is probably a scan with no text layer. A converter can place each page image inside Word, but editable text requires OCR followed by a careful review of names, numbers and formatting.',
  },
  {
    question: 'Why does the Word layout look different from the PDF?',
    answer: 'PDF stores content at fixed page coordinates, while Word reflows paragraphs. Columns, tables, floating images, headers and embedded fonts can move when converted into editable content.',
  },
  {
    question: 'Can a password-protected PDF be converted?',
    answer: 'Only when you are authorized to use the file and know the password. Remove the restriction with trusted software first. A conversion tool should not bypass unknown passwords or access controls.',
  },
  {
    question: 'Does Toolly upload a PDF during conversion?',
    answer: 'Toolly tries browser-local processing first. If the browser cannot parse the PDF, compatible conversion may send the file for that request without keeping it as a user file library. Follow your organization rules for sensitive material.',
  },
];

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'PDF to Word: Get Editable Text Without Losing the Important Parts',
  description: 'A practical decision guide for text PDFs, scans, protected files and complex layouts.',
  inLanguage: 'en',
  datePublished: '2026-07-13',
  dateModified: '2026-07-13',
  author: { '@type': 'Organization', name: 'Toolly' },
  publisher: { '@type': 'Organization', name: 'Toolly' },
  mainEntityOfPage: absoluteUrl('/en/blog/pdf-to-word-guide'),
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'en',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export default function EnglishPdfToWordGuidePage() {
  return (
    <main lang="en" className="mx-auto min-h-screen max-w-5xl px-6 py-10 lg:px-8">
      {[articleJsonLd, faqJsonLd].map((value, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(value) }} />
      ))}

      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-sm font-semibold text-slate-600">
        <Link href="/en" className="underline underline-offset-4">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/en/blog" className="underline underline-offset-4">Guides</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">PDF to Word</span>
      </nav>

      <article>
        <header className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-8 text-white shadow-[0_30px_90px_rgba(30,64,175,0.18)] sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-200">Document conversion</p>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-blue-50">8 min read</span>
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">PDF to Word: get editable text without losing the important parts</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">
            A PDF can contain real text, page images, access restrictions or a layout that Word cannot reproduce exactly. Identify the file type first, then choose whether editable text or visual fidelity matters more.
          </p>
        </header>

        <div className="mt-10 space-y-8 text-slate-700">
          <section className="rounded-[2rem] border border-blue-100 bg-blue-50/70 p-8">
            <h2 className="text-2xl font-black text-slate-950">The short answer</h2>
            <p className="mt-4 leading-8">
              If you can select a sentence inside the PDF, convert it directly to DOCX and then review the layout. If every page behaves like one picture, use OCR when you need editable text. If the file is protected, only continue when you have permission and the password. For a brochure, form or multi-column report, decide whether editing or preserving the page design is the priority.
            </p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">1. Identify the PDF before converting it</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ['Text PDF', 'You can select and copy individual words. Text extraction usually works, although tables and columns may still reflow.'],
                ['Scanned PDF', 'Each page is an image. Image-based Word preserves the page, while editable text requires OCR and proofreading.'],
                ['Protected PDF', 'Opening, copying or printing requires a password. Remove restrictions only when you are authorized to do so.'],
                ['Complex-layout PDF', 'Columns, forms, floating images and embedded fonts force a trade-off between editability and visual fidelity.'],
              ].map(([title, description]) => (
                <article key={title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-black text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-black text-slate-950">2. Convert a text PDF to DOCX</h2>
            <ol className="mt-6 space-y-5 leading-8">
              <li><strong className="text-slate-950">Keep the source:</strong> work from a copy so the original PDF remains available for comparison.</li>
              <li><strong className="text-slate-950">Choose Word DOCX:</strong> open the <Link href="/en/tools/pdf-convert" className="font-black text-blue-700 underline underline-offset-4">document converter</Link>, select the PDF and set the output format to Word.</li>
              <li><strong className="text-slate-950">Run the conversion:</strong> local parsing is attempted first; compatible conversion is used only when the browser cannot parse the file.</li>
              <li><strong className="text-slate-950">Review the preview:</strong> check headings, names, dates, amounts and paragraph order before downloading.</li>
              <li><strong className="text-slate-950">Open the DOCX:</strong> inspect every important page in Word, especially tables, lists, headers and image positions.</li>
            </ol>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">3. Choose the right path for scans and complex pages</h2>
            <div className="mt-6 space-y-6 leading-8">
              <div>
                <h3 className="font-black text-slate-950">For a scan, decide whether you actually need editable text</h3>
                <p className="mt-2">An image-based Word file may be enough for archiving or reading. Use OCR only when searching, copying or editing is required, then proofread names, decimal points, dates and specialist terms.</p>
              </div>
              <div>
                <h3 className="font-black text-slate-950">For a complex layout, choose one priority</h3>
                <p className="mt-2">Use DOCX when editing matters and accept some reflow. Keep the PDF, export page images or rebuild the document when visual placement matters more than editable paragraphs.</p>
              </div>
              <div>
                <h3 className="font-black text-slate-950">For a protected file, preserve the authorization boundary</h3>
                <p className="mt-2">If you know the password and have permission, remove the restriction in trusted software and convert a separate copy. Do not use conversion to bypass unknown passwords or document permissions.</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-rose-200 bg-rose-50 p-8">
            <h2 className="text-2xl font-black text-slate-950">4. Diagnose common PDF to Word failures</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-rose-200 text-slate-950">
                    <th className="p-3">What you see</th>
                    <th className="p-3">Likely cause</th>
                    <th className="p-3">Best next step</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-100">
                  <tr><td className="p-3">The Word file contains page images</td><td className="p-3">The PDF is a scan</td><td className="p-3">Use OCR if text must be editable</td></tr>
                  <tr><td className="p-3">Text is empty or garbled</td><td className="p-3">Embedded font, encoding or damaged source</td><td className="p-3">Try compatible conversion and compare with the PDF</td></tr>
                  <tr><td className="p-3">Tables and columns move</td><td className="p-3">Fixed PDF coordinates became flowing Word content</td><td className="p-3">Repair the layout manually or preserve the PDF</td></tr>
                  <tr><td className="p-3">The PDF cannot be opened</td><td className="p-3">Password, corruption or wrong extension</td><td className="p-3">Authorize, repair or download the source again</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8">
            <h2 className="text-2xl font-black text-slate-950">5. Protect sensitive documents</h2>
            <p className="mt-5 leading-8">
              Use a redacted sample before processing identity documents, unpublished contracts, medical records or customer files. Browser-local processing reduces transfer, but it does not replace an employer, client or regulatory rule. When online processing is not clearly allowed, use approved offline software instead.
            </p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">Frequently asked questions</h2>
            <div className="mt-6 divide-y divide-slate-200">
              {faqs.map((item) => (
                <details key={item.question} className="py-5">
                  <summary className="cursor-pointer font-black text-slate-950">{item.question}</summary>
                  <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </article>

      <section className="mt-10 rounded-[2rem] bg-slate-950 p-8 text-white">
        <h2 className="text-2xl font-black">Convert only after choosing the outcome</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">Choose Word for editable content. Keep PDF or page images when preserving the exact visual page is more important.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/en/tools/pdf-convert" className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50">Open PDF to Word</Link>
          <Link href="/en/tools/image-convert" className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10">Convert page images</Link>
          <Link href="/en/blog/fix-json-errors" className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10">Read the JSON guide</Link>
        </div>
      </section>
    </main>
  );
}
