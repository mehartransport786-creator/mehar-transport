import { getPosts, getAuthors } from '@/lib/actions/blog';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';
import { ChevronRight, Clock, ExternalLink, Link2, Globe } from 'lucide-react';

export async function generateMetadata({ params }: { params: { locale: string, slug: string } }) {
  const authors = await getAuthors();
  const author = authors.find((a: any) => a.slug === params.slug);
  if (!author) return { title: 'Not Found' };
  
  return {
    title: `${params.locale === 'ar' ? author.nameAr : author.name} | Mehar Transport Blog`,
    description: params.locale === 'ar' ? author.bioAr : author.bio,
  };
}

export default async function AuthorPage({ params }: { params: { locale: string, slug: string } }) {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  
  const authors = await getAuthors();
  const author = authors.find((a: any) => a.slug === params.slug);
  if (!author) notFound();

  const posts = await getPosts({ authorId: author._id, status: 'Published', language: params.locale });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] pb-24">
      <div className="bg-primary py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-8 font-medium">
            <Link href="/blog" className="hover:text-secondary transition-colors">{isAr ? 'المدونة' : 'Blog'}</Link>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <span className="text-white">{isAr ? 'المؤلف' : 'Author'}</span>
          </div>

          <div className="flex flex-col items-center">
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} className="w-32 h-32 rounded-full object-cover border-4 border-white/20 mb-6" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-secondary text-primary flex items-center justify-center font-bold text-4xl mb-6 border-4 border-white/20">
                {author.name?.charAt(0) || 'M'}
              </div>
            )}
            <h1 className="text-4xl font-bold text-white mb-4">
              {isAr ? author.nameAr : author.name}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
              {isAr ? author.bioAr : author.bio}
            </p>

            <div className="flex items-center justify-center gap-4">
              {author.socialLinks?.twitter && (
                <a href={author.socialLinks.twitter} target="_blank" className="text-white/60 hover:text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
              {author.socialLinks?.linkedin && (
                <a href={author.socialLinks.linkedin} target="_blank" className="text-white/60 hover:text-white transition-colors">
                  <Link2 className="w-5 h-5" />
                </a>
              )}
              {author.socialLinks?.website && (
                <a href={author.socialLinks.website} target="_blank" className="text-white/60 hover:text-white transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
          {isAr ? `مقالات بواسطة ${author.nameAr}` : `Articles by ${author.name}`}
        </h2>

        {posts.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-primary rounded-2xl border border-gray-100 dark:border-white/10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {isAr ? 'لا توجد مقالات' : 'No Articles Found'}
            </h3>
            <p className="text-gray-500">
              {isAr ? 'لم ينشر هذا المؤلف أي مقالات بعد.' : 'This author hasn\'t published any articles yet.'}
            </p>
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
                  <div className="flex items-center gap-3 text-xs text-secondary font-medium mb-3 uppercase tracking-wider">
                    <span>{post.categoryId?.name}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-secondary transition-colors mt-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                    {post.excerpt || post.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-4">
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
