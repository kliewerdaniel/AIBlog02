'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import BlogPostCard from './BlogPostCard';
import NewsletterForm from './NewsletterForm';

// Sample data for demonstration
const featuredPosts = [
  {
    id: 1,
    title: 'The Minimalist Approach to Modern Design',
    excerpt: 'Exploring how less becomes more in contemporary design philosophy.',
    date: 'March 5, 2025',
    category: 'Design',
    readingTime: '5 min',
    imageUrl: '/images/blog-1.jpg',
    isFeatured: true
  },
  {
    id: 2,
    title: 'Typography Trends for Editorial Websites',
    excerpt: 'An analysis of font choices that dominate premium publications online.',
    date: 'March 3, 2025',
    category: 'Typography',
    readingTime: '4 min',
    imageUrl: '/images/blog-1.jpg',
    isFeatured: false
  },
  {
    id: 3,
    title: 'Creating Contrast in Monochromatic Interfaces',
    excerpt: 'How to build visual hierarchy when limited to black and white.',
    date: 'February 28, 2025',
    category: 'UI/UX',
    readingTime: '6 min',
    imageUrl: '/images/blog-1.jpg',
    isFeatured: false
  },
  {
    id: 4,
    title: 'The Psychology of Black and White in Branding',
    excerpt: 'Understanding the emotional impact of a restricted color palette.',
    date: 'February 25, 2025',
    category: 'Branding',
    readingTime: '7 min',
    imageUrl: '/images/blog-1.jpg',
    isFeatured: false
  }
];

const categories = [
  { name: 'Design', count: 12 },
  { name: 'Typography', count: 8 },
  { name: 'UI/UX', count: 15 },
  { name: 'Branding', count: 7 },
  { name: 'Photography', count: 9 },
  { name: 'Minimalism', count: 11 }
];

// Animated text for the blog name
const AnimatedTypography = () => {
  const letters = "MONOCHROME".split('');
  
  return (
    <h1 className="font-serif text-6xl md:text-7xl font-bold tracking-tight flex flex-wrap">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
          whileHover={{ 
            scale: 1.1, 
            transition: { duration: 0.2 } 
          }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </h1>
  );
};

// Minimal illustration component
const MinimalIllustration = () => {
  return (
    <motion.div 
      className="relative w-full h-40 md:h-60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Horizontal line */}
      <motion.div 
        className="absolute top-1/2 left-0 w-full h-px bg-gray-800 dark:bg-gray-200"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.7 }}
      />
      
      {/* Circle */}
      <motion.div 
        className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full border-2 border-gray-800 dark:border-gray-200 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      />
      
      {/* Square */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-8 h-8 border-2 border-gray-800 dark:border-gray-200 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ rotate: -45, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      />
      
      {/* Triangle */}
      <motion.div 
        className="absolute top-1/2 left-3/4 w-0 h-0 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-gray-800 dark:border-b-gray-200" />
      </motion.div>
      
      {/* Vertical lines */}
      {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
        <motion.div 
          key={i}
          className="absolute top-0 w-px h-full bg-gray-800 dark:bg-gray-200"
          style={{ left: `${pos * 100}%` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
        />
      ))}
    </motion.div>
  );
};

// Section component with animation on scroll
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const AnimatedSection = ({ children, className = '', id }: AnimatedSectionProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  return (
    <motion.section
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.6 }}
      className={`${className}`}
    >
      {children}
    </motion.section>
  );
};

// Horizontal scrolling categories
interface Category {
  name: string;
  count: number;
}

interface CategoryScrollerProps {
  categories: Category[];
}

const CategoryScroller = ({ categories }: CategoryScrollerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="relative">
      <div 
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
      >
        {categories.map((category: Category, index: number) => (
          <motion.div
            key={index}
            className="snap-start flex-shrink-0 w-48 h-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col justify-between"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <h3 className="font-serif text-xl font-semibold">{category.name}</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">{category.count} posts</span>
              <motion.div 
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Fade effect on edges */}
      <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none" />
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center">
        <div className="space-y-6">
          {/* Animated Typography for Blog Name */}
          <AnimatedTypography />
          
          {/* Welcome Message */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            A premium editorial experience focused on typography, 
            white space, and the beauty of minimalism.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <Link 
              href="#featured"
              className="inline-block px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-none hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
            >
              Explore Articles
            </Link>
          </motion.div>
        </div>
        
        {/* Minimal Illustration */}
        <div className="mt-12 md:mt-16">
          <MinimalIllustration />
        </div>
      </section>
      
      {/* Featured/Recent Posts Section */}
      <AnimatedSection id="featured" className="space-y-10">
        <div className="flex justify-between items-end">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold">Featured Articles</h2>
          <Link 
            href="/archive" 
            className="text-sm font-medium hover:underline"
          >
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <div key={post.id} className={index === 0 ? "md:col-span-2" : ""}>
              <BlogPostCard {...post} />
            </div>
          ))}
        </div>
      </AnimatedSection>
      
      {/* Categories Section */}
      <AnimatedSection className="space-y-8">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold">Categories</h2>
        <CategoryScroller categories={categories} />
      </AnimatedSection>
      
      {/* Newsletter Section */}
      <AnimatedSection className="bg-gray-100 dark:bg-gray-800 p-8 md:p-12 rounded-lg">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Stay Updated</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter to receive the latest posts and updates.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <NewsletterForm />
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </AnimatedSection>
      
      {/* About Section */}
      <AnimatedSection className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
        <div className="md:w-1/2">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">About Monochrome</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Monochrome is a premium blog dedicated to the beauty of simplicity. 
            We explore design, typography, and minimalism through thoughtful articles 
            and visual storytelling.
          </p>
          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <Link 
              href="/about" 
              className="inline-flex items-center font-medium"
            >
              Learn more about us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
        
        <div className="md:w-1/2">
          <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="w-3/4 h-3/4 relative">
              {/* Abstract geometric pattern */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-gray-800 dark:border-gray-200 rounded-full" />
                <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-gray-800 dark:bg-gray-200" />
                <div className="absolute top-0 left-0 w-full h-full border border-gray-800 dark:border-gray-200" />
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
