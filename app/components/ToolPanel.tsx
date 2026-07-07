'use client';

import { useEffect, useMemo, useState } from 'react';
import DocumentConverterPanel from '@/app/components/DocumentConverterPanel';
import { ToolMeta } from '@/app/tools/toolConfig';
import {
  convertJsonCsv,
  convertYamlJson,
  decodeJwt,
  generateHash,
  generateUuids,
  numberToChineseRmb,
  testRegex,
} from '@/app/lib/utility-tools';

const loremParagraph =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.';

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function countParagraphs(text: string): number {
  return text.trim() ? text.trim().split(/\n{2,}/).filter(Boolean).length : 0;
}

function formatMarkdownToHtml(markdown: string) {
  return markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    .replace(/\n/g, '<br />');
}

function compressHtml(html: string) {
  return html.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
}

function generateLorem(length: number) {
  return Array.from({ length }, () => loremParagraph).join('\n\n');
}

function normalizeText(text: string) {
  return text.normalize ? text.normalize('NFC') : text;
}

function encodeBase64(text: string) {
  try {
    const uint8Array = new TextEncoder().encode(text);
    let binary = '';
    uint8Array.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  } catch {
    return 'Base64 编码失败';
  }
}

function decodeBase64(text: string) {
  try {
    const binary = atob(text);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return '无效 Base64 文本';
  }
}

function formatDate(timestamp: string) {
  const value = Number(timestamp);
  if (!Number.isNaN(value)) {
    const date = new Date(value * 1000);
    return date.toISOString();
  }
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? '无效日期格式' : Math.floor(date.getTime() / 1000).toString();
}

function urlEncode(text: string) {
  return encodeURIComponent(normalizeText(text));
}

function urlDecode(text: string) {
  try {
    return decodeURIComponent(text);
  } catch {
    return '无效 URL 编码内容';
  }
}

function extractKeywords(text: string) {
  const stopwords = new Set([
    'the', 'and', 'for', 'with', 'that', 'this', 'from', 'your', 'have', 'are', 'was', 'were', 'about',
    '在', '的', '和', '是', '与', '于', '我们', '一个', '可以', '了', '为', '这', '中', '其', '也', '有', '内容',
  ]);
  const normalized = text.toLowerCase();
  const latinWords = normalized.match(/[a-z0-9]+/g) || [];
  const chineseWords = typeof Intl.Segmenter === 'function'
    ? Array.from(new Intl.Segmenter('zh', { granularity: 'word' }).segment(normalized))
      .filter((item) => item.isWordLike && /[\u4e00-\u9fff]/.test(item.segment))
      .map((item) => item.segment)
    : normalized.match(/[\u4e00-\u9fff]{2,4}/g) || [];
  const words = [...latinWords, ...chineseWords].map((item) => item.trim()).filter(Boolean);
  const freq = new Map<string, number>();
  words.forEach((word) => {
    if (word.length < 2 || stopwords.has(word)) return;
    freq.set(word, (freq.get(word) ?? 0) + 1);
  });
  return Array.from(freq.entries()).sort((a, b) => b[1] - a[1]).slice(0, 12);
}

function generateSeoTitle(text: string) {
  const normalized = normalizeText(text).replace(/\s+/g, ' ').trim();
  const snippet = normalized.split(/[.。！？]/)[0] || normalized;
  const title = snippet.slice(0, 60).trim();
  return title ? `${title} - Toolly 免费 SEO 优化` : 'Toolly 免费 SEO 标题生成器';
}

function summarizeText(text: string) {
  const normalized = normalizeText(text).replace(/\s+/g, ' ').trim();
  if (!normalized) return '请输入文本以生成摘要。';
  const sentences = normalized.split(/(?<=[。！？.!?])\s*/).filter(Boolean);
  return sentences.slice(0, 2).join(' ');
}

