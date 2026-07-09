import { NextResponse } from 'next/server';
import { registerUser, createSession } from '@/app/lib/auth';
import { setSessionCookie } from '@/app/lib/session-cookie';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, locale } = body as { email?: string; password?: string; locale?: string };
    const isEnglish = locale === 'en';
    const normalizedEmail = email?.trim().toLowerCase() ?? '';
    if (normalizedEmail.length > 254 || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return NextResponse.json({ success: false, message: isEnglish ? 'Enter a valid email address.' : '请输入有效的邮箱地址。' }, { status: 400 });
    }
    if (!password || password.length < 8) {
      return NextResponse.json({ success: false, message: isEnglish ? 'Use a password with at least 8 characters.' : '密码至少需要 8 位。' }, { status: 400 });
    }
    if (password.length > 128) {
      return NextResponse.json({ success: false, message: isEnglish ? 'The password cannot exceed 128 characters.' : '密码不能超过 128 位。' }, { status: 400 });
    }

    const result = await registerUser(normalizedEmail, password);
    if (!result.success) {
      return NextResponse.json({ success: false, message: isEnglish ? 'This email is already registered. Sign in instead.' : result.message }, { status: 409 });
    }

    const token = await createSession(result.user.id);
    const response = NextResponse.json({
      success: true,
      message: isEnglish ? 'Account created. You are now signed in.' : '注册成功，已自动登录。',
      user: { email: result.user.email, membershipExpiry: result.user.membershipExpiry },
    });
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error('Register failed', error);
    return NextResponse.json({ success: false, message: '注册服务暂时不可用，请稍后重试。' }, { status: 500 });
  }
}
