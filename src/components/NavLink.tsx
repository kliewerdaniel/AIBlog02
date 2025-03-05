'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link href={href} className="relative block py-2 px-1 no-underline">
      <motion.span
        className={`relative z-10 ${
          isActive 
            ? 'text-gray-900 dark:text-gray-50' 
            : 'text-gray-700 dark:text-gray-300'
        }`}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      
      {/* Animated underline */}
      {isActive && (
        <motion.span
          className="absolute bottom-0 left-0 h-0.5 bg-gray-800 dark:bg-gray-200"
          layoutId="navUnderline"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
      
      {/* Hover indicator */}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-gray-400 dark:bg-gray-600"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
}
