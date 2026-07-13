import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  deleteUserAccount,
  getDeleteAccountRetryAfter,
  getUserFromToken,
  recordDeleteAccountFailure,
} from '@/app/lib/auth';
import { clearSessionCookie, SESSION_COOKIE_NAME } from '@/app/lib/session-cookie';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, confirmation, locale } = body as { password?: string; confirmation?: string; locale?: string };
    const isEnglish = locale === 'en';
    const expectedConfirmation = isEnglish ? 'DELETE ACCOUNT' : '删除账号';

    if (!password || password.length > 128) {
      return NextResponse.json({ success: false, message: isEnglish ? 'Enter your current password.' : '请输入当前密码。' }, { status: 400 });
    }
    if (confirmation !== expectedConfirmation) {
      return NextResponse.json({ success: false, message: isEnglish ? 'Enter “DELETE ACCOUNT” to confirm.' : '请输入“删除账号”确认操作。' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value || '';
    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ success: false, message: isEnglish ? 'Your session has expired. Sign in again.' : '登录状态已过期，请重新登录。' }, { status: 401 });
    }

    const retryAfter = await getDeleteAccountRetryAfter(user.id);
    if (retryAfter > 0) {
      return NextResponse.json(
        { success: false, message: isEnglish ? 'Too many incorrect attempts. Try again later.' : '密码错误次数过多，请稍后再试。' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } },
      );
    }

    const deleted = await deleteUserAccount(user.id, password);
    if (!deleted) {
      await recordDeleteAccountFailure(user.id);
      return NextResponse.json({ success: false, message: isEnglish ? 'The current password is incorrect.' : '当前密码不正确。' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: isEnglish ? 'The active account record and all sessions were deleted.' : '活动账号记录及全部登录会话已删除。' });
    clearSessionCookie(response);
    return response;
  } catch (error) {
    console.error('Delete account failed', error);
    return NextResponse.json({ success: false, message: '账号删除服务暂时不可用，请稍后重试。' }, { status: 500 });
  }
}
