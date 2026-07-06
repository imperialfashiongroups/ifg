import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/account/', '/api/', '/checkout/', '/auth/'],
      },
    ],
    sitemap: 'https://imperialfashiongroups.com/sitemap.xml',
    host: 'https://imperialfashiongroups.com',
  };
}
