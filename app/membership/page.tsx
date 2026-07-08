import Link from 'next/link';
import MembershipPanel from '@/app/components/MembershipPanel';

export const metadata = {
  title: 'Toolly 会员与翻译内测 | 注册后可体验在线翻译',
  description: 'Toolly 会员页面说明当前已开放的翻译体验范围、免费本地工具与真实支付状态，避免对用户作出未上线的商业承诺。',
  alternates: { canonical: '/membership' },
};

export default function MembershipPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10 lg:px-8">
      <header className="mb-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">会员与翻译内测</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">当前只有在线翻译需要登录体验</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Toolly 的关键词提取、SEO 标题、文案润色和摘要生成功能已经开放为免费本地工具。当前保留会员状态的主要用途，是为在线翻译服务提供体验入口。
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">现在能用什么</h2>
            <ul className="mt-5 space-y-3 text-slate-600 leading-7">
              <li>• 大多数文档、图片、文本和开发工具无需注册即可直接使用。</li>
              <li>• 在线翻译仍需登录后体验，因为该功能会调用在线服务。</li>
              <li>• 结果页始终以真实输出为准，不承诺尚未上线的计费能力。</li>
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">免费本地工具</h3>
              <p className="mt-4 text-slate-600 leading-7">关键词提取、SEO 标题、文案润色、摘要生成、JSON 处理、图片压缩等均可直接在浏览器中完成，无需等待支付或开通会员。</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">翻译体验说明</h3>
              <p className="mt-4 text-slate-600 leading-7">注册用户当前可体验在线翻译。真实续费与支付暂未开放，因此页面不会展示任何伪支付承诺。</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">如何开始</h2>
            <ol className="mt-5 space-y-3 text-slate-600 leading-7 list-decimal list-inside">
              <li>先在工具目录中直接使用免费本地工具。</li>
              <li>如果需要在线翻译，再进入登录页注册或登录。</li>
              <li>真实支付上线前，不会要求你在 Toolly 内完成付款。</li>
            </ol>
          </div>
        </div>

        <aside className="space-y-6">
          <MembershipPanel />
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm text-slate-600">
            <h2 className="text-2xl font-semibold text-slate-900">当前原则</h2>
            <ul className="mt-5 space-y-3 leading-7">
              <li>• 不把本地即可完成的工具强行锁成会员。</li>
              <li>• 不展示未上线的真实支付承诺。</li>
              <li>• 仅在确实依赖在线服务时提示登录或会员状态。</li>
            </ul>
          </div>
        </aside>
      </section>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/tools" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
          查看工具目录
        </Link>
        <Link href="/auth" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-100">
          登录 / 注册
        </Link>
      </div>
    </main>
  );
}
