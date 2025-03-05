'use client';

import Link from 'next/link';
import { MotionContainer, MotionItem } from '@/components/MotionWrapper';
import MotionWrapper from '@/components/MotionWrapper';

interface Post {
  id: number;
  title: string;
  date: string;
  excerpt: string;
}

interface HomePageProps {
  posts: Post[];
}

export default function HomePage({ posts }: HomePageProps) {
  return (
    <div className="space-y-16">
      <MotionWrapper animation="fade-in" className="border-b border-subtle pb-8">
        <h1 className="text-5xl font-serif font-bold tracking-tight">Monochrome</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          A sophisticated black and white blog with elegant typography and smooth animations
        </p>
      </MotionWrapper>

      <MotionContainer className="space-y-16">
        {posts.map((post) => (
          <MotionItem 
            key={post.id}
            className="border-b border-subtle pb-12"
          >
            <article>
              <Link href={`/posts/${post.id}`} className="group block">
                <div className="bg-gray-100 dark:bg-gray-800 aspect-video mb-6 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600 text-lg">
                    Featured Image Placeholder
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold group-hover:text-gray-900 dark:group-hover:text-gray-50 transition-colors duration-200">
                  {post.title}
                </h2>
              </Link>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {post.excerpt}
              </p>
              <div className="mt-6">
                <Link 
                  href={`/posts/${post.id}`} 
                  className="inline-block px-6 py-2 border border-gray-800 dark:border-gray-200 hover:bg-gray-900 hover:text-gray-50 dark:hover:bg-gray-50 dark:hover:text-gray-900 transition-colors duration-200"
                >
                  Read More
                </Link>
              </div>
            </article>
          </MotionItem>
        ))}
      </MotionContainer>

      <MotionWrapper 
        animation="fade-in" 
        delay={0.5} 
        className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg"
      >
        <h3 className="text-2xl font-serif font-semibold mb-4">Subscribe to the Newsletter</h3>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Get the latest posts delivered right to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
          />
          <button className="px-6 py-2 bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </MotionWrapper>
    </div>
  );
}
