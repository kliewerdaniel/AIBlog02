import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';
import Image from 'next/image';
import { FadeInOnScroll, RevealOnScroll } from '@/components/ScrollAnimations';
import { StaggerContainer, StaggerItem } from '@/components/PageTransition';
import FullSummaryBlogPostCard from '@/components/FullSummaryBlogPostCard';

// Mark as server component
export const dynamic = 'force-static';

export default function BlogPage() {
  const posts = getAllPosts();
  
  // Convert posts to the format expected by BlogPostCard
  const formattedPosts = posts.map((post) => {
    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt, // Use the full excerpt without truncation
      summary: post.excerpt, // Use the full excerpt without truncation
      date: post.date,
      readingTime: post.readingTime,
      isFeatured: false // No posts are featured
    };
  });
  
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
      
      {/* All Posts */}
      <div className="container mx-auto px-4 lg:px-8 space-y-16">
        <h2 className="font-serif text-2xl font-semibold mb-6">All Articles</h2>
        <div className="space-y-16">
          {formattedPosts.map((post) => (
            <div key={post.id} className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:shadow-xl">
              <FullSummaryBlogPostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
