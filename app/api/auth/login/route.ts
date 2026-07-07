import { NextResponse } from 'next/server';
import { authenticateUser, createSession } from '@/app/lib/auth';
import { setSessionCookie } from '@/app/lib/session-cookie';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body as { email?: string; password?: string };
    if (!email || !password) {
      return NextResponse.json({ success: false, message: '邮箱和密码不能为空。' }, { status: 400 });
    }
    if (email.length > 254 || password.length > 128) {
      return NextResponse.json({ success: false, message: '邮箱或密码格式不正确。' }, { status: 400 });
    }

    const user = await authenticateUser(email, password);
    if (!user) {
      return NextResponse.json({ success: false, message: '邮箱或密码错误。' }, { status: 401 });
    }

    const token = await createSession(user.id);
    const response = NextResponse.json({
      success: true,
      message: '登录成功。',
      user: { email: user.email, membershipExpiry: user.membershipExpiry },
    });
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error('Login failed', error);
    return NextResponse.json({ success: false, message: '登录服务暂时不可用，请稍后重试。' }, { status: 500 });
  }
}
