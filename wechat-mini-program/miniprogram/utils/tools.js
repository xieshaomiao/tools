const loremParagraph =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.';

const toolList = [
  {
    key: 'json-format',
    title: 'JSON 格式化',
    description: '美化并校验 JSON 文本。',
    category: '开发工具',
    badge: 'JSON',
    placeholder: '粘贴 JSON 文本，例如 {"name":"Toolly"}'
  },
  {
    key: 'word-count',
    title: '字数统计',
    description: '统计字符、单词、段落与阅读时间。',
    category: '文本工具',
    badge: '字数',
    placeholder: '输入需要统计的文章或文案'
  },
  {
    key: 'base64',
    title: 'Base64 编解码',
    description: '支持中文文本的 Base64 编码与解码。',
    category: '编码工具',
    badge: 'B64',
    placeholder: '输入原文或 Base64 文本',
    options: [
      { label: '编码', value: 'encode' },
      { label: '解码', value: 'decode' }
    ]
  },
  {
    key: 'timestamp',
    title: '时间戳转换',
    description: '在 Unix 时间戳与日期之间转换。',
    category: '开发工具',
    badge: '时间',
    placeholder: '输入 10/13 位时间戳，或日期文本'
  },
  {
    key: 'url-encode',
    title: 'URL 编解码',
    description: '对 URL 参数进行编码或解码。',
    category: '编码工具',
    badge: 'URL',
    placeholder: '输入 URL 或参数文本',
    options: [
      { label: '编码', value: 'encode' },
      { label: '解码', value: 'decode' }
    ]
  },
  {
    key: 'password-generator',
    title: '密码生成',
    description: '在设备端生成随机强密码。',
    category: '实用工具',
    badge: '密码',
    custom: 'password'
  },
  {
    key: 'color-convert',
    title: '颜色代码转换',
    description: '在 HEX 与 RGB 格式之间转换。',
    category: '设计工具',
    badge: '颜色',
    placeholder: '输入 #2563eb 或 rgb(37, 99, 235)'
  },
  {
    key: 'markdown-html',
    title: 'Markdown 转 HTML',
    description: '将常用 Markdown 标记转换为 HTML。',
    category: '文本工具',
    badge: 'MD',
    placeholder: '输入 Markdown 文本'
  },
  {
    key: 'keyword-extract',
    title: '关键词提取',
    description: '统计文本中出现频率较高的关键词。',
    category: '文本工具',
    badge: '词频',
    placeholder: '输入需要分析的文本'
  },
  {
    key: 'text-diff',
    title: '文本差异比较',
    description: '按行比较两个文本版本。',
    category: '文本工具',
    badge: '对比',
    placeholder: '输入版本 A',
    secondPlaceholder: '输入版本 B',
    custom: 'dual'
  },
  {
    key: 'text-case',
    title: '英文大小写转换',
    description: '转换为大写、小写或标题格式。',
    category: '文本工具',
    badge: 'Aa',
    placeholder: '输入英文文本',
    options: [
      { label: '大写', value: 'upper' },
      { label: '小写', value: 'lower' },
      { label: '标题格式', value: 'title' }
    ]
  },
  {
    key: 'lorem-ipsum',
    title: 'Lorem Ipsum 生成',
    description: '生成页面设计所需的英文占位段落。',
    category: '开发工具',
    badge: 'Lorem',
    custom: 'number'
  },
  {
    key: 'html-compress',
    title: 'HTML 压缩',
    description: '移除 HTML 中的多余空白与标签间空格。',
    category: '开发工具',
    badge: 'HTML',
    placeholder: '粘贴 HTML 源码'
  }
];

