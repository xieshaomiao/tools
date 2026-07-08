'use client';

export type DocumentSourceKind = 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'txt' | 'md' | 'html' | 'image';
export type DocumentOutputFormat = 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'txt' | 'html' | 'csv' | 'png-zip';

export type DocumentConversionResult = {
  blob: Blob;
  fileName: string;
  summary: string;
  preview: string;
};

export const DOCUMENT_ACCEPT = '.pdf,.docx,.xlsx,.pptx,.txt,.md,.markdown,.html,.htm,.jpg,.jpeg,.png,.webp';

export const outputFormatLabels: Record<DocumentOutputFormat, string> = {
  pdf: 'PDF 文档',
  docx: 'Word DOCX',
  xlsx: 'Excel XLSX',
  pptx: 'PowerPoint PPTX',
  txt: '纯文本 TXT',
  html: '网页 HTML',
  csv: '表格 CSV',
  'png-zip': '逐页 PNG（ZIP）',
};

const outputMatrix: Record<DocumentSourceKind, DocumentOutputFormat[]> = {
  pdf: ['docx', 'xlsx', 'pptx', 'txt', 'html', 'png-zip'],
  docx: ['pdf', 'txt', 'html'],
  xlsx: ['pdf', 'csv', 'html'],
  pptx: ['pdf', 'txt', 'html'],
  txt: ['pdf', 'docx', 'html'],
  md: ['pdf', 'docx', 'html', 'txt'],
  html: ['pdf', 'docx', 'txt'],
  image: ['pdf'],
};

export function getDocumentSourceKind(file: File): DocumentSourceKind | null {
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension === 'pdf') return 'pdf';
  if (extension === 'docx') return 'docx';
  if (extension === 'xlsx') return 'xlsx';
  if (extension === 'pptx') return 'pptx';
  if (extension === 'txt') return 'txt';
  if (extension === 'md' || extension === 'markdown') return 'md';
  if (extension === 'html' || extension === 'htm') return 'html';
  if (['jpg', 'jpeg', 'png', 'webp'].includes(extension || '')) return 'image';
  return null;
}

export function getDocumentOutputFormats(kind: DocumentSourceKind) {
  return outputMatrix[kind];
}

function baseName(fileName: string) {
  return fileName.replace(/\.[^.]+$/, '') || 'toolly-document';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char] || char);
}

function escapeXml(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, '&#10;');
}

function decodeXml(value: string) {
  const parser = new DOMParser();
  return parser.parseFromString(`<span>${value}</span>`, 'text/html').documentElement.textContent || '';
}

