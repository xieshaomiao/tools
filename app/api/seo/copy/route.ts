import { NextResponse } from 'next/server';
import { polishCopy } from '@/app/lib/seo';
import { requireApiUser, unauthorizedApiResponse } from '@/app/lib/api-auth';

export async function POST(request: Request) {
  if (!await requireApiUser()) return unauthorizedApiResponse();
  const body = await request.json();
  const { q } = body as { q: string };
  if (!q) {
    return NextResponse.json({ polishedCopy: '请输入文案以润色。' }, { status: 400 });
  }

  const polishedCopy = polishCopy(q);
  return NextResponse.json({ polishedCopy });
}
