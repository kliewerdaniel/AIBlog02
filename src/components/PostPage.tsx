'use client';

import Link from 'next/link';
import MotionWrapper, { MotionContainer, MotionItem } from '@/components/MotionWrapper';
import { motion } from 'framer-motion';

interface PostProps {
  post: {
    id: string;
    title: string;
    date: string;
    excerpt: string;
  };
}

export default function PostPage({ post }: PostProps) {
  return (
    <div className="space-y-12">
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
        <MotionWrapper animation="slide-up" className="border-b border-subtle pb-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">{post.title}</h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">{post.date}</p>
        </MotionWrapper>
        
        <div className="bg-gray-100 dark:bg-gray-800 aspect-video mb-12 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600 text-lg">
            Featured Image Placeholder
          </div>
        </div>
        
        <MotionContainer className="prose dark:prose-invert prose-lg max-w-none">
          <MotionItem className="mb-8">
            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              {post.excerpt} This monochromatic design approach creates a timeless aesthetic that puts the focus entirely on content and typography.
            </p>
          </MotionItem>
          
          <MotionItem className="mb-8">
            <h2>The Power of Contrast</h2>
            <p>
              In a world saturated with color, black and white design stands out through its stark contrast and timeless elegance. By removing color from the equation, we're forced to rely on other design elements: typography, spacing, hierarchy, and composition.
            </p>
            
            <p>
              This limitation isn't a weakness—it's a strength. It creates focus and clarity, allowing the content to speak for itself without the distraction of color. The result is a design that feels both modern and classic, sophisticated yet approachable.
            </p>
          </MotionItem>
          
          <MotionItem className="mb-8">
            <h2>Typography as the Hero</h2>
            <p>
              In monochromatic design, typography takes center stage. The interplay between serif and sans-serif fonts creates visual interest and establishes hierarchy. Serif fonts like Playfair Display bring a touch of elegance to headings, while clean sans-serif fonts like Inter ensure readability for body text.
            </p>
            
            <p>
              The careful selection of font weights, sizes, and spacing creates rhythm and flow, guiding the reader through the content with ease. This attention to typographic detail is what separates good monochromatic design from great monochromatic design.
            </p>
          </MotionItem>
          
          <MotionItem className="mb-8">
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-6 italic">
              "Black and white creates a strange dreamscape that color never can." — Jack Antonoff
            </blockquote>
          </MotionItem>
          
          <MotionItem className="mb-8">
            <h2>Embracing Space</h2>
            <p>
              White space (or negative space) is a crucial element in monochromatic design. It provides breathing room for the content, creates emphasis, and contributes to the overall aesthetic. The strategic use of space can direct attention, create groupings, and establish relationships between elements.
            </p>
            
            <p>
              In this blog design, you'll notice generous margins, comfortable line heights, and thoughtful spacing between elements. This isn't just about aesthetics—it's about creating a reading experience that feels comfortable and natural.
            </p>
          </MotionItem>
          
          <MotionItem className="mb-8">
            <h3>Adding Dimension with Animation</h3>
            <p>
              While staying true to our monochromatic palette, we've incorporated subtle animations to add dimension and life to the design. These animations enhance the user experience without distracting from the content, creating moments of delight as you navigate through the blog.
            </p>
            
            <p>
              The animations follow the same principles as our visual design: clean, purposeful, and elegant. They reinforce the content hierarchy and guide the user's attention in a natural, intuitive way.
            </p>
          </MotionItem>
        </MotionContainer>
        
        <MotionWrapper animation="fade-in" delay={0.3} className="mt-16 pt-8 border-t border-subtle">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-serif text-xl font-semibold">Share this article</h3>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">
                  Twitter
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">
                  Facebook
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">
                  LinkedIn
                </a>
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
      </article>
    </div>
  );
}
