import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/app/lib/auth';
import { SESSION_COOKIE_NAME } from '@/app/lib/session-cookie';

export async function requireApiUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value || '';
  return getUserFromToken(token);
}

export function unauthorizedApiResponse() {
  return NextResponse.json({ success: false, message: '请先登录后再使用该工具。' }, { status: 401 });
}