function utf8ToBytes(text) {
  const bytes = [];
  for (let i = 0; i < text.length; i += 1) {
    let code = text.charCodeAt(i);
    if (code >= 0xd800 && code <= 0xdbff && i + 1 < text.length) {
      const next = text.charCodeAt(i + 1);
      if (next >= 0xdc00 && next <= 0xdfff) {
        code = 0x10000 + ((code - 0xd800) << 10) + (next - 0xdc00);
        i += 1;
      }
    }
    if (code <= 0x7f) bytes.push(code);
    else if (code <= 0x7ff) bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    else if (code <= 0xffff) bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    else bytes.push(0xf0 | (code >> 18), 0x80 | ((code >> 12) & 0x3f), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
  }
  return bytes;
}

function bytesToUtf8(bytes) {
  let result = '';
  for (let i = 0; i < bytes.length; i += 1) {
    const first = bytes[i];
    let code;
    if (first < 0x80) code = first;
    else if ((first & 0xe0) === 0xc0) {
      code = ((first & 0x1f) << 6) | (bytes[++i] & 0x3f);
    } else if ((first & 0xf0) === 0xe0) {
      code = ((first & 0x0f) << 12) | ((bytes[++i] & 0x3f) << 6) | (bytes[++i] & 0x3f);
    } else {
      code = ((first & 0x07) << 18) | ((bytes[++i] & 0x3f) << 12) | ((bytes[++i] & 0x3f) << 6) | (bytes[++i] & 0x3f);
    }
    if (code > 0xffff) {
      code -= 0x10000;
      result += String.fromCharCode(0xd800 + (code >> 10), 0xdc00 + (code & 0x3ff));
    } else result += String.fromCharCode(code);
  }
  return result;
}

function base64Encode(text) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const bytes = utf8ToBytes(text);
  let output = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i];
    const b = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const c = i + 2 < bytes.length ? bytes[i + 2] : 0;
    output += alphabet[a >> 2];
    output += alphabet[((a & 3) << 4) | (b >> 4)];
    output += i + 1 < bytes.length ? alphabet[((b & 15) << 2) | (c >> 6)] : '=';
    output += i + 2 < bytes.length ? alphabet[c & 63] : '=';
  }
  return output;
}

function base64Decode(text) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const clean = text.replace(/\s+/g, '');
  if (!clean || clean.length % 4 !== 0 || /[^A-Za-z0-9+/=]/.test(clean)) throw new Error('无效 Base64 文本');
  const bytes = [];
  for (let i = 0; i < clean.length; i += 4) {
    const a = alphabet.indexOf(clean[i]);
    const b = alphabet.indexOf(clean[i + 1]);
    const c = clean[i + 2] === '=' ? 0 : alphabet.indexOf(clean[i + 2]);
    const d = clean[i + 3] === '=' ? 0 : alphabet.indexOf(clean[i + 3]);
    bytes.push((a << 2) | (b >> 4));
    if (clean[i + 2] !== '=') bytes.push(((b & 15) << 4) | (c >> 2));
    if (clean[i + 3] !== '=') bytes.push(((c & 3) << 6) | d);
  }
  return bytesToUtf8(bytes);
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function countParagraphs(text) {
  return text.trim() ? text.trim().split(/\n{2,}/).filter(Boolean).length : 0;
}

function convertTimestamp(input) {
  const text = input.trim();
  if (!text) return '请输入时间戳或日期。';
  if (/^\d{10}$/.test(text) || /^\d{13}$/.test(text)) {
    const milliseconds = text.length === 10 ? Number(text) * 1000 : Number(text);
    const date = new Date(milliseconds);
    if (Number.isNaN(date.getTime())) return '无效时间戳。';
    return `本地时间：${date.toLocaleString()}\nISO 时间：${date.toISOString()}`;
  }
  const date = new Date(text.replace(/-/g, '/'));
  if (Number.isNaN(date.getTime())) return '无效日期格式。';
  return `秒级时间戳：${Math.floor(date.getTime() / 1000)}\n毫秒时间戳：${date.getTime()}`;
}

function randomPassword(length, useSymbols) {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{};:,.?';
  const chars = letters + digits + (useSymbols ? symbols : '');
  let output = '';
  for (let i = 0; i < length; i += 1) output += chars[Math.floor(Math.random() * chars.length)];
  return output;
}

