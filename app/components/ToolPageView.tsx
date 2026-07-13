import Link from 'next/link';
import ToolAccessGate from '@/app/components/ToolAccessGate';
import { absoluteUrl } from '@/app/lib/site';
import { toolList } from '@/app/tools/toolConfig';
import { getLocalizedTool, LocalizedTool, SiteLocale, toolFaq, toolSteps } from '@/app/tools/toolContent';

function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export default function ToolPageView({ tool, locale }: { tool: LocalizedTool; locale: SiteLocale }) {
  const isEnglish = locale === 'en';
  const faq = toolFaq(tool);
  const steps = toolSteps(tool);
  const homeHref = isEnglish ? '/en' : '/';
  const directoryHref = isEnglish ? '/en/tools' : '/tools';
  const sourceCategory = toolList.find((candidate) => candidate.toolKey === tool.toolKey)?.category;
  const related = toolList
    .filter((candidate) => candidate.toolKey !== tool.toolKey)
    .sort((a, b) => Number(b.category === sourceCategory) - Number(a.category === sourceCategory))
    .slice(0, 4)
    .map((candidate) => getLocalizedTool(candidate, locale));

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    description: tool.description,
    url: absoluteUrl(tool.localHref),
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript and a modern browser',
    inLanguage: locale,
    offers: { '@type': 'Offer', price: '0', priceCurrency: isEnglish ? 'USD' : 'CNY' },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEnglish ? 'Home' : '首页', item: absoluteUrl(homeHref) },
      { '@type': 'ListItem', position: 2, name: isEnglish ? 'Tools' : '工具目录', item: absoluteUrl(directoryHref) },
      { '@type': 'ListItem', position: 3, name: tool.title, item: absoluteUrl(tool.localHref) },
    ],
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <main lang={isEnglish ? 'en' : 'zh-CN'} className="relative isolate overflow-hidden bg-[#f7fbff] text-slate-950">
      {[softwareJsonLd, breadcrumbJsonLd, faqJsonLd].map((value, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(value) }} />
      ))}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_78%)]" />
      <div className="pointer-events-none absolute right-[-8rem] top-24 -z-10 h-72 w-72 rounded-full bg-blue-100/70 blur-2xl" />

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <nav aria-label={isEnglish ? 'Breadcrumb' : '面包屑导航'} className="mb-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600">
          <Link href={homeHref} className="underline underline-offset-4 transition hover:text-blue-700">{isEnglish ? 'Home' : '首页'}</Link>
          <span aria-hidden="true">/</span>
          <Link href={directoryHref} className="underline underline-offset-4 transition hover:text-blue-700">{isEnglish ? 'Tools' : '工具目录'}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-slate-900">{tool.title}</span>
        </nav>

        <header className="mb-10 overflow-hidden rounded-[2.5rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/5 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">{tool.badge}</p>
              <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">{tool.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{tool.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="#tool-workspace" className="rounded-full bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                  {isEnglish ? 'Open workspace' : '开始使用'}
                </Link>
                <Link href={directoryHref} className="rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-900 transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700">
                  {isEnglish ? 'Browse all tools' : '查看全部工具'}
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {(isEnglish ? ['Real output', 'Copy or download', 'Privacy-aware processing'] : ['真实输出', '复制或下载', '隐私优先处理']).map((item) => (
                  <span key={item} className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">{item}</span>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">{isEnglish ? 'Tool path' : '使用路径'}</p>
              <div className="mt-5 space-y-3">
                {(isEnglish
                  ? ['Choose source content', 'Run the browser workflow', 'Copy preview or download file']
                  : ['选择文件或输入内容', '在浏览器中处理任务', '复制预览或下载文件']).map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-[1.25rem] bg-white p-4 shadow-sm">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-xs font-black text-white">{index + 1}</span>
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
            <Link href={isEnglish ? tool.href : `/en${tool.href}`} hrefLang={isEnglish ? 'zh-CN' : 'en'} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:border-blue-200 hover:text-blue-700">
              {isEnglish ? '中文' : 'English'}
            </Link>
          </div>
        </header>

        <section id="tool-workspace" className="grid gap-8 scroll-mt-28 lg:grid-cols-[1.4fr_0.8fr]">
          <ToolAccessGate tool={tool} locale={locale} />
          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-blue-100 bg-white p-6 text-slate-600 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">{isEnglish ? 'Privacy and output' : '隐私与结果'}</h2>
              <ul className="mt-5 space-y-4 text-sm leading-7">
                {(isEnglish
                  ? [
                    'This page is built for real output, not a demo-only preview.',
                    'Text results can be copied or downloaded after processing.',
                    'File tools use local processing first and compatible PDF conversion only when needed.',
                  ]
                  : [
                    '这个页面提供真实处理结果，不是演示预览。',
                    '文本结果可复制或下载，文件结果可保存到本机。',
                    '文件工具优先本地处理，仅在 PDF 无法解析时启用兼容转换。',
                  ]).map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

      <section className="mt-10 rounded-[2.35rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">{isEnglish ? `How to use ${tool.title}` : `${tool.title}怎么用`}</h2>
        <p className="mt-4 max-w-4xl leading-8 text-slate-600">
          {isEnglish
            ? `${tool.description} It works in a modern desktop or mobile browser and is designed for a quick path from source content to a usable result. ${tool.example}`
            : `${tool.description}页面兼容现代电脑与手机浏览器，操作过程从原始内容直接得到可用结果。${tool.example}`}
        </p>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-700">
              <span className="font-semibold text-slate-950">{index + 1}. </span>{step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold text-slate-900">{isEnglish ? 'When this tool is useful' : '适用场景与注意事项'}</h2>
          <p className="mt-4 leading-8 text-slate-600">{tool.example}</p>
          <p className="mt-4 leading-8 text-slate-600">
            {isEnglish
              ? 'Always review important output before using it in production, legal documents or financial records. Browser capabilities, source-file quality and format differences can affect the result.'
              : '正式用于生产环境、法律文件或财务记录前，请再次核对重要结果。浏览器能力、源文件质量和格式差异都可能影响输出。'}
          </p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">{isEnglish ? 'Related free tools' : '相关免费工具'}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link key={item.toolKey} href={item.localHref} className="rounded-2xl border border-slate-200 p-4 transition hover:border-slate-900 hover:bg-slate-50">
                <span className="font-semibold text-slate-900">{item.title}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">{item.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">{isEnglish ? 'Frequently asked questions' : '常见问题'}</h2>
        <div className="mt-6 divide-y divide-slate-200">
          {faq.map((item) => (
            <details key={item.question} className="py-5">
              <summary className="cursor-pointer font-semibold text-slate-900">{item.question}</summary>
              <p className="mt-3 max-w-4xl leading-7 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      </div>
    </main>
  );
}
