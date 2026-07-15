import Link from 'next/link';
import { absoluteUrl } from '@/app/lib/site';

export const metadata = {
  title: 'How to Fix Invalid JSON: Quotes, Commas, Brackets and Escapes | Toolly',
  description: 'Fix invalid JSON in a reliable order. Learn how to find single quotes, trailing commas, unmatched brackets, bad escapes, comments and unsupported values.',
  alternates: {
    canonical: '/en/blog/fix-json-errors',
    languages: { 'zh-CN': '/blog/what-is-json', en: '/en/blog/fix-json-errors' },
  },
};

const faqs = [
  {
    question: 'Why does valid-looking JSON still fail to parse?',
    answer: 'The most common hidden causes are a trailing comma, a single quote, an unescaped quotation mark, an invisible control character or a JavaScript value such as undefined. Start at the parser position and inspect the token immediately before it.',
  },
  {
    question: 'Can JSON contain comments?',
    answer: 'Standard JSON does not support line or block comments. Remove them or use a format designed for configuration comments, then convert the final data to strict JSON when another system requires it.',
  },
  {
    question: 'Does formatting JSON change the data?',
    answer: 'A formatter should change whitespace and indentation only. Compare important strings, numbers, booleans and null values after formatting, especially when the input was repaired first.',
  },
  {
    question: 'Is it safe to paste an API response into a JSON formatter?',
    answer: 'Use a redacted sample. Remove access tokens, passwords, session identifiers, customer details and internal URLs before pasting data into any debugging tool.',
  },
];

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Fix Invalid JSON: Six Errors and a Reliable Debugging Order',
  description: 'A practical debugging workflow for quotes, commas, brackets, escapes, comments and unsupported values.',
  inLanguage: 'en',
  datePublished: '2026-07-13',
  dateModified: '2026-07-13',
  author: { '@type': 'Organization', name: 'Toolly' },
  publisher: { '@type': 'Organization', name: 'Toolly' },
  mainEntityOfPage: absoluteUrl('/en/blog/fix-json-errors'),
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

