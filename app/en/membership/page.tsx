import Link from 'next/link';
import MembershipPanel from '@/app/components/MembershipPanel';

export const metadata = {
  title: 'Toolly Account Center | Manage Sign-in and Privacy',
  description: 'Manage your free Toolly account, change the current password, sign out active sessions, or securely delete the active account record and sessions.',
  alternates: { canonical: '/en/membership', languages: { 'zh-CN': '/membership', en: '/en/membership' } },
};

export default function EnglishMembershipPage() {
  return (
    <main lang="en" className="relative isolate min-h-screen overflow-hidden px-4 py-6 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(circle_at_18%_16%,rgba(59,130,246,0.2),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(124,58,237,0.17),transparent_30%),linear-gradient(180deg,#f8fbff_0%,transparent_90%)]" />
      <div className="mx-auto max-w-6xl">
        <header className="overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-7 text-white shadow-[0_30px_80px_rgba(30,64,175,0.2)] sm:rounded-[2.75rem] sm:p-12">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-200">Account center</p>
          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">Manage your Toolly account in one place.</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-blue-100">Check sign-in status, change your password, sign out, or remove the active account record and all sessions. Current tools remain free to registered users.</p>
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <MembershipPanel locale="en" />
          <div className="space-y-6">
            <article className="rounded-[2.25rem] border border-blue-100 bg-blue-50/80 p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">Privacy first</p>
              <h2 className="mt-4 text-2xl font-black text-slate-950">Know what happens to your data</h2>
              <p className="mt-4 leading-7 text-slate-600">Browser-local tools keep input on the current device whenever practical. Online processing and account data are described in the privacy policy.</p>
              <Link href="/en/privacy" className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white">Read privacy policy</Link>
            </article>
            <article className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-950">Continue with a real task</h2>
              <p className="mt-4 leading-7 text-slate-600">Browse document, image, text, and developer tools, then copy or download the result.</p>
              <Link href="/en/tools" className="mt-6 inline-flex rounded-full border border-slate-200 px-6 py-3 text-sm font-black text-slate-950">Browse all tools</Link>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
