export function normalizeText(text: string) {
  return text.normalize ? text.normalize('NFC') : text;
}

export function extractKeywords(text: string) {
  const stopwords = new Set([
    'the', 'and', 'for', 'with', 'that', 'this', 'from', 'your', 'have', 'are', 'was', 'were', 'about',
    '在', '的', '和', '是', '与', '于', '我们', '一个', '可以', '了', '为', '这', '中', '其', '也', '有', '内容',
  ]);
  const words = Array.from(normalizeText(text).toLowerCase().match(/[-\u4e00-\u9fff]+/g) || [])
    .map((item) => item.trim())
    .filter(Boolean);
  const freq = new Map<string, number>();
  words.forEach((word) => {
    if (word.length < 2 || stopwords.has(word)) return;
    freq.set(word, (freq.get(word) ?? 0) + 1);
  });
  return Array.from(freq.entries()).sort((a, b) => b[1] - a[1]).slice(0, 12);
}

export function generateSeoTitle(text: string) {
  const normalized = normalizeText(text).replace(/\s+/g, ' ').trim();
  const snippet = normalized.split(/[.。！？!?]/)[0] || normalized;
  const title = snippet.slice(0, 60).trim();
  return title ? `${title} - Toolly 免费 SEO 优化` : 'Toolly 免费 SEO 标题生成器';
}

export function summarizeText(text: string) {
  const normalized = normalizeText(text).replace(/\s+/g, ' ').trim();
  if (!normalized) return '请输入文本以生成摘要。';
  const sentences = normalized.split(/(?<=[。！？.!?])\s*/).filter(Boolean);
  return sentences.slice(0, 2).join(' ').slice(0, 180);
}

export function polishCopy(text: string) {
  const normalized = normalizeText(text).replace(/\s+/g, ' ').trim();
  if (!normalized) return '请输入文案以润色。';
  return `${normalized} — 已优化为更简洁、吸引用户的文案，占位演示结果。`;
}

export function translateText(text: string, target: 'zh' | 'en') {
  const normalized = normalizeText(text).trim();
  if (!normalized) return '请输入文本以翻译。';
  if (target === 'zh') {
    return `【后端翻译演示】${normalized} -> 这里显示中文翻译结果。`;
  }
  return `【后端翻译演示】${normalized} -> This is the English translation placeholder.`;
}
