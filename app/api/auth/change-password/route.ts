import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { changeUserPassword, createSession, getUserFromToken } from '@/app/lib/auth';
import { setSessionCookie, SESSION_COOKIE_NAME } from '@/app/lib/session-cookie';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body as { currentPassword?: string; newPassword?: string };

    if (!currentPassword || currentPassword.length > 128) {
      return NextResponse.json({ success: false, message: '请输入当前密码。' }, { status: 400 });
    }
    if (!newPassword || newPassword.length < 8 || newPassword.length > 128) {
      return NextResponse.json({ success: false, message: '新密码长度需要为 8–128 位。' }, { status: 400 });
    }
    if (currentPassword === newPassword) {
      return NextResponse.json({ success: false, message: '新密码不能与当前密码相同。' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value || '';
    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ success: false, message: '登录状态已过期，请重新登录。' }, { status: 401 });
    }

    const changed = await changeUserPassword(user.id, currentPassword, newPassword);
    if (!changed) {
      return NextResponse.json({ success: false, message: '当前密码不正确。' }, { status: 401 });
    }

    const nextToken = await createSession(user.id);
    const response = NextResponse.json({ success: true, message: '密码修改成功，其他登录状态已退出。' });
    setSessionCookie(response, nextToken);
    return response;
  } catch (error) {
    console.error('Change password failed', error);
    return NextResponse.json({ success: false, message: '密码修改服务暂时不可用，请稍后重试。' }, { status: 500 });
  }
}
