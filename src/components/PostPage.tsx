'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import MotionWrapper, { MotionContainer, MotionItem } from '@/components/MotionWrapper';

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
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gray-800 dark:bg-gray-200 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Back to home link */}
      <MotionWrapper animation="fade-in">
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </MotionWrapper>
      
      <article>
        {/* Hero section with title, author, date, reading time */}
        <motion.div 
          className="relative mb-16"
          style={{ opacity, scale }}
        >
          <MotionWrapper animation="slide-up" className="border-b border-subtle pb-8 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6">{post.title}</h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mt-6">
              {/* Author info with avatar */}
              <div className="flex items-center">
                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                  {/* Use fallback for avatar if image is missing */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs">
                    {post.author.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{post.author.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{post.author.bio}</p>
                </div>
              </div>
              
              {/* Publication info */}
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
              </div>
            </div>
          </MotionWrapper>
          
          {/* Featured image with caption */}
          <MotionWrapper animation="fade-in" delay={0.2} className="mb-12">
            <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
              {/* Fallback for featured image */}
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{post.featuredImage.alt}</span>
              </div>
            </div>
            {post.featuredImage.caption && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic text-center">
                {post.featuredImage.caption}
              </p>
            )}
          </MotionWrapper>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of contents (desktop) */}
          <aside className="hidden lg:block lg:col-span-3 relative">
            <div className="sticky top-8">
              <MotionWrapper animation="fade-in" delay={0.3}>
                <h4 className="text-lg font-serif font-semibold mb-4 pb-2 border-b border-subtle">Table of Contents</h4>
                <nav className="space-y-2">
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
              </MotionWrapper>
            </div>
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
                      <p>{section.content}</p>
                    )}
                    
                    {section.type === 'heading' && (
                      <h2 id={sectionId}>{section.content}</h2>
                    )}
                    
                    {section.type === 'subheading' && (
                      <h3 id={sectionId}>{section.content}</h3>
                    )}
                    
                    {section.type === 'blockquote' && (
                      <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-6 italic text-gray-700 dark:text-gray-300 my-8">
                        {section.content}
                      </blockquote>
                    )}
                    
                    {section.type === 'code' && (
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
                        <code className="language-{section.language || 'javascript'}">
                          {section.content}
                        </code>
                      </pre>
                    )}
                    
                    {section.type === 'image' && section.image && (
                      <figure className="my-8">
                        <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-md">
                          {/* Fallback for content images */}
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{section.image.alt}</span>
                          </div>
                        </div>
                        {section.image.caption && (
                          <figcaption className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic text-center">
                            {section.image.caption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                    
                    {section.type === 'list' && section.items && (
                      section.ordered ? (
                        <ol className="list-decimal pl-6 space-y-2">
                          {section.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ol>
                      ) : (
                        <ul className="list-disc pl-6 space-y-2">
                          {section.items.map((item, i) => (
                            <li key={i}>{item}</li>
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
            
            {/* Social sharing */}
            <MotionWrapper animation="fade-in" delay={0.3} className="mt-12 pt-8 border-t border-subtle">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-serif text-xl font-semibold">Share this article</h3>
                  <div className="flex space-x-4 mt-2">
                    <motion.a 
                      href="#" 
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                      </svg>
                      <span className="sr-only">YouTube</span>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </motion.a>
                  </div>
                </div>
                
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
        <MotionWrapper animation="fade-in" delay={0.4} className="mt-16 pt-8 border-t border-subtle">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {post.previousPost && (
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Previous Article</span>
                <motion.div whileHover={{ x: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link 
                    href={`/posts/${post.previousPost.id}`} 
                    className="block mt-2 text-xl font-serif font-semibold hover:text-gray-900 dark:hover:text-gray-50"
                  >
                    {post.previousPost.title}
                  </Link>
                </motion.div>
              </div>
            )}
            
            {post.nextPost && (
              <div className={`${!post.previousPost ? 'md:col-start-2' : ''}`}>
                <span className="text-sm text-gray-500 dark:text-gray-400 md:text-right block">Next Article</span>
                <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link 
                    href={`/posts/${post.nextPost.id}`} 
                    className="block mt-2 text-xl font-serif font-semibold hover:text-gray-900 dark:hover:text-gray-50 md:text-right"
                  >
                    {post.nextPost.title}
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </MotionWrapper>
        
        {/* Related posts */}
        <MotionWrapper animation="fade-in" delay={0.5} className="mt-16 pt-8 border-t border-subtle">
          <h3 className="text-2xl font-serif font-semibold mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {post.relatedPosts.map((relatedPost) => (
              <motion.div 
                key={relatedPost.id}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={`/posts/${relatedPost.id}`} className="block">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 mb-4 overflow-hidden">
                    {relatedPost.image ? (
                      <div className="relative w-full h-full">
                        {/* Fallback for related post images */}
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs">{relatedPost.title}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                        No Image
                      </div>
                    )}
                  </div>
                  <h4 className="text-lg font-serif font-semibold mb-2 group-hover:text-gray-900 dark:group-hover:text-gray-50 transition-colors">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {relatedPost.date}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </MotionWrapper>
      </article>
    </div>
  );
}
