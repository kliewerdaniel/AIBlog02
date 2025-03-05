'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import BlogPostCard from './BlogPostCard';
import PostCarousel from './PostCarousel';
import { FadeInOnScroll, ParallaxImage, StickyElement, RevealOnScroll } from './ScrollAnimations';
import { StaggerContainer, StaggerItem } from './PageTransition';
import { AnimatedButton, AnimatedCard } from './MicroInteractions';
import { Post } from '@/lib/markdown';

// Animated text for the blog name
const AnimatedTypography = () => {
  const firstName = "DANIEL".split('');
  const lastName = "KLIEWER".split('');
  
  return (
    <div className="font-serif text-6xl md:text-7xl font-bold tracking-tight flex flex-col">
      <div className="flex flex-wrap">
        {firstName.map((letter, index) => (
          <motion.span
            key={`first-${index}`}
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
      </div>
      <div className="flex flex-wrap">
        {lastName.map((letter, index) => (
          <motion.span
            key={`last-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.6 + (index * 0.1),
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
      </div>
    </div>
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

interface HomePageProps {
  posts: Post[];
}

export default function HomePage({ posts }: HomePageProps) {
  // Extract categories from posts
  const categoriesMap = posts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      acc.set(tag, (acc.get(tag) || 0) + 1);
    });
    return acc;
  }, new Map<string, number>());
  
  const categories = Array.from(categoriesMap.entries()).map(([name, count]) => ({
    name,
    count
  })).sort((a, b) => b.count - a.count);
  
  // Convert posts to the format expected by BlogPostCard
  const formattedPosts = posts.map((post, index) => {
    // Get more content for the excerpt
    let extendedExcerpt = post.excerpt;
    
    // If there's content, try to get more text from the first few paragraphs
    if (post.content && post.content.length > 0) {
      const paragraphs = post.content.filter(item => item.type === 'paragraph');
      if (paragraphs.length > 0) {
        // Use the first paragraph or two for a longer excerpt
        const contentText = paragraphs.slice(0, 2).map(p => p.content).join(' ');
        if (contentText.length > 0) {
          extendedExcerpt = contentText.length > 300 
            ? contentText.substring(0, 300) + '...' 
            : contentText;
        }
      }
    }
    
    return {
      id: post.id,
      title: post.title,
      excerpt: extendedExcerpt,
      date: post.date,
      readingTime: post.readingTime,
      isFeatured: index === 0 // Mark the first post as featured
    };
  });
  
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
                A programming blog covering web development, data annotation, 
                and the intersection of technology and creativity.
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
        <div className="mb-8">
          <RevealOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold">Featured Articles</h2>
          </RevealOnScroll>
        </div>
        
        <RevealOnScroll>
          <PostCarousel posts={formattedPosts} />
        </RevealOnScroll>
        </FadeInOnScroll>
      </div>
      
      {/* Categories Section */}
      <FadeInOnScroll className="space-y-8" direction="right">
        <RevealOnScroll>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold">Categories</h2>
        </RevealOnScroll>
        <CategoryScroller categories={categories} />
      </FadeInOnScroll>
      
      
      {/* About Section */}
      <FadeInOnScroll className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12" direction="left">
        <div className="md:w-1/2">
          <RevealOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">About Daniel Kliewer</h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              I'm a multifaceted professional with over 15 years of experience spanning web development, 
              data annotation, and digital/traditional art. My expertise includes enhancing AI model 
              accuracy through meticulous data labeling and automating workflows with Python.
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
              Learn more about me
            </AnimatedButton>
          </RevealOnScroll>
        </div>
        
        <div className="md:w-1/2">
          <AnimatedCard hoverEffect="scale" className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg p-6">
            <div className="w-full h-full flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-4">Professional Skills</h3>
              <ul className="space-y-2">
                <motion.li 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full mr-2"></span>
                  <span>Web Development</span>
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full mr-2"></span>
                  <span>Data Annotation</span>
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full mr-2"></span>
                  <span>Python</span>
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full mr-2"></span>
                  <span>JavaScript</span>
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full mr-2"></span>
                  <span>Adobe Creative Suite</span>
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full mr-2"></span>
                  <span>Google Analytics</span>
                </motion.li>
              </ul>
            </div>
          </AnimatedCard>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
