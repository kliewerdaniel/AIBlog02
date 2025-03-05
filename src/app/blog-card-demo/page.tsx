'use client';

import BlogPostCard from '@/components/BlogPostCard';

export default function BlogCardDemo() {
  // Sample blog post data
  const posts = [
    {
      id: 1,
      title: 'The Art of Minimalist Design in Modern Web Development',
      excerpt: 'Explore how minimalist design principles can create more effective and elegant user experiences while reducing cognitive load.',
      date: 'March 5, 2025',
      category: 'Design',
      readingTime: '5 min',
      imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      isFeatured: true,
    },
    {
      id: 2,
      title: 'Understanding the Psychology of Typography',
      excerpt: 'How different typefaces and font pairings affect readability, user perception, and the emotional response to your content.',
      date: 'March 3, 2025',
      category: 'Typography',
      readingTime: '4 min',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 3,
      title: 'Creating Accessible High-Contrast Interfaces',
      excerpt: 'Best practices for designing interfaces that maintain high contrast ratios while still looking elegant and modern.',
      date: 'February 28, 2025',
      category: 'Accessibility',
      readingTime: '7 min',
      imageUrl: 'https://images.unsplash.com/photo-1550592704-6c76defa9985?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 font-serif text-4xl font-bold">Blog Post Card Component</h1>
      
      <div className="mb-12">
        <h2 className="mb-4 font-serif text-2xl font-semibold">Featured Post</h2>
        <div className="max-w-2xl">
          <BlogPostCard {...posts[0]} />
        </div>
      </div>
      
      <div>
        <h2 className="mb-4 font-serif text-2xl font-semibold">Regular Posts</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((post) => (
            <BlogPostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}
