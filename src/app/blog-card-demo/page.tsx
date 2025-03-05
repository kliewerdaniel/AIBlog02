'use client';

import BlogPostCard from '@/components/BlogPostCard';

export default function BlogCardDemo() {
  // Sample blog post data
  const posts = [
    {
      id: 1,
      title: 'The Art of Minimalist Design in Modern Web Development',
      excerpt: 'Explore how minimalist design principles can create more effective and elegant user experiences while reducing cognitive load. Minimalism in web design focuses on removing unnecessary elements and emphasizing the essential components that truly matter.',
      date: 'March 5, 2025',
      readingTime: '5 min',
      isFeatured: true,
    },
    {
      id: 2,
      title: 'Understanding the Psychology of Typography',
      excerpt: 'How different typefaces and font pairings affect readability, user perception, and the emotional response to your content. Typography is more than just selecting attractive fonts; it\'s about understanding how letterforms influence human psychology.',
      date: 'March 3, 2025',
      readingTime: '4 min',
    },
    {
      id: 3,
      title: 'Creating Accessible High-Contrast Interfaces',
      excerpt: 'Best practices for designing interfaces that maintain high contrast ratios while still looking elegant and modern. Accessibility in design isn\'t just about compliance with standards; it\'s about creating experiences that work for everyone.',
      date: 'February 28, 2025',
      readingTime: '7 min',
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 font-serif text-4xl font-bold">Blog Post Card Component</h1>
      
      <div className="mb-12">
        <h2 className="mb-4 font-serif text-2xl font-semibold">Featured Post</h2>
        <div className="max-w-2xl bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:shadow-xl">
          <BlogPostCard {...posts[0]} />
        </div>
      </div>
      
      <div>
        <h2 className="mb-4 font-serif text-2xl font-semibold">Regular Posts</h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:shadow-xl">
              <BlogPostCard key={post.id} {...post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
