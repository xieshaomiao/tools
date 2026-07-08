import { NextResponse } from 'next/server';
import { generateSeoTitle } from '@/app/lib/seo';
import { requireApiUser, unauthorizedApiResponse } from '@/app/lib/api-auth';

export async function POST(request: Request) {
  if (!await requireApiUser()) return unauthorizedApiResponse();
  const body = await request.json();
  const { q } = body as { q: string };
  if (!q) {
    return NextResponse.json({ seoTitle: '请输入内容以生成标题。' }, { status: 400 });
  }

  const seoTitle = generateSeoTitle(q);
  return NextResponse.json({ seoTitle });
}
