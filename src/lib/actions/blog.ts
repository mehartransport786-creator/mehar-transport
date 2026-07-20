'use server';

import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import BlogCategory from '@/lib/models/BlogCategory';
import BlogTag from '@/lib/models/BlogTag';
import BlogAuthor from '@/lib/models/BlogAuthor';
import BlogPost from '@/lib/models/BlogPost';
import { auth } from '@/auth';

// ─── Serialisation helper ────────────────────────────────────────────────────
/**
 * Replaces the previous `JSON.parse(JSON.stringify(doc))` pattern which
 * serialised and re-parsed entire documents including full article bodies.
 *
 * This version only converts the two types that need converting when coming
 * out of `.lean()`: Mongoose ObjectId instances and JS Date objects.
 * Everything else passes through untouched, saving significant CPU.
 */
function toPlain<T>(doc: T): T {
  return JSON.parse(
    JSON.stringify(doc, (_, v) => {
      if (v?._bsontype === 'ObjectId') return String(v);
      if (v instanceof Date) return v.toISOString();
      return v;
    })
  );
}

// ─── Admin check ─────────────────────────────────────────────────────────────
async function checkAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
  const role = (session.user as { role?: string }).role;
  if (!role) throw new Error('Unauthorized: No role assigned');
}

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
/**
 * Wrapped in React cache() so that multiple server components on the same
 * request (e.g. generateMetadata + page component on category/[slug]) only
 * make one DB round-trip.
 */
export const getCategories = cache(async () => {
  await dbConnect();
  const categories = await BlogCategory.find().sort({ createdAt: -1 }).lean();
  return toPlain(categories);
});

export async function createCategory(data: Record<string, unknown>) {
  await checkAdmin();
  await dbConnect();
  const category = await BlogCategory.create(data);
  revalidatePath('/admin/blog/categories');
  return toPlain(category.toObject());
}

export async function updateCategory(id: string, data: Record<string, unknown>) {
  await checkAdmin();
  await dbConnect();
  const category = await BlogCategory.findByIdAndUpdate(id, data, { new: true }).lean();
  revalidatePath('/admin/blog/categories');
  return toPlain(category);
}

export async function deleteCategory(id: string) {
  await checkAdmin();
  await dbConnect();
  await BlogCategory.findByIdAndDelete(id);
  revalidatePath('/admin/blog/categories');
  return { success: true };
}

// ─── TAGS ────────────────────────────────────────────────────────────────────
/** Cached: tag pages call getTags() in generateMetadata + the page component. */
export const getTags = cache(async () => {
  await dbConnect();
  const tags = await BlogTag.find().sort({ createdAt: -1 }).lean();
  return toPlain(tags);
});

export async function createTag(data: Record<string, unknown>) {
  await checkAdmin();
  await dbConnect();
  const tag = await BlogTag.create(data);
  revalidatePath('/admin/blog/tags');
  return toPlain(tag.toObject());
}

export async function updateTag(id: string, data: Record<string, unknown>) {
  await checkAdmin();
  await dbConnect();
  const tag = await BlogTag.findByIdAndUpdate(id, data, { new: true }).lean();
  revalidatePath('/admin/blog/tags');
  return toPlain(tag);
}

export async function deleteTag(id: string) {
  await checkAdmin();
  await dbConnect();
  await BlogTag.findByIdAndDelete(id);
  revalidatePath('/admin/blog/tags');
  return { success: true };
}

// ─── AUTHORS ─────────────────────────────────────────────────────────────────
/** Cached: author pages call getAuthors() twice per request. */
export const getAuthors = cache(async () => {
  await dbConnect();
  const authors = await BlogAuthor.find().sort({ createdAt: -1 }).lean();
  return toPlain(authors);
});

export async function createAuthor(data: Record<string, unknown>) {
  await checkAdmin();
  await dbConnect();
  const author = await BlogAuthor.create(data);
  revalidatePath('/admin/blog/authors');
  return toPlain(author.toObject());
}

