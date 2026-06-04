import { getTags } from '@/lib/actions/blog';
import TagsClient from './TagsClient';

export default async function TagsPage() {
  const tags = await getTags();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tags</h1>
        <p className="text-gray-500 text-sm mt-1">Manage blog tags.</p>
      </div>
      
      <TagsClient initialTags={tags} />
    </div>
  );
}
