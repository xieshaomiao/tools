import { NextResponse } from 'next/server';
import { translateText } from '@/app/lib/seo';

export async function POST(request: Request) {
  const body = await request.json();
  const { q, target } = body as { q: string; target: 'zh' | 'en' };
  if (!q || !target) {
    return NextResponse.json({ translatedText: '翻译请求参数不完整。' }, { status: 400 });
  }

  const translatedText = translateText(q, target);
  return NextResponse.json({ translatedText });
}