function hexToRgb(value) {
  let hex = value.replace('#', '').trim();
  if (!/^([a-f\d]{3}|[a-f\d]{6})$/i.test(hex)) return '无效 HEX 颜色值。';
  if (hex.length === 3) hex = hex.split('').map((char) => char + char).join('');
  const color = parseInt(hex, 16);
  return `rgb(${(color >> 16) & 255}, ${(color >> 8) & 255}, ${color & 255})`;
}

function rgbToHex(value) {
  const match = value.match(/(\d{1,3})\D+(\d{1,3})\D+(\d{1,3})/);
  if (!match) return '无效 RGB 颜色值。';
  const channels = match.slice(1).map(Number);
  if (channels.some((channel) => channel > 255)) return 'RGB 数值必须在 0 到 255 之间。';
  return `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}

function markdownToHtml(text) {
  return text
    .replace(/^### (.*)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br />');
}

function extractKeywords(text) {
  const stopwords = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'your', '在', '的', '和', '是', '与', '一个', '可以', '内容']);
  const words = text.toLowerCase().match(/[a-z0-9]+|[\u4e00-\u9fff]{2,}/g) || [];
  const frequencies = {};
  words.forEach((word) => {
    if (!stopwords.has(word)) frequencies[word] = (frequencies[word] || 0) + 1;
  });
  const entries = Object.keys(frequencies)
    .map((word) => [word, frequencies[word]])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);
  return entries.length ? entries.map((entry, index) => `${index + 1}. ${entry[0]}：${entry[1]} 次`).join('\n') : '未提取到有效关键词。';
}

function compareText(a, b) {
  const aLines = a.split('\n');
  const bLines = b.split('\n');
  const count = Math.max(aLines.length, bLines.length);
  const lines = [];
  for (let index = 0; index < count; index += 1) {
    const left = aLines[index] || '';
    const right = bLines[index] || '';
    lines.push(`${left === right ? '相同' : '不同'} · 第 ${index + 1} 行\nA：${left || '（空）'}\nB：${right || '（空）'}`);
  }
  return lines.join('\n\n');
}

function executeTool(key, input, second, settings) {
  const value = input || '';
  const option = second || '';
  try {
    switch (key) {
      case 'json-format':
        return JSON.stringify(JSON.parse(value), null, 2);
      case 'word-count': {
        const words = countWords(value);
        return `字符数：${value.length}\n单词数：${words}\n段落数：${countParagraphs(value)}\n阅读时间：约 ${Math.max(1, Math.round(words / 200))} 分钟`;
      }
      case 'base64':
        return option === 'decode' ? base64Decode(value) : base64Encode(value);
      case 'timestamp':
        return convertTimestamp(value);
      case 'url-encode':
        return option === 'decode' ? decodeURIComponent(value) : encodeURIComponent(value);
      case 'password-generator':
        return randomPassword(Math.min(Math.max(Number(settings.length) || 16, 6), 64), settings.useSymbols);
      case 'color-convert':
        return value.toLowerCase().includes('rgb') ? rgbToHex(value) : hexToRgb(value);
      case 'markdown-html':
        return markdownToHtml(value);
      case 'keyword-extract':
        return extractKeywords(value);
      case 'text-diff':
        return compareText(value, option);
      case 'text-case':
        if (option === 'lower') return value.toLowerCase();
        if (option === 'title') return value.split(/\s+/).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        return value.toUpperCase();
      case 'lorem-ipsum':
        return Array.from({ length: Math.min(Math.max(Number(value) || 2, 1), 20) }, () => loremParagraph).join('\n\n');
      case 'html-compress':
        return value.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
      default:
        return '暂不支持此工具。';
    }
  } catch (error) {
    if (key === 'json-format') return 'JSON 语法错误，请检查输入内容。';
    if (key === 'base64') return '无效 Base64 文本。';
    if (key === 'url-encode') return '无效 URL 编码内容。';
    return error && error.message ? error.message : '处理失败，请检查输入内容。';
  }
}

function findTool(key) {
  return toolList.find((tool) => tool.key === key);
}

module.exports = {
  toolList,
  findTool,
  executeTool
};
