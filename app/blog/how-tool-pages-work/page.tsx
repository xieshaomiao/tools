import Link from 'next/link';
import { absoluteUrl } from '@/app/lib/site';

export const metadata = {
  title: '如何安全使用在线工具：从选择工具到下载结果 | Toolly',
  description: '一套适用于文档、图片、文本和开发工具的实用流程：判断任务、确认隐私边界、检查输入、核对结果并安全下载。',
  alternates: { canonical: '/blog/how-tool-pages-work' },
};

const faqs = [
  {
    question: '在线工具处理结果可以直接使用吗？',
    answer: '不建议跳过检查。格式转换可能改变分页、字体和表格，文本工具也可能受输入格式影响。下载前应先查看预览，并抽查标题、数字、日期和关键段落。',
  },
  {
    question: '哪些文件不适合放进在线工具？',
    answer: '如果文件包含身份证号、未公开合同、医疗记录、客户名单或单位机密，应先遵守所在单位的安全规定。无法确认处理边界时，不要上传或粘贴敏感内容。',
  },
  {
    question: '本地处理是什么意思？',
    answer: '本地处理表示计算主要在当前浏览器内完成，原始内容通常无需发送到服务器。个别需要在线服务或兼容转换的功能会在页面中另行说明。',
  },
  {
    question: '下载文件打不开怎么办？',
    answer: '先确认文件扩展名与目标格式一致，再换用最新版办公软件打开。如果源文件损坏、带密码或格式过旧，应先修复、解密或另存为新格式后重试。',
  },
];

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '如何安全使用在线工具：从选择工具到下载结果',
  description: '一套适用于文档、图片、文本和开发工具的任务检查流程。',
  inLanguage: 'zh-CN',
  datePublished: '2026-07-13',
  dateModified: '2026-07-13',
  author: { '@type': 'Organization', name: 'Toolly' },
  publisher: { '@type': 'Organization', name: 'Toolly' },
  mainEntityOfPage: absoluteUrl('/blog/how-tool-pages-work'),
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

export default function SafeOnlineToolsGuide() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10 lg:px-8">
      {[articleJsonLd, faqJsonLd].map((value, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(value) }} />
      ))}

      <nav aria-label="面包屑导航" className="mb-6 flex flex-wrap gap-2 text-sm font-semibold text-slate-600">
        <Link href="/">首页</Link><span aria-hidden="true">/</span><Link href="/blog">使用指南</Link><span aria-hidden="true">/</span><span aria-current="page">安全使用在线工具</span>
      </nav>

      <article>
        <header className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700">使用方法</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">如何安全使用在线工具</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            在线工具适合快速完成格式转换、图片处理和文本整理，但“按钮能点”不等于“结果一定正确”。下面这套流程帮助你在几分钟内判断工具是否适合当前任务，并把可用结果安全带走。
          </p>
        </header>

        <div className="mt-10 space-y-8 text-slate-700">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">开始前先回答三个问题</h2>
            <ol className="mt-6 space-y-5 leading-8">
              <li><strong className="text-slate-950">1. 需要什么结果？</strong> 明确是可编辑 Word、可复制文本、压缩图片，还是只需保持原版式的 PDF。目标不同，正确工具也不同。</li>
              <li><strong className="text-slate-950">2. 内容是否敏感？</strong> 身份证件、客户资料、未公开合同和医疗记录不应在处理边界不明时上传。</li>
              <li><strong className="text-slate-950">3. 能否检查结果？</strong> 保留源文件副本，并预留时间核对数字、日期、分页、表格和图片。</li>
            </ol>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-black text-slate-950">通用五步流程</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ['选择准确工具', '按任务词查找，例如“PDF 转 Word”“图片压缩”或“JSON 格式化”，不要只按文件扩展名猜。'],
                ['准备源内容', '复制一份源文件；遇到旧版 DOC、XLS、PPT 时，先在办公软件中另存为新格式。'],
                ['确认处理边界', '阅读页面隐私说明，区分浏览器本地处理、在线服务和兼容转换。'],
                ['执行并查看预览', '先用小文件或非敏感样本验证流程，再处理正式内容。'],
                ['下载后复核', '打开生成文件，检查关键字段；确认无误后再分享、打印或导入其他系统。'],
              ].map(([title, text], index) => (
                <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                  <p className="text-sm font-black text-blue-700">步骤 {index + 1}</p>
                  <h3 className="mt-2 text-lg font-black text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">四类常见错误及处理方式</h2>
            <div className="mt-6 space-y-5 leading-8">
              <p><strong className="text-slate-950">文件无法识别：</strong>检查文件是否完整、扩展名是否真实，旧格式先另存为 DOCX、XLSX 或 PPTX。</p>
              <p><strong className="text-slate-950">结果排版变化：</strong>格式转换不保证像素级还原。若重点是保留视觉版式，可优先输出 PDF 或逐页图片；若重点是编辑文字，再选择 Word。</p>
              <p><strong className="text-slate-950">文字乱码或缺字：</strong>源文件可能使用嵌入字体、特殊编码或没有文字层。尝试兼容转换，并对关键段落逐项核对。</p>
              <p><strong className="text-slate-950">页面一直处理中：</strong>先减小文件体积、保持页面开启并检查网络。刷新前保留源文件，避免重复提交同一任务。</p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8">
            <h2 className="text-2xl font-black text-slate-950">隐私边界：本地优先不等于无需判断</h2>
            <p className="mt-5 leading-8 text-slate-700">
              图片、文本和部分文档任务可以在浏览器中完成；翻译或 PDF 兼容转换等功能可能需要在线服务。页面说明是第一层判断，所在单位的保密规则是更高优先级。无法确认时，使用脱敏副本，或改用单位批准的离线软件。
            </p>
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
        <h2 className="text-2xl font-black">从一个可核对的任务开始</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">先用不含敏感信息的小样本走完整流程，确认预览、复制和下载都符合预期。</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/tools" className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950">查看全部工具</Link>
          <Link href="/blog/pdf-to-word-guide" className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white">阅读 PDF 转 Word 指南</Link>
          <Link href="/tools/image-compress" className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white">打开图片压缩</Link>
        </div>
      </section>
    </main>
  );
}
