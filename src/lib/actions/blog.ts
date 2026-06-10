'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import BlogCategory from '@/lib/models/BlogCategory';
import BlogTag from '@/lib/models/BlogTag';
import BlogAuthor from '@/lib/models/BlogAuthor';
import BlogPost from '@/lib/models/BlogPost';
import { auth } from '@/auth';

// Helper to check admin access
async function checkAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  // Role is stored as the role name from DB (e.g. "Super Admin", "Admin", "Editor")
  const role = (session.user as { role?: string }).role;
  if (!role) {
    throw new Error('Unauthorized: No role assigned');
  }
}

// --- CATEGORIES ---
export async function getCategories() {
  await dbConnect();
  const categories = await BlogCategory.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(categories));
}

export async function createCategory(data: any) {
  await checkAdmin();
  await dbConnect();
  const category = await BlogCategory.create(data);
  revalidatePath('/admin/blog/categories');
  return JSON.parse(JSON.stringify(category));
}

export async function updateCategory(id: string, data: any) {
  await checkAdmin();
  await dbConnect();
  const category = await BlogCategory.findByIdAndUpdate(id, data, { new: true });
  revalidatePath('/admin/blog/categories');
  return JSON.parse(JSON.stringify(category));
}

export async function deleteCategory(id: string) {
  await checkAdmin();
  await dbConnect();
  await BlogCategory.findByIdAndDelete(id);
  revalidatePath('/admin/blog/categories');
  return { success: true };
}

// --- TAGS ---
export async function getTags() {
  await dbConnect();
  const tags = await BlogTag.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(tags));
}

export async function createTag(data: any) {
  await checkAdmin();
  await dbConnect();
  const tag = await BlogTag.create(data);
  revalidatePath('/admin/blog/tags');
  return JSON.parse(JSON.stringify(tag));
}

export async function updateTag(id: string, data: any) {
  await checkAdmin();
  await dbConnect();
  const tag = await BlogTag.findByIdAndUpdate(id, data, { new: true });
  revalidatePath('/admin/blog/tags');
  return JSON.parse(JSON.stringify(tag));
}

export async function deleteTag(id: string) {
  await checkAdmin();
  await dbConnect();
  await BlogTag.findByIdAndDelete(id);
  revalidatePath('/admin/blog/tags');
  return { success: true };
}

// --- AUTHORS ---
export async function getAuthors() {
  await dbConnect();
  const authors = await BlogAuthor.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(authors));
}

export async function createAuthor(data: any) {
  await checkAdmin();
  await dbConnect();
  const author = await BlogAuthor.create(data);
  revalidatePath('/admin/blog/authors');
  return JSON.parse(JSON.stringify(author));
}

export async function updateAuthor(id: string, data: any) {
  await checkAdmin();
  await dbConnect();
  const author = await BlogAuthor.findByIdAndUpdate(id, data, { new: true });
  revalidatePath('/admin/blog/authors');
  return JSON.parse(JSON.stringify(author));
}

export async function deleteAuthor(id: string) {
  await checkAdmin();
  await dbConnect();
  await BlogAuthor.findByIdAndDelete(id);
  revalidatePath('/admin/blog/authors');
  return { success: true };
}

// --- POSTS ---
export async function getPosts(filters: Record<string, any> = {}) {
  await dbConnect();
  const query = { ...filters };
  const posts = await BlogPost.find(query)
    .populate('authorId')
    .populate('categoryId')
    .populate('tags')
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(posts));
}

export async function getPostById(id: string) {
  await dbConnect();
  const post = await BlogPost.findById(id)
    .populate('authorId')
    .populate('categoryId')
    .populate('tags')
    .lean();
  return JSON.parse(JSON.stringify(post));
}

export async function createPost(data: any) {
  await checkAdmin();
  await dbConnect();
  const post = await BlogPost.create(data);
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  return JSON.parse(JSON.stringify(post));
}

export async function updatePost(id: string, data: any) {
  await checkAdmin();
  await dbConnect();
  const post = await BlogPost.findByIdAndUpdate(id, data, { new: true });
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  revalidatePath(`/blog/${post?.slug}`);
  return JSON.parse(JSON.stringify(post));
}

export async function deletePost(id: string) {
  await checkAdmin();
  await dbConnect();
  await BlogPost.findByIdAndDelete(id);
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  return { success: true };
}
