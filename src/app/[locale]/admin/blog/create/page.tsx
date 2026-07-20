'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { getCategories, getTags, getAuthors, createPost } from '@/lib/actions/blog';
import RichTextEditor from '@/components/blog/RichTextEditor';
import SeoScorePanel from '@/components/blog/SeoScorePanel';
import { Save, Send, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function CreateBlogPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tags, setTags] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [authors, setAuthors] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    authorId: '',
    categoryId: '',
    tags: [] as string[],
    language: 'en',
    status: 'Draft',
    seo: {
      metaTitle: '',
      metaDescription: '',
      focusKeyword: '',
      canonicalUrl: '',
      score: 0,
    }
  });

  useEffect(() => {
    async function loadData() {
      const [cats, tgs, auths] = await Promise.all([
        getCategories(),
        getTags(),
        getAuthors()
      ]);
      setCategories(cats);
      setTags(tgs);
      setAuthors(auths);
    }
    loadData();
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSeoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      seo: { ...prev.seo, [field]: value }
    }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    handleChange('slug', slug);
  };

  const handleSubmit = async (status: string) => {
    try {
      setLoading(true);
      const dataToSubmit = { ...formData, status };
      await createPost(dataToSubmit);
      router.push('/admin/blog');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Error creating post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 bg-white dark:bg-primary rounded-full border border-gray-200 dark:border-white/10 hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Create Article</h1>
            <p className="text-gray-500 text-sm mt-1">Publish a new blog post in English or Arabic.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleSubmit('Draft')}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-primary border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
          <button 
            onClick={() => handleSubmit('Published')}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Publish Article</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-primary border border-gray-200 dark:border-white/10 rounded-xl p-6 space-y-4 shadow-sm">
            <div>
              <label className="block text-sm font-medium mb-1">Article Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  handleChange('title', e.target.value);
                  if (!formData.slug) generateSlug();
                }}
                onBlur={generateSlug}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-secondary outline-none"
                placeholder="Enter article title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Slug *</label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-gray-100 dark:bg-white/5 border border-r-0 border-gray-200 dark:border-white/10 rounded-l-lg text-gray-500 text-sm">/blog/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  className="flex-1 px-4 py-2 rounded-r-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-secondary outline-none"
                  placeholder="article-url-slug"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-secondary outline-none"
                placeholder="Brief summary of the article..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Content *</label>
              <RichTextEditor 
                content={formData.content} 
                onChange={(html) => handleChange('content', html)} 
              />
            </div>
          </div>

          {/* SEO Metadata Block */}
          <div className="bg-white dark:bg-primary border border-gray-200 dark:border-white/10 rounded-xl p-6 space-y-4 shadow-sm">
            <h3 className="text-lg font-semibold border-b border-gray-100 dark:border-white/10 pb-2 mb-4">SEO Metadata</h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Focus Keyword</label>
              <input
                type="text"
                value={formData.seo.focusKeyword}
                onChange={(e) => handleSeoChange('focusKeyword', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-secondary outline-none"
                placeholder="e.g. Luxury Umrah Transport"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Meta Title</label>
              <input
                type="text"
                value={formData.seo.metaTitle}
                onChange={(e) => handleSeoChange('metaTitle', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-secondary outline-none"
                placeholder="Defaults to article title if empty"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.seo.metaTitle.length} characters (Optimal: 30-60)</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Meta Description</label>
              <textarea
                value={formData.seo.metaDescription}
                onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-secondary outline-none"
                placeholder="SEO description..."
              />
              <p className="text-xs text-gray-500 mt-1">{formData.seo.metaDescription.length} characters (Optimal: 120-160)</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Canonical URL (Optional)</label>
              <input
                type="text"
                value={formData.seo.canonicalUrl}
                onChange={(e) => handleSeoChange('canonicalUrl', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-secondary outline-none"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <SeoScorePanel 
            title={formData.title}
            content={formData.content}
            metaTitle={formData.seo.metaTitle}
            metaDescription={formData.seo.metaDescription}
            focusKeyword={formData.seo.focusKeyword}
            onScoreChange={(score) => handleSeoChange('score', score.toString())}
          />

          <div className="bg-white dark:bg-primary border border-gray-200 dark:border-white/10 rounded-xl p-5 space-y-4 shadow-sm">
            <h3 className="font-semibold mb-2">Publishing Details</h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <select
                value={formData.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none"
              >
                <option value="en">English</option>
                <option value="ar">Arabic (العربية)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Author</label>
              <select
                value={formData.authorId}
                onChange={(e) => handleChange('authorId', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none"
              >
                <option value="">Select Author...</option>
                {authors.map((a: any) => (
                  <option key={a._id} value={a._id}>{a.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={formData.categoryId}
                onChange={(e) => handleChange('categoryId', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none"
              >
                <option value="">Select Category...</option>
                {categories.map((c: any) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-primary border border-gray-200 dark:border-white/10 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold mb-3">Featured Image</h3>
            {formData.featuredImage ? (
              <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-white/10">
                <img src={formData.featuredImage} alt="Featured" className="w-full h-40 object-cover" />
                <button 
                  onClick={() => handleChange('featuredImage', '')}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div 
                className="w-full h-40 border-2 border-dashed border-gray-300 dark:border-white/20 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                onClick={() => {
                  const url = window.prompt('Enter Image URL (e.g. /images/hero/vip-fleet.jpg)');
                  if (url) handleChange('featuredImage', url);
                }}
              >
                <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
                <span className="text-sm">Click to add image URL</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
