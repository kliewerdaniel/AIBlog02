'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import BlogPostCard from './BlogPostCard';
import NewsletterForm from './NewsletterForm';
import { FadeInOnScroll, ParallaxImage, StickyElement, RevealOnScroll } from './ScrollAnimations';
import { StaggerContainer, StaggerItem } from './PageTransition';
import { AnimatedButton, AnimatedCard } from './MicroInteractions';

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
        <StaggerContainer delay={0.2} staggerDelay={0.15}>
          <div className="space-y-6">
            {/* Animated Typography for Blog Name */}
            <StaggerItem>
              <AnimatedTypography />
            </StaggerItem>
            
            {/* Welcome Message */}
            <StaggerItem>
              <motion.p 
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                A premium editorial experience focused on typography, 
                white space, and the beauty of minimalism.
              </motion.p>
            </StaggerItem>
            
            {/* CTA Button */}
            <StaggerItem>
              <AnimatedButton
                variant="primary"
                size="lg"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                }
                iconPosition="right"
                onClick={() => {
                  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Articles
              </AnimatedButton>
            </StaggerItem>
          </div>
        </StaggerContainer>
        
        {/* Minimal Illustration */}
        <div className="mt-12 md:mt-16">
          <MinimalIllustration />
        </div>
      </section>
      
      {/* Featured/Recent Posts Section */}
      <div id="featured">
        <FadeInOnScroll className="space-y-10" threshold={0.1}>
        <div className="flex justify-between items-end">
          <RevealOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold">Featured Articles</h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <Link 
              href="/archive" 
              className="text-sm font-medium hover:underline"
            >
              View All
            </Link>
          </RevealOnScroll>
        </div>
        
        <StaggerContainer delay={0.1} staggerDelay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <StaggerItem key={post.id} index={index}>
                <div className={index === 0 ? "md:col-span-2" : ""}>
                  <BlogPostCard {...post} />
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
        </FadeInOnScroll>
      </div>
      
      {/* Categories Section */}
      <FadeInOnScroll className="space-y-8" direction="right">
        <RevealOnScroll>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold">Categories</h2>
        </RevealOnScroll>
        <CategoryScroller categories={categories} />
      </FadeInOnScroll>
      
      {/* Newsletter Section */}
      <FadeInOnScroll className="bg-gray-100 dark:bg-gray-800 p-8 md:p-12 rounded-lg" direction="up">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <RevealOnScroll>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Stay Updated</h2>
            </RevealOnScroll>
            <RevealOnScroll>
              <p className="text-gray-600 dark:text-gray-400">
                Subscribe to our newsletter to receive the latest posts and updates.
              </p>
            </RevealOnScroll>
          </div>
          
          <div className="max-w-md mx-auto">
            <NewsletterForm />
            <motion.p 
              className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              We respect your privacy. Unsubscribe at any time.
            </motion.p>
          </div>
        </div>
      </FadeInOnScroll>
      
      {/* About Section */}
      <FadeInOnScroll className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12" direction="left">
        <div className="md:w-1/2">
          <RevealOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">About Monochrome</h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Monochrome is a premium blog dedicated to the beauty of simplicity. 
              We explore design, typography, and minimalism through thoughtful articles 
              and visual storytelling.
            </p>
          </RevealOnScroll>
          <RevealOnScroll>
            <AnimatedButton
              variant="text"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              }
              iconPosition="right"
              onClick={() => {
                window.location.href = '/about';
              }}
            >
              Learn more about us
            </AnimatedButton>
          </RevealOnScroll>
        </div>
        
        <div className="md:w-1/2">
          <AnimatedCard hoverEffect="scale" className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="w-3/4 h-3/4 relative">
              {/* Abstract geometric pattern */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-gray-800 dark:border-gray-200 rounded-full"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                />
                <motion.div 
                  className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-gray-800 dark:bg-gray-200"
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  viewport={{ once: true }}
                />
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full border border-gray-800 dark:border-gray-200"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            </div>
          </AnimatedCard>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
