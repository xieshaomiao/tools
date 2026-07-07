import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { invalidateSession } from '@/app/lib/auth';
import { clearSessionCookie, SESSION_COOKIE_NAME } from '@/app/lib/session-cookie';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    await invalidateSession(token);
  }

  const response = NextResponse.json({ success: true, message: '已退出登录。' });
  clearSessionCookie(response);
  return response;
}
