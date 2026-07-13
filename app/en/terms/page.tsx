import TrustPage from '@/app/components/TrustPage';

export const metadata = { title: 'Terms of service - Toolly', description: 'Read Toolly account responsibilities, content rights, result verification, acceptable use, and service limits.', alternates: { canonical: '/en/terms', languages: { 'zh-CN': '/terms', en: '/en/terms' } } };

export default function TermsPage() { return <TrustPage kind="terms" locale="en" />; }
