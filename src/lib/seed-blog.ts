import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import BlogCategory from './models/BlogCategory';
import BlogPost from './models/BlogPost';
import BlogAuthor from './models/BlogAuthor';
import dbConnect from './db';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function seed() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    // Clear existing
    await BlogCategory.deleteMany({});
    await BlogPost.deleteMany({});
    await BlogAuthor.deleteMany({});
    console.log('Cleared existing blog data');

    // Create Author
    const author = await BlogAuthor.create({
      name: 'Mehar Editorial',
      nameAr: 'فريق التحرير',
      slug: 'mehar-editorial',
      email: 'editorial@mehartransport.com',
      bio: 'Expert transportation and travel consultant at Mehar Transport.',
      bioAr: 'مستشار السفر والنقل في شركة ميهار.',
      isActive: true
    });

    // Create Categories
    const categoryEn = await BlogCategory.create({
      name: 'Travel Guides',
      nameAr: 'أدلة السفر',
      slug: 'travel-guides',
      description: 'Expert guides for traveling in Saudi Arabia.',
      descriptionAr: 'أدلة متخصصة للسفر في المملكة العربية السعودية.'
    });

    const categoryUmrah = await BlogCategory.create({
      name: 'Umrah Tips',
      nameAr: 'نصائح العمرة',
      slug: 'umrah-tips',
      description: 'Helpful tips for performing Umrah.',
      descriptionAr: 'نصائح مفيدة لأداء العمرة.'
    });

    console.log('Created categories');

    // Create Posts
    const posts = [
      {
        title: 'The Ultimate Guide to VIP Umrah Transport',
        slug: 'ultimate-guide-vip-umrah-transport',
        content: '<p>Performing Umrah is a profound spiritual journey. Ensuring your transport is seamless and comfortable allows you to focus entirely on your worship. Here is everything you need to know about booking VIP transport from Jeddah Airport to Makkah.</p>',
        excerpt: 'Discover how premium transportation can elevate your Umrah experience, ensuring peace of mind from Jeddah to Makkah.',
        featuredImage: '/routes/jeddah-makkah.webp',
        authorId: author._id,
        categoryId: categoryUmrah._id,
        tags: [],
        status: 'Published',
        language: 'en',
        seoTitle: 'VIP Umrah Transport Guide | Mehar Transport',
        seoDescription: 'Discover how premium transportation can elevate your Umrah experience.',
      },
      {
        title: 'الدليل الشامل للنقل لكبار الشخصيات في العمرة',
        slug: 'ultimate-guide-vip-umrah-transport-ar',
        content: '<p>أداء العمرة رحلة روحانية عميقة. ضمان أن تكون وسائل النقل الخاصة بك سلسة ومريحة يسمح لك بالتركيز بالكامل على عبادتك. إليك كل ما تحتاج لمعرفته حول حجز نقل VIP من مطار جدة إلى مكة المكرمة.</p>',
        excerpt: 'اكتشف كيف يمكن للنقل المتميز أن يرتقي بتجربة العمرة الخاصة بك، مما يضمن راحة البال من جدة إلى مكة.',
        featuredImage: '/routes/jeddah-makkah.webp',
        authorId: author._id,
        categoryId: categoryUmrah._id,
        tags: [],
        status: 'Published',
        language: 'ar',
        seoTitle: 'دليل النقل لكبار الشخصيات في العمرة | نقل ميهار',
        seoDescription: 'اكتشف كيف يمكن للنقل المتميز أن يرتقي بتجربة العمرة الخاصة بك.',
      },
      {
        title: 'Top 5 Business Destinations in Riyadh',
        slug: 'top-5-business-destinations-riyadh',
        content: '<p>Riyadh is the booming business hub of the Middle East. If you are traveling for corporate meetings, here are the top 5 financial districts you must know.</p>',
        excerpt: 'Navigate Riyadh\'s corporate landscape with our guide to the top 5 business destinations in the capital.',
        featuredImage: '/cities/riyadh.webp',
        authorId: author._id,
        categoryId: categoryEn._id,
        tags: [],
        status: 'Published',
        language: 'en',
        seoTitle: 'Top Business Destinations in Riyadh',
        seoDescription: 'Navigate Riyadh\'s corporate landscape with our guide.',
      },
      {
        title: 'أفضل 5 وجهات أعمال في الرياض',
        slug: 'top-5-business-destinations-riyadh-ar',
        content: '<p>الرياض هي مركز الأعمال المزدهر في الشرق الأوسط. إذا كنت مسافرًا لحضور اجتماعات الشركات، فإليك أفضل 5 مناطق مالية يجب أن تعرفها.</p>',
        excerpt: 'تنقل في مشهد الشركات في الرياض من خلال دليلنا لأفضل 5 وجهات أعمال في العاصمة.',
        featuredImage: '/cities/riyadh.webp',
        authorId: author._id,
        categoryId: categoryEn._id,
        tags: [],
        status: 'Published',
        language: 'ar',
        seoTitle: 'أفضل وجهات الأعمال في الرياض',
        seoDescription: 'تنقل في مشهد الشركات في الرياض من خلال دليلنا.',
      }
    ];

    await BlogPost.insertMany(posts);
    console.log('Created posts');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
