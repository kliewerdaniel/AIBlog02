import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';
import Image from 'next/image';
import { FadeInOnScroll, RevealOnScroll } from '@/components/ScrollAnimations';
import { StaggerContainer, StaggerItem } from '@/components/PageTransition';
import BlogPostCard from '@/components/BlogPostCard';

// Mark as server component
export const dynamic = 'force-static';

export default function BlogPage() {
  const posts = getAllPosts();
  
  // Convert posts to the format expected by BlogPostCard
  const formattedPosts = posts.map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    category: post.tags[0] || 'Uncategorized',
    readingTime: post.readingTime,
    imageUrl: post.featuredImage.src,
    isFeatured: false
  }));
  
  return (
    <div className="space-y-16 pb-16 bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <FadeInOnScroll className="space-y-6">
          <RevealOnScroll>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Blog
            </h1>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
              Explore articles on web development, data annotation, AI, and more.
            </p>
          </RevealOnScroll>
        </FadeInOnScroll>
      </section>
      
      {/* Posts Grid */}
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formattedPosts.map((post, index) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <BlogPostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
