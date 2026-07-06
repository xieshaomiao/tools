import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdSlot from '@/app/components/AdSlot';
import ToolPanel from '@/app/components/ToolPanel';
import { toolList, toolMap } from '@/app/tools/toolConfig';

export function generateStaticParams() {
  return toolList.map((tool) => ({ toolKey: tool.toolKey }));
}

type ToolPageProps = {
  params: Promise<{ toolKey: string }>;
};

export async function generateMetadata({ params }: ToolPageProps) {
  const { toolKey } = await params;
  const tool = toolMap.get(toolKey);
  if (!tool) {
    return {
      title: '工具未找到 - Toolly',
      description: '所请求的工具页面不存在。返回首页查看可用工具列表。',
    };
  }

  return {
    title: `${tool.title} | Toolly`,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { toolKey } = await params;
  const tool = toolMap.get(toolKey);
  if (!tool) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10 lg:px-8">
      <header className="mb-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">{tool.badge}</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">{tool.title}</h1>
            <p className="mt-4 max-w-2xl text-slate-600 leading-7">{tool.description}</p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-100"
          >
            返回首页
          </Link>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <ToolPanel tool={tool} />
        </div>

        <aside className="space-y-6">
          <AdSlot />
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-slate-600">
            <h2 className="text-lg font-semibold text-slate-900">工具页提示</h2>
            <p className="mt-4 text-sm leading-7">
              本页面已支持动态工具渲染，可在后台继续拓展真实功能与广告位展示。 
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
