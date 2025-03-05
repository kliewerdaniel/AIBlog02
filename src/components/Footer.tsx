'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SocialIcons from './SocialIcons';
import MotionWrapper from './MotionWrapper';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="py-10 border-t border-subtle mt-12 bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MotionWrapper animation="slide-up" delay={0.1}>
            <div>
              <h3 className="text-xl font-serif font-semibold mb-4">About</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                A programming blog by Daniel Kliewer, covering web development, data annotation, and digital art.
              </p>
              <SocialIcons />
            </div>
          </MotionWrapper>
          
          <MotionWrapper animation="slide-up" delay={0.2}>
            <div>
              <h3 className="text-xl font-serif font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200">
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
          </MotionWrapper>
          
        </div>
        
        <motion.div 
          className="mt-10 pt-6 border-t border-subtle text-sm text-center text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} Daniel Kliewer. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
