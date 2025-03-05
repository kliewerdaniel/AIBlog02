'use client';

import { motion } from 'framer-motion';
import MotionWrapper from '@/components/MotionWrapper';

export default function Home() {
  return (
    <div className="space-y-16">
      <MotionWrapper animation="fade-in">
        <section className="space-y-6">
          <motion.h1 
            className="font-serif text-5xl md:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Monochrome Blog
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            A sophisticated black and white blog with elegant typography and smooth animations.
          </motion.p>
        </section>
      </MotionWrapper>
      
      <MotionWrapper animation="slide-up" delay={0.4}>
        <section className="space-y-8">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold">Latest Posts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <motion.article 
                key={i}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="font-serif text-xl font-semibold mb-3">Sample Blog Post {i}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  This is a sample blog post that demonstrates the clean and minimal design of the Monochrome blog.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">March 5, 2025</span>
                  <motion.a 
                    href="#" 
                    className="text-sm font-medium"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Read more →
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </MotionWrapper>
      
      <MotionWrapper animation="slide-up" delay={0.6}>
        <section className="bg-gray-100 dark:bg-gray-800 p-8 md:p-12 rounded-lg">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold">About This Blog</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Monochrome is a premium black and white blog focused on clean design, 
              typography, and subtle animations. The minimalist approach ensures 
              content readability while maintaining a sophisticated aesthetic.
            </p>
            <motion.a 
              href="/about" 
              className="inline-block px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </div>
        </section>
      </MotionWrapper>
    </div>
  );
}
