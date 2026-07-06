import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getMembershipStatus, getUserFromToken } from '@/app/lib/auth';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('toolly_token')?.value || '';
  const user = await getUserFromToken(token);
  const membership = getMembershipStatus(user);

  return NextResponse.json({
    isAuthenticated: Boolean(user),
    isMember: membership.isActive,
    email: user?.email ?? null,
    expiresAt: membership.expiresAt,
    remainingDays: membership.remainingDays,
  });
}
