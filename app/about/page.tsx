import TrustPage from '@/app/components/TrustPage';

export const metadata = { title: '关于 Toolly | 网站端在线工具箱', description: '了解 Toolly 网站工具箱如何提供真实可下载的处理结果、本地优先的隐私原则、当前广告状态、服务边界和公开反馈渠道。', alternates: { canonical: '/about', languages: { 'zh-CN': '/about', en: '/en/about' } } };

export default function AboutPage() { return <TrustPage kind="about" locale="zh" />; }
