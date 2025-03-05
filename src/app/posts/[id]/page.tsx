import PostPage from '@/components/PostPage';
import { getPostById, getAllPostIds } from '@/lib/markdown';

// Mark as static page
export const dynamic = 'force-static';

export default function Post({ params }: { params: { id: string } }) {
  const post = getPostById(params.id);
  
  if (!post) {
    return <div>Post not found</div>;
  }
  
  return <PostPage post={post} />;
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const ids = getAllPostIds();
  return ids.map(id => ({ id }));
}
