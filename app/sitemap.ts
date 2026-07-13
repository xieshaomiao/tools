import type { MetadataRoute } from 'next';
import { toolList } from './tools/toolConfig';
import { absoluteUrl } from './lib/site';

const staticRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/tools', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/blog/what-is-json', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/blog/how-tool-pages-work', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/membership', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
];

const CONTENT_LAST_MODIFIED = new Date('2026-07-13T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const toolRoutes = toolList.map((tool) => ({
    url: absoluteUrl(tool.href),
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    alternates: { languages: { 'zh-CN': absoluteUrl(tool.href), en: absoluteUrl(`/en${tool.href}`) } },
  }));
  const englishToolRoutes = toolList.map((tool) => ({
    url: absoluteUrl(`/en${tool.href}`),
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    alternates: { languages: { 'zh-CN': absoluteUrl(tool.href), en: absoluteUrl(`/en${tool.href}`) } },
  }));

  const bilingualStaticRoutes = [
    { url: absoluteUrl('/en'), lastModified: CONTENT_LAST_MODIFIED, changeFrequency: 'weekly' as const, priority: 0.9, alternates: { languages: { 'zh-CN': absoluteUrl('/'), en: absoluteUrl('/en') } } },
    { url: absoluteUrl('/en/tools'), lastModified: CONTENT_LAST_MODIFIED, changeFrequency: 'weekly' as const, priority: 0.8, alternates: { languages: { 'zh-CN': absoluteUrl('/tools'), en: absoluteUrl('/en/tools') } } },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...((route.path === '/' || route.path === '/tools') ? {
        alternates: { languages: { 'zh-CN': absoluteUrl(route.path), en: absoluteUrl(route.path === '/' ? '/en' : '/en/tools') } },
      } : {}),
    })),
    ...bilingualStaticRoutes,
    ...toolRoutes,
    ...englishToolRoutes,
  ];
}
