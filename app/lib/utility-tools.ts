export function parseCsv(input: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    if (quoted) {
      if (char === '"' && input[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      field = '';
    } else field += char;
  }
  row.push(field.replace(/\r$/, ''));
  if (row.some((cell) => cell) || rows.length === 0) rows.push(row);
  return rows;
}

function csvCell(value: unknown) {
  const text = value == null ? '' : String(value);
  const escaped = text.replace(/"/g, '""');
  return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
}

export function convertJsonCsv(input: string, direction: 'json-to-csv' | 'csv-to-json') {
  if (direction === 'csv-to-json') {
    const rows = parseCsv(input.trim());
    if (rows.length < 2) throw new Error('CSV 至少需要标题行和一行数据。');
    const headers = rows[0].map((header, index) => header.trim() || `column_${index + 1}`);
    return JSON.stringify(rows.slice(1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] || '']))), null, 2);
  }
  const parsed = JSON.parse(input);
  const records = Array.isArray(parsed) ? parsed : [parsed];
  if (!records.length || records.some((record) => !record || typeof record !== 'object' || Array.isArray(record))) {
    throw new Error('请输入对象或对象数组格式的 JSON。');
  }
  const headers = Array.from(new Set(records.flatMap((record) => Object.keys(record))));
  return [headers.map(csvCell).join(','), ...records.map((record) => headers.map((header) => csvCell(record[header])).join(','))].join('\r\n');
}

export async function convertYamlJson(input: string, direction: 'yaml-to-json' | 'json-to-yaml') {
  const YAML = await import('yaml');
  if (direction === 'json-to-yaml') return YAML.stringify(JSON.parse(input));
  return JSON.stringify(YAML.parse(input), null, 2);
}

export function generateUuids(count: number) {
  const safeCount = Math.min(Math.max(Math.floor(count) || 1, 1), 100);
  return Array.from({ length: safeCount }, () => crypto.randomUUID()).join('\n');
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function decodeJwt(token: string) {
  const parts = token.trim().split('.');
  if (parts.length !== 3) throw new Error('JWT 必须包含 header.payload.signature 三部分。');
  const header = JSON.parse(decodeBase64Url(parts[0]));
  const payload = JSON.parse(decodeBase64Url(parts[1]));
  const expiry = typeof payload.exp === 'number' ? new Date(payload.exp * 1000).toLocaleString('zh-CN') : '未提供';
  return `Header\n${JSON.stringify(header, null, 2)}\n\nPayload\n${JSON.stringify(payload, null, 2)}\n\n过期时间：${expiry}\n签名：${parts[2]}\n\n注意：本工具只解码，不验证签名真实性。`;
}

export function testRegex(patternInput: string, source: string) {
  let pattern = patternInput;
  let flags = 'g';
  const slashPattern = patternInput.match(/^\/(.*)\/([dgimsuvy]*)$/s);
  if (slashPattern) {
    pattern = slashPattern[1];
    flags = slashPattern[2].includes('g') ? slashPattern[2] : `${slashPattern[2]}g`;
  }
  const regex = new RegExp(pattern, flags);
  const matches = Array.from(source.matchAll(regex));
  if (!matches.length) return '没有匹配结果。';
  return matches.slice(0, 200).map((match, index) => {
    const groups = match.length > 1 ? `\n分组：${match.slice(1).map((value, group) => `${group + 1}=${value ?? ''}`).join('，')}` : '';
    return `${index + 1}. 索引 ${match.index ?? 0}：${match[0]}${groups}`;
  }).join('\n\n') + (matches.length > 200 ? `\n\n仅显示前 200 条，共 ${matches.length} 条。` : `\n\n共 ${matches.length} 条匹配。`);
}

export async function generateHash(input: string, algorithm: 'SHA-256' | 'SHA-512') {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest(algorithm, bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function numberToChineseRmb(input: string) {
  const normalized = input.replace(/[,，￥¥\s]/g, '');
  if (!/^-?\d+(?:\.\d{1,2})?$/.test(normalized)) throw new Error('请输入有效金额，最多保留两位小数。');
  const amount = Number(normalized);
  if (!Number.isFinite(amount) || Math.abs(amount) > 999999999999.99) throw new Error('金额超出支持范围。');
  if (amount === 0) return '人民币零元整';
  const digits = '零壹贰叁肆伍陆柒捌玖';
  const smallUnits = ['', '拾', '佰', '仟'];
  const bigUnits = ['', '万', '亿', '兆'];
  const integer = Math.floor(Math.abs(amount));
  const fraction = Math.round((Math.abs(amount) - integer) * 100);

  const groupToChinese = (group: number) => {
    let result = '';
    let zeroPending = false;
    for (let index = 3; index >= 0; index -= 1) {
      const divisor = 10 ** index;
      const digit = Math.floor(group / divisor) % 10;
      if (digit === 0) {
        if (result) zeroPending = true;
      } else {
        if (zeroPending) result += '零';
        result += digits[digit] + smallUnits[index];
        zeroPending = false;
      }
    }
    return result;
  };

  let integerText = '';
  let remaining = integer;
  let groupIndex = 0;
  let bridgeZero = false;
  while (remaining > 0) {
    const group = remaining % 10000;
    if (group === 0) {
      if (integerText) bridgeZero = true;
    } else {
      let groupText = groupToChinese(group) + bigUnits[groupIndex];
      if ((bridgeZero || (group < 1000 && remaining >= 10000)) && integerText) groupText += '零';
      integerText = groupText + integerText;
      bridgeZero = false;
    }
    remaining = Math.floor(remaining / 10000);
    groupIndex += 1;
  }
  const jiao = Math.floor(fraction / 10);
  const fen = fraction % 10;
  const fractionText = jiao || fen ? `${jiao ? `${digits[jiao]}角` : '零'}${fen ? `${digits[fen]}分` : ''}` : '整';
  return `人民币${amount < 0 ? '负' : ''}${integerText || '零'}元${fractionText}`;
}
