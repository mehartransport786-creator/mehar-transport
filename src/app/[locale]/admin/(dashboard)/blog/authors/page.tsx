import { getAuthors } from '@/lib/actions/blog';
import AuthorsClient from './AuthorsClient';

export default async function AuthorsPage() {
  const authors = await getAuthors();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Authors</h1>
        <p className="text-gray-500 text-sm mt-1">Manage blog authors.</p>
      </div>
      
      <AuthorsClient initialAuthors={authors} />
    </div>
  );
}
