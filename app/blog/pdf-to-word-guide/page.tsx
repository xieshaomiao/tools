import Link from 'next/link';
import { absoluteUrl } from '@/app/lib/site';

export const metadata = {
  title: 'PDF 转 Word 完整指南：文本型、扫描型、加密与排版问题 | Toolly',
  description: '先判断 PDF 是文本型、扫描型、加密还是复杂排版，再选择 Word 转换方法，解决不可编辑、乱码、空白和版式变化问题。',
  alternates: { canonical: '/blog/pdf-to-word-guide' },
};

const faqs = [
  {
    question: '为什么 PDF 转成 Word 后不能编辑文字？',
    answer: '源 PDF 很可能是扫描图片，没有可提取的文字层。此时 Word 中只能保留页面图像；需要真正编辑文字时，应先用 OCR 识别，再核对识别结果。',
  },
  {
    question: '为什么转换后排版和原 PDF 不一样？',
    answer: 'PDF 记录的是页面位置，Word 使用可流动段落。多栏、复杂表格、特殊字体和浮动图片转换为可编辑内容时容易重新排版。',
  },
  {
    question: '带密码的 PDF 可以直接转换吗？',
    answer: '只有在你拥有合法权限并知道密码时，才能先解除打开限制再转换。工具不能绕过未知密码或文档权限。',
  },
  {
    question: 'PDF 转 Word 时文件会上传吗？',
    answer: 'Toolly 优先在浏览器本地解析。浏览器无法处理时可启用兼容转换，文件会为本次任务发送到转换服务且不保存；敏感文件仍应遵守所在单位的处理规定。',
  },
];

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'PDF 转 Word 完整指南：文本型、扫描型、加密与排版问题',
  description: '先识别 PDF 类型，再选择可编辑文字或保留版式的正确转换路径。',
  inLanguage: 'zh-CN',
  datePublished: '2026-07-13',
  dateModified: '2026-07-13',
  author: { '@type': 'Organization', name: 'Toolly' },
  publisher: { '@type': 'Organization', name: 'Toolly' },
  mainEntityOfPage: absoluteUrl('/blog/pdf-to-word-guide'),
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

