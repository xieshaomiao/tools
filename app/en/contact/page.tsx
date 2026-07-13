import TrustPage from '@/app/components/TrustPage';

export const metadata = { title: 'Contact and support - Toolly', description: 'Learn how to report non-sensitive Toolly bugs, feature requests, account questions, and privacy concerns.', alternates: { canonical: '/en/contact', languages: { 'zh-CN': '/contact', en: '/en/contact' } } };

export default function ContactPage() { return <TrustPage kind="contact" locale="en" />; }