function stripHtml(html: string) {
  const document = new DOMParser().parseFromString(html, 'text/html');
  document.querySelectorAll('script,style,noscript').forEach((node) => node.remove());
  return (document.body.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
}

function markdownToHtml(markdown: string) {
  return markdown
    .split(/\n{2,}/)
    .map((block) => {
      const text = escapeHtml(block.trim())
        .replace(/^###\s+(.+)$/m, '<h3>$1</h3>')
        .replace(/^##\s+(.+)$/m, '<h2>$1</h2>')
        .replace(/^#\s+(.+)$/m, '<h1>$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br />');
      return /^<h[1-3]>/.test(text) ? text : `<p>${text}</p>`;
    })
    .join('');
}

async function getPdfDocument(file: File) {
  // The legacy build includes the Promise/Set/Array polyfills required by
  // Safari and older WebViews. The modern build can fail on real PDFs that
  // contain named destinations with "undefined is not a function".
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url).toString();
  return pdfjs.getDocument({
    data: new Uint8Array(await file.arrayBuffer()),
    cMapUrl: '/pdfjs/cmaps/',
    cMapPacked: true,
    standardFontDataUrl: '/pdfjs/standard_fonts/',
    wasmUrl: '/pdfjs/wasm/',
  }).promise;
}

type PdfTextItem = {
  str: string;
  transform: number[];
  width: number;
  hasEOL?: boolean;
};

function pdfItemsToText(items: unknown[]) {
  const textItems = items.filter((item): item is PdfTextItem => {
    if (!item || typeof item !== 'object') return false;
    const candidate = item as Partial<PdfTextItem>;
    return typeof candidate.str === 'string' && Array.isArray(candidate.transform);
  });
  const lines: Array<{ y: number; items: PdfTextItem[] }> = [];

  for (const item of textItems) {
    const y = item.transform[5] ?? 0;
    let line = lines.find((candidate) => Math.abs(candidate.y - y) <= 2.5);
    if (!line) {
      line = { y, items: [] };
      lines.push(line);
    }
    line.items.push(item);
  }

  return lines
    .sort((a, b) => b.y - a.y)
    .map((line) => {
      const ordered = line.items.sort((a, b) => (a.transform[4] ?? 0) - (b.transform[4] ?? 0));
      let result = '';
      let previousEnd: number | null = null;
      for (const item of ordered) {
        const x = item.transform[4] ?? 0;
        if (previousEnd !== null && x - previousEnd > 3 && result && !result.endsWith(' ')) result += ' ';
        result += item.str;
        previousEnd = x + (item.width || 0);
      }
      return result.trim();
    })
    .filter(Boolean)
    .join('\n');
}

function pageIsOnlyNoTextNotice(page: string) {
  return page.includes('本页没有可提取文本');
}

function hasExtractablePdfText(pages: string[]) {
  return pages.some((page) => page.trim() && !pageIsOnlyNoTextNotice(page));
}

async function extractPdfPages(file: File) {
  const pdf = await getPdfDocument(file);
  const pages: string[] = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = pdfItemsToText(content.items);
    pages.push(text || '（本页没有可提取文本，可能是扫描图片）');
  }
  return pages;
}

async function renderPdfPages(file: File) {
  const pdf = await getPdfDocument(file);
  const images: Array<{ blob: Blob; dataUrl: string }> = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('浏览器无法创建 PDF 页面画布。');
    await page.render({ canvas, canvasContext: context, viewport }).promise;
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) throw new Error(`PDF 第 ${pageNumber} 页渲染失败。`);
    images.push({ blob, dataUrl: canvas.toDataURL('image/png') });
  }
  return images;
}

async function textToDocx(text: string) {
  const { Document, Packer, Paragraph, TextRun } = await import('docx');
  const paragraphs = text.split(/\r?\n/).map((line) => new Paragraph({
    children: [new TextRun({ text: line || ' ', font: 'Arial' })],
    spacing: { after: 120 },
  }));
  const documentFile = new Document({ sections: [{ children: paragraphs }] });
  return Packer.toBlob(documentFile);
}

async function pdfPagesToDocx(pages: string[]) {
  const { Document, Packer, Paragraph, TextRun } = await import('docx');
  const paragraphs = pages.flatMap((page, pageIndex) => {
    const lines = page.split(/\r?\n/).filter((line) => line.trim());
    return (lines.length ? lines : ['（本页没有可提取文本，可能是扫描图片）']).map((line, lineIndex) => new Paragraph({
      pageBreakBefore: pageIndex > 0 && lineIndex === 0,
      children: [new TextRun({ text: line, font: 'Arial' })],
      spacing: { after: 90, line: 300 },
    }));
  });
  const documentFile = new Document({ sections: [{ children: paragraphs }] });
  return Packer.toBlob(documentFile);
}

async function htmlToPdf(html: string) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')]);
  const container = document.createElement('article');
  container.style.cssText = 'position:fixed;left:-10000px;top:0;width:794px;padding:56px;background:#fff;color:#111827;font:16px/1.7 Arial,"PingFang SC","Microsoft YaHei",sans-serif;';
  const safeDocument = new DOMParser().parseFromString(html, 'text/html');
  safeDocument.querySelectorAll('script,iframe,object,embed').forEach((node) => node.remove());
  container.innerHTML = safeDocument.body.innerHTML;
  document.body.appendChild(container);
  try {
    if (document.fonts?.ready) await document.fonts.ready;
    const canvas = await html2canvas(container, { scale: 1.35, backgroundColor: '#ffffff', useCORS: true });
    const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait', compress: true });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imageHeight = canvas.height * pageWidth / canvas.width;
    const image = canvas.toDataURL('image/jpeg', 0.9);
    let position = 0;
    pdf.addImage(image, 'JPEG', 0, position, pageWidth, imageHeight, undefined, 'FAST');
    let remaining = imageHeight - pageHeight;
    while (remaining > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(image, 'JPEG', 0, position, pageWidth, imageHeight, undefined, 'FAST');
      remaining -= pageHeight;
    }
    return pdf.output('blob');
  } finally {
    container.remove();
  }
}

