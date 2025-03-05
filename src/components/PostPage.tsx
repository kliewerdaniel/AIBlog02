'use client';

import { useState, useEffect, useRef } from 'react';
import { usePostViews } from '@/hooks/usePostViews';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import MotionWrapper, { MotionContainer, MotionItem } from '@/components/MotionWrapper';
import { FadeInOnScroll, ParallaxImage, StickyElement, RevealOnScroll } from './ScrollAnimations';
import { StaggerContainer, StaggerItem } from './PageTransition';
import { AnimatedButton, AnimatedLink, AnimatedCard } from './MicroInteractions';
import { SkeletonBlogPost, SkeletonImage, ProgressBar } from './LoadingStates';

export interface Author {
  name: string;
  avatar: string;
  bio: string;
}

export interface PostImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
}

interface PostProps {
  post: {
    id: string;
    title: string;
    date: string;
    readingTime: string;
    excerpt: string;
    author: Author;
    featuredImage: PostImage;
    content: {
      type: 'paragraph' | 'heading' | 'subheading' | 'blockquote' | 'code' | 'image' | 'list';
      content: string;
      items?: string[];
      language?: string;
      ordered?: boolean;
      image?: PostImage;
      level?: 2 | 3;
    }[];
    tags: string[];
    relatedPosts: RelatedPost[];
    nextPost?: {
      id: string;
      title: string;
    };
    previousPost?: {
      id: string;
      title: string;
    };
  };
}

// Helper function to create TOC items from content
const generateTableOfContents = (content: PostProps['post']['content']) => {
  return content
    .filter(item => item.type === 'heading' || item.type === 'subheading')
    .map((item, index) => {
      const id = `section-${index}`;
      const level = item.type === 'heading' ? 2 : 3;
      return { id, text: item.content, level };
    });
};

