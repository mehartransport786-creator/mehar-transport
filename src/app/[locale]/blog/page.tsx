import { getPosts, getCategories } from '@/lib/actions/blog';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { getLocale } from 'next-intl/server';
import { Calendar, Clock, Search } from 'lucide-react';

/**
 * ISR: revalidate every hour. The admin `createPost` / `updatePost` /
 * `deletePost` actions call revalidatePath('/en/blog') and revalidatePath('/ar/blog')
 * so publishing a new article immediately purges this cache.
 */
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  return {
    title: resolvedParams.locale === 'ar' ? 'المدونة | نقل ميهار' : 'Blog | Mehar Transport',
    description:
      resolvedParams.locale === 'ar'
        ? 'نصائح السفر والنقل وخدمات العمرة في المملكة العربية السعودية'
        : 'Expert transportation insights, Umrah travel guides, and airport transfer tips across Saudi Arabia.',
  };
}

export default async function BlogHomepage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await getLocale();
  const isAr = locale === 'ar';

  // Listing pages only need card metadata — select excludes the full content
  // body so we don't fetch potentially large HTML for every card.
  const [allPosts, categories] = await Promise.all([
    getPosts(
      { status: 'Published', language: locale },
      {
        select: 'title slug excerpt featuredImage publishedAt createdAt categoryId authorId',
        limit: 25,
      }
    ),
    getCategories(),
  ]);

  const featuredPost = allPosts.length > 0 ? allPosts[0] : null;
  const recentPosts = allPosts.slice(1, 7);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] pb-24">
      {/* Editorial Hero */}
      <div className="relative bg-primary py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero-luxury.webp" alt="Background" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight font-heading">
            {isAr
              ? 'مدونة ميهار للنقل – نصائح السفر والنقل وخدمات العمرة'
              : 'Travel Insights, Transportation Guides & Umrah Tips'}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
            {isAr
              ? 'نصائح نقل متخصصة، وأدلة سفر للعمرة، وتلميحات لنقل المطار، ومعلومات الوجهات عبر المملكة العربية السعودية.'
              : 'Expert transportation insights, Umrah travel guides, airport transfer tips, and destination information across Saudi Arabia.'}
          </p>

          <div className="max-w-xl mx-auto bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/20 flex items-center">
            <Search className="w-6 h-6 text-white/50 ml-3 mr-2" />
            <input
              type="text"
              placeholder={isAr ? 'ابحث في المقالات...' : 'Search articles...'}
              className="w-full bg-transparent border-none text-white placeholder:text-white/50 outline-none px-2"
            />
            <button className="bg-secondary text-primary font-bold px-6 py-3 rounded-xl hover:bg-secondary/80 transition-colors">
              {isAr ? 'بحث' : 'Search'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        {/* Categories Bar */}
        <div className="bg-white dark:bg-primary shadow-lg rounded-2xl p-4 md:p-6 mb-16 border border-gray-100 dark:border-white/10 flex flex-wrap gap-3 justify-center">
          <Link
            href="/blog"
            className="px-5 py-2.5 rounded-full bg-primary dark:bg-white/10 text-white font-medium text-sm transition-colors"
          >
            {isAr ? 'الكل' : 'All'}
          </Link>
          {categories.slice(0, 6).map((cat: Record<string, string>) => (
            <Link
              key={cat._id}
              href={`/blog/category/${cat.slug}`}
              className="px-5 py-2.5 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-medium text-sm transition-colors"
            >
              {isAr ? cat.nameAr : cat.name}
            </Link>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16 group cursor-pointer">
            <Link href={`/blog/${(featuredPost as Record<string, string>).slug}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white dark:bg-primary rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-72 lg:h-[450px] w-full overflow-hidden">
                  <img
                    src={(featuredPost as Record<string, string>).featuredImage || '/images/hero/economy-fleet.jpg'}
                    alt={(featuredPost as Record<string, string>).title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    {isAr ? 'مقالة مميزة' : 'Featured'}
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-3 text-sm text-secondary font-medium mb-4">
                    <span>{(featuredPost as Record<string, Record<string, string>>).categoryId?.name}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" /> 5 min read
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight group-hover:text-secondary transition-colors">
                    {(featuredPost as Record<string, string>).title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg line-clamp-3">
                    {(featuredPost as Record<string, string>).excerpt || ''}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                      {(featuredPost as Record<string, Record<string, string>>).authorId?.name?.charAt(0) || 'M'}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        {(featuredPost as Record<string, Record<string, string>>).authorId?.name || 'Mehar Editorial'}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date((featuredPost as Record<string, string>).createdAt).toLocaleDateString(locale)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Recent Posts Grid */}
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-2xl font-bold">{isAr ? 'أحدث المقالات' : 'Latest Articles'}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post: Record<string, unknown>) => (
            <Link
              key={post._id as string}
              href={`/blog/${post.slug as string}`}
              className="group flex flex-col bg-white dark:bg-primary rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={(post.featuredImage as string) || '/hero-luxury.webp'}
                  alt={post.title as string}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs text-secondary font-medium mb-3 uppercase tracking-wider">
                  <span>{(post.categoryId as Record<string, string>)?.name}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-secondary transition-colors">
                  {post.title as string}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                  {(post.excerpt as string) || ''}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-4">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {(post.authorId as Record<string, string>)?.name || 'Mehar Editorial'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(post.createdAt as string).toLocaleDateString(locale)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {!featuredPost && recentPosts.length === 0 && (
          <div className="bg-white dark:bg-primary rounded-[2rem] p-12 text-center shadow-sm border border-gray-100 dark:border-white/10 mt-16 mb-24 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">
              {isAr ? 'قريباً' : 'Coming Soon'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              {isAr
                ? 'نحن نقوم حالياً بإعداد محتوى رائع لمدونتنا. يرجى التحقق مرة أخرى قريباً للحصول على أحدث النصائح والرؤى حول السفر والعمرة.'
                : 'We are currently preparing amazing content for our blog. Check back soon for the latest travel and Umrah insights.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
