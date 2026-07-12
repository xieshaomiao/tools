import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getMembershipStatus, getUserFromToken } from '@/app/lib/auth';
import { SESSION_COOKIE_NAME } from '@/app/lib/session-cookie';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value || '';
    const user = await getUserFromToken(token);
    const membership = getMembershipStatus(user);

    return NextResponse.json({
      serviceAvailable: true,
      isAuthenticated: Boolean(user),
      isMember: membership.isActive,
      email: user?.email ?? null,
      expiresAt: membership.expiresAt,
      remainingDays: membership.remainingDays,
    });
  } catch (error) {
    console.error('Auth status check failed', error);
    return NextResponse.json({
      serviceAvailable: false,
      isAuthenticated: false,
      isMember: false,
      email: null,
      expiresAt: null,
      remainingDays: 0,
    });
  }
}
