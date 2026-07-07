import Link from 'next/link';
import AdSlot from '@/app/components/AdSlot';
import ToolPanel from '@/app/components/ToolPanel';
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
    <main lang={isEnglish ? 'en' : 'zh-CN'} className="mx-auto min-h-screen max-w-7xl px-6 py-10 lg:px-8">
      {[softwareJsonLd, breadcrumbJsonLd, faqJsonLd].map((value, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(value) }} />
      ))}

      <nav aria-label={isEnglish ? 'Breadcrumb' : '面包屑导航'} className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <Link href={homeHref} className="underline hover:text-slate-950">{isEnglish ? 'Home' : '首页'}</Link>
        <span aria-hidden="true">/</span>
        <Link href={directoryHref} className="underline hover:text-slate-950">{isEnglish ? 'Tools' : '工具目录'}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-slate-900">{tool.title}</span>
      </nav>

      <header className="mb-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">{tool.badge}</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">{tool.title}</h1>
            <p className="mt-4 max-w-3xl text-slate-600 leading-7">{tool.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={isEnglish ? tool.href : `/en${tool.href}`} hrefLang={isEnglish ? 'zh-CN' : 'en'} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-100">
              {isEnglish ? '中文' : 'English'}
            </Link>
            <Link href={directoryHref} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-100">
              {isEnglish ? 'All tools' : '全部工具'}
            </Link>
          </div>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <ToolPanel tool={tool} locale={locale} />
        </div>
        <aside className="space-y-6">
          <AdSlot />
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-slate-600">
            <h2 className="text-lg font-semibold text-slate-900">{isEnglish ? 'Privacy and output' : '隐私与结果'}</h2>
            <p className="mt-4 text-sm leading-7">
              {isEnglish
                ? 'This tool produces real output. Text can be copied or downloaded, and generated files can be saved directly to your device.'
                : '本工具提供真实处理结果。文本结果可以复制或下载，生成的文件可以直接保存到本机。'}
            </p>
          </div>
        </aside>
      </section>

      <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
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
    </main>
  );
}
