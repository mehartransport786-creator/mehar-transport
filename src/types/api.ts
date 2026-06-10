export interface ActionResponse<T = undefined> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface BlogPost {
  _id?: string;
  id: string;
  title: string;
  titleAr: string;
  slug: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  author: string;
  authorAr: string;
  category: string;
  categoryAr: string;
  image: string;
  readTime: string;
  tags: string[];
  tagsAr: string[];
  status: 'published' | 'draft';
  publishedAt: string | Date;
  seoTitle?: string;
  seoTitleAr?: string;
  seoDescription?: string;
  seoDescriptionAr?: string;
  featured?: boolean;
}

export interface ActivityLogEntry {
  _id?: string;
  action: string;
  resourceType: string;
  resourceId: string;
  details: string;
  user: string;
  timestamp?: string | Date;
}

export interface AuditLogEntry {
  _id?: string;
  action: string;
  entityType: string;
  entityId: string;
  changes: Record<string, unknown>;
  performedBy: string;
  timestamp?: string | Date;
}

export interface PricingAuditLogEntry {
  _id?: string;
  vehicleId: string;
  oldPrice: number;
  newPrice: number;
  reason: string;
  changedBy: string;
  timestamp?: string | Date;
}