async function translateText(text: string, target: string) {
  const normalized = normalizeText(text);
  if (!normalized.trim()) return '请输入文本以翻译。';

  try {
    const response = await fetch('/api/seo/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: normalized, target }),
    });
    const data = await response.json();
    return data.translatedText || '翻译服务暂时不可用，请稍后重试。';
  } catch {
    return '翻译服务暂时不可用，请稍后重试。';
  }
}

function polishCopy(text: string) {
  const normalized = normalizeText(text)
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*([，。！？；：,.!?;:])\s*/g, '$1')
    .replace(/[!！]{2,}/g, '！')
    .replace(/[?？]{2,}/g, '？')
    .trim();
  if (!normalized.trim()) return '请输入文案以润色。';
  const polished = normalized
    .replace(/非常非常|特别特别/g, '非常')
    .replace(/能够/g, '能')
    .replace(/进行/g, '');
  return `润色版本\n${polished}\n\n优化说明\n• 已清理多余空格和重复标点\n• 已精简常见冗余表达\n• 保留原意，建议发布前结合品牌语气复核`;
}

function capitalizeText(text: string) {
  return text
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function randomPassword(length: number, useSymbols: boolean) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  const chars = letters + letters.toUpperCase() + digits + (useSymbols ? symbols : '');
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function hexToRgb(hex: string) {
  hex = hex.replace('#', '').trim();
  if (!/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) return '无效 HEX';
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHex(rgb: string) {
  const match = rgb.match(/(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})/);
  if (!match) return '无效 RGB';
  const [, r, g, b] = match.map(Number);
  if ([r, g, b].some((value) => value < 0 || value > 255)) return '无效 RGB';
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function diffText(a: string, b: string) {
  const aLines = a.trim().split('\n');
  const bLines = b.trim().split('\n');
  const max = Math.max(aLines.length, bLines.length);
  return Array.from({ length: max }).map((_, index) => ({
    a: aLines[index] ?? '',
    b: bLines[index] ?? '',
    same: aLines[index] === bLines[index],
  }));
}

function resultFileName(toolKey: string, option = '') {
  const extensions: Record<string, string> = {
    'json-format': 'json',
    'markdown-html': 'html',
    'html-compress': 'html',
    'json-csv': option === 'csv-to-json' ? 'json' : 'csv',
    'yaml-json': option === 'json-to-yaml' ? 'yaml' : 'json',
  };
  return `toolly-${toolKey}.${extensions[toolKey] ?? 'txt'}`;
}

function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function compressImage(file: File) {
  const bitmap = await createImageBitmap(file);
  const maxDimension = 2400;
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('浏览器暂不支持图片压缩。');
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const type = 'image/webp';
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.76));
  if (!blob) throw new Error('图片压缩失败，请更换图片后重试。');
  return { blob, fileName: `${file.name.replace(/\.[^.]+$/, '')}-compressed.webp`, width, height };
}

async function convertImageFormat(file: File, target: 'png' | 'jpeg' | 'webp') {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('浏览器暂不支持图片转换。');
  if (target === 'jpeg') {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  const mimeType = `image/${target}`;
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, mimeType, 0.9));
  if (!blob) throw new Error('图片转换失败，请更换图片后重试。');
  const extension = target === 'jpeg' ? 'jpg' : target;
  return { blob, fileName: `${file.name.replace(/\.[^.]+$/, '')}.${extension}`, width: canvas.width, height: canvas.height };
}

export default function ToolPanel({ tool }: { tool: ToolMeta }) {
  if (tool.toolKey === 'pdf-convert') return <DocumentConverterPanel tool={tool} />;
  return <StandardToolPanel tool={tool} />;
}