export async function updateAuthor(id: string, data: Record<string, unknown>) {
  await checkAdmin();
  await dbConnect();
  const author = await BlogAuthor.findByIdAndUpdate(id, data, { new: true }).lean();
  revalidatePath('/admin/blog/authors');
  return toPlain(author);
}

export async function deleteAuthor(id: string) {
  await checkAdmin();
  await dbConnect();
  await BlogAuthor.findByIdAndDelete(id);
  revalidatePath('/admin/blog/authors');
  return { success: true };
}

// ─── POSTS ───────────────────────────────────────────────────────────────────

/**
 * General post query — used by the admin panel (all statuses) and public
 * listing pages (filtered by status + language).
 *
 * `options.select` limits returned fields on listing pages so the full
 * `content` HTML is not fetched when only card metadata is needed.
 * `options.limit` caps unbounded listing queries (default 50 for safety).
 */
export async function getPosts(
  filters: Record<string, unknown> = {},
  options: { select?: string; limit?: number } = {}
) {
  await dbConnect();
  const { select, limit = 50 } = options;

  let q = BlogPost.find(filters)
    .populate('authorId', 'name slug avatar bio')
    .populate('categoryId', 'name nameAr slug')
    .populate('tags', 'name nameAr slug')
    .sort({ createdAt: -1 })
    .limit(limit);

  if (select) q = q.select(select) as typeof q;

  const posts = await q.lean();
  return toPlain(posts);
}

/**
 * Deduplicated single-post lookup for the public [slug] page.
 *
 * React's cache() deduplicates calls with identical (slug, language)
 * arguments within the same request lifecycle, eliminating the double DB
 * round-trip that previously occurred when both generateMetadata() and the
 * page component called getPosts({ slug, language }).
 *
 * Only returns Published posts — drafts are never exposed on public routes.
 */
export const getPostBySlug = cache(async (slug: string, language: string) => {
  await dbConnect();
  const post = await BlogPost.findOne({ slug, language, status: 'Published' })
    .populate('authorId', 'name slug avatar bio socialLinks')
    .populate('categoryId', 'name nameAr slug description descriptionAr seo')
    .populate('tags', 'name nameAr slug')
    .lean();
  return post ? toPlain(post) : null;
});

export async function getPostById(id: string) {
  await dbConnect();
  const post = await BlogPost.findById(id)
    .populate('authorId')
    .populate('categoryId')
    .populate('tags')
    .lean();
  return toPlain(post);
}

// ─── Mutation helpers ─────────────────────────────────────────────────────────

/** Revalidates all public-facing paths affected by a blog post change. */
function revalidateBlogPaths(slug?: string) {
  // Admin list
  revalidatePath('/admin/blog');
  // Public listing — both locales
  revalidatePath('/[locale]/blog', 'page');
  revalidatePath('/en/blog');
  revalidatePath('/ar/blog');
  // Individual post — both locales
  if (slug) {
    revalidatePath(`/en/blog/${slug}`);
    revalidatePath(`/ar/blog/${slug}`);
  }
  // Sitemap (daily ISR, but force immediate refresh on publish)
  revalidatePath('/sitemap.xml');
}

export async function createPost(data: Record<string, unknown>) {
  await checkAdmin();
  await dbConnect();
  const post = await BlogPost.create(data);
  revalidateBlogPaths(post.slug);
  return toPlain(post.toObject());
}

export async function updatePost(id: string, data: Record<string, unknown>) {
  await checkAdmin();
  await dbConnect();
  const post = await BlogPost.findByIdAndUpdate(id, data, { new: true });
  revalidateBlogPaths(post?.slug);
  return toPlain(post?.toObject() ?? null);
}

export async function deletePost(id: string) {
  await checkAdmin();
  await dbConnect();
  const post = await BlogPost.findById(id).select('slug').lean();
  await BlogPost.findByIdAndDelete(id);
  revalidateBlogPaths((post as { slug?: string })?.slug);
  return { success: true };
}
