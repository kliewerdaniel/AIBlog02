'use client';

import ThemeToggle from './ThemeToggle';
import AnimatedLogo from './AnimatedLogo';
import NavLink from './NavLink';
import ReadingProgress from './ReadingProgress';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <>
      <ReadingProgress />
      <motion.header 
        className="sticky top-0 z-40 py-4 border-b border-subtle bg-white/90 dark:bg-black/90 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="container flex justify-between items-center">
          <div>
            <a href="/" className="no-underline">
              <AnimatedLogo />
            </a>
          </div>
          
          <div className="flex items-center space-x-8">
            <nav>
              <motion.ul 
                className="flex space-x-6"
                initial="initial"
                animate="animate"
                variants={{
                  initial: {},
                  animate: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3,
                    }
                  }
                }}
              >
                <motion.li
                  variants={{
                    initial: { opacity: 0, y: -10 },
                    animate: { opacity: 1, y: 0 }
                  }}
                >
                  <NavLink href="/">Home</NavLink>
                </motion.li>
                <motion.li
                  variants={{
                    initial: { opacity: 0, y: -10 },
                    animate: { opacity: 1, y: 0 }
                  }}
                >
                  <NavLink href="/about">About</NavLink>
                </motion.li>
                <motion.li
                  variants={{
                    initial: { opacity: 0, y: -10 },
                    animate: { opacity: 1, y: 0 }
                  }}
                >
                  <NavLink href="/blog">Blog</NavLink>
                </motion.li>
                <motion.li
                  variants={{
                    initial: { opacity: 0, y: -10 },
                    animate: { opacity: 1, y: 0 }
                  }}
                >
                  <NavLink href="/guides">Guides</NavLink>
                </motion.li>
              </motion.ul>
            </nav>
            
            <ThemeToggle />
          </div>
        </div>
      </motion.header>
    </>
  );
}
