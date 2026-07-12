import { getPosts } from '@/lib/actions/blog';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';
import { Calendar, Clock, ChevronRight, Share2, ExternalLink, MessageCircle } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const resolvedParams = await params;
  const posts = await getPosts({ slug: resolvedParams.slug, language: resolvedParams.locale });
  if (!posts || posts.length === 0) return { title: 'Not Found' };
  
  const post = posts[0];
  
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: {
      canonical: post.seo?.canonicalUrl || `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: [post.seo?.ogImage || post.featuredImage],
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const resolvedParams = await params;
  const locale = await getLocale();
  const isAr = locale === 'ar';
  
  const posts = await getPosts({ slug: resolvedParams.slug, language: resolvedParams.locale });
  if (!posts || posts.length === 0) notFound();
  
  const post = posts[0];
  
  // Fetch related posts (same category, excluding current)
  const allRelated = await getPosts({ categoryId: post.categoryId?._id, status: 'Published', language: resolvedParams.locale });
  const relatedPosts = allRelated.filter((p: any) => p._id !== post._id).slice(0, 3);

  // Generate Schema.org JSON-LD
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.featuredImage,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.authorId?.name || 'Mehar Editorial',
      url: post.authorId?.socialLinks?.website || '',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mehar Transport',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mehartransport.com/logo.png' // Replace with actual absolute logo URL
      }
    },
    description: post.seo?.metaDescription || post.excerpt,
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
              <Link href="/blog" className="hover:text-secondary transition-colors">{isAr ? 'المدونة' : 'Blog'}</Link>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              <Link href={`/blog/category/${post.categoryId?.slug}`} className="hover:text-secondary transition-colors">
                {post.categoryId?.name}
              </Link>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              <span className="text-gray-900 dark:text-gray-300 truncate max-w-[200px]">{post.title}</span>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              {post.categoryId?.name}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-b border-gray-100 dark:border-white/10">
              <div className="flex items-center gap-4">
                {post.authorId?.avatar ? (
                  <img src={post.authorId.avatar} alt="Author" className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    {post.authorId?.name?.charAt(0) || 'M'}
                  </div>
                )}
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {post.authorId?.name || 'Mehar Editorial'}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(post.createdAt).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 min read</span>
                  </div>
                </div>
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium mr-2">{isAr ? 'شارك:' : 'Share:'}</span>
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
              src={post.featuredImage || '/images/hero/vip-fleet.jpg'} 
              alt={post.title}
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
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-12 pt-8 border-t border-gray-200 dark:border-white/10">
                  <span className="font-bold text-gray-900 dark:text-white mr-2 flex items-center">{isAr ? 'الوسوم:' : 'Tags:'}</span>
                  {post.tags.map((tag: any) => (
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
              {post.authorId && (
                <div className="bg-white dark:bg-primary rounded-2xl p-8 border border-gray-100 dark:border-white/10 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
                  {post.authorId.avatar ? (
                    <img src={post.authorId.avatar} alt="Author" className="w-24 h-24 rounded-full object-cover shadow-sm" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center font-bold text-3xl shadow-sm shrink-0">
                      {post.authorId.name?.charAt(0) || 'M'}
                    </div>
                  )}
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {isAr ? 'كتب بواسطة ' : 'Written by '}{post.authorId.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {post.authorId.bio || 'Expert transportation and travel consultant at Mehar Transport.'}
                    </p>
                    <Link 
                      href={`/blog/author/${post.authorId.slug}`}
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
                    {isAr ? 'احجز رحلتك القادمة مع ميهار' : 'Book Your Next Journey with Mehar'}
                  </h3>
                  <p className="text-white/80 mb-6">
                    {isAr ? 'نوفر أسطولاً من السيارات الفاخرة لرحلات العمرة والتنقلات من وإلى المطار.' : 'Experience premium luxury transport across Saudi Arabia with our modern fleet.'}
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
                    {relatedPosts.map((rp: any) => (
                      <Link key={rp._id} href={`/blog/${rp.slug}`} className="group flex gap-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                          <img src={rp.featuredImage || '/hero-luxury.webp'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-secondary transition-colors mb-2">
                            {rp.title}
                          </h4>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {new Date(rp.createdAt).toLocaleDateString(locale)}
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
