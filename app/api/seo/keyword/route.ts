import { NextResponse } from 'next/server';
import { extractKeywords } from '@/app/lib/seo';

export async function POST(request: Request) {
  const body = await request.json();
  const { q } = body as { q: string };
  if (!q) {
    return NextResponse.json({ keywords: [] }, { status: 400 });
  }

  const keywords = extractKeywords(q);
  return NextResponse.json({ keywords });
}
