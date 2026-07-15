import Link from 'next/link';

export const metadata = {
  title: '隐私政策 - Toolly',
  description: '了解 Toolly 如何处理账号、会话 Cookie、工具输入、文件、在线翻译及未来可能启用的 Google 广告。',
  alternates: {
    canonical: '/privacy',
    languages: { 'zh-CN': '/privacy', en: '/en/privacy' },
  },
};

const updatedAt = '2026 年 7 月 15 日';

export default function PrivacyPage() {
  return (
    <main className="bg-[#f7fbff] px-6 py-12 text-slate-700 lg:px-8 lg:py-16">
      <article className="mx-auto max-w-4xl">
        <header className="rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-8 text-white shadow-xl sm:p-12">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-200">Toolly 法律信息</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">隐私政策</h1>
          <p className="mt-5 max-w-3xl leading-8 text-blue-100">
            本政策说明 Toolly 在提供账号和在线工具时处理哪些信息、为什么处理，以及广告未来启用前需要满足的条件。
          </p>
          <p className="mt-5 text-sm font-bold text-blue-200">生效及最近更新：{updatedAt}</p>
        </header>

        <div className="mt-8 space-y-6">
          <section className="rounded-[2rem] border border-blue-100 bg-blue-50 p-7">
            <h2 className="text-2xl font-black text-slate-950">当前广告状态</h2>
            <p className="mt-4 leading-8">
              Toolly 当前未启用 Google AdSense 或其他第三方广告投放，页面不会因 Toolly 的广告配置而加载个性化广告。未来只有在完成站点审核、隐私披露和适用地区的同意管理后，才会启用广告；启用时本政策也会相应更新。
            </p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">1. 账号与会话信息</h2>
            <div className="mt-4 space-y-4 leading-8">
              <p>注册时，Toolly 处理你的邮箱地址、随机生成的用户标识、账号创建时间及服务状态。密码本身不会以明文保存，而是使用随机盐值和加密哈希保存。</p>
              <p>
                登录后，Toolly 设置名为 <code className="rounded bg-slate-100 px-2 py-1 text-sm">toolly_token</code> 的必要会话 Cookie。它用于识别登录状态，设置为 HttpOnly、生产环境 Secure、SameSite=Lax，最长有效期为 30 天；退出登录时会清除浏览器中的 Cookie，并使当前服务端会话失效。
              </p>
              <p>这是一项账号功能所必需的 Cookie，不用于广告个性化。禁用它会导致登录功能无法正常工作。</p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">2. 工具输入、文件与在线服务</h2>
            <div className="mt-4 space-y-4 leading-8">
              <p><strong className="text-slate-950">浏览器本地处理：</strong>页面明确标注为本地处理的文本、图片或文件会优先留在当前浏览器中。Toolly 不会因为本地处理而把输入保存到账户。</p>
              <p><strong className="text-slate-950">PDF 兼容转换：</strong>当浏览器无法解析支持的 PDF 且你主动继续转换时，文件会在该次请求中上传到 Toolly 服务端以生成结果。应用不会把文件作为用户文档长期保存；请勿上传不应交由在线服务处理的机密材料。</p>
              <p><strong className="text-slate-950">在线翻译：</strong>翻译文本会发送到 Toolly 服务端，并转发至 Google 的翻译接口以返回结果。请不要输入密码、身份信息、未公开商业资料或其他敏感内容。</p>
              <p>其他明确需要在线处理的功能会把你提交的内容发送到 Toolly 服务端完成当次请求。页面会尽可能说明处理方式。</p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">3. 运行、安全与服务提供方</h2>
            <p className="mt-4 leading-8">
              为提供托管、数据库、网络传输、安全和故障排查，相关基础设施提供方可能处理必要的请求元数据，例如 IP 地址、时间、浏览器或设备信息、请求路径和错误信息。Toolly 将这些信息用于运行、安全和排障，而不是出售个人资料。
            </p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">4. 保存期限与选择</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 leading-8">
              <li>有效会话最长 30 天；退出会使当前会话失效。</li>
              <li>账号资料会在提供账号服务所需期间保留。登录后可在账号中心验证当前密码，从活动账号数据库中删除账号记录，相关登录会话会同时删除。</li>
              <li>本地处理内容由你的浏览器和设备控制；关闭页面或删除本地下载文件由你自行管理。</li>
              <li>兼容转换和在线功能的请求内容不会被 Toolly 作为用户文件库长期保存。</li>
            </ul>
            <p className="mt-4 leading-8">
              如需删除账号，请使用<Link href="/membership" className="mx-1 font-bold text-blue-700 underline underline-offset-4">账号中心</Link>的私密自助入口。若无法登录或忘记密码，Toolly 目前还没有经过验证的私密找回渠道，请不要在公开 Issue 中提交账号资料；非敏感产品问题可阅读<Link href="/contact" className="mx-1 font-bold text-blue-700 underline underline-offset-4">联系说明</Link>。
            </p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">5. 未来启用 Google 广告时</h2>
            <div className="mt-4 space-y-4 leading-8">
              <p>如果未来启用 Google AdSense，第三方供应商（包括 Google）可能使用 Cookie、网络信标、IP 地址或其他标识符，根据用户先前访问 Toolly 或其他网站的情况投放、限制和衡量广告。</p>
              <p>
                Google 使用广告 Cookie 后，Google 及其合作伙伴可依据用户对本站或互联网其他网站的访问投放广告。用户可前往
                <Link href="https://adssettings.google.com/" className="mx-1 font-bold text-blue-700 underline underline-offset-4">Google 广告设置</Link>
                管理或退出个性化广告。
              </p>
              <p>
                Google 可能会处理来自使用其服务的网站和应用的信息。可阅读
                <Link href="https://policies.google.com/technologies/partner-sites" className="mx-1 font-bold text-blue-700 underline underline-offset-4">Google 如何使用合作网站或应用中的信息</Link>
                了解相关用途与选择。
              </p>
              <p>若以后使用 Google 以外的广告供应商，Toolly 会在启用前补充供应商及其退出方式。</p>
              <p>面向欧洲经济区、英国和瑞士等适用地区启用需要同意的广告技术前，Toolly 会使用符合 Google 要求的同意管理平台（CMP）展示选择，并提供“隐私和 Cookie 设置”入口，以便用户管理或撤回同意。在这些条件未满足前不会启用相关广告投放。</p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">6. 儿童、外部链接与政策变更</h2>
            <div className="mt-4 space-y-4 leading-8">
              <p>Toolly 不是专门面向儿童设计的服务。未成年人应在监护人指导下使用，并避免提交个人或敏感信息。</p>
              <p>本站可能链接至 GitHub、Google 等外部网站；外部网站的数据处理受其自身政策约束。</p>
              <p>功能、供应商或法律要求发生实质变化时，本页面会更新日期和内容。继续使用前请查看最新版本。</p>
            </div>
          </section>

          <nav aria-label="隐私政策相关页面" className="flex flex-wrap gap-3 rounded-[2rem] border border-slate-200 bg-white p-6">
            <Link href="/terms" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white">服务条款</Link>
            <Link href="/contact" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-900">联系说明</Link>
            <Link href="/en/privacy" hrefLang="en" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-900">English</Link>
          </nav>
        </div>
      </article>
    </main>
  );
}
