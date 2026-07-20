import { getPostBySlug, getPosts } from '@/lib/actions/blog';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';
import { Calendar, Clock, ChevronRight, Share2, ExternalLink, MessageCircle } from 'lucide-react';
import connectToDatabase from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';

/**
 * ISR: revalidate every hour. Admin mutations call revalidatePath on the
 * specific slug so edits publish immediately without waiting for the timer.
 */
export const revalidate = 3600;

/**
 * Pre-render all published posts at build time (generates static HTML).
 * New posts published after the last build are rendered on-demand and then
 * cached (dynamicParams = true is the default).
 */
export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const posts = await BlogPost.find({ status: 'Published' })
      .select('slug language')
      .lean();
    return (posts as { slug: string; language: string }[]).map((p) => ({
      locale: p.language || 'en',
      slug: p.slug,
    }));
  } catch {
    return [];
  }
}

/**
 * generateMetadata and the page component both call getPostBySlug(slug, locale).
 * Because getPostBySlug is wrapped in React's cache(), the second call is
 * deduplicated — only ONE DB round-trip per request instead of the previous TWO.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);
  if (!post) return { title: 'Not Found' };

  return {
    title: (post as Record<string, Record<string, string>>).seo?.metaTitle || (post as Record<string, string>).title,
    description:
      (post as Record<string, Record<string, string>>).seo?.metaDescription || (post as Record<string, string>).excerpt,
    alternates: {
      canonical:
        (post as Record<string, Record<string, string>>).seo?.canonicalUrl || `/blog/${(post as Record<string, string>).slug}`,
    },
    openGraph: {
      title:
        (post as Record<string, Record<string, string>>).seo?.metaTitle || (post as Record<string, string>).title,
      description:
        (post as Record<string, Record<string, string>>).seo?.metaDescription || (post as Record<string, string>).excerpt,
      images: [
        (post as Record<string, Record<string, string>>).seo?.ogImage ||
          (post as Record<string, string>).featuredImage,
      ],
      type: 'article',
      publishedTime:
        (post as Record<string, string>).publishedAt || (post as Record<string, string>).createdAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resolvedLocale = await getLocale();
  const isAr = resolvedLocale === 'ar';

  // Deduplicated — same cache() call as generateMetadata above
  const post = await getPostBySlug(slug, locale);
  if (!post) notFound();

  // Related posts: same category, excluding current, listing fields only
  const relatedPosts = await getPosts(
    {
      categoryId: (post as Record<string, Record<string, string>>).categoryId?._id,
      status: 'Published',
      language: locale,
    },
    {
      select: 'title slug featuredImage createdAt',
      limit: 4,
    }
  ).then((posts) =>
    posts.filter((p: Record<string, string>) => p._id !== (post as Record<string, string>)._id).slice(0, 3)
  );

  // Schema.org JSON-LD
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: (post as Record<string, string>).title,
    image: (post as Record<string, string>).featuredImage,
    datePublished:
      (post as Record<string, string>).publishedAt || (post as Record<string, string>).createdAt,
    dateModified: (post as Record<string, string>).updatedAt,
    author: {
      '@type': 'Person',
      name:
        (post as Record<string, Record<string, string>>).authorId?.name || 'Mehar Editorial',
      url:
        (post as Record<string, Record<string, Record<string, string>>>).authorId?.socialLinks
          ?.website || '',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mehar Transport',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mehartransport.com/icon.png',
      },
    },
    description:
      (post as Record<string, Record<string, string>>).seo?.metaDescription ||
      (post as Record<string, string>).excerpt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <div className="bg-gray-50 dark:bg-[#0F172A] min-h-screen pb-24">
        {/* Article Header */}
        <div className="bg-white dark:bg-primary border-b border-gray-200 dark:border-white/10 pt-24 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
              <Link href="/blog" className="hover:text-secondary transition-colors">
                {isAr ? 'المدونة' : 'Blog'}
              </Link>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              <Link
                href={`/blog/category/${(post as Record<string, Record<string, string>>).categoryId?.slug}`}
                className="hover:text-secondary transition-colors"
              >
                {(post as Record<string, Record<string, string>>).categoryId?.name}
              </Link>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              <span className="text-gray-900 dark:text-gray-300 truncate max-w-[200px]">
                {(post as Record<string, string>).title}
              </span>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              {(post as Record<string, Record<string, string>>).categoryId?.name}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              {(post as Record<string, string>).title}
            </h1>

            {(post as Record<string, string>).excerpt && (
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {(post as Record<string, string>).excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-b border-gray-100 dark:border-white/10">
              <div className="flex items-center gap-4">
                {(post as Record<string, Record<string, string>>).authorId?.avatar ? (
                  <img
                    src={(post as Record<string, Record<string, string>>).authorId.avatar}
                    alt="Author"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    {(post as Record<string, Record<string, string>>).authorId?.name?.charAt(0) ||
                      'M'}
                  </div>
                )}
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {(post as Record<string, Record<string, string>>).authorId?.name ||
                      'Mehar Editorial'}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />{' '}
                      {new Date(
                        (post as Record<string, string>).createdAt
                      ).toLocaleDateString(resolvedLocale, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> 5 min read
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium mr-2">
                  {isAr ? 'شارك:' : 'Share:'}
                </span>
                <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-green-500 hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-16">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-white/10 aspect-video relative">
            <img
              src={
                (post as Record<string, string>).featuredImage ||
                '/images/hero/vip-fleet.jpg'
              }
              alt={(post as Record<string, string>).title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <article
                className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-primary dark:prose-headings:text-white prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl prose-img:shadow-md max-w-none mb-16"
                dangerouslySetInnerHTML={{
                  __html: (post as Record<string, string>).content,
                }}
              />

              {/* Tags */}
              {(post as Record<string, unknown[]>).tags &&
                (post as Record<string, unknown[]>).tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-12 pt-8 border-t border-gray-200 dark:border-white/10">
                    <span className="font-bold text-gray-900 dark:text-white mr-2 flex items-center">
                      {isAr ? 'الوسوم:' : 'Tags:'}
                    </span>
                    {(post as Record<string, Record<string, string>[]>).tags.map((tag) => (
                      <Link
                        key={tag._id}
                        href={`/blog/tag/${tag.slug}`}
                        className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                )}

              {/* Author Bio Box */}
              {(post as Record<string, Record<string, string>>).authorId && (
                <div className="bg-white dark:bg-primary rounded-2xl p-8 border border-gray-100 dark:border-white/10 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
                  {(post as Record<string, Record<string, string>>).authorId.avatar ? (
                    <img
                      src={(post as Record<string, Record<string, string>>).authorId.avatar}
                      alt="Author"
                      className="w-24 h-24 rounded-full object-cover shadow-sm"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center font-bold text-3xl shadow-sm shrink-0">
                      {(post as Record<string, Record<string, string>>).authorId.name?.charAt(0) ||
                        'M'}
                    </div>
                  )}
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {isAr ? 'كتب بواسطة ' : 'Written by '}
                      {(post as Record<string, Record<string, string>>).authorId.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {(post as Record<string, Record<string, string>>).authorId.bio ||
                        'Expert transportation and travel consultant at Mehar Transport.'}
                    </p>
                    <Link
                      href={`/blog/author/${(post as Record<string, Record<string, string>>).authorId.slug}`}
                      className="text-secondary font-bold hover:underline"
                    >
                      {isAr ? 'عرض جميع مقالات المؤلف' : 'View all posts by author'} &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Booking CTA Widget */}
              <div className="bg-primary rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary rounded-full opacity-20 blur-2xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 font-heading">
                    {isAr
                      ? 'احجز رحلتك القادمة مع ميهار'
                      : 'Book Your Next Journey with Mehar'}
                  </h3>
                  <p className="text-white/80 mb-6">
                    {isAr
                      ? 'نوفر أسطولاً من السيارات الفاخرة لرحلات العمرة والتنقلات من وإلى المطار.'
                      : 'Experience premium luxury transport across Saudi Arabia with our modern fleet.'}
                  </p>
                  <Link
                    href="/booking"
                    className="block w-full text-center bg-secondary text-primary font-bold py-3 rounded-xl hover:bg-white transition-colors"
                  >
                    {isAr ? 'احجز الآن' : 'Book Now'}
                  </Link>
                  <a
                    href="https://wa.me/966565638120"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center mt-3 border border-white/20 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    {isAr ? 'تواصل عبر واتساب' : 'WhatsApp Us'}
                  </a>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white dark:bg-primary rounded-2xl p-6 border border-gray-100 dark:border-white/10 shadow-sm">
                  <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/10 pb-4">
                    {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
                  </h3>
                  <div className="space-y-6">
                    {relatedPosts.map((rp: Record<string, string>) => (
                      <Link key={rp._id} href={`/blog/${rp.slug}`} className="group flex gap-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={rp.featuredImage || '/hero-luxury.webp'}
                            alt={rp.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-secondary transition-colors mb-2">
                            {rp.title}
                          </h4>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />{' '}
                            {new Date(rp.createdAt).toLocaleDateString(resolvedLocale)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
