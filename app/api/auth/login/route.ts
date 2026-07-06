import { NextResponse } from 'next/server';
import { authenticateUser, createSession } from '@/app/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body as { email: string; password: string };
  if (!email || !password) {
    return NextResponse.json({ success: false, message: '邮箱和密码不能为空。' }, { status: 400 });
  }

  const user = await authenticateUser(email, password);
  if (!user) {
    return NextResponse.json({ success: false, message: '邮箱或密码错误。' }, { status: 401 });
  }

  const token = await createSession(user.id);
  return NextResponse.json({ success: true, message: '登录成功。', token, user: { email: user.email, membershipExpiry: user.membershipExpiry } });
}