export default function PostPage({ post }: PostProps) {
  const [activeSection, setActiveSection] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  
  // Generate table of contents
  const tableOfContents = generateTableOfContents(post.content);
  
  // Track post views
  const { views, loading: viewsLoading } = usePostViews({
    postId: post.id,
    incrementOnMount: true
  });
  
  // Update active section based on scroll position
  useEffect(() => {
    if (!contentRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -100px 0px', threshold: 0.1 }
    );
    
    const headings = contentRef.current.querySelectorAll('h2, h3');
    headings.forEach((heading) => {
      observer.observe(heading);
    });
    
    return () => {
      headings.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, [post.content]);
  
  return (
    <div className="space-y-12 relative">
      {/* Reading progress indicator */}
      <ProgressBar 
        progress={scrollYProgress.get() * 100} 
        height="2px"
        color="primary"
        className="fixed top-0 left-0 right-0 z-50"
      />
      
      {/* Back to home link */}
      <FadeInOnScroll>
        <AnimatedLink 
          href="/" 
          className="inline-flex items-center text-gray-600 dark:text-gray-400"
          underlineEffect="slide"
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            initial={{ x: 0 }}
            whileHover={{ x: -3 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </motion.svg>
          Back to Home
        </AnimatedLink>
      </FadeInOnScroll>
      
      <article>
        {/* Hero section with title, author, date, reading time */}
        <motion.div 
          className="relative mb-16"
          style={{ opacity, scale }}
        >
          <FadeInOnScroll className="border-b border-subtle pb-8 mb-12">
            <RevealOnScroll>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6">{post.title}</h1>
            </RevealOnScroll>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mt-6">
              {/* Author info with avatar */}
              <RevealOnScroll>
                <div className="flex items-center">
                  <motion.div 
                    className="relative w-10 h-10 rounded-full overflow-hidden mr-3"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Use fallback for avatar if image is missing */}
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs">
                      {post.author.name.charAt(0)}
                    </div>
                  </motion.div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{post.author.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.author.bio}</p>
                  </div>
                </div>
              </RevealOnScroll>
              
              {/* Publication info */}
              <RevealOnScroll>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.date} className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {post.date}
                  </time>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readingTime}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {viewsLoading ? '...' : views || 0} {(views === 1) ? 'view' : 'views'}
                  </span>
                </div>
              </RevealOnScroll>
            </div>
          </FadeInOnScroll>
          
              {/* Featured image section removed */}
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of contents (desktop) */}
          <aside className="hidden lg:block lg:col-span-3 relative">
            <StickyElement topOffset="8rem">
              <FadeInOnScroll delay={0.3}>
                <h4 className="text-lg font-serif font-semibold mb-4 pb-2 border-b border-subtle">Table of Contents</h4>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm transition-colors duration-200 ${
                        activeSection === item.id
                          ? 'text-gray-900 dark:text-gray-50 font-medium'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      } ${item.level === 3 ? 'pl-4' : ''}`}
                      whileHover={{ x: activeSection === item.id ? 0 : 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.text}
                    </motion.a>
                  ))}
                </nav>
              </FadeInOnScroll>
            </StickyElement>
          </aside>
          
          {/* Main content */}
          <div className="lg:col-span-9" ref={contentRef}>
            {/* Table of contents (mobile) */}
            <div className="lg:hidden mb-8">
              <MotionWrapper animation="fade-in" delay={0.3}>
                <details className="border border-subtle p-4 rounded-md">
                  <summary className="text-lg font-serif font-semibold cursor-pointer">
                    Table of Contents
                  </summary>
                  <nav className="mt-4 space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm transition-colors duration-200 ${
                          activeSection === item.id
                            ? 'text-gray-900 dark:text-gray-50 font-medium'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        } ${item.level === 3 ? 'pl-4' : ''}`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </details>
              </MotionWrapper>
            </div>
            
            {/* Article content */}
            <MotionContainer className="prose dark:prose-invert prose-lg max-w-none">
              {/* Excerpt */}
              <MotionItem className="mb-8">
                <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                  {post.excerpt}
                </p>
              </MotionItem>
              
              {/* Dynamic content rendering */}
              {post.content.map((section, index) => {
                const sectionId = section.type === 'heading' || section.type === 'subheading' 
                  ? `section-${index}` 
                  : '';
                
                return (
                  <MotionItem key={index} className="mb-8">
                    {section.type === 'paragraph' && (
                      <p dangerouslySetInnerHTML={{ __html: section.content }} />
                    )}
                    
                    {section.type === 'heading' && (
                      <h2 id={sectionId} dangerouslySetInnerHTML={{ __html: section.content }} />
                    )}
                    
                    {section.type === 'subheading' && (
                      <h3 id={sectionId} dangerouslySetInnerHTML={{ __html: section.content }} />
                    )}
                    
                    {section.type === 'blockquote' && (
                      <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-6 italic text-gray-700 dark:text-gray-300 my-8" 
                        dangerouslySetInnerHTML={{ __html: section.content }} />
                    )}
                    
                    {section.type === 'code' && (
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
                        <code className="language-{section.language || 'javascript'} text-gray-900 dark:text-gray-100">
                          {section.content}
                        </code>
                      </pre>
                    )}
                    
                    {/* Image section removed */}
                    
                    {section.type === 'list' && section.items && (
                      section.ordered ? (
                        <ol className="list-decimal pl-6 space-y-2">
                          {section.items.map((item, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ol>
                      ) : (
                        <ul className="list-disc pl-6 space-y-2">
                          {section.items.map((item, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ul>
                      )
                    )}
                  </MotionItem>
                );
              })}
            </MotionContainer>
            
            {/* Tags */}
            <MotionWrapper animation="fade-in" delay={0.2} className="mt-12">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-block px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </MotionWrapper>
            
            {/* Read More Articles button */}
            <MotionWrapper animation="fade-in" delay={0.3} className="mt-12 pt-8 border-t border-subtle">
              <div className="flex justify-end">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/" 
                    className="inline-block px-6 py-2 border border-gray-800 dark:border-gray-200 hover:bg-gray-900 hover:text-gray-50 dark:hover:bg-gray-50 dark:hover:text-gray-900 transition-colors duration-200"
                  >
                    Read More Articles
                  </Link>
                </motion.div>
              </div>
            </MotionWrapper>
          </div>
        </div>
        
            {/* Next/Previous post navigation */}
            <FadeInOnScroll delay={0.4} className="mt-16 pt-8 border-t border-subtle">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {post.previousPost && (
                  <RevealOnScroll>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Previous Article</span>
                      <AnimatedLink 
                        href={`/posts/${post.previousPost.id}`}
                        className="block mt-2 text-xl font-serif font-semibold"
                        underlineEffect="slide"
                      >
                        {post.previousPost.title}
                      </AnimatedLink>
                    </div>
                  </RevealOnScroll>
                )}
                
                {post.nextPost && (
                  <RevealOnScroll>
                    <div className={`${!post.previousPost ? 'md:col-start-2' : ''}`}>
                      <span className="text-sm text-gray-500 dark:text-gray-400 md:text-right block">Next Article</span>
                      <AnimatedLink 
                        href={`/posts/${post.nextPost.id}`}
                        className="block mt-2 text-xl font-serif font-semibold md:text-right"
                        underlineEffect="slide"
                      >
                        {post.nextPost.title}
                      </AnimatedLink>
                    </div>
                  </RevealOnScroll>
                )}
              </div>
            </FadeInOnScroll>
        
      </article>
    </div>
  );
}
