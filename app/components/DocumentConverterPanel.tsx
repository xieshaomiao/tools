'use client';

import { useMemo, useState } from 'react';
import { ToolMeta } from '@/app/tools/toolConfig';
import { SiteLocale } from '@/app/tools/toolContent';
import {
  convertDocument,
  DOCUMENT_ACCEPT,
  DocumentOutputFormat,
  getDocumentOutputFormats,
  getDocumentSourceKind,
  outputFormatLabels,
} from '@/app/lib/document-converter';

const sourceLabels = {
  pdf: 'PDF', docx: 'Word DOCX', xlsx: 'Excel XLSX', pptx: 'PowerPoint PPTX',
  txt: 'TXT', md: 'Markdown', html: 'HTML', image: 'JPG / PNG / WebP',
};

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function copyText(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
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
  return copied;
}

function friendlyConversionError(error: unknown, file: File | null, isEnglish: boolean) {
  const message = error instanceof Error ? error.message : '';
  const smallPdfHint = file?.name.toLowerCase().endsWith('.pdf') && file.size < 12 * 1024;
  if (/password|encrypted/i.test(message)) {
    return isEnglish ? 'This PDF is password-protected. Remove the password and try again.' : '该 PDF 带有密码保护，请先解除密码后再转换。';
  }
  if (/cmap|font|standardfont/i.test(message)) {
    return isEnglish ? 'This PDF uses embedded or custom fonts. Refresh the page and try again; if it still fails, export the PDF again from the original app.' : '该 PDF 使用了特殊字体映射。请刷新页面后重试；如果仍失败，请从原软件重新导出 PDF。';
  }
  if (/invalid pdf|missing pdf|unexpected response|format error/i.test(message)) {
    return isEnglish ? 'The PDF is damaged or uses an unsupported structure. Open and export it as a new PDF, then try again.' : '该 PDF 文件可能损坏或结构异常，请先用“打印/导出为 PDF”生成新文件后重试。';
  }
  if (/undefined is not a function|withresolvers|intersection|not a function/i.test(message)) {
    if (smallPdfHint) {
      return isEnglish ? 'This small PDF uses a structure that the current browser could not parse. Refresh the page or re-export the PDF, then try again.' : '这个小 PDF 使用了当前浏览器不容易解析的结构。请刷新页面后重试；如果仍失败，请从原软件重新导出 PDF。';
    }
    return isEnglish ? 'This browser could not parse the PDF. Refresh the page or update the browser, then try again.' : '当前浏览器无法解析这个 PDF。请刷新页面或升级浏览器后重试。';
  }
  return isEnglish ? 'Conversion failed. Check the source file and try again.' : '转换失败，请检查源文件后重试。';
}