function StandardToolPanel({ tool }: { tool: ToolMeta }) {
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [output, setOutput] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [passwordLength, setPasswordLength] = useState(16);
  const [useSymbols, setUseSymbols] = useState(true);
  const [fileName, setFileName] = useState('未选择文件');
  const [fileSizeKB, setFileSizeKB] = useState(0);
  const [fileInfo, setFileInfo] = useState('请上传文件以查看预估信息。');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [downloadName, setDownloadName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [qrValue, setQrValue] = useState('输入文本后生成二维码占位。');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [uuidCount, setUuidCount] = useState(5);
  const [imageTarget, setImageTarget] = useState<'png' | 'jpeg' | 'webp'>('webp');
  const [translateTarget, setTranslateTarget] = useState<'zh' | 'en'>('zh');
  const [isMember, setIsMember] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const wordStats = useMemo(() => ({

    chars: valueA.length,
    words: countWords(valueA),
    paragraphs: countParagraphs(valueA),
    readingTime: Math.max(1, Math.round(countWords(valueA) / 200)),
  }), [valueA]);

  const handleCopy = async (text: string) => {
    if (!text) {
      setCopyMessage('暂无可复制结果');
      return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    let copied = document.execCommand('copy');
    textarea.remove();
    if (!copied && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        copied = false;
      }
    }
    setCopyMessage(copied ? '已复制到剪贴板' : '复制失败，请长按结果手动复制');
    setTimeout(() => setCopyMessage(''), 2000);
  };

  const handleDownload = () => {
    if (downloadBlob && downloadName) {
      triggerDownload(downloadBlob, downloadName);
      return;
    }
    if (!output) {
      setCopyMessage('请先生成结果');
      setTimeout(() => setCopyMessage(''), 2000);
      return;
    }
    triggerDownload(new Blob([output], { type: 'text/plain;charset=utf-8' }), resultFileName(tool.toolKey, valueB));
  };

  useEffect(() => {
    if (!tool.premium) {
      setAuthLoading(false);
      return;
    }
    async function loadAuthStatus() {
      try {
        const response = await fetch('/api/auth/status');
        if (!response.ok) return;
        const data = await response.json();
        setIsMember(data.isMember);
      } catch {
        // Keep guest state when status lookup fails.
      } finally {
        setAuthLoading(false);
      }
    }

    loadAuthStatus();
  }, [tool.premium]);

  const handleAction = async () => {
    setCopyMessage('');
    setDownloadBlob(null);
    setDownloadName('');
    if (tool.premium && !authLoading && !isMember) {
      setOutput('该工具仅限会员使用，请登录并升级会员后再试。');
      return;
    }

    if (tool.toolKey === 'json-format') {
      try {
        const parsed = JSON.parse(valueA);
        setOutput(JSON.stringify(parsed, null, 2));
      } catch {
        setOutput('JSON 语法错误，请检查输入内容。');
      }
      return;
    }

    if (tool.toolKey === 'json-csv') {
      try {
        setOutput(convertJsonCsv(valueA, valueB === 'csv-to-json' ? 'csv-to-json' : 'json-to-csv'));
      } catch (error) {
        setOutput(error instanceof Error ? error.message : 'JSON / CSV 转换失败，请检查输入。');
      }
      return;
    }

    if (tool.toolKey === 'yaml-json') {
      setIsProcessing(true);
      try {
        setOutput(await convertYamlJson(valueA, valueB === 'json-to-yaml' ? 'json-to-yaml' : 'yaml-to-json'));
      } catch (error) {
        setOutput(error instanceof Error ? error.message : 'YAML / JSON 转换失败，请检查语法。');
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    if (tool.toolKey === 'uuid-generator') {
      setOutput(generateUuids(uuidCount));
      return;
    }

    if (tool.toolKey === 'jwt-decoder') {
      try {
        setOutput(decodeJwt(valueA));
      } catch (error) {
        setOutput(error instanceof Error ? error.message : 'JWT 解码失败。');
      }
      return;
    }

    if (tool.toolKey === 'regex-tester') {
      try {
        setOutput(testRegex(valueA, valueB));
      } catch (error) {
        setOutput(error instanceof Error ? `正则表达式错误：${error.message}` : '正则表达式无效。');
      }
      return;
    }

    if (tool.toolKey === 'hash-generator') {
      setIsProcessing(true);
      try {
        setOutput(await generateHash(valueA, valueB === 'SHA-512' ? 'SHA-512' : 'SHA-256'));
      } catch {
        setOutput('哈希生成失败，请更换浏览器后重试。');
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    if (tool.toolKey === 'rmb-uppercase') {
      try {
        setOutput(numberToChineseRmb(valueA));
      } catch (error) {
        setOutput(error instanceof Error ? error.message : '金额转换失败。');
      }
      return;
    }

    if (tool.toolKey === 'word-count') {
      setOutput(`字符数：${wordStats.chars}\n单词数：${wordStats.words}\n段落数：${wordStats.paragraphs}\n阅读时间：约 ${wordStats.readingTime} 分钟`);
      return;
    }

    if (tool.toolKey === 'base64') {
      setOutput(valueB === 'decode' ? decodeBase64(valueA) : encodeBase64(valueA));
      return;
    }

    if (tool.toolKey === 'timestamp') {
      setOutput(formatDate(valueA));
      return;
    }

    if (tool.toolKey === 'keyword-extract') {
      if (!valueA.trim()) {
        setOutput('请输入文本以提取关键词。');
        return;
      }
      const keywords = extractKeywords(valueA);
      if (!keywords.length) {
        setOutput('未能提取关键词，请输入更完整的内容。');
        return;
      }
      setOutput(
        ['关键词 | 出现次数', '--------------------------', ...keywords.map(([word, count]) => `${word} | ${count}`)].join('\n')
      );
      return;
    }

    if (tool.toolKey === 'seo-title-generator') {
      if (!valueA.trim()) {
        setOutput('请输入文本以生成 SEO 标题。');
        return;
      }
      setOutput(generateSeoTitle(valueA));
      return;
    }

    if (tool.toolKey === 'text-translate') {
      const translated = await translateText(valueA, translateTarget);
      setOutput(translated);
      return;
    }

    if (tool.toolKey === 'copywriting-polish') {
      setOutput(polishCopy(valueA));
      return;
    }

    if (tool.toolKey === 'content-summarizer') {
      setOutput(summarizeText(valueA));
      return;
    }

    if (tool.toolKey === 'url-encode') {
      setOutput(valueB === 'decode' ? urlDecode(valueA) : urlEncode(valueA));
      return;
    }

    if (tool.toolKey === 'password-generator') {
      setOutput(randomPassword(passwordLength, useSymbols));
      return;
    }

    if (tool.toolKey === 'color-convert') {
      if (valueA.includes('rgb')) {
        setOutput(rgbToHex(valueA));
      } else {
        setOutput(hexToRgb(valueA));
      }
      return;
    }

    if (tool.toolKey === 'markdown-html') {
      setOutput(formatMarkdownToHtml(valueA));
      return;
    }

    if (tool.toolKey === 'text-diff') {
      const compared = diffText(valueA, valueB);
      setOutput(compared.map((item, index) => `第 ${index + 1} 行\nA: ${item.a}\nB: ${item.b}\n是否相同：${item.same ? '是' : '否'}\n`).join('\n'));
      return;
    }

    if (tool.toolKey === 'text-case') {
      setOutput(valueB === 'upper' ? valueA.toUpperCase() : valueB === 'lower' ? valueA.toLowerCase() : capitalizeText(valueA));
      return;
    }

    if (tool.toolKey === 'lorem-ipsum') {
      const count = Math.min(Math.max(Number(valueB) || 2, 1), 20);
      setOutput(generateLorem(count));
      return;
    }

    if (tool.toolKey === 'html-compress') {
      setOutput(compressHtml(valueA));
      return;
    }

    if (tool.toolKey === 'qr-code') {
      if (!valueA.trim()) {
        setOutput('请输入需要生成二维码的文本或网址。');
        return;
      }
      setIsProcessing(true);
      try {
        const QRCode = await import('qrcode');
        const dataUrl = await QRCode.toDataURL(valueA, { width: 720, margin: 2, errorCorrectionLevel: 'M' });
        const blob = await (await fetch(dataUrl)).blob();
        setQrValue(valueA);
        setQrDataUrl(dataUrl);
        setDownloadBlob(blob);
        setDownloadName('toolly-qr-code.png');
        setOutput(valueA);
      } catch {
        setOutput('二维码生成失败，请稍后重试。');
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    if (tool.toolKey === 'image-compress') {
      if (!selectedFile) {
        setOutput('请先选择图片文件。');
        return;
      }
      setIsProcessing(true);
      try {
        const compressed = await compressImage(selectedFile);
        const compressedKB = Math.max(Math.round(compressed.blob.size / 1024), 1);
        setFileInfo(`压缩完成：${compressed.width} × ${compressed.height}，${fileSizeKB} KB → ${compressedKB} KB`);
        setOutput(`图片压缩完成\n原始文件：${fileName}\n原始大小：${fileSizeKB} KB\n压缩后：${compressedKB} KB\n尺寸：${compressed.width} × ${compressed.height}`);
        setDownloadBlob(compressed.blob);
        setDownloadName(compressed.fileName);
      } catch (error) {
        setOutput(error instanceof Error ? error.message : '图片压缩失败，请更换图片后重试。');
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    if (tool.toolKey === 'image-convert') {
      if (!selectedFile) {
        setOutput('请先选择图片文件。');
        return;
      }
      setIsProcessing(true);
      try {
        const converted = await convertImageFormat(selectedFile, imageTarget);
        const sizeKB = Math.max(Math.round(converted.blob.size / 1024), 1);
        setFileInfo(`转换完成：${converted.width} × ${converted.height}，输出约 ${sizeKB} KB`);
        setOutput(`图片格式转换完成\n原始文件：${fileName}\n目标格式：${imageTarget === 'jpeg' ? 'JPG' : imageTarget.toUpperCase()}\n输出大小：${sizeKB} KB\n尺寸：${converted.width} × ${converted.height}`);
        setDownloadBlob(converted.blob);
        setDownloadName(converted.fileName);
      } catch (error) {
        setOutput(error instanceof Error ? error.message : '图片格式转换失败。');
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    setOutput('此工具当前为占位页，可继续扩展为完整功能。');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (['image-compress', 'image-convert'].includes(tool.toolKey) && !file.type.startsWith('image/')) {
      setOutput('请选择有效的图片文件。');
      return;
    }
    const sizeKB = Math.max(Math.round(file.size / 1024), 1);
    setFileName(file.name);
    setFileSizeKB(sizeKB);
    setSelectedFile(file);
    setDownloadBlob(null);
    setDownloadName('');
    setValueA(file.name);
    setFileInfo(`已选择文件：${file.name}，大小约 ${sizeKB} KB`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">{tool.title}</h2>
        <p className="mt-4 text-slate-600 leading-7">{tool.placeholder}</p>
        {tool.premium ? (
          <div className="mt-4 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <p className="text-sm font-semibold">会员专享工具</p>
            <p className="mt-2 text-sm">该工具属于高级会员服务，新用户可享半年免费体验。</p>
          </div>
        ) : null}
      </div>

      {tool.toolKey === 'image-compress' || tool.toolKey === 'image-convert' ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">选择文件</label>
            <input data-testid="image-file" type="file" accept="image/*" onChange={handleFileSelect} className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm" />
            {tool.toolKey === 'image-convert' ? (
              <label className="block text-sm font-medium text-slate-700">
                目标格式
                <select data-testid="image-target" value={imageTarget} onChange={(event) => setImageTarget(event.target.value as 'png' | 'jpeg' | 'webp')} className="mt-2 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm">
                  <option value="webp">WebP（推荐，体积较小）</option>
                  <option value="jpeg">JPG（兼容性好）</option>
                  <option value="png">PNG（支持透明）</option>
                </select>
              </label>
            ) : null}
            <p className="text-sm text-slate-500">{fileInfo}</p>
            <div className="flex flex-wrap gap-3">
              <button disabled={isProcessing} onClick={handleAction} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60">
                {isProcessing ? '处理中…' : '生成结果'}
              </button>
              <button onClick={() => handleCopy(output)} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900">
                复制结果
              </button>
              <button onClick={handleDownload} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900">
                下载结果
              </button>
            </div>
            {copyMessage ? <p className="text-sm text-emerald-600" role="status">{copyMessage}</p> : null}
            <pre className="mt-4 whitespace-pre-wrap rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">{output || '结果将在这里显示。'}</pre>
          </div>
        </div>
      ) : (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6">
            {!['password-generator', 'lorem-ipsum', 'uuid-generator'].includes(tool.toolKey) ? (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">{tool.toolKey === 'regex-tester' ? '正则表达式' : '输入内容'}</label>
                <textarea data-testid="primary-input" value={valueA} onChange={(e) => setValueA(e.target.value)} rows={8} className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700" placeholder={tool.toolKey === 'regex-tester' ? '例如 /tool(ly)?/gi' : '请输入文本内容...'} />
              </div>
            ) : null}

            {tool.toolKey === 'text-translate' && (
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  翻译目标
                  <select value={translateTarget} onChange={(e) => setTranslateTarget(e.target.value as 'zh' | 'en')} className="mt-2 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    <option value="zh">翻译为中文</option>
                    <option value="en">Translate to English</option>
                  </select>
                </label>
              </div>
            )}

            {tool.toolKey === 'json-csv' && (
              <div className="grid gap-3 sm:grid-cols-2">
                <button onClick={() => setValueB('json-to-csv')} className={`rounded-full px-4 py-3 text-sm font-semibold ${valueB !== 'csv-to-json' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-900'}`}>JSON → CSV</button>
                <button onClick={() => setValueB('csv-to-json')} className={`rounded-full px-4 py-3 text-sm font-semibold ${valueB === 'csv-to-json' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-900'}`}>CSV → JSON</button>
              </div>
            )}

            {tool.toolKey === 'yaml-json' && (
              <div className="grid gap-3 sm:grid-cols-2">
                <button onClick={() => setValueB('yaml-to-json')} className={`rounded-full px-4 py-3 text-sm font-semibold ${valueB !== 'json-to-yaml' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-900'}`}>YAML → JSON</button>
                <button onClick={() => setValueB('json-to-yaml')} className={`rounded-full px-4 py-3 text-sm font-semibold ${valueB === 'json-to-yaml' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-900'}`}>JSON → YAML</button>
              </div>
            )}

            {tool.toolKey === 'hash-generator' && (
              <div className="grid gap-3 sm:grid-cols-2">
                <button onClick={() => setValueB('SHA-256')} className={`rounded-full px-4 py-3 text-sm font-semibold ${valueB !== 'SHA-512' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-900'}`}>SHA-256</button>
                <button onClick={() => setValueB('SHA-512')} className={`rounded-full px-4 py-3 text-sm font-semibold ${valueB === 'SHA-512' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-900'}`}>SHA-512</button>
              </div>
            )}

            {['base64', 'url-encode', 'text-case'].includes(tool.toolKey) && (
              <div className="grid gap-3 sm:grid-cols-2">
                {tool.toolKey === 'base64' || tool.toolKey === 'url-encode' ? (
                  <> 
                    <button onClick={() => setValueB('encode')} className={`rounded-full px-4 py-3 text-sm font-semibold ${valueB === 'encode' ? 'bg-slate-900 text-white' : 'border border-slate-200 text-slate-900 bg-white'}`}>
                      编码
                    </button>
                    <button onClick={() => setValueB('decode')} className={`rounded-full px-4 py-3 text-sm font-semibold ${valueB === 'decode' ? 'bg-slate-900 text-white' : 'border border-slate-200 text-slate-900 bg-white'}`}>
                      解码
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setValueB('upper')} className={`rounded-full px-4 py-3 text-sm font-semibold ${valueB === 'upper' ? 'bg-slate-900 text-white' : 'border border-slate-200 text-slate-900 bg-white'}`}>
                      全部大写
                    </button>
                    <button onClick={() => setValueB('lower')} className={`rounded-full px-4 py-3 text-sm font-semibold ${valueB === 'lower' ? 'bg-slate-900 text-white' : 'border border-slate-200 text-slate-900 bg-white'}`}>
                      全部小写
                    </button>
                    <button onClick={() => setValueB('capitalize')} className={`rounded-full px-4 py-3 text-sm font-semibold ${valueB === 'capitalize' ? 'bg-slate-900 text-white' : 'border border-slate-200 text-slate-900 bg-white'}`}>
                      首字母大写
                    </button>
                  </>
                )}
              </div>
            )}

            {tool.toolKey === 'password-generator' && (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  密码长度
                  <input type="number" value={passwordLength} min={6} max={64} onChange={(e) => setPasswordLength(Number(e.target.value))} className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm" />
                </label>
                <label className="flex items-center gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />
                  包含符号
                </label>
              </div>
            )}

            {tool.toolKey === 'uuid-generator' && (
              <label className="block text-sm font-medium text-slate-700">
                生成数量（1 - 100）
                <input data-testid="uuid-count" type="number" value={uuidCount} min={1} max={100} onChange={(event) => setUuidCount(Math.min(Math.max(Number(event.target.value) || 1, 1), 100))} className="mt-2 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm" />
              </label>
            )}

            {tool.toolKey === 'lorem-ipsum' && (
              <label className="block text-sm font-medium text-slate-700">
                段落数量
                <input type="number" value={valueB || '2'} onChange={(e) => setValueB(e.target.value)} className="mt-2 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm" placeholder="2" />
              </label>
            )}

            {['text-diff', 'regex-tester'].includes(tool.toolKey) && (
              <div className="grid gap-4">
                <label className="block text-sm font-medium text-slate-700">{tool.toolKey === 'regex-tester' ? '待测试文本' : '比较文本 B'}</label>
                <textarea data-testid="secondary-input" value={valueB} onChange={(e) => setValueB(e.target.value)} rows={4} className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm" placeholder={tool.toolKey === 'regex-tester' ? '输入需要匹配的文本…' : '输入第二个文本...'} />
              </div>
            )}

            {tool.toolKey === 'qr-code' && (
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
                <p>当前二维码内容：</p>
                <p className="mt-3 break-words text-slate-900">{qrValue}</p>
                {qrDataUrl ? <img src={qrDataUrl} alt="生成的二维码" className="mt-4 h-56 w-56 rounded-2xl border border-slate-200 bg-white p-2" /> : null}
              </div>
            )}

            <button disabled={isProcessing} onClick={handleAction} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60">
              {isProcessing ? '处理中…' : '执行工具'}
            </button>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-slate-700">
            <h3 className="text-lg font-semibold text-slate-900">结果输出</h3>
            <pre className="mt-4 whitespace-pre-wrap rounded-[1.5rem] border border-slate-200 bg-white p-5 text-sm text-slate-700">
              {output || '操作结果将显示在这里。'}
            </pre>
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={() => handleCopy(output)} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900">
                复制结果
              </button>
              <button onClick={handleDownload} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900">
                下载结果
              </button>
            </div>
            {copyMessage ? <p className="mt-3 text-sm text-emerald-600" role="status">{copyMessage}</p> : null}
          </div>
        </div>
      )}

      <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-slate-600">
        <h2 className="text-lg font-semibold text-slate-900">使用说明</h2>
        <ul className="mt-4 space-y-3 text-sm leading-7">
          <li>• {tool.description}</li>
          <li>• 本页保留广告位和功能展示，适合做流量变现页面。</li>
          <li>• 通过简单交互提升用户停留时间和转化效果。</li>
        </ul>
      </div>
    </div>
  );
}
