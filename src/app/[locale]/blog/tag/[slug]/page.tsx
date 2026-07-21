import { getPosts, getTags } from '@/lib/actions/blog';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';
import { ChevronRight, Clock } from 'lucide-react';

/** ISR: 1 hour. */
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  // getTags() is cache()-deduplicated
  const tags = await getTags();
  const tag = tags.find((t: Record<string, string>) => t.slug === params.slug);
  if (!tag) return { title: 'Not Found' };

  const tagName =
    params.locale === 'ar'
      ? (tag as Record<string, string>).nameAr
      : (tag as Record<string, string>).name;

  return {
    title: `${tagName} | Mehar Transport Blog`,
    description: `Articles tagged with ${tagName}`,
  };
}

export default async function TagPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = await getLocale();
  const isAr = locale === 'ar';

  // getTags() is cache()-deduplicated — same call as generateMetadata
  const tags = await getTags();
  const tag = tags.find((t: Record<string, string>) => t.slug === params.slug);
  if (!tag) notFound();

  /**
   * Previously: fetched ALL published posts then filtered by tag in JS.
   * Now: queries with { tags: tag._id } which uses the compound index
   * (tags, status, createdAt) added in Step 3. No more JS-side filtering.
   */
  const posts = await getPosts(
    {
      tags: (tag as Record<string, string>)._id,
      status: 'Published',
      language: params.locale,
    },
    { select: 'title slug excerpt featuredImage createdAt authorId categoryId', limit: 24 }
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] pb-24">
      <div className="bg-primary py-20 lg:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-6 font-medium">
            <Link href="/blog" className="hover:text-secondary transition-colors">
              {isAr ? 'المدونة' : 'Blog'}
            </Link>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <span className="text-white">{isAr ? 'الوسوم' : 'Tag'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            #{isAr ? (tag as Record<string, string>).nameAr : (tag as Record<string, string>).name}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {posts.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-primary rounded-2xl border border-gray-100 dark:border-white/10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {isAr ? 'لا توجد مقالات' : 'No Articles Found'}
            </h3>
            <p className="text-gray-500">
              {isAr
                ? 'لم يتم نشر أي مقالات بهذا الوسم بعد.'
                : 'No articles have been published with this tag yet.'}
            </p>
            <Link
              href="/blog"
              className="mt-6 inline-block px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
            >
              {isAr ? 'العودة للمدونة' : 'Back to Blog'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Record<string, unknown>) => (
              <Link
                key={post._id as string}
                href={`/blog/${post.slug as string}`}
                className="group flex flex-col bg-white dark:bg-primary rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={(post.featuredImage as string) || '/images/hero/economy-fleet.jpg'}
                    alt={post.title as string}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[var(--duration-base)] group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-secondary font-medium mb-3 uppercase tracking-wider">
                    <span>
                      {(post.categoryId as Record<string, string>)?.name}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-secondary transition-colors mt-2">
                    {post.title as string}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                    {(post.excerpt as string) || ''}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {(post.authorId as Record<string, string>)?.name || 'Mehar Editorial'}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(post.createdAt as string).toLocaleDateString(locale)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