function rowsToHtml(rows: string[][], title: string) {
  const body = rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('');
  return `<h1>${escapeHtml(title)}</h1><table style="border-collapse:collapse;width:100%"><tbody>${body}</tbody></table><style>td{border:1px solid #cbd5e1;padding:8px;vertical-align:top}</style>`;
}

function rowsToCsv(rows: string[][]) {
  return rows.map((row) => row.map((cell) => {
    const value = cell.replace(/"/g, '""');
    return /[",\n]/.test(value) ? `"${value}"` : value;
  }).join(',')).join('\r\n');
}

function columnIndex(reference: string) {
  const letters = reference.replace(/\d/g, '').toUpperCase();
  let index = 0;
  for (const letter of letters) index = index * 26 + letter.charCodeAt(0) - 64;
  return Math.max(index - 1, 0);
}

async function readXlsx(file: File) {
  const { default: JSZip } = await import('jszip');
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const workbookXml = await zip.file('xl/workbook.xml')?.async('text');
  const relationsXml = await zip.file('xl/_rels/workbook.xml.rels')?.async('text');
  if (!workbookXml || !relationsXml) throw new Error('无法读取 XLSX 工作簿结构。');
  const sharedXml = await zip.file('xl/sharedStrings.xml')?.async('text');
  const sharedStrings = sharedXml
    ? Array.from(sharedXml.matchAll(/<si[\s>][\s\S]*?<\/si>/g)).map((match) => Array.from(match[0].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)).map((part) => decodeXml(part[1])).join(''))
    : [];
  const relationMap = new Map(Array.from(relationsXml.matchAll(/<Relationship[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g)).map((match) => [match[1], match[2]]));
  const sheetMatch = workbookXml.match(/<sheet[^>]*name="([^"]+)"[^>]*(?:r:id|id)="([^"]+)"/);
  const sheetName = sheetMatch ? decodeXml(sheetMatch[1]) : 'Sheet1';
  const relationId = sheetMatch?.[2];
  const target = relationId ? relationMap.get(relationId) : 'worksheets/sheet1.xml';
  const sheetPath = target?.startsWith('/') ? target.slice(1) : `xl/${target?.replace(/^\.\//, '')}`;
  const sheetXml = await zip.file(sheetPath || 'xl/worksheets/sheet1.xml')?.async('text');
  if (!sheetXml) throw new Error('无法读取 XLSX 工作表。');
  const rows: string[][] = [];
  for (const rowMatch of sheetXml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)) {
    const row: string[] = [];
    for (const cellMatch of rowMatch[1].matchAll(/<c([^>]*)>([\s\S]*?)<\/c>/g)) {
      const attributes = cellMatch[1];
      const body = cellMatch[2];
      const reference = attributes.match(/\br="([^"]+)"/)?.[1] || `A${rows.length + 1}`;
      const type = attributes.match(/\bt="([^"]+)"/)?.[1];
      const raw = body.match(/<v>([\s\S]*?)<\/v>/)?.[1] ?? body.match(/<t[^>]*>([\s\S]*?)<\/t>/)?.[1] ?? '';
      const value = type === 's' ? sharedStrings[Number(raw)] || '' : decodeXml(raw);
      row[columnIndex(reference)] = value;
    }
    rows.push(Array.from({ length: row.length }, (_, index) => row[index] || ''));
  }
  return { sheetName, rows };
}

