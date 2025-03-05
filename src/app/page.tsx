import HomePage from '@/components/HomePage';
import { getAllPosts } from '@/lib/markdown';

// Mark as server component
export const dynamic = 'force-static';

export default function Home() {
  const posts = getAllPosts();
  return <HomePage posts={posts} />;
}
