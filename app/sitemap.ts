import type { Metadata } from 'next';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = 'https://imperialfashiongroups.com';
  const CATEGORIES = [
    'women-ethnic', 'women-western', 'men', 'kids', 'footwear', 'accessories', 'home-living',
    'lehenga', 'kurti', '3-piece-set', '2-piece-set', 'one-piece', 'womens-tops', 'womens-skirts',
    'womens-jumpsuit', 'womens-shorts', 'womens-jeans', 'womens-pants', 'leggings', 'bras',
    'shrugs', 'womens-jackets', 'sweater', 'suits', 'shirts', 'mens-pants', 'mens-jeans',
    't-shirts', 'track-pants', 'mens-jackets', 'frocks', 'kids-tops', 'kids-jumpsuit',
    'kids-jeans', 'formal-wear',
  ];

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/policies/return`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/policies/shipping`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/policies/privacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${BASE_URL}/policies/terms`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
  ];

  const categoryPages = CATEGORIES.map(slug => ({
    url: `${BASE_URL}/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages];
}
