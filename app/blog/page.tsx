import Link from 'next/link';

export const metadata = {
  title: 'Toolly 使用指南 | PDF、JSON 与在线工具安全实践',
  description: '阅读 Toolly 原创使用指南，解决 PDF 转 Word、JSON 格式错误、在线工具隐私与结果检查等常见问题。',
  alternates: { canonical: '/blog' },
};

const articles = [
  {
    title: 'PDF 转 Word 完整指南：先判断 PDF 类型',
    description: '区分文本型、扫描型、加密和复杂排版 PDF，选择合适的转换方式，并检查 Word 是否真的可编辑。',
    href: '/blog/pdf-to-word-guide',
    tag: '文档转换',
  },
  {
    title: 'JSON 入门与格式错误排查',
    description: '用可复制示例理解对象与数组，逐步定位双引号、尾随逗号、转义字符等常见错误。',
    href: '/blog/what-is-json',
    tag: '开发调试',
  },
  {
    title: '如何安全使用在线工具',
    description: '从选择任务、判断隐私边界到核对并下载结果，建立一套适用于文件、图片和文本工具的检查流程。',
    href: '/blog/how-tool-pages-work',
    tag: '使用方法',
  },
];

export default function BlogPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10 lg:px-8">
      <header className="mb-10 rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">Toolly 指南</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">把文件和数据处理结果做对</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          这里记录普通用户真正会遇到的操作问题：为什么 PDF 转出的 Word 不能编辑、JSON 为什么报错，以及使用在线工具前应该如何判断隐私边界。
        </p>
      </header>

      <section aria-labelledby="guide-list-heading">
        <h2 id="guide-list-heading" className="sr-only">全部使用指南</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="group flex min-h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{article.tag}</span>
              <h2 className="mt-5 text-2xl font-black leading-9 text-slate-950 group-hover:text-blue-700">{article.title}</h2>
              <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{article.description}</p>
              <span className="mt-6 text-sm font-black text-blue-700">阅读指南 →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl">
        <h2 className="text-2xl font-black">有明确任务时，直接进入工具</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">
          选择与任务匹配的工具，按页面提示处理，再核对预览或下载文件。重要合同、财务资料和身份证件应先确认所在单位的文件处理要求。
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/tools/pdf-convert" className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50">
            打开文档转换
          </Link>
          <Link href="/tools" className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10">
            查看全部工具
          </Link>
        </div>
      </section>
    </main>
  );
}
