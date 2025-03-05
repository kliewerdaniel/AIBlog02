'use client';

import { motion } from 'framer-motion';

export default function AnimatedLogo() {
  // Animation variants for the logo shapes
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const shapeVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        yoyo: Infinity,
        repeatDelay: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="flex items-center space-x-2"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      {/* Circle */}
      <motion.div 
        className="w-4 h-4 bg-black dark:bg-white rounded-full"
        variants={shapeVariants}
      />
      
      {/* Square */}
      <motion.div 
        className="w-4 h-4 bg-gray-800 dark:bg-gray-200"
        variants={shapeVariants}
      />
      
      {/* Rectangle */}
      <motion.div 
        className="w-8 h-4 bg-gray-600 dark:bg-gray-400"
        variants={shapeVariants}
      />
      
      {/* Text */}
      <motion.span 
        className="font-serif text-2xl font-bold"
        initial={{ opacity: 0, x: -5 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          transition: {
            delay: 0.3,
            duration: 0.5
          }
        }}
      >
        Monochrome
      </motion.span>
    </motion.div>
  );
}
