import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '登录或注册 | Toolly',
  description: '登录或注册 Toolly 免费账号，使用文档转换、图片处理、文本与开发者工具。',
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
