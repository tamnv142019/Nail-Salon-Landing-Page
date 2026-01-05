import { notFound } from 'next/navigation';

import { SEO } from '../../../components/SEO/SEO';
import { getPageSEOConfig, businessInfo } from '../../../config/seo.config';
import { ClientHeader } from '../../../components/ClientHeader';
import { Footer } from '../../../components/Footer';
import { getBlogPostBySlug } from '../../../content/blog';
import { generateBreadcrumbSchema, generateWebPageSchema } from '../../../utils/schema-generators';

export default function Page({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return notFound();

  const cfg = getPageSEOConfig('home');
  const canonical = `${cfg.canonical.replace(/\/$/, '')}/blog/${post.slug}`;

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    ...(post.dateModified ? { dateModified: post.dateModified } : {}),
    author: {
      '@type': 'Organization',
      name: post.author.name,
      url: businessInfo.url,
    },
    publisher: {
      '@type': 'Organization',
      name: "Queen's Nails Hair and Skincare",
      logo: {
        '@type': 'ImageObject',
        url: `${businessInfo.url}/images/logos/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    ...(post.coverImage
      ? {
          image: [`${businessInfo.url}${post.coverImage.startsWith('/') ? '' : '/'}${post.coverImage}`],
        }
      : {}),
  };

  const schema = [
    generateWebPageSchema({
      name: `${post.title} - Queen's Nails Hair and Skincare`,
      description: post.description,
      url: canonical,
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: businessInfo.url },
      { name: 'Blog', url: `${cfg.canonical.replace(/\/$/, '')}/blog` },
      { name: post.title, url: canonical },
    ]),
    blogPostingSchema,
  ];

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        canonical={canonical}
        ogType="article"
        ogImage={post.coverImage ? `${businessInfo.url}${post.coverImage}` : undefined}
        keywords={post.tags.join(', ')}
        schema={schema}
      />

      <ClientHeader />

      <main className="min-h-screen bg-secondary dark:bg-background transition-colors duration-500 pt-24">
        <article className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                {post.category}
              </span>
              <span className="text-sm text-foreground/70">
                {post.datePublished}
                <span className="mx-2">•</span>
                {post.readTimeMinutes} mins read
              </span>
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold text-foreground">{post.title}</h1>
            <p className="mt-4 text-foreground/80 leading-relaxed">{post.description}</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-secondary border border-border flex items-center justify-center text-xs font-semibold text-foreground">
                {post.author.name
                  .split(/\s+/)
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((p) => p[0]?.toUpperCase())
                  .join('') || 'Q'}
              </div>
              <span className="text-sm font-medium text-foreground/90">{post.author.name}</span>
            </div>
          </header>

          <div className="space-y-6">
            {post.content}
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
