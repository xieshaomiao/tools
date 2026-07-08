import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

export type ServerDocumentOutputFormat = 'docx' | 'xlsx' | 'txt' | 'html';

export type ServerDocumentConversionResult = {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  summary: string;
  preview: string;
};

type PdfTextItem = {
  str: string;
  transform: number[];
  width: number;
};

const pdfjsRoot = join(process.cwd(), 'node_modules', 'pdfjs-dist');

function assetUrl(path: string) {
  return `${pathToFileURL(path).href}/`;
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

function rowsToCsv(rows: string[][]) {
  return rows.map((row) => row.map((cell) => {
    const value = cell.replace(/"/g, '""');
    return /[",\n]/.test(value) ? `"${value}"` : value;
  }).join(',')).join('\r\n');
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
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = pathToFileURL(join(pdfjsRoot, 'legacy', 'build', 'pdf.worker.mjs')).href;
  const data = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjs.getDocument({
    data,
    cMapUrl: assetUrl(join(pdfjsRoot, 'cmaps')),
    cMapPacked: true,
    standardFontDataUrl: assetUrl(join(pdfjsRoot, 'standard_fonts')),
    wasmUrl: assetUrl(join(pdfjsRoot, 'wasm')),
  } as Record<string, unknown>);
  const pdf = await loadingTask.promise;

  const pages: string[] = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = pdfItemsToText(content.items);
    pages.push(text || '（本页没有可提取文本，可能是扫描图片）');
  }
  return pages;
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
  return Packer.toBuffer(documentFile);
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
  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
}

export async function convertPdfOnServer(file: File, output: ServerDocumentOutputFormat): Promise<ServerDocumentConversionResult> {
  const name = baseName(file.name);
  const pages = await extractPdfPages(file);
  const fullText = pages.map((page, index) => `第 ${index + 1} 页\n${page}`).join('\n\n');
  const extractedText = hasExtractablePdfText(pages);
  const extractionNote = extractedText
    ? `已通过兼容转换提取 ${pages.length} 页文字`
    : `已通过兼容转换读取 ${pages.length} 页，但没有发现可编辑文字；这通常是扫描图片版 PDF，需要 OCR 后才能转成真正可编辑文字`;

  if (output === 'docx') {
    return {
      buffer: await pdfPagesToDocx(pages),
      fileName: `${name}.docx`,
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      summary: `${extractionNote}并生成 Word，保留原 PDF 的分页和文本行。`,
      preview: fullText,
    };
  }

  if (output === 'xlsx') {
    const rows = [['页码', '提取文字'], ...pages.map((page, index) => [String(index + 1), page])];
    return {
      buffer: await createXlsx(rows, 'PDF文字'),
      fileName: `${name}.xlsx`,
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      summary: `${extractionNote}并写入 Excel。`,
      preview: rowsToCsv(rows),
    };
  }

  if (output === 'html') {
    const html = pages.map((page, index) => `<section><h2>第 ${index + 1} 页</h2><p>${escapeHtml(page)}</p></section>`).join('');
    return {
      buffer: Buffer.from(`<!doctype html><meta charset="utf-8"><title>${escapeHtml(name)}</title>${html}`),
      fileName: `${name}.html`,
      mimeType: 'text/html;charset=utf-8',
      summary: `${extractionNote}并转换为 HTML。`,
      preview: fullText,
    };
  }

  return {
    buffer: Buffer.from(fullText),
    fileName: `${name}.txt`,
    mimeType: 'text/plain;charset=utf-8',
    summary: `${extractionNote}。`,
    preview: fullText,
  };
}
