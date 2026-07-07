import { notFound } from 'next/navigation';
import ToolPageView from '@/app/components/ToolPageView';
import { toolList, toolMap } from '@/app/tools/toolConfig';
import { getLocalizedTool } from '@/app/tools/toolContent';

export function generateStaticParams() {
  return toolList.map((tool) => ({ toolKey: tool.toolKey }));
}

type ToolPageProps = { params: Promise<{ toolKey: string }> };

export async function generateMetadata({ params }: ToolPageProps) {
  const { toolKey } = await params;
  const sourceTool = toolMap.get(toolKey);
  if (!sourceTool) {
    return {
      title: 'Tool not found - Toolly',
      description: 'The requested Toolly utility does not exist.',
      robots: { index: false, follow: false },
    };
  }
  const tool = getLocalizedTool(sourceTool, 'en');
  const seoDescription = `${tool.description} ${tool.example}`.slice(0, 160);
  return {
    title: `${tool.title} | Free Online ${tool.badge} - Toolly`,
    description: seoDescription,
    keywords: [...tool.keywords, 'free online tool', 'Toolly'],
    alternates: {
      canonical: tool.localHref,
      languages: { 'zh-CN': tool.href, en: tool.localHref, 'x-default': tool.href },
    },
    openGraph: { type: 'website', locale: 'en_US', title: `${tool.title} | Toolly`, description: seoDescription, url: tool.localHref },
  };
}

export default async function EnglishToolPage({ params }: ToolPageProps) {
  const { toolKey } = await params;
  const sourceTool = toolMap.get(toolKey);
  if (!sourceTool) notFound();
  return <ToolPageView tool={getLocalizedTool(sourceTool, 'en')} locale="en" />;
}
