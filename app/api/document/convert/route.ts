import { NextResponse } from 'next/server';
import { requireApiUser, unauthorizedApiResponse } from '@/app/lib/api-auth';
import { convertPdfOnServer, ServerDocumentOutputFormat } from '@/app/lib/server-document-converter';

export const runtime = 'nodejs';

const SUPPORTED_OUTPUTS = new Set<ServerDocumentOutputFormat>(['docx', 'xlsx', 'txt', 'html']);
const MAX_FILE_SIZE = 25 * 1024 * 1024;

export async function POST(request: Request) {
  if (!await requireApiUser()) return unauthorizedApiResponse();

  const formData = await request.formData();
  const file = formData.get('file');
  const output = formData.get('output');

  if (!(file instanceof File) || typeof output !== 'string') {
    return NextResponse.json({ success: false, message: '请上传 PDF 文件并选择输出格式。' }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ success: false, message: '单个文件请控制在 25 MB 以内。' }, { status: 413 });
  }
  if (!file.name.toLowerCase().endsWith('.pdf') || !SUPPORTED_OUTPUTS.has(output as ServerDocumentOutputFormat)) {
    return NextResponse.json({ success: false, message: '兼容转换目前支持 PDF 转 Word、Excel、TXT 和 HTML。' }, { status: 400 });
  }

  try {
    const result = await convertPdfOnServer(file, output as ServerDocumentOutputFormat);
    return NextResponse.json({
      success: true,
      fileName: result.fileName,
      mimeType: result.mimeType,
      summary: result.summary,
      preview: result.preview.slice(0, 20000),
      base64: result.buffer.toString('base64'),
    });
  } catch (error) {
    console.error('Toolly server document conversion failed', error);
    return NextResponse.json({ success: false, message: '兼容转换失败，请重新导出 PDF 后再试。' }, { status: 422 });
  }
}
