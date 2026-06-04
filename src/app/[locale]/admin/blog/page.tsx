import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { FileText, Plus, Eye, Clock, BarChart2 } from "lucide-react";
import { getPosts, getCategories, getTags, getAuthors } from "@/lib/actions/blog";

export default async function BlogDashboardPage() {
  const t = await getTranslations("admin");
  const posts = await getPosts();
  const categories = await getCategories();
  const tags = await getTags();
  const authors = await getAuthors();

  const publishedPosts = posts.filter((p: any) => p.status === 'Published');
  const drafts = posts.filter((p: any) => p.status === 'Draft');
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage articles, SEO, categories, and authors.</p>
        </div>
        <Link 
          href="/admin/blog/create" 
          className="flex items-center gap-2 px-4 py-2 bg-[#D9A63A] text-white rounded-lg hover:bg-[#b88c32] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1B1E4F] p-5 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">{posts.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Articles</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1B1E4F] p-5 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">{publishedPosts.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Published</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1B1E4F] p-5 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">{drafts.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Drafts</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1B1E4F] p-5 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">{categories.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Categories</div>
          </div>
        </div>
      </div>

      {/* Recent Posts Table */}
      <div className="bg-white dark:bg-[#1B1E4F] rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-white/10 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Articles</h2>
          <Link href="/admin/blog/articles" className="text-sm text-blue-600 hover:underline">View All</Link>
        </div>
        
        {posts.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No articles found. Create your first blog post.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-white/5">
                <tr>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Language</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Views</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.slice(0, 10).map((post: any) => (
                  <tr key={post._id} className="border-b border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                    <td className="px-6 py-4 font-medium">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 uppercase font-semibold text-[10px] tracking-wider text-gray-500">
                      {post.language}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {post.categoryId?.name || 'Uncategorized'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.status === 'Published' ? 'bg-green-100 text-green-800' :
                        post.status === 'Draft' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{post.views || 0}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/blog/edit/${post._id}`} className="text-blue-600 hover:text-blue-800 font-medium mr-3">Edit</Link>
                      <Link href={`/blog/${post.slug}`} target="_blank" className="text-gray-500 hover:text-gray-800 font-medium">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
