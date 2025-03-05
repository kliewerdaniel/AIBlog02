import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';
import { FadeInOnScroll, RevealOnScroll } from '@/components/ScrollAnimations';
import { StaggerContainer, StaggerItem } from '@/components/PageTransition';
import { AnimatedCard } from '@/components/MicroInteractions';

// Mark as server component
export const dynamic = 'force-static';

interface TagCount {
  name: string;
  count: number;
}

export default function TagsPage() {
  const posts = getAllPosts();
  
  // Extract tags from posts and count occurrences
  const tagsMap = posts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      acc.set(tag, (acc.get(tag) || 0) + 1);
    });
    return acc;
  }, new Map<string, number>());
  
  // Convert to array and sort by count (descending)
  const tags: TagCount[] = Array.from(tagsMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
  
  return (
    <div className="space-y-16 pb-16 bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <FadeInOnScroll className="space-y-6">
          <RevealOnScroll>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Tags
            </h1>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
              Browse articles by topic
            </p>
          </RevealOnScroll>
        </FadeInOnScroll>
      </section>
      
      {/* Tags Grid */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tags.map((tag) => (
            <AnimatedCard 
              key={tag.name}
              hoverEffect="lift"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <Link 
                href={`/search?tag=${encodeURIComponent(tag.name)}`}
                className="block h-full"
              >
                <h2 className="text-xl font-serif font-semibold mb-2">
                  {tag.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tag.count} {tag.count === 1 ? 'post' : 'posts'}
                </p>
              </Link>
            </AnimatedCard>
          ))}
        </div>
        
        {tags.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No tags found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
