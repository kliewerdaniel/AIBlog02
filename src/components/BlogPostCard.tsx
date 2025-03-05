'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { AnimatedCard } from './MicroInteractions';
import { SkeletonImage } from './LoadingStates';

interface BlogPostCardProps {
  id: string | number; // Updated to accept both string and number
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <AnimatedCard 
        hoverEffect="lift"
        className={`relative overflow-hidden h-full flex flex-col bg-white dark:bg-gray-800 ${
          isFeatured ? 'ring-2 ring-gray-900 dark:ring-gray-100' : ''
        }`}
      >
        {/* Featured badge */}
        {isFeatured && (
          <motion.div 
            className="absolute top-4 right-4 z-10 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium uppercase tracking-wider px-2 py-1 rounded"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Featured
          </motion.div>
        )}

        <Link href={`/posts/${id}`} className="block flex-grow flex flex-col">
          {/* Image container with fixed aspect ratio */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-700" style={{ position: 'relative' }}>
            {!isLoaded && (
              <SkeletonImage height="100%" />
            )}
            
            {imageUrl && (
              <motion.div
                animate={{ 
                  scale: isHovered ? 1.05 : 1
                }}
                transition={{ duration: 0.4 }}
                className="h-full w-full"
                style={{ position: 'relative' }}
              >
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  onLoad={() => setIsLoaded(true)}
                  priority={isFeatured}
                />
              </motion.div>
            )}
          </div>

          {/* Content container */}
          <div className="p-6 flex-grow flex flex-col">
            {/* Category and date */}
            <div className="mb-2 flex items-center justify-between">
              <motion.span 
                className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                whileHover={{ color: '#000' }}
              >
                {category}
              </motion.span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
            </div>

            {/* Title */}
            <motion.h3 
              className="mb-2 font-serif text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl line-clamp-2 min-h-[3.5rem]"
              animate={{ 
                color: isHovered ? 'var(--accent)' : 'var(--foreground)'
              }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.h3>

            {/* Excerpt */}
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-100 md:text-base line-clamp-3 flex-grow">
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
            
            {/* Read more indicator */}
            <motion.div 
              className="mt-4 flex items-center text-sm font-medium text-gray-800 dark:text-gray-200"
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -10
              }}
              transition={{ duration: 0.2 }}
            >
              Read more
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="ml-1 h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ 
                  x: isHovered ? 3 : 0
                }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
            </motion.div>
          </div>
        </Link>
      </AnimatedCard>
    </motion.div>
  );
}
