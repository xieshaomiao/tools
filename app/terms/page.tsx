import TrustPage from '@/app/components/TrustPage';

export const metadata = { title: '服务条款 - Toolly', description: '阅读 Toolly 网站工具的账号责任、文件与内容权限、转换结果核对、可接受使用规则、服务可用性和责任边界。', alternates: { canonical: '/terms', languages: { 'zh-CN': '/terms', en: '/en/terms' } } };

export default function TermsPage() { return <TrustPage kind="terms" locale="zh" />; }
