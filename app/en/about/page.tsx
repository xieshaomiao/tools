import TrustPage from '@/app/components/TrustPage';

export const metadata = { title: 'About Toolly | Website-only online toolbox', description: 'Learn about Toolly tools, real output, browser-local processing, advertising status, and public feedback.', alternates: { canonical: '/en/about', languages: { 'zh-CN': '/about', en: '/en/about' } } };

export default function AboutPage() { return <TrustPage kind="about" locale="en" />; }