export default function DocumentConverterPanel({ tool, locale = 'zh-CN' }: { tool: ToolMeta; locale?: SiteLocale }) {
  const isEnglish = locale === 'en';
  const ui = {
    privacy: isEnglish ? 'Files are processed in this browser and are not uploaded. Common office documents, web pages, text, images and PDFs are supported.' : '文件仅在当前浏览器中处理，不上传服务器。支持常用办公文档、网页、文本、图片与 PDF 互转。',
    source: isEnglish ? '1. Choose source file' : '1. 选择源文件',
    output: isEnglish ? '2. Choose output format' : '2. 选择输出格式',
    selectFirst: isEnglish ? 'Choose a file first' : '请先选择文件',
    converting: isEnglish ? 'Converting locally…' : '正在本地转换，请稍候…',
    convert: isEnglish ? 'Start conversion' : '开始转换',
    result: isEnglish ? 'Conversion result' : '转换结果',
    summary: isEnglish ? 'A result summary and copyable preview will appear here.' : '完成转换后，这里会显示结果摘要和可复制预览。',
    none: isEnglish ? 'No result yet.' : '暂无结果。',
    copy: isEnglish ? 'Copy result' : '复制结果',
    download: isEnglish ? 'Download converted file' : '下载转换文件',
    supported: isEnglish ? 'Supported conversions' : '已支持的真实转换',
  };
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<DocumentOutputFormat | ''>('');
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultName, setResultName] = useState('');
  const [summary, setSummary] = useState('');
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState('');
  const [processing, setProcessing] = useState(false);

  const sourceKind = useMemo(() => file ? getDocumentSourceKind(file) : null, [file]);
  const outputFormats = sourceKind ? getDocumentOutputFormats(sourceKind) : [];

  const handleFile = (selected: File | null) => {
    if (selected && selected.size > 25 * 1024 * 1024) {
      setFile(null);
      setOutputFormat('');
      setResultBlob(null);
      setResultName('');
      setSummary('');
      setPreview('');
      setStatus(isEnglish ? 'Keep each file below 25 MB to avoid exhausting browser memory.' : '单个文件请控制在 25 MB 以内，以避免浏览器内存不足。');
      return;
    }
    setFile(selected);
    setResultBlob(null);
    setResultName('');
    setSummary('');
    setPreview('');
    setStatus('');
    const kind = selected ? getDocumentSourceKind(selected) : null;
    setOutputFormat(kind ? getDocumentOutputFormats(kind)[0] : '');
  };

  const handleConvert = async () => {
    if (!file || !sourceKind || !outputFormat) {
      setStatus(isEnglish ? 'Choose a supported file and output format first.' : '请先选择支持的文件和输出格式。');
      return;
    }
    setProcessing(true);
    setStatus(ui.converting);
    setResultBlob(null);
    try {
      const result = await convertDocument(file, outputFormat);
      setResultBlob(result.blob);
      setResultName(result.fileName);
      setSummary(result.summary);
      setPreview(result.preview);
      setStatus(isEnglish ? 'Conversion complete. The file is ready to download.' : '转换完成，文件可以下载。');
    } catch (error) {
      console.error('Toolly document conversion failed', error);
      setSummary('');
      setPreview('');
      setStatus(friendlyConversionError(error, file, isEnglish));
    } finally {
      setProcessing(false);
    }
  };

  const handleCopy = async () => {
    const content = preview || summary;
    if (!content) {
      setStatus(isEnglish ? 'Complete a conversion first.' : '请先完成转换。');
      return;
    }
    setStatus(await copyText(content) ? (isEnglish ? 'Copied to the clipboard.' : '结果已复制到剪贴板。') : (isEnglish ? 'Copy failed. Select and copy the preview manually.' : '复制失败，请长按预览内容手动复制。'));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">{tool.title}</h2>
        <p className="mt-3 leading-7 text-slate-600">{ui.privacy}</p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-700">
            {ui.source}
            <input
              data-testid="document-file"
              type="file"
              accept={DOCUMENT_ACCEPT}
              onChange={(event) => handleFile(event.target.files?.[0] || null)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-normal"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            {ui.output}
            <select
              data-testid="document-output-format"
              value={outputFormat}
              disabled={!sourceKind}
              onChange={(event) => setOutputFormat(event.target.value as DocumentOutputFormat)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-normal disabled:opacity-50"
            >
              {!sourceKind ? <option value="">{ui.selectFirst}</option> : null}
              {outputFormats.map((format) => <option key={format} value={format}>{outputFormatLabels[format]}</option>)}
            </select>
          </label>
        </div>

        {file ? (
          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
            <p className="font-semibold">{file.name}</p>
            <p className="mt-1">{isEnglish ? 'Source' : '源格式'}：{sourceKind ? sourceLabels[sourceKind] : (isEnglish ? 'unsupported' : '不支持')} · {isEnglish ? 'Size' : '大小'}：{Math.max(Math.round(file.size / 1024), 1)} KB</p>
          </div>
        ) : null}

        <button
          data-testid="document-convert"
          disabled={!file || !sourceKind || !outputFormat || processing}
          onClick={handleConvert}
          className="mt-5 w-full rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {processing ? ui.converting : ui.convert}
        </button>
        {status ? <p role="status" className={`mt-4 text-sm ${resultBlob ? 'text-emerald-700' : 'text-slate-600'}`}>{status}</p> : null}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-lg font-semibold text-slate-900">{ui.result}</h3>
        <p className="mt-3 text-sm text-slate-600">{summary || ui.summary}</p>
        <pre data-testid="document-preview" className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">{preview || ui.none}</pre>
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={handleCopy} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-slate-900">{ui.copy}</button>
          <button
            disabled={!resultBlob}
            onClick={() => resultBlob && downloadBlob(resultBlob, resultName)}
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-slate-900 disabled:opacity-50"
          >
            {ui.download}
          </button>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">{ui.supported}</h3>
        <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <p>PDF → Word、Excel、PPT、TXT、HTML、PNG</p>
          <p>Word → PDF、TXT、HTML</p>
          <p>Excel → PDF、CSV、HTML</p>
          <p>PowerPoint → PDF、TXT、HTML</p>
          <p>TXT / Markdown / HTML → PDF、Word</p>
          <p>JPG / PNG / WebP → PDF</p>
        </div>
        <p className="mt-4 text-xs leading-6 text-slate-500">{isEnglish ? 'Note: scanned PDFs need OCR before conversion to editable Word or Excel. PDF to PowerPoint uses page images to preserve layout. Save legacy DOC/XLS/PPT files as DOCX/XLSX/PPTX first.' : '说明：扫描版 PDF 没有可提取文字时，转 Word/Excel 需要 OCR；PDF 转 PPT 采用逐页图像以保持版式。旧版 DOC/XLS/PPT 请先另存为 DOCX/XLSX/PPTX。'}</p>
      </section>
    </div>
  );
}
