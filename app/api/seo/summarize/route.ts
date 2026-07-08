import { NextResponse } from 'next/server';
import { summarizeText } from '@/app/lib/seo';
import { requireApiUser, unauthorizedApiResponse } from '@/app/lib/api-auth';

export async function POST(request: Request) {
  if (!await requireApiUser()) return unauthorizedApiResponse();
  const body = await request.json();
  const { q } = body as { q: string };
  if (!q) {
    return NextResponse.json({ summary: '请输入内容以生成摘要。' }, { status: 400 });
  }

  const summary = summarizeText(q);
  return NextResponse.json({ summary });
}