export default function FixJsonErrorsGuidePage() {
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
        <span aria-current="page">Fix JSON errors</span>
      </nav>

      <article>
        <header className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-gradient-to-br from-slate-950 via-violet-950 to-indigo-900 p-8 text-white shadow-[0_30px_90px_rgba(76,29,149,0.17)] sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-violet-200">Developer workflow</p>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-violet-50">7 min read</span>
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">How to fix invalid JSON without guessing</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-violet-100 sm:text-lg">
            JSON parser errors often point one character after the real mistake. Use the error position, inspect the preceding token, and repair one syntax class at a time instead of rewriting the whole payload.
          </p>
        </header>

        <div className="mt-10 space-y-8 text-slate-700">
          <section className="rounded-[2rem] border border-violet-100 bg-violet-50/70 p-8">
            <h2 className="text-2xl font-black text-slate-950">A reliable debugging order</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                'Keep an untouched copy of the original payload.',
                'Read the parser line, column or character position.',
                'Inspect the token before the reported position.',
                'Fix one error class, format again, then review the values.',
              ].map((step, index) => (
                <li key={step} className="rounded-[1.35rem] border border-violet-100 bg-white p-5 leading-7"><strong className="text-violet-700">Step {index + 1}: </strong>{step}</li>
              ))}
            </ol>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">1. Start with a minimal valid shape</h2>
            <p className="mt-4 leading-8">An object uses braces, an array uses brackets, property names use double quotes, and values must be valid JSON types.</p>
            <pre className="mt-6 overflow-x-auto rounded-[1.5rem] bg-slate-950 p-6 text-sm leading-7 text-slate-100">
{`{
  "name": "Toolly",
  "active": true,
  "formats": ["PDF", "DOCX", "JSON"],
  "limits": { "maxFiles": 1, "note": null }
}`}
            </pre>
            <p className="mt-4 leading-8">Strings use double quotes. Numbers, booleans and <code>null</code> do not. JSON has no <code>undefined</code>, function, date or comment value.</p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-black text-slate-950">2. Fix the six errors that cause most parser failures</h2>
            <div className="mt-6 space-y-5">
              {[
                ['Single quotes', `{'name': 'Toolly'}`, 'Replace property-name and string quotes with double quotes.'],
                ['Trailing commas', `{"name":"Toolly",}`, 'Remove the comma after the final object property or array item.'],
                ['Unmatched brackets', `{"items":[1,2}`, 'Close arrays with ] and objects with } in the correct nesting order.'],
                ['Unescaped quotes', `{"message":"Say "hello""}`, 'Escape quotation marks inside a string as \\".'],
                ['Comments', `{"active":true // enabled}`, 'Remove line and block comments before strict parsing.'],
                ['Unsupported values', `{"result":undefined}`, 'Use null or omit the property; undefined is JavaScript, not JSON.'],
              ].map(([title, broken, repair]) => (
                <article key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 sm:grid sm:grid-cols-[0.8fr_1fr] sm:gap-6">
                  <div>
                    <h3 className="font-black text-slate-950">{title}</h3>
                    <code className="mt-3 block overflow-x-auto rounded-xl bg-slate-950 p-3 text-sm text-slate-100">{broken}</code>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:mt-0 sm:self-center">{repair}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">3. Use the parser position correctly</h2>
            <div className="mt-5 space-y-4 leading-8">
              <p>A message such as “unexpected token at position 84” tells you where parsing stopped, not always where the mistake began. Look immediately before that position for a missing comma, closing quote or bracket.</p>
              <p>When the payload is large, copy a redacted portion around the reported line into the <Link href="/en/tools/json-format" className="font-black text-blue-700 underline underline-offset-4">JSON formatter</Link>. Once the fragment is valid, restore its surrounding object and validate the complete payload again.</p>
              <p>If the error moves forward after a repair, the first problem is fixed. Continue from the new position instead of undoing the earlier change.</p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-blue-100 bg-blue-50/70 p-8">
            <h2 className="text-2xl font-black text-slate-950">4. Choose the next tool after validation</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link href="/en/tools/json-csv" className="rounded-[1.5rem] border border-blue-100 bg-white p-5 transition hover:border-blue-300">
                <h3 className="font-black text-slate-950">JSON to CSV</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">Use a flat array of similar objects when a spreadsheet is the intended result.</p>
              </Link>
              <Link href="/en/tools/yaml-json" className="rounded-[1.5rem] border border-blue-100 bg-white p-5 transition hover:border-blue-300">
                <h3 className="font-black text-slate-950">JSON to YAML</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">Convert configuration data after the JSON structure is known to be valid.</p>
              </Link>
              <Link href="/en/tools/jwt-decoder" className="rounded-[1.5rem] border border-blue-100 bg-white p-5 transition hover:border-blue-300">
                <h3 className="font-black text-slate-950">JWT decoder</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">Inspect a redacted token structure without treating it as ordinary JSON input.</p>
              </Link>
              <Link href="/en/tools/text-diff" className="rounded-[1.5rem] border border-blue-100 bg-white p-5 transition hover:border-blue-300">
                <h3 className="font-black text-slate-950">Text comparison</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">Compare the repaired payload with the original before committing a change.</p>
              </Link>
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8">
            <h2 className="text-2xl font-black text-slate-950">5. Redact real data before debugging</h2>
            <p className="mt-5 leading-8">Replace access tokens, passwords, email addresses, customer identifiers and internal URLs with realistic placeholders. Preserve the same JSON types and nesting so the sample still reproduces the parser failure without exposing production data.</p>
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
        <h2 className="text-2xl font-black">Validate a redacted sample first</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">Format the smallest payload that reproduces the error, confirm the data types, then compare the repair with the original.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/en/tools/json-format" className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50">Open JSON formatter</Link>
          <Link href="/en/tools/json-csv" className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10">Convert JSON and CSV</Link>
          <Link href="/en/blog/pdf-to-word-guide" className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10">Read the PDF guide</Link>
        </div>
      </section>
    </main>
  );
}
