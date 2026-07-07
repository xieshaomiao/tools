import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Toolly 在线工具箱',
    short_name: 'Toolly',
    description: 'PDF 文档转换、图片处理、中文办公与开发者在线工具箱。',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f172a',
    lang: 'zh-CN',
    categories: ['utilities', 'productivity', 'developer'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  };
}
