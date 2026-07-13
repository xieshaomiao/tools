import type { MetadataRoute } from 'next';
import { toolList } from './tools/toolConfig';
import { absoluteUrl } from './lib/site';

const staticRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/tools', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/blog/what-is-json', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/blog/how-tool-pages-work', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/blog/pdf-to-word-guide', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/membership', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.5, changeFrequency: 'yearly' as const },
  { path: '/contact', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
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
    { url: absoluteUrl('/en/membership'), lastModified: CONTENT_LAST_MODIFIED, changeFrequency: 'monthly' as const, priority: 0.5, alternates: { languages: { 'zh-CN': absoluteUrl('/membership'), en: absoluteUrl('/en/membership') } } },
    { url: absoluteUrl('/en/about'), lastModified: CONTENT_LAST_MODIFIED, changeFrequency: 'yearly' as const, priority: 0.5, alternates: { languages: { 'zh-CN': absoluteUrl('/about'), en: absoluteUrl('/en/about') } } },
    { url: absoluteUrl('/en/contact'), lastModified: CONTENT_LAST_MODIFIED, changeFrequency: 'yearly' as const, priority: 0.4, alternates: { languages: { 'zh-CN': absoluteUrl('/contact'), en: absoluteUrl('/en/contact') } } },
    { url: absoluteUrl('/en/privacy'), lastModified: CONTENT_LAST_MODIFIED, changeFrequency: 'yearly' as const, priority: 0.3, alternates: { languages: { 'zh-CN': absoluteUrl('/privacy'), en: absoluteUrl('/en/privacy') } } },
    { url: absoluteUrl('/en/terms'), lastModified: CONTENT_LAST_MODIFIED, changeFrequency: 'yearly' as const, priority: 0.3, alternates: { languages: { 'zh-CN': absoluteUrl('/terms'), en: absoluteUrl('/en/terms') } } },
  ];

  const bilingualPathMap: Record<string, string> = {
    '/': '/en',
    '/tools': '/en/tools',
    '/membership': '/en/membership',
    '/about': '/en/about',
    '/contact': '/en/contact',
    '/privacy': '/en/privacy',
    '/terms': '/en/terms',
  };

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(bilingualPathMap[route.path] ? {
        alternates: { languages: { 'zh-CN': absoluteUrl(route.path), en: absoluteUrl(bilingualPathMap[route.path]) } },
      } : {}),
    })),
    ...bilingualStaticRoutes,
    ...toolRoutes,
    ...englishToolRoutes,
  ];
}
