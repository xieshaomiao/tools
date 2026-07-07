import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getMembershipStatus, getUserFromToken } from '@/app/lib/auth';
import { SESSION_COOKIE_NAME } from '@/app/lib/session-cookie';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value || '';
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
