import { MetadataRoute } from 'next';
import connectToDatabase from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';
import BlogCategory from '@/lib/models/BlogCategory';
import BlogAuthor from '@/lib/models/BlogAuthor';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mehartransport.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // We will connect inside the try blocks below to avoid failing the whole build
  // Static pages
  const staticPages = [
    { url: `${BASE_URL}/en`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/ar`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/en/fleet`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/ar/fleet`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/en/routes`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/ar/routes`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/en/booking`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/ar/booking`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/en/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/ar/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/en/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${BASE_URL}/ar/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${BASE_URL}/en/cities`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/ar/cities`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  // Vehicle/Fleet pages
  const vehicleSlugs = [
    'hyundai-staria', 'toyota-hiace', 'toyota-camry', 'toyota-coaster',
    'kia-k5', 'hyundai-h1', 'gmc-yukon', 'mitsubishi-xpander'
  ];

  const vehiclePages = vehicleSlugs.flatMap(slug => [
    { url: `${BASE_URL}/en/fleet/${slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/ar/fleet/${slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
  ]);

  // Package pages
  const packageSlugs = ['toyota-camry', 'gmc-yukon', 'hyundai-staria', 'toyota-hiace', 'hyundai-h1'];
  const packagePages = packageSlugs.flatMap(slug => [
    { url: `${BASE_URL}/en/packages/${slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/ar/packages/${slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
  ]);

  // City pages
  const citySlugs = ['jeddah', 'makkah', 'madinah', 'riyadh', 'taif'];
  const cityPages = citySlugs.flatMap(slug => [
    { url: `${BASE_URL}/en/cities/${slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/ar/cities/${slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
  ]);

  // Blog posts (dynamic from DB)
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    await connectToDatabase();
    const posts = await BlogPost.find({ status: 'Published' }).select('slug updatedAt language').lean();
    blogPages = posts.map((post: any) => ({
      url: `${BASE_URL}/${post.language || 'en'}/blog/${post.slug}`,
      lastModified: post.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error('Sitemap: Failed to fetch blog posts', e);
  }

  // Blog categories
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    await connectToDatabase();
    const categories = await BlogCategory.find().select('slug updatedAt').lean();
    categoryPages = categories.flatMap((cat: any) => [
      { url: `${BASE_URL}/en/blog/category/${cat.slug}`, lastModified: cat.updatedAt || new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
      { url: `${BASE_URL}/ar/blog/category/${cat.slug}`, lastModified: cat.updatedAt || new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    ]);
  } catch (e) {
    console.error('Sitemap: Failed to fetch categories', e);
  }

  return [
    ...staticPages,
    ...vehiclePages,
    ...packagePages,
    ...cityPages,
    ...blogPages,
    ...categoryPages,
  ];
}
