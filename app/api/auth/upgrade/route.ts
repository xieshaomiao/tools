import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    success: false,
    message: 'Toolly 当前未开放续费或在线支付；当前已上线工具对免费账号开放。',
  }, { status: 410 });
}
