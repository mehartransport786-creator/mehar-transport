import mongoose, { Schema, Document, models } from 'mongoose';

export interface IBlogAuthor extends Document {
  name: string;
  nameAr: string;
  slug: string;
  bio?: string;
  bioAr?: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

const BlogAuthorSchema = new Schema<IBlogAuthor>({
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  bio: { type: String },
  bioAr: { type: String },
  avatar: { type: String },
  socialLinks: {
    twitter: { type: String },
    linkedin: { type: String },
    website: { type: String },
  }
}, {
  timestamps: true
});

const BlogAuthor = models.BlogAuthor || mongoose.model<IBlogAuthor>('BlogAuthor', BlogAuthorSchema);

export default BlogAuthor;
