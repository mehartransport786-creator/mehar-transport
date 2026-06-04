import mongoose, { Schema, Document, models } from 'mongoose';

export interface IBlogTag extends Document {
  name: string;
  nameAr: string;
  slug: string;
}

const BlogTagSchema = new Schema<IBlogTag>({
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  slug: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

const BlogTag = models.BlogTag || mongoose.model<IBlogTag>('BlogTag', BlogTagSchema);

export default BlogTag;
