import { ToolMeta } from '@/app/tools/toolConfig';
import { getLocalizedTool, LocalizedTool } from '@/app/tools/toolContent';

type SearchIntent = {
  label: string;
  query: string;
};

export const zhPopularSearches: SearchIntent[] = [
  { label: 'Word 转 PDF', query: 'pdf' },
  { label: '图片压缩', query: '图片' },
  { label: 'JSON / CSV', query: 'json' },
  { label: '二维码', query: '二维码' },
  { label: '人民币大写', query: '人民币' },
  { label: '正则表达式', query: '正则' },
];

export const enPopularSearches: SearchIntent[] = [
  { label: 'Word to PDF', query: 'pdf' },
  { label: 'Compress image', query: 'image' },
  { label: 'JSON / CSV', query: 'json' },
  { label: 'QR code', query: 'qr' },
  { label: 'RMB uppercase', query: 'rmb' },
  { label: 'Regex', query: 'regex' },
];

export function groupLocalizedTools(tools: LocalizedTool[]) {
  return Array.from(
    tools.reduce((map, tool) => {
      const current = map.get(tool.category) ?? [];
      current.push(tool);
      map.set(tool.category, current);
      return map;
    }, new Map<string, LocalizedTool[]>()),
  );
}

export function categorySummary(tools: ToolMeta[], locale: 'zh-CN' | 'en') {
  const counts = tools.reduce((map, tool) => {
    const category = locale === 'en' ? getLocalizedTool(tool, 'en').category : tool.category;
    map.set(category, (map.get(category) ?? 0) + 1);
    return map;
  }, new Map<string, number>());

  return Array.from(counts.entries()).map(([category, count]) => ({
    category,
    count,
    label: locale === 'en' ? `${category} (${count})` : `${category}（${count}）`,
  }));
}
