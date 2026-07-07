import Link from 'next/link';
import AdSlot from '@/app/components/AdSlot';

export const metadata = {
  title: '什么是 JSON？| Toolly SEO 文章',
  description: '了解 JSON 的基本概念、用途与实践示例，帮助你在前端开发和内容创作中更好地应用此数据格式。',
  alternates: { canonical: '/blog/what-is-json' },
};

export default function WhatIsJsonPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10 lg:px-8">
      <header className="mb-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">SEO 文章</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">什么是 JSON？</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              JSON 是前端和后端之间最常见的数据交换格式。本文介绍它的定义、结构和实际应用场景，适合网站内容页与 FAQ 收录。
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-100"
          >
            返回首页
          </Link>
        </div>
      </header>

      <article className="space-y-10 text-slate-700">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">JSON 的基本概念</h2>
          <p className="mt-4 leading-8">
            JSON（JavaScript Object Notation）是一种轻量级的数据交换格式。它使用键值对结构，便于人类阅读，同时也容易被机器解析。
          </p>
          <p className="mt-4 leading-8">
            JSON 格式通常用于 API 返回数据、前端配置和跨系统传输，已成为 Web 开发的标准之一。
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">为什么 JSON 很重要</h2>
          <p className="mt-4 leading-8">
            由于 JSON 结构清晰、格式简单，开发者可以快速编写和调试数据。大多数现代前端框架与后端服务都直接支持 JSON。
          </p>
          <p className="mt-4 leading-8">
            这使得 JSON 成为数据交换、内容存储和 SEO 工具页内容展示的首选格式。
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">JSON 示例</h2>
          <pre className="mt-4 overflow-x-auto rounded-[1.5rem] bg-slate-950 p-6 text-sm leading-7 text-slate-100">
{`{
  "name": "Toolly",
  "type": "tool-aggregator",
  "features": ["JSON 格式化", "字数统计", "图片工具"]
}`}
          </pre>
          <p className="mt-4 leading-8">
            上述示例展示了一个简单对象，其中包含字符串、数组和键值对。JSON 数据必须使用双引号，并使用逗号分隔成员。
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">如何在网页中使用 JSON</h2>
          <p className="mt-4 leading-8">
            在前端，JSON 常用于 AJAX 请求与 API 数据解析。你可以通过 fetch 获取 JSON 并在页面上展示内容。
          </p>
          <p className="mt-4 leading-8">
            在 SEO 文章中，展示 JSON 相关示例和 FAQ 有助于增加页面权重与用户停留时间。
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-slate-600">
          <h2 className="text-2xl font-semibold text-slate-900">常见问题</h2>
          <div className="mt-6 space-y-6">
            <div>
              <p className="font-semibold text-slate-900">JSON 和对象字面量有什么区别？</p>
              <p className="mt-3 leading-7">
                JSON 是数据交换格式，必须使用双引号。JavaScript 对象字面量可以省略引号，并允许函数等语法。</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">JSON 可以用于 SEO 文章吗？</p>
              <p className="mt-3 leading-7">可以。展示 JSON 示例和解释，有助于丰富内容并提升垂直搜索匹配度。</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">如何校验 JSON 是否正确？</p>
              <p className="mt-3 leading-7">可使用本站 JSON 格式化工具，粘贴后点击格式化，如果语法正确即会生成美化结果。</p>
            </div>
          </div>
        </section>
      </article>

      <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">相关工具推荐</h2>
            <p className="mt-2 text-sm text-slate-600">结合本篇文章，尝试下面的实用工具。</p>
          </div>
          <Link
            href="/tools/json-format"
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            访问 JSON 格式化工具
          </Link>
        </div>
      </section>

      <aside className="mt-10">
        <AdSlot />
      </aside>
    </main>
  );
}
