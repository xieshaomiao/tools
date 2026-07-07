'use client';

import { useMemo, useState } from 'react';
import { ToolMeta } from '@/app/tools/toolConfig';
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

export default function DocumentConverterPanel({ tool }: { tool: ToolMeta }) {
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
      setStatus('单个文件请控制在 25 MB 以内，以避免浏览器内存不足。');
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
      setStatus('请先选择支持的文件和输出格式。');
      return;
    }
    setProcessing(true);
    setStatus('正在本地转换，请稍候…');
    setResultBlob(null);
    try {
      const result = await convertDocument(file, outputFormat);
      setResultBlob(result.blob);
      setResultName(result.fileName);
      setSummary(result.summary);
      setPreview(result.preview);
      setStatus('转换完成，文件可以下载。');
    } catch (error) {
      setSummary('');
      setPreview('');
      setStatus(error instanceof Error ? error.message : '转换失败，请检查文件后重试。');
    } finally {
      setProcessing(false);
    }
  };

  const handleCopy = async () => {
    const content = preview || summary;
    if (!content) {
      setStatus('请先完成转换。');
      return;
    }
    setStatus(await copyText(content) ? '结果已复制到剪贴板。' : '复制失败，请长按预览内容手动复制。');
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">{tool.title}</h2>
        <p className="mt-3 leading-7 text-slate-600">文件仅在当前浏览器中处理，不上传服务器。支持常用办公文档、网页、文本、图片与 PDF 互转。</p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-700">
            1. 选择源文件
            <input
              data-testid="document-file"
              type="file"
              accept={DOCUMENT_ACCEPT}
              onChange={(event) => handleFile(event.target.files?.[0] || null)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-normal"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            2. 选择输出格式
            <select
              data-testid="document-output-format"
              value={outputFormat}
              disabled={!sourceKind}
              onChange={(event) => setOutputFormat(event.target.value as DocumentOutputFormat)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-normal disabled:opacity-50"
            >
              {!sourceKind ? <option value="">请先选择文件</option> : null}
              {outputFormats.map((format) => <option key={format} value={format}>{outputFormatLabels[format]}</option>)}
            </select>
          </label>
        </div>

        {file ? (
          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
            <p className="font-semibold">{file.name}</p>
            <p className="mt-1">源格式：{sourceKind ? sourceLabels[sourceKind] : '不支持'} · 大小：{Math.max(Math.round(file.size / 1024), 1)} KB</p>
          </div>
        ) : null}

        <button
          data-testid="document-convert"
          disabled={!file || !sourceKind || !outputFormat || processing}
          onClick={handleConvert}
          className="mt-5 w-full rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {processing ? '正在转换…' : '开始转换'}
        </button>
        {status ? <p role="status" className={`mt-4 text-sm ${resultBlob ? 'text-emerald-700' : 'text-slate-600'}`}>{status}</p> : null}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-lg font-semibold text-slate-900">转换结果</h3>
        <p className="mt-3 text-sm text-slate-600">{summary || '完成转换后，这里会显示结果摘要和可复制预览。'}</p>
        <pre data-testid="document-preview" className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">{preview || '暂无结果。'}</pre>
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={handleCopy} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-slate-900">复制结果</button>
          <button
            disabled={!resultBlob}
            onClick={() => resultBlob && downloadBlob(resultBlob, resultName)}
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-slate-900 disabled:opacity-50"
          >
            下载转换文件
          </button>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">已支持的真实转换</h3>
        <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <p>PDF → Word、Excel、PPT、TXT、HTML、PNG</p>
          <p>Word → PDF、TXT、HTML</p>
          <p>Excel → PDF、CSV、HTML</p>
          <p>PowerPoint → PDF、TXT、HTML</p>
          <p>TXT / Markdown / HTML → PDF、Word</p>
          <p>JPG / PNG / WebP → PDF</p>
        </div>
        <p className="mt-4 text-xs leading-6 text-slate-500">说明：扫描版 PDF 没有可提取文字时，转 Word/Excel 需要 OCR；PDF 转 PPT 采用逐页图像以保持版式。旧版 DOC/XLS/PPT 请先另存为 DOCX/XLSX/PPTX。</p>
      </section>
    </div>
  );
}
