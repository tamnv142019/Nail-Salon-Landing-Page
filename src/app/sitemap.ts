import type { MetadataRoute } from 'next';
import { businessInfo } from '../config/seo.config';
import { blogPosts } from '../content/blog';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/services', '/book', '/gallery', '/reviews', '/contact', '/blog', '/queens-nails-hair-skincare', '/privacy', '/terms'];
  return [
    ...paths.map(path => ({ url: `${businessInfo.url}${path}`, changeFrequency: 'monthly' as const, priority: path ? .7 : 1 })),
    ...blogPosts.map(post => ({ url: `${businessInfo.url}/blog/${post.slug}`, lastModified: new Date(post.dateModified || post.datePublished), changeFrequency: 'monthly' as const, priority: .6 })),
  ];
}
