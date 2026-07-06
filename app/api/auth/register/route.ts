import { NextResponse } from 'next/server';
import { registerUser, createSession } from '@/app/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body as { email: string; password: string };
  if (!email || !password) {
    return NextResponse.json({ success: false, message: '邮箱和密码不能为空。' }, { status: 400 });
  }

  const result = await registerUser(email, password);
  if (!result.success) {
    return NextResponse.json({ result, status: 400 });
  }

  const user = result.user!;
  const token = await createSession(user.id);
  return NextResponse.json({ success: true, message: result.message, token, user: { email: user.email, membershipExpiry: user.membershipExpiry } });
}
