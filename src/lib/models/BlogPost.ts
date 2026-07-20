import mongoose, { Schema, Document, models } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage: string;
  authorId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[];
  language: 'en' | 'ar';
  translationId?: mongoose.Types.ObjectId; // Link to the same post in the other language
  status: 'Draft' | 'Review' | 'Scheduled' | 'Published' | 'Archived';
  publishedAt?: Date;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    focusKeyword?: string;
    canonicalUrl?: string;
    ogImage?: string;
    score?: number;
  };
  views: number;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  featuredImage: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'BlogAuthor', required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'BlogCategory', required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'BlogTag' }],
  language: { type: String, enum: ['en', 'ar'], required: true },
  translationId: { type: Schema.Types.ObjectId, ref: 'BlogPost' },
  status: { 
    type: String, 
    enum: ['Draft', 'Review', 'Scheduled', 'Published', 'Archived'], 
    default: 'Draft' 
  },
  publishedAt: { type: Date },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    focusKeyword: { type: String },
    canonicalUrl: { type: String },
    ogImage: { type: String },
    score: { type: Number, default: 0 },
  },
  views: { type: Number, default: 0 },
}, {
  timestamps: true
});

// ─── Compound indexes (ESR rule: Equality → Sort → Range) ────────────────────
// Listing pages: status='Published', language, sorted by createdAt desc
BlogPostSchema.index({ status: 1, language: 1, createdAt: -1 });
// Single post lookup (slug + language combo is the real unique key publicly)
BlogPostSchema.index({ slug: 1, language: 1 });
// Category listing pages
BlogPostSchema.index({ categoryId: 1, status: 1, createdAt: -1 });
// Author listing pages
BlogPostSchema.index({ authorId: 1, status: 1, createdAt: -1 });
// Tag listing pages (multikey index — MongoDB handles array fields automatically)
BlogPostSchema.index({ tags: 1, status: 1, createdAt: -1 });
// Published-at sort (used for sitemap & RSS)
BlogPostSchema.index({ publishedAt: -1 });
// ─────────────────────────────────────────────────────────────────────────────

const BlogPost = models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
