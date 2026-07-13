import Link from 'next/link';

type TrustPageKind = 'about' | 'terms' | 'contact';
type TrustLocale = 'zh' | 'en';

type TrustSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const pageContent: Record<TrustLocale, Record<TrustPageKind, {
  eyebrow: string;
  title: string;
  intro: string;
  updated?: string;
  sections: TrustSection[];
}>> = {
  zh: {
    about: {
      eyebrow: '关于 Toolly',
      title: '把常用任务变成可带走的结果',
      intro: 'Toolly 是一个网站端在线工具箱，聚焦文档转换、图片、文本和开发者常用任务。我们优先把路径做短：找到工具、处理内容、复制或下载结果。',
      sections: [
        { title: '网站提供什么', paragraphs: ['当前网站提供 PDF 与办公文档转换、图片压缩与格式转换、JSON、CSV、二维码、编码解码、文本处理等工具。工具说明页可以公开浏览，操作区需要免费账号。'], bullets: ['真实结果，而不是只展示演示', '能够本地完成的任务优先留在浏览器', '手机和电脑浏览器均可访问', '中英文工具目录与独立工具页面'] },
        { title: '我们如何做取舍', paragraphs: ['文件格式并不总能完美互转。例如扫描 PDF 没有文字层，复杂排版转换成 Word 后也可能需要人工调整。页面会尽量解释这些边界，不把不确定结果包装成保证。'] },
        { title: '网站与广告', paragraphs: ['Toolly 当前未启用第三方广告。未来只有在网站内容、隐私披露、同意管理和广告平台审核均准备好后，才会在原创内容页的安全位置小规模启用广告，不会把广告伪装成下载、导航或工具按钮。'] },
        { title: '公开项目与反馈', paragraphs: ['网站代码与问题跟踪位于 GitHub。公开渠道适合提交不含隐私信息的功能建议和错误复现；账号、密码、证件和私密文件不得发布到公开 Issue。'] },
      ],
    },
    terms: {
      eyebrow: 'Toolly 法律信息',
      title: '服务条款',
      intro: '使用 Toolly 前，请了解账号、文件处理、结果核对和允许使用范围。继续使用网站即表示你同意遵守这些条款和隐私政策。',
      updated: '生效及最近更新：2026 年 7 月 13 日',
      sections: [
        { title: '1. 服务范围', paragraphs: ['Toolly 提供网站端在线工具和免费账号。功能、支持格式和处理方式以具体页面当时显示为准；网站可能为了安全、维护或可靠性调整功能。'] },
        { title: '2. 账号责任', paragraphs: ['你应提供自己有权使用的邮箱并妥善保管密码。不得共享账号从事滥用、自动攻击、绕过限制或影响其他用户的行为。发现异常时应修改密码并退出其他会话。'] },
        { title: '3. 文件与内容权限', paragraphs: ['你只能处理自己拥有或已获授权的文件和内容。不得使用 Toolly 侵犯版权、隐私、商业秘密，或绕过未知密码、访问控制和文档权限。请勿提交法律禁止处理的内容。'] },
        { title: '4. 结果核对', paragraphs: ['文档转换、文字提取、翻译、摘要和格式处理可能因源文件、字体、编码、扫描质量或浏览器差异产生变化。重要合同、金额、身份信息、日期和专业内容必须由你在使用前自行核对。Toolly 不提供法律、财务或医疗意见。'] },
        { title: '5. 可接受使用', paragraphs: [], bullets: ['不得上传恶意代码或利用请求攻击网站与第三方', '不得批量创建账号、爬取私密接口或绕过速率与登录限制', '不得用自动化点击、刷新或诱导方式制造广告展示和点击', '不得冒充他人、传播违法内容或损害他人权利'] },
        { title: '6. 可用性与责任边界', paragraphs: ['网站按当前可用状态提供，不保证永不中断或适合所有用途。对于可预见的重要任务，请保留源文件和本地备份。适用法律不允许排除的责任不受本条影响。'] },
        { title: '7. 隐私、广告与变更', paragraphs: ['数据处理以隐私政策为准。当前广告关闭；未来启用前会完成必要披露和同意管理。条款发生实质变化时会更新日期；如你不同意更新后的条款，应停止使用。'] },
      ],
    },
    contact: {
      eyebrow: '联系与支持',
      title: '先选择正确的反馈渠道',
      intro: '公开问题可以在 GitHub 提交；账号和隐私信息不要放进公开渠道。登录用户可在账号中心修改密码、退出或删除活动账号记录。',
      sections: [
        { title: '功能错误与建议', paragraphs: ['如果页面打不开、按钮无响应、转换结果异常或你有新工具建议，可在 GitHub Issues 提交。请写明页面网址、浏览器、复现步骤和不含隐私的错误提示。'] },
        { title: '账号与安全', paragraphs: ['登录后可在账号中心修改密码并使其他会话退出，也可以验证当前密码后删除活动账号记录。若无法登录或忘记密码，Toolly 暂无经过验证的私密找回渠道；不要在 GitHub 公开邮箱、密码、会话信息或身份资料。'] },
        { title: '文件与隐私', paragraphs: ['不要上传原始身份证、完整合同、医疗记录或客户数据作为错误附件。需要说明文件问题时，请制作去除姓名、联系方式、编号和业务内容的最小复现文件。'] },
        { title: '广告合作', paragraphs: ['Toolly 当前没有启用第三方广告，也不会出售广告位或接受要求诱导点击的合作。广告平台审核和真实发布商信息准备完成后，网站才会按政策启用。'] },
      ],
    },
  },
  en: {
    about: {
      eyebrow: 'About Toolly',
      title: 'Turn everyday tasks into usable results',
      intro: 'Toolly is a website-only toolbox for document conversion, images, text, and developer tasks. The product is designed around a short path: find the right tool, process the input, then copy or download the result.',
      sections: [
        { title: 'What the website provides', paragraphs: ['The current website includes PDF and office document conversion, image compression and conversion, JSON, CSV, QR codes, encoding utilities, and text tools. Public pages explain each tool, while the workspace requires a free account.'], bullets: ['Real output rather than demo-only screens', 'Browser-local processing whenever practical', 'Desktop and mobile browser support', 'Chinese and English tool directories'] },
        { title: 'Honest limitations', paragraphs: ['File formats do not always convert perfectly. Scanned PDFs may have no text layer, and complex layouts can need manual adjustment after Word conversion. Toolly explains these limits instead of promising an exact result in every case.'] },
        { title: 'Advertising status', paragraphs: ['Toolly does not currently serve third-party ads. Ads may only be enabled after content, privacy disclosures, consent management, and ad-network review are ready, and then only in clearly separated positions on original content pages.'] },
        { title: 'Open project and feedback', paragraphs: ['The public code and issue tracker are on GitHub. Use public issues only for non-sensitive bug reports and feature requests. Never publish account data, passwords, identity documents, or private files there.'] },
      ],
    },
    terms: {
      eyebrow: 'Toolly legal',
      title: 'Terms of service',
      intro: 'These terms explain account responsibility, file processing, result verification, and acceptable use. By continuing to use Toolly, you agree to these terms and the privacy policy.',
      updated: 'Effective and last updated: July 13, 2026',
      sections: [
        { title: '1. Service scope', paragraphs: ['Toolly provides website-based tools and free accounts. Available formats and processing behavior are described on each page and may change for security, maintenance, or reliability.'] },
        { title: '2. Account responsibility', paragraphs: ['Use an email address you are authorized to use and keep your password secure. Do not share accounts for abuse, automated attacks, restriction bypasses, or interference with other users.'] },
        { title: '3. Rights to files and content', paragraphs: ['Only process material you own or are authorized to use. Do not use Toolly to infringe copyright, privacy, trade secrets, or to bypass unknown passwords, access controls, or document permissions.'] },
        { title: '4. Verify important results', paragraphs: ['Conversion, extraction, translation, summarization, and formatting can change because of fonts, encodings, scans, layouts, and browser differences. Verify contracts, amounts, names, dates, and professional content before relying on a result. Toolly does not provide legal, financial, or medical advice.'] },
        { title: '5. Acceptable use', paragraphs: [], bullets: ['Do not upload malware or attack Toolly or third parties', 'Do not mass-create accounts or bypass login and rate limits', 'Do not generate artificial ad impressions or clicks', 'Do not impersonate others or violate applicable law'] },
        { title: '6. Availability and liability', paragraphs: ['The service is provided as available and is not guaranteed to be uninterrupted or suitable for every purpose. Keep source files and local backups for important work. Nothing here excludes liability that cannot be excluded under applicable law.'] },
        { title: '7. Privacy, advertising, and changes', paragraphs: ['Data use is governed by the privacy policy. Ads are currently off and will not be enabled before required disclosures and consent controls are ready. Material changes will update the date above.'] },
      ],
    },
    contact: {
      eyebrow: 'Contact and support',
      title: 'Choose the right feedback channel',
      intro: 'Public product issues can be reported on GitHub. Never place account or private information in a public channel. Use the existing account controls for password changes and sign-out.',
      sections: [
        { title: 'Bugs and feature requests', paragraphs: ['Use GitHub Issues for pages that fail to load, controls that do not respond, unexpected conversion results, or new tool ideas. Include the page URL, browser, reproduction steps, and a non-sensitive error message.'] },
        { title: 'Account and security', paragraphs: ['Signed-in users can change their password and invalidate other sessions, or verify the current password and remove the active account record in the English account center. If sign-in is unavailable or the password is forgotten, Toolly does not yet provide a verified private recovery channel. Do not publish email addresses, passwords, session data, or identity information on GitHub.'] },
        { title: 'Files and privacy', paragraphs: ['Do not attach unredacted identity documents, contracts, medical records, or customer data. Create a minimal reproduction file with names, contact details, identifiers, and business content removed.'] },
        { title: 'Advertising', paragraphs: ['Toolly does not currently serve third-party ads and does not accept arrangements that encourage ad clicks. Ads will only be enabled after platform review and real publisher configuration.'] },
      ],
    },
  },
};

