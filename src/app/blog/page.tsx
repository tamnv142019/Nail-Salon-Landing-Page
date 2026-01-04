"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { SEO } from '../../components/SEO/SEO';
import { getPageSEOConfig } from '../../config/seo.config';
import { ClientHeader } from '../../components/ClientHeader';
import { Footer } from '../../components/Footer';
import { blogPosts } from '../../content/blog';
import { businessInfo } from '../../config/seo.config';
import { generateBreadcrumbSchema, generateWebPageSchema } from '../../utils/schema-generators';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export default function Page() {
  const cfg = getPageSEOConfig('home');

  const canonical = `${cfg.canonical.replace(/\/$/, '')}/blog`;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');
  const [page, setPage] = useState<number>(1);

  const pageSize = 6;

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const post of blogPosts) set.add(post.category);
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const posts = useMemo(() => {
    const filtered = selectedCategory === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === selectedCategory);

    const sorted = filtered.slice().sort((a, b) => a.datePublished.localeCompare(b.datePublished));
    return sort === 'newest' ? sorted.reverse() : sorted;
  }, [selectedCategory, sort]);

  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const pagedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return posts.slice(start, start + pageSize);
  }, [posts, currentPage]);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 1) return [];
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const formatDate = (iso: string) => {
    const date = new Date(`${iso}T00:00:00`);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const getInitials = (name: string) => {
    const cleaned = name.trim();
    if (!cleaned) return '?';
    const parts = cleaned.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
    return (first + last).toUpperCase() || cleaned.slice(0, 1).toUpperCase();
  };

  const schema = [
    generateWebPageSchema({
      name: `Blog - Queen's Nails Hair & Skincare`,
      description: 'Beauty tips, nail care guides, and salon updates from Queen\'s Nails Hair & Skincare in Ocean Beach, San Diego.',
      url: canonical,
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: businessInfo.url },
      { name: 'Blog', url: canonical },
    ]),
  ];

  return (
    <>
      <SEO
        title={'Blog - Queen\'s Nails Hair & Skincare'}
        description={'Beauty tips, nail care guides, and salon updates from Queen\'s Nails Hair & Skincare in Ocean Beach, San Diego.'}
        canonical={canonical}
        keywords={'nail care tips, gel nails care, dip powder aftercare, acrylic nails maintenance, nail salon Ocean Beach San Diego'}
        schema={schema}
      />

      <ClientHeader />

      <main className="min-h-screen bg-secondary dark:bg-background transition-colors duration-500 pt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground">Blog</h1>
            <p className="mt-3 text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              Here, we share nail care tips, salon guidance, and simple routines to keep your manicure looking fresh.
            </p>
          </header>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <Tabs
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
                setPage(1);
              }}
            >
              <TabsList className="flex flex-wrap h-auto gap-1">
                {categories.map((c) => (
                  <TabsTrigger key={c} value={c} className="px-3 py-2">
                    {c}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-3 justify-start md:justify-end">
              <span className="text-sm text-foreground/70">Sort by:</span>
              <Select
                value={sort}
                onValueChange={(v) => {
                  setSort(v as 'newest' | 'oldest');
                  setPage(1);
                }}
              >
                <SelectTrigger size="sm" className="w-35">
                  <SelectValue placeholder="Newest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pagedPosts.map((post) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <Card className="overflow-hidden rounded-2xl border-border bg-card transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
                    <div className="relative">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="h-44 w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="h-44 w-full bg-muted" />
                      )}

                      <Badge
                        variant="secondary"
                        className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs"
                      >
                        {post.category}
                      </Badge>
                    </div>

                    <div className="p-5">
                      <p className="text-xs text-foreground/70">
                        {formatDate(post.datePublished)}
                        <span className="mx-2">•</span>
                        {post.readTimeMinutes} mins read
                      </p>

                      <h2 className="mt-2 text-lg font-semibold text-foreground leading-snug line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="mt-2 text-sm text-foreground/80 leading-relaxed line-clamp-3">
                        {post.description}
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-secondary border border-border flex items-center justify-center text-xs font-semibold text-foreground">
                          {getInitials(post.author.name)}
                        </div>
                        <span className="text-sm font-medium text-foreground/90 line-clamp-1">
                          {post.author.name}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {pageNumbers.map((n) => (
                <Button
                  key={n}
                  type="button"
                  variant={n === currentPage ? 'accent' : 'outline'}
                  size="sm"
                  onClick={() => setPage(n)}
                  aria-current={n === currentPage ? 'page' : undefined}
                >
                  {n}
                </Button>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </nav>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
