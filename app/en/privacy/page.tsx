import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Toolly',
  description: 'Learn how Toolly handles account data, the essential session cookie, tool inputs, files, online translation, and any future Google advertising.',
  alternates: {
    canonical: '/en/privacy',
    languages: { 'zh-CN': '/privacy', en: '/en/privacy' },
  },
};

export default function EnglishPrivacyPage() {
  return (
    <main lang="en" className="bg-[#f7fbff] px-6 py-12 text-slate-700 lg:px-8 lg:py-16">
      <article className="mx-auto max-w-4xl">
        <header className="rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-8 text-white shadow-xl sm:p-12">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-200">Toolly legal information</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Privacy Policy</h1>
          <p className="mt-5 max-w-3xl leading-8 text-blue-100">This policy explains the information Toolly handles when providing accounts and online tools, why it is handled, and the conditions that must be met before advertising is enabled.</p>
          <p className="mt-5 text-sm font-bold text-blue-200">Effective and last updated: July 15, 2026</p>
        </header>

        <div className="mt-8 space-y-6">
          <section className="rounded-[2rem] border border-blue-100 bg-blue-50 p-7">
            <h2 className="text-2xl font-black text-slate-950">Current advertising status</h2>
            <p className="mt-4 leading-8">Toolly does not currently enable Google AdSense or another third-party advertising service. Toolly&apos;s present advertising configuration therefore does not load personalized ads. Advertising will only be enabled after site review, required disclosures, and consent management for applicable regions are ready; this policy will be updated when that happens.</p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">1. Account and session information</h2>
            <div className="mt-4 space-y-4 leading-8">
              <p>When you register, Toolly handles your email address, a randomly generated user identifier, account creation time, and service status. Your password is not stored in plain text; a randomly salted cryptographic hash is stored instead.</p>
              <p>After sign-in, Toolly sets an essential session cookie named <code className="rounded bg-slate-100 px-2 py-1 text-sm">toolly_token</code>. It identifies the signed-in session and is HttpOnly, Secure in production, SameSite=Lax, and valid for no more than 30 days. Signing out clears the browser cookie and invalidates the current server session.</p>
              <p>This cookie is necessary for account features and is not used for advertising personalization. Blocking it prevents sign-in from working correctly.</p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">2. Tool input, files, and online services</h2>
            <div className="mt-4 space-y-4 leading-8">
              <p><strong className="text-slate-950">Local browser processing:</strong> Text, images, or files explicitly marked as locally processed stay in the current browser first. Toolly does not add locally processed input to your account.</p>
              <p><strong className="text-slate-950">Compatible PDF conversion:</strong> If the browser cannot parse a supported PDF and you choose to continue, the file is uploaded to the Toolly server for that request to generate the result. The application does not intentionally keep it as a long-term user document. Do not upload confidential material that should not be handled by an online service.</p>
              <p><strong className="text-slate-950">Online translation:</strong> Translation text is sent to the Toolly server and forwarded to a Google translation endpoint to return the result. Do not enter passwords, identity information, unpublished business material, or other sensitive content.</p>
              <p>Other features that clearly require online processing send the submitted content to Toolly&apos;s server for that request. The page will describe the processing method where practical.</p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">3. Operations, security, and service providers</h2>
            <p className="mt-4 leading-8">Infrastructure providers used for hosting, databases, network delivery, security, and troubleshooting may process necessary request metadata such as IP address, time, browser or device information, request path, and error details. Toolly uses this information to operate, secure, and troubleshoot the service, not to sell personal information.</p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">4. Retention and your choices</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 leading-8">
              <li>Active sessions last no more than 30 days; signing out invalidates the current session.</li>
              <li>Account records are retained while needed to provide the account service. A signed-in user can verify the current password, remove the account record from the active account database, and invalidate related sessions from the account center.</li>
              <li>Your browser and device control locally processed content and any downloaded files.</li>
              <li>Compatible-conversion and online-request content is not intentionally maintained by Toolly as a long-term user file library.</li>
            </ul>
            <p className="mt-4 leading-8">Use the private self-service control in the <Link href="/en/membership" className="font-bold text-blue-700 underline underline-offset-4">account center</Link> to remove the active account record. If you cannot sign in or have forgotten the password, Toolly does not yet offer a verified private recovery channel; do not place account data in a public issue. For non-sensitive product questions, read the <Link href="/en/contact" className="font-bold text-blue-700 underline underline-offset-4">contact guidance</Link>.</p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">5. If Google advertising is enabled later</h2>
            <div className="mt-4 space-y-4 leading-8">
              <p>If Google AdSense is enabled in the future, third-party vendors, including Google, may use cookies, web beacons, IP addresses, or other identifiers to serve, limit, and measure ads based on a user&apos;s prior visits to Toolly or other websites.</p>
              <p>Google&apos;s use of advertising cookies enables Google and its partners to serve ads based on visits to this site and other sites on the internet. Users can visit <Link href="https://adssettings.google.com/" className="font-bold text-blue-700 underline underline-offset-4">Google Ads Settings</Link> to control or opt out of personalized advertising.</p>
              <p>Google may process information from sites and apps that use its services. Read <Link href="https://policies.google.com/technologies/partner-sites" className="font-bold text-blue-700 underline underline-offset-4">How Google uses information from sites or apps that use its services</Link> for details about those uses and available choices.</p>
              <p>If advertising vendors other than Google are used later, Toolly will identify them and provide available opt-out information before activation.</p>
              <p>Before enabling consent-dependent advertising technology for visitors in regions such as the EEA, the United Kingdom, and Switzerland, Toolly will use a consent management platform (CMP) that meets Google&apos;s requirements, present the available choices, and provide a “Privacy and cookie settings” entry point so consent can be managed or withdrawn. Relevant advertising will not be enabled before these conditions are met.</p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">6. Children, external links, and changes</h2>
            <div className="mt-4 space-y-4 leading-8">
              <p>Toolly is not designed specifically for children. Minors should use it with a guardian&apos;s guidance and should avoid submitting personal or sensitive information.</p>
              <p>The site may link to external services such as GitHub and Google. Their own policies govern their handling of information.</p>
              <p>When features, providers, or legal requirements change materially, this page will be updated with a new date and revised content.</p>
            </div>
          </section>

          <nav aria-label="Related privacy pages" className="flex flex-wrap gap-3 rounded-[2rem] border border-slate-200 bg-white p-6">
            <Link href="/en/terms" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white">Terms of Service</Link>
            <Link href="/en/contact" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-900">Contact guidance</Link>
            <Link href="/privacy" hrefLang="zh-CN" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-900">中文</Link>
          </nav>
        </div>
      </article>
    </main>
  );
}
