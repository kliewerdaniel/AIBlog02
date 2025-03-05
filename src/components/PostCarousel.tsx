'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import Link from 'next/link';
import BlogPostCard from './BlogPostCard';

interface Post {
  id: string | number;
  title: string;
  excerpt: string;
  summary: string;
  date: string;
  readingTime: string;
  isFeatured?: boolean;
}

interface PostCarouselProps {
  posts: Post[];
}

export default function PostCarousel({ posts }: PostCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Calculate the width of the carousel container on mount and window resize
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Always show one post per slide
  const itemsPerSlide = 1;
  const totalSlides = posts.length;

  // Handle next slide
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % totalSlides;
    setCurrentIndex(newIndex);
    controls.start({
      x: -newIndex * width,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    });
  };

  // Handle previous slide
  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    setCurrentIndex(newIndex);
    controls.start({
      x: -newIndex * width,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    });
  };

  // Handle drag end
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = width / 4; // 25% of the carousel width
    
    if (info.offset.x > threshold) {
      prevSlide();
    } else if (info.offset.x < -threshold) {
      nextSlide();
    } else {
      // Snap back to current slide if drag wasn't far enough
      controls.start({
        x: -currentIndex * width,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
      });
    }
  };

  // Update carousel position when currentIndex changes
  useEffect(() => {
    controls.start({
      x: -currentIndex * width,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    });
  }, [currentIndex, width, controls]);

  // Update carousel position when window resizes
  useEffect(() => {
    const handleResize = () => {
      controls.start({
        x: -currentIndex * width,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, width, controls]);

  return (
    <div className="relative overflow-hidden" ref={carouselRef}>
      <motion.div
        className="flex"
        animate={controls}
        initial={{ x: 0 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="flex-shrink-0 w-full p-4"
          >
            <BlogPostCard {...post} />
          </div>
        ))}
      </motion.div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:shadow-lg transition-shadow duration-200"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:shadow-lg transition-shadow duration-200"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              controls.start({
                x: -index * width,
                transition: { type: 'spring', stiffness: 300, damping: 30 }
              });
            }}
            className={`h-2 w-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? 'bg-gray-800 dark:bg-gray-200' : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
