import Link from 'next/link';
import MembershipPanel from '@/app/components/MembershipPanel';

export const metadata = {
  title: 'Toolly 会员计划 | 半年免费体验与付费升级',
  description: 'Toolly 会员提供半年免费体验，高级 SEO、翻译和文案润色工具，帮助您获取更多流量和转化。',
};

export default function MembershipPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10 lg:px-8">
      <header className="mb-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">会员计划</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">前半年免费，Toolly 高级会员</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          解锁真实可用的高级工具服务：SEO 标题生成、关键词提取、翻译助手、文案润色和摘要生成。前半年免费体验，后续按月/按年订阅。 
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">会员权益</h2>
            <ul className="mt-5 space-y-3 text-slate-600 leading-7">
              <li>• 前半年免费使用所有付费工具，零门槛热身会员。</li>
              <li>• 解锁 SEO 标题、关键词、翻译、文案润色等高级服务。</li>
              <li>• 持续优化页面转化与广告流量，适合站长与内容运营。 </li>
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">免费试用</h3>
              <p className="mt-4 text-slate-600 leading-7">立即注册后可获得 6 个月的会员体验，期间所有高级工具免费。适合吸引新用户并提升站点留存。</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">付费方案</h3>
              <p className="mt-4 text-slate-600 leading-7">试用期结束后，可选择按月或按年订阅。可继续使用所有高级工具并享受优先更新。 </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">如何使用</h2>
            <ol className="mt-5 space-y-3 text-slate-600 leading-7 list-decimal list-inside">
              <li>浏览工具目录并选择付费工具页面。</li>
              <li>点击“会员半年免费”注册并获取会员资格。</li>
              <li>体验高级服务，吸引流量并打造转化页面。</li>
            </ol>
          </div>
        </div>

        <aside className="space-y-6">
          <MembershipPanel />
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm text-slate-600">
            <h2 className="text-2xl font-semibold text-slate-900">会员推广亮点</h2>
            <ul className="mt-5 space-y-3 leading-7">
              <li>• 将“半年免费”作为广告标题引流，吸引新用户点击。</li>
              <li>• 使用工具页为会员入口导流，提升页面停留与转化。</li>
              <li>• 在广告位与落地页上放置会员优惠，提高付费转化率。</li>
            </ul>
            <div className="mt-8 rounded-[1.75rem] bg-emerald-50 p-6 text-emerald-900">
              <p className="font-semibold">提示：</p>
              <p className="mt-3 text-sm">当前工具已升级为真实可用服务占位，后续可接入付费 API 和会员系统。</p>
            </div>
          </div>
        </aside>
      </section>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/tools" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
          查看付费工具
        </Link>
        <Link href="/" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-100">
          返回首页
        </Link>
      </div>
    </main>
  );
}
