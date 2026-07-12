import { getPosts, getCategories } from '@/lib/actions/blog';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';
import { ChevronRight, Clock } from 'lucide-react';

export async function generateMetadata({ params }: { params: { locale: string, slug: string } }) {
  const categories = await getCategories();
  const category = categories.find((c: any) => c.slug === params.slug);
  if (!category) return { title: 'Not Found' };
  
  return {
    title: category.seo?.metaTitle || `${params.locale === 'ar' ? category.nameAr : category.name} | Mehar Transport`,
    description: category.seo?.metaDescription || category.description,
  };
}

export default async function CategoryPage({ params }: { params: { locale: string, slug: string } }) {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  
  const categories = await getCategories();
  const category = categories.find((c: any) => c.slug === params.slug);
  if (!category) notFound();

  const posts = await getPosts({ categoryId: category._id, status: 'Published', language: params.locale });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] pb-24">
      <div className="bg-primary py-20 lg:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-6 font-medium">
            <Link href="/blog" className="hover:text-secondary transition-colors">{isAr ? 'المدونة' : 'Blog'}</Link>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <span className="text-white">{isAr ? 'التصنيفات' : 'Category'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {isAr ? category.nameAr : category.name}
          </h1>
          {(category.description || category.descriptionAr) && (
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {isAr ? category.descriptionAr : category.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {posts.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-primary rounded-2xl border border-gray-100 dark:border-white/10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {isAr ? 'لا توجد مقالات' : 'No Articles Found'}
            </h3>
            <p className="text-gray-500">
              {isAr ? 'لم يتم نشر أي مقالات في هذا التصنيف بعد.' : 'No articles have been published in this category yet.'}
            </p>
            <Link href="/blog" className="mt-6 inline-block px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors">
              {isAr ? 'العودة للمدونة' : 'Back to Blog'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group flex flex-col bg-white dark:bg-primary rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative h-56 w-full overflow-hidden">
                  <img 
                    src={post.featuredImage || '/images/hero/economy-fleet.jpg'} 
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-secondary transition-colors mt-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                    {post.excerpt || post.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {post.authorId?.name || 'Mehar Editorial'}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(post.createdAt).toLocaleDateString(locale)}
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
