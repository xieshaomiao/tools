import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getMembershipStatus, getUserFromToken, upgradeMembership } from '@/app/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { plan } = body as { plan?: 'monthly' | 'yearly' };

  if (!plan || !['monthly', 'yearly'].includes(plan)) {
    return NextResponse.json({ success: false, message: '请选择有效的升级方案。' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('toolly_token')?.value;
  if (!token) {
    return NextResponse.json({ success: false, message: '请先登录后再升级会员。' }, { status: 401 });
  }

  const user = await getUserFromToken(token);
  if (!user) {
    return NextResponse.json({ success: false, message: '会话已过期，请重新登录。' }, { status: 401 });
  }

  const updatedUser = await upgradeMembership(user.id, plan);
  if (!updatedUser) {
    return NextResponse.json({ success: false, message: '用户未找到。' }, { status: 404 });
  }

  const membership = getMembershipStatus(updatedUser);
  return NextResponse.json({
    success: true,
    message: '会员已升级成功。',
    expiresAt: membership.expiresAt,
    remainingDays: membership.remainingDays,
  });
}
