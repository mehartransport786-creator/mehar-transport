import { getCategories } from '@/lib/actions/blog';
import CategoriesClient from './CategoriesClient';

export default async function CategoriesPage() {
  const categories = await getCategories();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Categories</h1>
        <p className="text-gray-500 text-sm mt-1">Manage blog categories and SEO metadata.</p>
      </div>
      
      <CategoriesClient initialCategories={categories} />
    </div>
  );
}
