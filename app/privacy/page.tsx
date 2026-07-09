import Link from 'next/link';

export const metadata = {
  title: '隐私政策 - Toolly',
  description: '阅读 Toolly 隐私政策与广告说明，了解浏览器本地文件处理、账号数据、Cookie、第三方广告服务及用户内容的处理方式。',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12 lg:px-8">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-slate-900">隐私政策</h1>
        <p className="mt-3 text-slate-600">本页面说明 Toolly 如何收集、使用和保护用户数据，以及广告服务的使用方式。</p>
      </header>

      <section className="space-y-6 text-slate-700">
        <h2 className="text-xl font-semibold">1. 数据收集</h2>
        <p>我们可能会收集用于登录、会话管理和提升服务体验的基础信息，例如电子邮件地址与会话标识。所有敏感信息在存储前应进行加密与保护。</p>

        <h2 className="text-xl font-semibold">2. Cookie 与本地数据</h2>
        <p>网站使用 Cookie 用于会话验证与偏好保存。你可以在浏览器中管理或删除 Cookie，但这可能影响部分功能。</p>

        <h2 className="text-xl font-semibold">3. 广告与第三方服务</h2>
        <p>
          Toolly 在页面中预留广告位并可接入第三方广告网络（例如 Google AdSense）。这些广告网络可能会收集与使用匿名的设备和行为信息用于投放个性化广告。若需禁用个性化广告，请在相关广告网络中进行设置。
        </p>

        <h2 className="text-xl font-semibold">4. 联系方式</h2>
        <p>
          如需咨询隐私问题或申请删除账号数据，请在
          <Link href="https://github.com/xieshaomiao/tools/issues" className="mx-1 font-semibold text-blue-700 underline underline-offset-4">Toolly GitHub 项目</Link>
          提交 Issue。请勿在公开 Issue 中填写密码、身份证号或其他敏感信息。
        </p>

        <div className="mt-8">
          <Link href="/" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">返回首页</Link>
        </div>
      </section>
    </main>
  );
}
