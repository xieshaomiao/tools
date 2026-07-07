import { NextResponse } from 'next/server';
import { registerUser, createSession } from '@/app/lib/auth';
import { setSessionCookie } from '@/app/lib/session-cookie';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body as { email?: string; password?: string };
    const normalizedEmail = email?.trim().toLowerCase() ?? '';
    if (normalizedEmail.length > 254 || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return NextResponse.json({ success: false, message: '请输入有效的邮箱地址。' }, { status: 400 });
    }
    if (!password || password.length < 8) {
      return NextResponse.json({ success: false, message: '密码至少需要 8 位。' }, { status: 400 });
    }
    if (password.length > 128) {
      return NextResponse.json({ success: false, message: '密码不能超过 128 位。' }, { status: 400 });
    }

    const result = await registerUser(normalizedEmail, password);
    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 409 });
    }

    const token = await createSession(result.user.id);
    const response = NextResponse.json({
      success: true,
      message: result.message,
      user: { email: result.user.email, membershipExpiry: result.user.membershipExpiry },
    });
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error('Register failed', error);
    return NextResponse.json({ success: false, message: '注册服务暂时不可用，请稍后重试。' }, { status: 500 });
  }
}
