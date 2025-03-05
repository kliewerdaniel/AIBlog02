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
  summary?: string; // Add optional summary prop
  date: string;
  readingTime: string;
  isFeatured?: boolean;
}

export default function BlogPostCard({
  id,
  title,
  excerpt,
  summary,
  date,
  readingTime,
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
        className="relative overflow-hidden h-full flex flex-col bg-white dark:bg-gray-800"
      >

        <Link href={`/posts/${id}`} className="block flex-grow flex flex-col">

          {/* Content container */}
          <div className="p-8 flex-grow flex flex-col">
          {/* Date */}
          <div className="mb-3 flex items-center justify-end">
            <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
          </div>

            {/* Title */}
            <motion.h3 
              className="mb-3 font-serif text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl line-clamp-2 min-h-[3.5rem]"
              animate={{ 
                color: isHovered ? 'var(--accent)' : 'var(--foreground)'
              }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.h3>

            {/* Display summary if available, otherwise fall back to excerpt */}
            <p className="mb-5 text-sm text-gray-600 dark:text-gray-300 md:text-base line-clamp-8 flex-grow">
              {summary || excerpt}
            </p>

            {/* Reading time */}
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
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
              className="mt-2 flex items-center text-sm font-medium text-gray-800 dark:text-gray-200"
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
