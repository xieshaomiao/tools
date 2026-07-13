import Link from 'next/link';
import MembershipPanel from '@/app/components/MembershipPanel';

export const metadata = {
  title: 'Toolly 账号与服务说明 | 登录后使用在线工具',
  description: '管理 Toolly 免费账号和密码，了解登录后文档、图片、文本与开发工具的使用范围，以及浏览器本地处理、在线翻译、复制和下载结果的方式。',
  alternates: { canonical: '/membership' },
};

const accountSteps = [
  ['01', '免费注册或登录', '使用邮箱创建账号，登录后即可进入工具操作区。'],
  ['02', '选择需要的工具', '从文档、图片、文本和开发者工具中快速找到当前任务。'],
  ['03', '复制或下载结果', '文本结果可以复制，生成的文件可以直接下载到本机。'],
];

export default function MembershipPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden px-4 py-6 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(circle_at_18%_16%,rgba(59,130,246,0.2),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(124,58,237,0.17),transparent_30%),linear-gradient(180deg,#f8fbff_0%,transparent_90%)]" />
      <div className="mx-auto max-w-7xl">
        <header className="overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-7 text-white shadow-[0_30px_80px_rgba(30,64,175,0.2)] sm:rounded-[2.75rem] sm:p-12 lg:p-16">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-200">账号中心</p>
          <div className="mt-4 grid gap-6 sm:mt-6 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">登录后使用工具，账号规则一次说清楚。</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-blue-100 sm:mt-6 sm:text-lg sm:leading-8">
                Toolly 的工具操作区需要免费账号。能在浏览器完成的内容优先本地处理；在线翻译需要网络连接，当前已上线工具不设置付费门槛。
              </p>
            </div>
            <div className="grid gap-2 text-sm font-bold sm:grid-cols-3 sm:gap-3 lg:grid-cols-1">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2.5 sm:px-5 sm:py-3">免费账号即可开始</span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2.5 sm:px-5 sm:py-3">优先浏览器本地处理</span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2.5 sm:px-5 sm:py-3">当前工具无需付款</span>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="order-2 space-y-8 lg:order-1">
            <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/85 p-8 shadow-sm backdrop-blur sm:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-700">清晰的开始路径</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">从账号到结果，只需三步</h2>
              <ol className="mt-8 grid gap-4 sm:grid-cols-3">
                {accountSteps.map(([number, title, text]) => (
                  <li key={number} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-600 text-sm font-black text-white">{number}</span>
                    <p className="mt-5 font-black text-slate-950">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <article className="rounded-[2.25rem] border border-blue-100 bg-blue-50/80 p-8">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">浏览器工具</p>
                <h2 className="mt-4 text-2xl font-black text-slate-950">登录后可使用完整操作区</h2>
                <p className="mt-4 leading-7 text-slate-600">文档转换、图片处理、文本和开发者工具都在登录后开放。页面说明仍可公开浏览，方便先判断工具是否适合当前任务。</p>
              </article>
              <article className="rounded-[2.25rem] border border-violet-100 bg-violet-50/80 p-8">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-700">在线服务</p>
                <h2 className="mt-4 text-2xl font-black text-slate-950">在线翻译对免费账号开放</h2>
                <p className="mt-4 leading-7 text-slate-600">在线翻译需要网络服务。注册或登录免费账号后即可使用，当前已上线工具不设置单独的体验到期限制。</p>
              </article>
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <h2 className="text-2xl font-black text-slate-950">我们坚持的产品原则</h2>
              <ul className="mt-6 grid gap-4 text-slate-600 sm:grid-cols-2">
                <li className="rounded-2xl bg-slate-50 p-5 leading-7"><strong className="text-slate-950">说明先行：</strong>先告诉你输入、输出和限制，再进入处理。</li>
                <li className="rounded-2xl bg-slate-50 p-5 leading-7"><strong className="text-slate-950">结果可带走：</strong>支持复制或下载的地方，会提供明确入口。</li>
                <li className="rounded-2xl bg-slate-50 p-5 leading-7"><strong className="text-slate-950">隐私优先：</strong>能本地处理的文件优先留在当前浏览器。</li>
                <li className="rounded-2xl bg-slate-50 p-5 leading-7"><strong className="text-slate-950">规则清楚：</strong>当前已上线工具均对免费账号开放，不设置隐藏收费入口。</li>
              </ul>
            </div>
          </div>

          <aside className="order-1 space-y-6 lg:order-2 lg:sticky lg:top-28 lg:self-start">
            <MembershipPanel />
            <div className="rounded-[2.25rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-xl shadow-slate-950/10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-200">继续使用</p>
              <h2 className="mt-4 text-2xl font-black">现在去完成一个真实任务</h2>
              <p className="mt-4 leading-7 text-slate-300">打开工具目录，按文档、图片、文本或开发需求选择工具。</p>
              <Link href="/tools" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-blue-50">查看工具目录</Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
