'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Only show the progress bar after scrolling down a bit
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      setIsVisible(value > 0.02);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gray-800 dark:bg-gray-200 z-50 origin-left"
      style={{ 
        scaleX: scrollYProgress,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.3 } }}
    />
  );
}
