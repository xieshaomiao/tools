import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    success: false,
    message: 'Toolly 当前未开放续费或在线支付。现有免费体验到期后，请等待正式服务通知。',
  }, { status: 410 });
}
