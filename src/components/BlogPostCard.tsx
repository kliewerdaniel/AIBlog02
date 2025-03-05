'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface BlogPostCardProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime: string;
  imageUrl?: string;
  isFeatured?: boolean;
}

export default function BlogPostCard({
  id,
  title,
  excerpt,
  date,
  category,
  readingTime,
  imageUrl = '/images/placeholder.jpg',
  isFeatured = false,
}: BlogPostCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 ${
        isFeatured ? 'ring-2 ring-gray-900 dark:ring-gray-100' : 'border border-gray-200 dark:border-gray-700'
      }`}
    >
      {/* Featured badge */}
      {isFeatured && (
        <div className="absolute top-4 right-4 z-10 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium uppercase tracking-wider px-2 py-1 rounded">
          Featured
        </div>
      )}

      <Link href={`/posts/${id}`} className="block">
        {/* Card content wrapper with hover effects */}
        <motion.div
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          className="h-full transition-shadow duration-300 group-hover:shadow-lg"
        >
          {/* Image container with fixed aspect ratio */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onLoad={() => setIsLoaded(true)}
                priority={isFeatured}
              />
            )}
            
            {/* Loading animation overlay */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isLoaded ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
            >
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </motion.div>
          </div>

          {/* Content container */}
          <div className="p-6">
            {/* Category and date */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
            </div>

            {/* Title */}
            <h3 className="mb-2 font-serif text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 transition-colors duration-200 group-hover:text-gray-700 dark:group-hover:text-white md:text-2xl">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 md:text-base">
              {excerpt}
            </p>

            {/* Reading time */}
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {readingTime} read
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}
