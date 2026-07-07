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
  const normalized = normalizeText(text)
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*([，。！？；：,.!?;:])\s*/g, '$1')
    .replace(/[!！]{2,}/g, '！')
    .replace(/[?？]{2,}/g, '？')
    .trim();
  if (!normalized) return '请输入文案以润色。';
  const sentences = normalized.split(/(?<=[。！？.!?])/).map((item) => item.trim()).filter(Boolean);
  const polished = sentences
    .map((sentence) => sentence
      .replace(/非常非常|特别特别/g, '非常')
      .replace(/能够/g, '能')
      .replace(/进行/g, '')
      .replace(/在这里/g, '')
      .trim())
    .join('');
  return `润色版本\n${polished}\n\n优化说明\n• 已清理多余空格和重复标点\n• 已精简常见冗余表达\n• 保留原意，建议发布前结合品牌语气复核`;
}

export async function translateText(text: string, target: 'zh' | 'en') {
  const normalized = normalizeText(text).trim();
  if (!normalized) return '请输入文本以翻译。';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const params = new URLSearchParams({
      client: 'gtx',
      sl: 'auto',
      tl: target,
      dt: 't',
      q: normalized,
    });
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Toolly/1.0' },
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Translation request failed');
    const data = await response.json() as unknown;
    if (!Array.isArray(data) || !Array.isArray(data[0])) throw new Error('Unexpected translation response');
    const translated = data[0]
      .map((part) => Array.isArray(part) && typeof part[0] === 'string' ? part[0] : '')
      .join('')
      .trim();
    return translated || '翻译服务暂时不可用，请稍后重试。';
  } catch {
    return '翻译服务暂时不可用，请稍后重试。';
  } finally {
    clearTimeout(timeout);
  }
}