export default function PdfToWordGuidePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10 lg:px-8">
      {[articleJsonLd, faqJsonLd].map((value, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(value) }} />
      ))}

      <nav aria-label="面包屑导航" className="mb-6 flex flex-wrap gap-2 text-sm font-semibold text-slate-600">
        <Link href="/">首页</Link><span aria-hidden="true">/</span><Link href="/blog">使用指南</Link><span aria-hidden="true">/</span><span aria-current="page">PDF 转 Word</span>
      </nav>

      <article>
        <header className="rounded-[2rem] border border-rose-100 bg-gradient-to-br from-rose-50 to-white p-8 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-rose-700">文档转换</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">PDF 转 Word 完整指南</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            同样是 PDF，转换结果可能完全不同。先判断文件有没有文字层、是否加密以及排版是否复杂，再决定要“可编辑文字”还是“尽量保持原版式”，能避免大多数失败和误解。
          </p>
        </header>

        <div className="mt-10 space-y-8 text-slate-700">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">第一步：判断你的 PDF 属于哪一类</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ['文本型 PDF', '用鼠标可以选择并复制文字。适合提取成可编辑 Word，但表格和多栏仍可能重新排版。'],
                ['扫描型 PDF', '每页本质上是一张图片，无法选择文字。可先生成图片版 Word；若要编辑，需要 OCR。'],
                ['加密 PDF', '打开或复制内容需要密码。必须拥有权限并先正确解密，不能绕过未知密码。'],
                ['复杂排版 PDF', '包含多栏、表格、页眉页脚、特殊字体或浮动图片。应在可编辑性与版式保真之间取舍。'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-black text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-black text-slate-950">文本型 PDF 转 Word 的操作步骤</h2>
            <ol className="mt-6 space-y-5 leading-8">
              <li><strong className="text-slate-950">1. 保留源文件：</strong>复制一份 PDF，避免后续操作覆盖唯一原件。</li>
              <li><strong className="text-slate-950">2. 打开文档转换：</strong>选择 PDF 文件，并把输出格式设为 Word DOCX。</li>
              <li><strong className="text-slate-950">3. 开始转换：</strong>浏览器优先本地解析；如果无法解析，页面会尝试兼容转换。</li>
              <li><strong className="text-slate-950">4. 查看预览：</strong>先确认姓名、标题、日期、金额和段落顺序，再下载 DOCX。</li>
              <li><strong className="text-slate-950">5. 用 Word 复核：</strong>检查分页、表格、字体和图片位置，重要文档不要只看第一页。</li>
            </ol>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">扫描型、加密和复杂排版怎么处理</h2>
            <div className="mt-6 space-y-6 leading-8">
              <div><h3 className="font-black text-slate-950">扫描型：先判断是否必须编辑</h3><p className="mt-2">如果只需在 Word 中保存和阅读页面，图片版 Word 已经足够。如果需要搜索、复制或修改文字，应使用 OCR，再逐段校对人名、数字和专业术语。</p></div>
              <div><h3 className="font-black text-slate-950">加密：只处理你有权使用的文件</h3><p className="mt-2">知道密码并拥有权限时，可先在可信软件中解除打开限制，再上传解密后的副本。未知密码或禁止复制的文件不能通过转换工具绕过限制。</p></div>
              <div><h3 className="font-black text-slate-950">复杂排版：先确定优先级</h3><p className="mt-2">要修改文字时接受一定的重新排版；要保留视觉效果时，优先继续使用 PDF，或转成逐页图片/PPT 页面。不要期待 Word 同时做到完全可编辑和像素级还原。</p></div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-rose-200 bg-rose-50 p-8">
            <h2 className="text-2xl font-black text-slate-950">四种失败现象的快速定位</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead><tr className="border-b border-rose-200"><th className="p-3 text-slate-950">现象</th><th className="p-3 text-slate-950">常见原因</th><th className="p-3 text-slate-950">下一步</th></tr></thead>
                <tbody className="divide-y divide-rose-100">
                  <tr><td className="p-3">Word 只有图片</td><td className="p-3">扫描版、无文字层</td><td className="p-3">需要编辑时先做 OCR</td></tr>
                  <tr><td className="p-3">文字为空或乱码</td><td className="p-3">特殊字体、编码或文件损坏</td><td className="p-3">尝试兼容转换并核对原文</td></tr>
                  <tr><td className="p-3">无法打开 PDF</td><td className="p-3">加密、损坏或扩展名不符</td><td className="p-3">合法解密、重新下载或修复源文件</td></tr>
                  <tr><td className="p-3">表格和分栏错位</td><td className="p-3">PDF 固定坐标与 Word 流式排版差异</td><td className="p-3">手动调整，或改用 PDF/图片保版式</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8">
            <h2 className="text-2xl font-black text-slate-950">隐私边界</h2>
            <p className="mt-5 leading-8">Toolly 优先在当前浏览器处理文件；浏览器无法解析 PDF 时，兼容转换会为本次任务接收文件且不保存。即便如此，身份证件、未公开合同、医疗记录和客户资料仍应遵守单位规定。无法确认是否允许在线处理时，请使用脱敏副本或批准的离线软件。</p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">下载前的结果检查清单</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {['标题、姓名和日期完整', '金额、小数点和编号准确', '段落顺序和分页合理', '表格行列没有错位', '图片方向和清晰度正常', '生成文件可以重新打开'].map((item) => (
                <li key={item} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 font-semibold text-slate-700">✓ {item}</li>
              ))}
            </ul>
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
        <h2 className="text-2xl font-black">准备好后再开始转换</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">先确认文件类型和目标：需要编辑文字就选 Word，需要保留原版式就优先保留 PDF 或使用页面图片。</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/tools/pdf-convert" className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950">打开 PDF 转 Word</Link>
          <Link href="/blog/how-tool-pages-work" className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white">阅读安全使用流程</Link>
          <Link href="/tools/image-compress" className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white">压缩页面图片</Link>
        </div>
      </section>
    </main>
  );
}
