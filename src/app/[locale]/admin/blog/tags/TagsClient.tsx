'use client';

import { useState } from 'react';
import { createTag, updateTag, deleteTag } from '@/lib/actions/blog';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function TagsClient({ initialTags }: { initialTags: any[] }) {
  const [tags, setTags] = useState(initialTags);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    nameAr: '',
    slug: '',
  });

  const resetForm = () => {
    setFormData({
      _id: '',
      name: '',
      nameAr: '',
      slug: '',
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
        const updated = await updateTag(formData._id, formData);
        setTags(prev => prev.map(t => t._id === updated._id ? updated : t));
      } else {
        const created = await createTag(formData);
        setTags([created, ...tags]);
      }
      resetForm();
    } catch (error) {
      console.error(error);
      alert('Error saving tag');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) return;
    setLoading(true);
    try {
      await deleteTag(id);
      setTags(prev => prev.filter(t => t._id !== id));
    } catch (error) {
      console.error(error);
      alert('Error deleting tag');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form */}
      <div className="bg-white dark:bg-primary border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-sm h-fit">
        <h2 className="text-lg font-semibold mb-4">{formData._id ? 'Edit Tag' : 'Add New Tag'}</h2>
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
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-secondary outline-none"
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
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-secondary outline-none text-right font-cairo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-secondary outline-none"
            />
          </div>
          
          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-secondary text-white py-2 rounded-lg hover:bg-secondary/80 transition-colors font-medium"
            >
              {loading ? 'Saving...' : formData._id ? 'Update Tag' : 'Create Tag'}
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
      <div className="lg:col-span-2 bg-white dark:bg-primary border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Slug</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No tags found.
                </td>
              </tr>
            ) : (
              tags.map(tag => (
                <tr key={tag._id} className="border-b border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="font-medium">{tag.name}</div>
                    <div className="text-xs text-gray-500 font-cairo" dir="rtl">{tag.nameAr}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{tag.slug}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setFormData({
                        _id: tag._id,
                        name: tag.name || '',
                        nameAr: tag.nameAr || '',
                        slug: tag.slug || '',
                      })}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors mr-1"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(tag._id)}
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
