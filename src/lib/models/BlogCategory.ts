import mongoose, { Schema, Document, models } from 'mongoose';

export interface IBlogCategory extends Document {
  name: string;
  nameAr: string;
  slug: string;
  description?: string;
  descriptionAr?: string;
  parent?: mongoose.Types.ObjectId;
  seo?: {
    metaTitle?: string;
    metaTitleAr?: string;
    metaDescription?: string;
    metaDescriptionAr?: string;
  };
}

const BlogCategorySchema = new Schema<IBlogCategory>({
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  descriptionAr: { type: String },
  parent: { type: Schema.Types.ObjectId, ref: 'BlogCategory' },
  seo: {
    metaTitle: { type: String },
    metaTitleAr: { type: String },
    metaDescription: { type: String },
    metaDescriptionAr: { type: String },
  }
}, {
  timestamps: true
});

const BlogCategory = models.BlogCategory || mongoose.model<IBlogCategory>('BlogCategory', BlogCategorySchema);

export default BlogCategory;
