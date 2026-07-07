import type { MetadataRoute } from 'next';
import { toolList } from './tools/toolConfig';
import { absoluteUrl } from './lib/site';

const staticRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/tools', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/blog/what-is-json', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/blog/how-tool-pages-work', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/blog/app-download-seo', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/download', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/membership', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const toolRoutes = toolList.map((tool) => ({
    url: absoluteUrl(tool.href),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...toolRoutes,
  ];
}