export default function TrustPage({ kind, locale }: { kind: TrustPageKind; locale: TrustLocale }) {
  const copy = pageContent[locale][kind];
  const isEnglish = locale === 'en';
  const homeHref = isEnglish ? '/en' : '/';
  const toolsHref = isEnglish ? '/en/tools' : '/tools';
  const privacyHref = isEnglish ? '/en/privacy' : '/privacy';

  return (
    <main lang={isEnglish ? 'en' : 'zh-CN'} className="bg-[#f7fbff] px-6 py-12 text-slate-700 lg:px-8 lg:py-16">
      <article className="mx-auto max-w-4xl">
        <header className="rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-8 text-white shadow-xl sm:p-12">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-200">{copy.eyebrow}</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl leading-8 text-blue-100">{copy.intro}</p>
          {copy.updated ? <p className="mt-5 text-sm font-bold text-blue-200">{copy.updated}</p> : null}
        </header>

        <div className="mt-8 space-y-6">
          {copy.sections.map((section) => (
            <section key={section.title} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-black text-slate-950">{section.title}</h2>
              <div className="mt-4 space-y-4 leading-8">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.bullets ? (
                <ul className="mt-5 list-disc space-y-3 pl-6 leading-8">
                  {section.bullets.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
            </section>
          ))}

          {kind === 'contact' ? (
            <section className="rounded-[2rem] border border-blue-100 bg-blue-50 p-7">
              <h2 className="text-2xl font-black text-slate-950">{isEnglish ? 'Open the public issue tracker' : '打开公开问题跟踪'}</h2>
              <p className="mt-4 leading-8">{isEnglish ? 'Use this only for non-sensitive product feedback.' : '仅用于不含敏感信息的产品反馈。'}</p>
              <Link href="https://github.com/xieshaomiao/tools/issues" className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white">GitHub Issues</Link>
            </section>
          ) : null}

          <nav aria-label={isEnglish ? 'Related pages' : '相关页面'} className="flex flex-wrap gap-3 rounded-[2rem] border border-slate-200 bg-white p-6">
            <Link href={homeHref} className="rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white">{isEnglish ? 'Home' : '首页'}</Link>
            <Link href={toolsHref} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-900">{isEnglish ? 'Tools' : '工具目录'}</Link>
            <Link href={privacyHref} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-900">{isEnglish ? 'Privacy' : '隐私政策'}</Link>
          </nav>
        </div>
      </article>
    </main>
  );
}
