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
        Daniel Kliewer
      </motion.span>
    </motion.div>
  );
}
