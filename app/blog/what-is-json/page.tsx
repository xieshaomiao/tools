import Link from 'next/link';
import AdSlot from '@/app/components/AdSlot';
import { absoluteUrl } from '@/app/lib/site';

export const metadata = {
  title: '什么是 JSON？格式化、校验与常见错误指南 | Toolly',
  description: '通过可复制示例理解 JSON 对象和数组，学习格式化、校验并排查双引号、尾随逗号、转义字符等常见错误。',
  alternates: { canonical: '/blog/what-is-json' },
};

const faqs = [
  {
    question: 'JSON 为什么必须使用双引号？',
    answer: 'JSON 标准要求对象键和字符串值使用双引号。单引号属于部分编程语言的写法，直接粘贴到严格的 JSON 解析器中会报错。',
  },
  {
    question: 'JSON 最后一项后面可以有逗号吗？',
    answer: '不可以。对象最后一个属性或数组最后一个元素后面的尾随逗号会导致严格解析失败，应删除该逗号。',
  },
  {
    question: '格式化 JSON 会改变数据吗？',
    answer: '正常格式化只调整缩进和换行，不应改变键、值和数组顺序。格式化后仍应抽查数字、布尔值、null 与包含转义字符的字符串。',
  },
  {
    question: '可以粘贴接口令牌或用户数据吗？',
    answer: '不建议把生产令牌、密码、身份证号或客户资料粘贴到不明确的环境。使用脱敏样本，并用专门的 JWT 解码工具查看令牌结构。',
  },
];

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '什么是 JSON？格式化、校验与常见错误指南',
  description: '用可复制示例理解 JSON，并排查最常见的语法错误。',
  inLanguage: 'zh-CN',
  datePublished: '2026-07-13',
  dateModified: '2026-07-13',
  author: { '@type': 'Organization', name: 'Toolly' },
  publisher: { '@type': 'Organization', name: 'Toolly' },
  mainEntityOfPage: absoluteUrl('/blog/what-is-json'),
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'zh-CN',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export default function WhatIsJsonPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10 lg:px-8">
      {[articleJsonLd, faqJsonLd].map((value, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(value) }} />
      ))}

      <nav aria-label="面包屑导航" className="mb-6 flex flex-wrap gap-2 text-sm font-semibold text-slate-600">
        <Link href="/">首页</Link><span aria-hidden="true">/</span><Link href="/blog">使用指南</Link><span aria-hidden="true">/</span><span aria-current="page">JSON 入门</span>
      </nav>

      <article>
        <header className="rounded-[2rem] border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-8 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-violet-700">开发调试</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">什么是 JSON？</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            JSON 是接口、配置文件和数据导入中常见的文本格式。它看起来像 JavaScript 对象，但规则更严格。掌握对象、数组和四类常见错误，就能解决大多数“无法解析 JSON”的问题。
          </p>
        </header>

        <div className="mt-10 space-y-8 text-slate-700">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">对象、数组和值分别是什么</h2>
            <p className="mt-4 leading-8">对象使用花括号，保存“键和值”；数组使用方括号，按顺序保存多个元素。值可以是字符串、数字、布尔值、null、对象或数组。</p>
            <pre className="mt-6 overflow-x-auto rounded-[1.5rem] bg-slate-950 p-6 text-sm leading-7 text-slate-100">
{`{
  "name": "Toolly",
  "active": true,
  "formats": ["PDF", "DOCX", "JSON"],
  "limits": { "maxFiles": 1, "note": null }
}`}
            </pre>
            <p className="mt-4 leading-8">这个示例的最外层是对象；<code>formats</code> 是数组；<code>active</code> 是布尔值，不能写成带引号的 <code>&quot;true&quot;</code>，否则含义会变成普通字符串。</p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-black text-slate-950">四步格式化与校验</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                '先复制原始内容，保留一份未修改版本。',
                '粘贴到 JSON 格式化工具并执行格式化。',
                '如果报错，从提示位置向前检查引号、逗号和括号。',
                '格式化成功后，抽查关键键值，再复制或下载结果。',
              ].map((step, index) => (
                <li key={step} className="rounded-[1.25rem] border border-slate-200 bg-white p-5 leading-7"><strong className="text-violet-700">{index + 1}. </strong>{step}</li>
              ))}
            </ol>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">最常见的五类错误</h2>
            <div className="mt-6 space-y-5 leading-8">
              <p><strong className="text-slate-950">单引号：</strong><code>{`{'name': 'Toolly'}`}</code> 不是严格 JSON，应改为双引号。</p>
              <p><strong className="text-slate-950">尾随逗号：</strong><code>{`{"name":"Toolly",}`}</code> 最后一项后多了逗号。</p>
              <p><strong className="text-slate-950">括号不配对：</strong>对象以 <code>{'{'}</code> 开始就必须以 <code>{'}'}</code> 结束；数组同理。</p>
              <p><strong className="text-slate-950">字符串未转义：</strong>字符串内部的双引号应写成 <code>\&quot;</code>，换行应写成 <code>\n</code>。</p>
              <p><strong className="text-slate-950">包含注释：</strong>标准 JSON 不支持 <code>//</code> 或 <code>/* ... */</code> 注释，需要先删除。</p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8">
            <h2 className="text-2xl font-black text-slate-950">隐私边界：先脱敏，再粘贴</h2>
            <p className="mt-5 leading-8">调试接口时，先删除访问令牌、密码、手机号、身份证号和真实客户数据。即使页面声明本地处理，也应使用最少必要数据；JWT 应在专门的解码页面中查看，并且不要把生产令牌发给他人。</p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">常见问题</h2>
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
        <h2 className="text-2xl font-black">用脱敏样本检查你的 JSON</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">先格式化并定位语法问题；需要表格时再转 CSV，需要配置迁移时再转 YAML。</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/tools/json-format" className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950">打开 JSON 格式化</Link>
          <Link href="/tools/json-csv" className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white">JSON CSV 互转</Link>
          <Link href="/tools/yaml-json" className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white">YAML JSON 互转</Link>
          <Link href="/tools/jwt-decoder" className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white">JWT 解码器</Link>
        </div>
      </section>

      <div className="mt-16 border-t border-slate-200 pt-10">
        <AdSlot />
      </div>
    </main>
  );
}
