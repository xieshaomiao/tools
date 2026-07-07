import Link from 'next/link';
import { toolList } from '@/app/tools/toolConfig';

export const metadata = {
  title: 'Toolly 工具目录 | 在线工具聚合',
  description: '浏览 Toolly 的全部免费在线工具，包括 PDF 文档互转、JSON CSV、图片压缩、二维码、正则和人民币大写等。',
  alternates: { canonical: '/tools' },
};

export default function ToolsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10 lg:px-8">
      <header className="mb-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">工具目录</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{toolList.length} 个实用工具，一站式访问</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Toolly 覆盖文档互转、图片处理、中文办公、内容优化和开发辅助。所有工具均可直接使用，结果支持复制或下载。
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {toolList.map((tool) => (
          <Link
            key={tool.toolKey}
            href={tool.href}
            className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-900 hover:shadow-xl"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {tool.badge}
              </p>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">访问工具</span>
            </div>
            <h2 className="mt-5 text-xl font-semibold text-slate-900 group-hover:text-slate-800">{tool.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{tool.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm text-slate-600">
        <h2 className="text-2xl font-semibold text-slate-900">如何使用 Toolly</h2>
        <ul className="mt-5 space-y-3 leading-7">
          <li>• 点击任意工具卡进入功能页面，查看说明、交互和广告位布局。</li>
          <li>• 移动端可访问下载页，未来支持 iOS/Android App 一键下载入口。</li>
          <li>• 文章与工具页结合，提升长尾流量、广告曝光和停留时间。</li>
        </ul>
      </div>
    </main>
  );
}
