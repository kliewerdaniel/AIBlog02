'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

// Skeleton loader for text
interface SkeletonTextProps {
  lines?: number;
  width?: string | string[];
  height?: string;
  className?: string;
}

export function SkeletonText({
  lines = 1,
  width = '100%',
  height = '1rem',
  className = ''
}: SkeletonTextProps) {
  // If width is an array, use it for each line, otherwise use the same width for all lines
  const widths = Array.isArray(width) ? width : Array(lines).fill(width);
  
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-gray-200 dark:bg-gray-700 rounded"
          style={{ 
            width: widths[index % widths.length], 
            height 
          }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Skeleton loader for images
interface SkeletonImageProps {
  width?: string;
  height?: string;
  aspectRatio?: string;
  rounded?: boolean;
  circle?: boolean;
  className?: string;
}

export function SkeletonImage({
  width = '100%',
  height,
  aspectRatio = '16/9',
  rounded = false,
  circle = false,
  className = ''
}: SkeletonImageProps) {
  const borderRadius = circle ? '50%' : rounded ? '0.5rem' : '0';
  
  return (
    <motion.div
      className={`bg-gray-200 dark:bg-gray-700 overflow-hidden ${className}`}
      style={{ 
        width, 
        height, 
        aspectRatio: height ? undefined : aspectRatio,
        borderRadius
      }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ 
        repeat: Infinity, 
        duration: 1.5,
        ease: "easeInOut"
      }}
    />
  );
}

// Skeleton loader for cards
interface SkeletonCardProps {
  imageHeight?: string;
  lines?: number;
  className?: string;
}

export function SkeletonCard({
  imageHeight = '200px',
  lines = 3,
  className = ''
}: SkeletonCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}>
      <SkeletonImage height={imageHeight} />
      <div className="p-4 space-y-4">
        <SkeletonText lines={1} height="1.5rem" />
        <SkeletonText lines={lines} height="1rem" />
        <SkeletonText lines={1} width="40%" height="0.875rem" />
      </div>
    </div>
  );
}

// Skeleton loader for blog post
export function SkeletonBlogPost({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="space-y-4">
        <SkeletonText lines={1} height="2.5rem" />
        <div className="flex items-center space-x-4">
          <SkeletonImage width="40px" height="40px" circle />
          <SkeletonText lines={2} width={['120px', '80px']} height="0.875rem" />
        </div>
      </div>
      
      {/* Featured image */}
      <SkeletonImage height="400px" rounded />
      
      {/* Content */}
      <div className="space-y-6">
        <SkeletonText lines={1} height="1.5rem" />
        <SkeletonText lines={4} />
        <SkeletonText lines={1} height="1.5rem" />
        <SkeletonText lines={3} />
        <SkeletonImage height="300px" rounded />
        <SkeletonText lines={3} />
      </div>
    </div>
  );
}

// Custom spinner animation
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export function Spinner({
  size = 'md',
  color = 'primary',
  className = ''
}: SpinnerProps) {
  // Size styles
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };
  
  // Color styles
  const colorStyles = {
    primary: 'border-gray-300 dark:border-gray-600 border-t-gray-800 dark:border-t-gray-200',
    secondary: 'border-gray-200 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-400',
    white: 'border-gray-100/30 border-t-white'
  };
  
  return (
    <motion.div
      className={`rounded-full ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ 
        repeat: Infinity, 
        duration: 1,
        ease: "linear"
      }}
    />
  );
}

// Dots loading animation
interface DotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export function Dots({
  size = 'md',
  color = 'primary',
  className = ''
}: DotsProps) {
  // Size styles
  const sizeStyles = {
    sm: 'w-1 h-1 mx-0.5',
    md: 'w-2 h-2 mx-1',
    lg: 'w-3 h-3 mx-1.5'
  };
  
  // Color styles
  const colorStyles = {
    primary: 'bg-gray-800 dark:bg-gray-200',
    secondary: 'bg-gray-600 dark:bg-gray-400',
    white: 'bg-white'
  };
  
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: [0, -8, 0] }
  };
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`rounded-full ${sizeStyles[size]} ${colorStyles[color]}`}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ 
            repeat: Infinity, 
            duration: 1,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Progress bar
interface ProgressBarProps {
  progress: number;
  height?: string;
  color?: 'primary' | 'secondary' | 'success' | 'error';
  showPercentage?: boolean;
  className?: string;
}

export function ProgressBar({
  progress,
  height = '0.5rem',
  color = 'primary',
  showPercentage = false,
  className = ''
}: ProgressBarProps) {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  // Color styles
  const colorStyles = {
    primary: 'bg-gray-800 dark:bg-gray-200',
    secondary: 'bg-gray-600 dark:bg-gray-400',
    success: 'bg-green-500 dark:bg-green-400',
    error: 'bg-red-500 dark:bg-red-400'
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" style={{ height }}>
        <motion.div
          className={`absolute top-0 left-0 h-full ${colorStyles[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      {showPercentage && (
        <div className="mt-1 text-right text-sm text-gray-600 dark:text-gray-400">
          {Math.round(clampedProgress)}%
        </div>
      )}
    </div>
  );
}

// Loading overlay
interface LoadingOverlayProps {
  isLoading: boolean;
  children: ReactNode;
  spinner?: 'spinner' | 'dots' | 'none';
  text?: string;
  blur?: boolean;
  className?: string;
}

export function LoadingOverlay({
  isLoading,
  children,
  spinner = 'spinner',
  text,
  blur = true,
  className = ''
}: LoadingOverlayProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      
      {isLoading && (
        <motion.div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 ${blur ? 'backdrop-blur-sm' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {spinner === 'spinner' && <Spinner />}
          {spinner === 'dots' && <Dots />}
          
          {text && (
            <motion.p
              className="mt-4 text-gray-800 dark:text-gray-200 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {text}
            </motion.p>
          )}
        </motion.div>
      )}
    </div>
  );
}