function columnName(index: number) {
  let value = index + 1;
  let result = '';
  while (value > 0) {
    const remainder = (value - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    value = Math.floor((value - 1) / 26);
  }
  return result;
}

async function createXlsx(rows: string[][], sheetName = 'Toolly') {
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  const sheetRows = rows.map((row, rowIndex) => `<row r="${rowIndex + 1}">${row.map((cell, column) => `<c r="${columnName(column)}${rowIndex + 1}" t="inlineStr"><is><t xml:space="preserve">${escapeXml(cell)}</t></is></c>`).join('')}</row>`).join('');
  zip.file('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>');
  zip.file('_rels/.rels', '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>');
  zip.file('xl/workbook.xml', `<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${escapeXml(sheetName.slice(0, 31))}" sheetId="1" r:id="rId1"/></sheets></workbook>`);
  zip.file('xl/_rels/workbook.xml.rels', '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>');
  zip.file('xl/styles.xml', '<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="1"><font><sz val="11"/><name val="Arial"/></font></fonts><fills count="1"><fill><patternFill patternType="none"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="1"><xf xfId="0"/></cellXfs></styleSheet>');
  zip.file('xl/worksheets/sheet1.xml', `<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${sheetRows}</sheetData></worksheet>`);
  return zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

async function extractPptx(file: File) {
  const { default: JSZip } = await import('jszip');
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const slidePaths = Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => Number(a.match(/\d+/)?.[0]) - Number(b.match(/\d+/)?.[0]));
  if (!slidePaths.length) throw new Error('无法读取 PPTX 幻灯片。');
  const slides: string[] = [];
  for (const path of slidePaths) {
    const xml = await zip.file(path)?.async('text') || '';
    slides.push(Array.from(xml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)).map((match) => decodeXml(match[1])).join('\n'));
  }
  return slides;
}

async function createPptxFromPdf(file: File) {
  const images = await renderPdfPages(file);
  const module = await import('pptxgenjs');
  const PptxGenJS = module.default;
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  images.forEach((image) => {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    slide.addImage({ data: image.dataUrl, x: 0, y: 0, w: 13.333, h: 7.5 });
  });
  return pptx.write({ outputType: 'blob' }) as Promise<Blob>;
}

async function imageToPdf(file: File) {
  const { jsPDF } = await import('jspdf');
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('图片读取失败。'));
    reader.readAsDataURL(file);
  });
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const element = new Image();
    element.onload = () => resolve(element);
    element.onerror = () => reject(new Error('图片解码失败。'));
    element.src = dataUrl;
  });
  const orientation = image.width > image.height ? 'landscape' : 'portrait';
  const pdf = new jsPDF({ orientation, unit: 'pt', format: 'a4', compress: true });
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();
  const scale = Math.min(width / image.width, height / image.height);
  const renderedWidth = image.width * scale;
  const renderedHeight = image.height * scale;
  pdf.addImage(dataUrl, file.type.includes('png') ? 'PNG' : 'JPEG', (width - renderedWidth) / 2, (height - renderedHeight) / 2, renderedWidth, renderedHeight, undefined, 'FAST');
  return pdf.output('blob');
}

async function convertPdf(file: File, output: DocumentOutputFormat): Promise<DocumentConversionResult> {
  const name = baseName(file.name);
  if (output === 'png-zip') {
    const [{ default: JSZip }, images] = await Promise.all([import('jszip'), renderPdfPages(file)]);
    const zip = new JSZip();
    images.forEach((image, index) => zip.file(`page-${String(index + 1).padStart(3, '0')}.png`, image.blob));
    return { blob: await zip.generateAsync({ type: 'blob' }), fileName: `${name}-pages.zip`, summary: `已将 ${images.length} 页 PDF 转换为 PNG 并打包。`, preview: `共 ${images.length} 页，每页一张 PNG 图片。` };
  }
  if (output === 'pptx') {
    const blob = await createPptxFromPdf(file);
    return { blob, fileName: `${name}.pptx`, summary: 'PDF 已转换为 PowerPoint，每页对应一张幻灯片。', preview: '输出采用页面图像以保持原 PDF 版式。' };
  }
  const pages = await extractPdfPages(file);
  const fullText = pages.map((page, index) => `第 ${index + 1} 页\n${page}`).join('\n\n');
  const extractedText = hasExtractablePdfText(pages);
  const extractionNote = extractedText
    ? `已提取 ${pages.length} 页文字`
    : `已读取 ${pages.length} 页，但没有发现可编辑文字；这通常是扫描图片版 PDF，需要 OCR 后才能转成真正可编辑文字`;
  if (output === 'docx') return { blob: await pdfPagesToDocx(pages), fileName: `${name}.docx`, summary: `${extractionNote}并生成 Word，保留原 PDF 的分页和文本行。`, preview: fullText };
  if (output === 'xlsx') {
    const rows = [['页码', '提取文字'], ...pages.map((page, index) => [String(index + 1), page])];
    return { blob: await createXlsx(rows, 'PDF文字'), fileName: `${name}.xlsx`, summary: `${extractionNote}并写入 Excel。`, preview: rowsToCsv(rows) };
  }
  if (output === 'html') {
    const html = pages.map((page, index) => `<section><h2>第 ${index + 1} 页</h2><p>${escapeHtml(page)}</p></section>`).join('');
    return { blob: new Blob([`<!doctype html><meta charset="utf-8"><title>${escapeHtml(name)}</title>${html}`], { type: 'text/html;charset=utf-8' }), fileName: `${name}.html`, summary: `${extractionNote}并转换为 HTML。`, preview: fullText };
  }
  return { blob: new Blob([fullText], { type: 'text/plain;charset=utf-8' }), fileName: `${name}.txt`, summary: `${extractionNote}。`, preview: fullText };
}

