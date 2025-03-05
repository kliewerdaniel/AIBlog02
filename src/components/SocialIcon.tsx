'use client';

import { motion } from 'framer-motion';

interface SocialIconProps {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export default function SocialIcon({ name, url, icon }: SocialIconProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
      whileHover={{ 
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
}
