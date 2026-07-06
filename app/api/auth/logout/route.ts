import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { invalidateSession } from '@/app/lib/auth';

export async function POST() {
  const token = cookies().get('toolly_token')?.value;
  if (token) {
    await invalidateSession(token);
  }

  const response = NextResponse.json({ success: true, message: '已退出登录。' });
  response.cookies.set('toolly_token', '', { path: '/', maxAge: 0 });
  return response;
}