export async function convertDocument(file: File, output: DocumentOutputFormat): Promise<DocumentConversionResult> {
  const kind = getDocumentSourceKind(file);
  if (!kind) throw new Error('暂不支持该文件格式。请使用 PDF、DOCX、XLSX、PPTX、TXT、Markdown、HTML 或常见图片。');
  if (!outputMatrix[kind].includes(output)) throw new Error('该输入与输出组合暂不支持。');
  if (kind === 'pdf') return convertPdf(file, output);
  const name = baseName(file.name);
  if (kind === 'image') {
    const blob = await imageToPdf(file);
    return { blob, fileName: `${name}.pdf`, summary: '图片已转换为 PDF，并按页面居中排版。', preview: `${file.name} → ${name}.pdf` };
  }

  let text = '';
  let html = '';
  let rows: string[][] | null = null;
  if (kind === 'docx') {
    const mammoth = await import('mammoth/mammoth.browser');
    const arrayBuffer = await file.arrayBuffer();
    const [htmlResult, textResult] = await Promise.all([
      mammoth.convertToHtml({ arrayBuffer }),
      mammoth.extractRawText({ arrayBuffer }),
    ]);
    html = htmlResult.value;
    text = textResult.value.trim();
  } else if (kind === 'xlsx') {
    const workbook = await readXlsx(file);
    rows = workbook.rows;
    text = rowsToCsv(rows);
    html = rowsToHtml(rows, workbook.sheetName);
    if (output === 'csv') return { blob: new Blob(['\uFEFF', text], { type: 'text/csv;charset=utf-8' }), fileName: `${name}.csv`, summary: `Excel 已转换为 CSV，共 ${rows.length} 行。`, preview: text };
  } else if (kind === 'pptx') {
    const slides = await extractPptx(file);
    text = slides.map((slide, index) => `第 ${index + 1} 页\n${slide}`).join('\n\n');
    html = slides.map((slide, index) => `<section style="page-break-after:always"><h2>第 ${index + 1} 页</h2><p>${escapeHtml(slide).replace(/\n/g, '<br />')}</p></section>`).join('');
  } else {
    const raw = await file.text();
    if (kind === 'html') {
      html = raw;
      text = stripHtml(raw);
    } else if (kind === 'md') {
      html = markdownToHtml(raw);
      text = raw;
    } else {
      text = raw;
      html = `<article><h1>${escapeHtml(name)}</h1><p>${escapeHtml(raw).replace(/\n/g, '<br />')}</p></article>`;
    }
  }

  if (output === 'pdf') return { blob: await htmlToPdf(html), fileName: `${name}.pdf`, summary: `${file.name} 已转换为 PDF。`, preview: text };
  if (output === 'docx') return { blob: await textToDocx(text), fileName: `${name}.docx`, summary: `${file.name} 已转换为 Word DOCX。`, preview: text };
  if (output === 'html') return { blob: new Blob([`<!doctype html><meta charset="utf-8"><title>${escapeHtml(name)}</title>${html}`], { type: 'text/html;charset=utf-8' }), fileName: `${name}.html`, summary: `${file.name} 已转换为 HTML。`, preview: text };
  return { blob: new Blob([text], { type: 'text/plain;charset=utf-8' }), fileName: `${name}.txt`, summary: `${file.name} 已转换为纯文本。`, preview: text };
}
