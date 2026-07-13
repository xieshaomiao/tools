import TrustPage from '@/app/components/TrustPage';

export const metadata = { title: '联系与支持 - Toolly', description: '查看如何向 Toolly 安全提交不含密码、证件或文件内容的错误报告、功能建议、账号问题和隐私反馈，并了解自助账号删除入口。', alternates: { canonical: '/contact', languages: { 'zh-CN': '/contact', en: '/en/contact' } } };

export default function ContactPage() { return <TrustPage kind="contact" locale="zh" />; }
