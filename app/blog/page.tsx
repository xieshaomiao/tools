import Link from 'next/link';

export const metadata = {
  title: 'Toolly 博客 | SEO 文章与在线工具指南',
  description: '阅读 Toolly 在线工具使用指南，学习 PDF 文档转换、JSON 处理、图片优化、SEO 页面建设和浏览器本地处理技巧。',
  alternates: { canonical: '/blog' },
};

const articles = [
  {
    title: '什么是 JSON？',
    description: '了解 JSON 的定义、用途与示例，适合前端开发和内容创作。',
    href: '/blog/what-is-json',
  },
  {
    title: '如何通过工具页提升流量？',
    description: '学习如何使用在线工具页面吸引长尾关键词和提升广告点击率。',
    href: '/blog/how-tool-pages-work',
  },
  {
    title: '移动 App 下载页优化技巧',
    description: '为 iOS 和 Android 下载页面设计高转化结构，增加移动端留存。',
    href: '/blog/app-download-seo',
  },
];

export default function BlogPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10 lg:px-8">
      <header className="mb-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">博客</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">SEO 文章与工具指南</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          专注于在线工具、内容优化和移动 App 下载的实用文章，帮助你提升网站流量与广告收益。
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-slate-900 hover:shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-slate-900 group-hover:text-slate-800">{article.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{article.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">App 下载推荐</h2>
        <p className="mt-4 text-slate-600 leading-7">
          想在手机上快速访问 Toolly？请访问我们的 App 下载页面，了解 iOS 和安卓版本的下载入口。
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/download"
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            访问下载页
          </Link>
        </div>
      </div>
    </main>
  );
}
