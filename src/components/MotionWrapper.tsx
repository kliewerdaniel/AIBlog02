'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'slide-down';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function MotionWrapper({
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 0.5,
  className = '',
}: MotionWrapperProps) {
  // Animation variants
  const variants = {
    'fade-in': {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    'slide-up': {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
    'slide-down': {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
    },
  };

  const selectedVariant = variants[animation];

  return (
    <motion.div
      className={className}
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}

// Simplified container for staggered animations
export function MotionContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Simplified item for animations
export function MotionItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
