'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Staggered children animation component
export function StaggerContainer({ 
  children, 
  className = '',
  delay = 0,
  staggerDelay = 0.1,
  childrenDelay = 0.05,
  viewport = { once: true, amount: 0.2 }
}: { 
  children: ReactNode; 
  className?: string;
  delay?: number;
  staggerDelay?: number;
  childrenDelay?: number;
  viewport?: { once: boolean; amount: number };
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Staggered item component
export function StaggerItem({ 
  children, 
  className = '',
  index = 0,
  customVariants = null
}: { 
  children: ReactNode; 
  className?: string;
  index?: number;
  customVariants?: any;
}) {
  const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={customVariants || defaultVariants}
    >
      {children}
    </motion.div>
  );
}
