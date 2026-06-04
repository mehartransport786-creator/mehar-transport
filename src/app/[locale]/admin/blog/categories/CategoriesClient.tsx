'use client';

import { useState } from 'react';
import { createCategory, updateCategory, deleteCategory } from '@/lib/actions/blog';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function CategoriesClient({ initialCategories }: { initialCategories: any[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    nameAr: '',
    slug: '',
    description: '',
    descriptionAr: '',
  });

  const resetForm = () => {
    setFormData({
      _id: '',
      name: '',
      nameAr: '',
      slug: '',
      description: '',
      descriptionAr: '',
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    handleChange('slug', slug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData._id) {
        const updated = await updateCategory(formData._id, formData);
        setCategories(prev => prev.map(c => c._id === updated._id ? updated : c));
      } else {
        const created = await createCategory(formData);
        setCategories([created, ...categories]);
      }
      resetForm();
    } catch (error) {
      console.error(error);
      alert('Error saving category');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    setLoading(true);
    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(c => c._id !== id));
    } catch (error) {
      console.error(error);
      alert('Error deleting category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form */}
      <div className="bg-white dark:bg-[#1B1E4F] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-sm h-fit">
        <h2 className="text-lg font-semibold mb-4">{formData._id ? 'Edit Category' : 'Add New Category'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name (EN) *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => {
                handleChange('name', e.target.value);
                if (!formData.slug && !formData._id) generateSlug();
              }}
              onBlur={!formData._id ? generateSlug : undefined}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-[#D9A63A] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name (AR) *</label>
            <input
              type="text"
              required
              dir="rtl"
              value={formData.nameAr}
              onChange={(e) => handleChange('nameAr', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-[#D9A63A] outline-none text-right font-cairo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-[#D9A63A] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description (EN)</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-[#D9A63A] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description (AR)</label>
            <textarea
              dir="rtl"
              value={formData.descriptionAr}
              onChange={(e) => handleChange('descriptionAr', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-[#D9A63A] outline-none text-right font-cairo"
            />
          </div>
          
          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#D9A63A] text-white py-2 rounded-lg hover:bg-[#b88c32] transition-colors font-medium"
            >
              {loading ? 'Saving...' : formData._id ? 'Update Category' : 'Create Category'}
            </button>
            {formData._id && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="lg:col-span-2 bg-white dark:bg-[#1B1E4F] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Slug</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map(category => (
                <tr key={category._id} className="border-b border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs text-gray-500 font-cairo" dir="rtl">{category.nameAr}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{category.slug}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setFormData({
                        _id: category._id,
                        name: category.name || '',
                        nameAr: category.nameAr || '',
                        slug: category.slug || '',
                        description: category.description || '',
                        descriptionAr: category.descriptionAr || '',
                      })}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors mr-1"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(category._id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
