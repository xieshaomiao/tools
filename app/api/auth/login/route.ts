import { NextResponse } from 'next/server';
import { authenticateUser, createSession } from '@/app/lib/auth';
import { setSessionCookie } from '@/app/lib/session-cookie';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, locale } = body as { email?: string; password?: string; locale?: string };
    const isEnglish = locale === 'en';
    if (!email || !password) {
      return NextResponse.json({ success: false, message: isEnglish ? 'Email and password are required.' : '邮箱和密码不能为空。' }, { status: 400 });
    }
    if (email.length > 254 || password.length > 128) {
      return NextResponse.json({ success: false, message: isEnglish ? 'The email or password format is invalid.' : '邮箱或密码格式不正确。' }, { status: 400 });
    }

    const user = await authenticateUser(email, password);
    if (!user) {
      return NextResponse.json({ success: false, message: isEnglish ? 'The email or password is incorrect.' : '邮箱或密码错误。' }, { status: 401 });
    }

    const token = await createSession(user.id);
    const response = NextResponse.json({
      success: true,
      message: isEnglish ? 'Signed in successfully.' : '登录成功。',
      user: { email: user.email, membershipExpiry: user.membershipExpiry },
    });
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error('Login failed', error);
    return NextResponse.json({ success: false, message: '登录服务暂时不可用，请稍后重试。' }, { status: 500 });
  }
}
